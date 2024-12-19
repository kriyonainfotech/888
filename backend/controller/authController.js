const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usermodel = require('../model/user')
const Signup = async(req,res) => {
    try {
        const {name,email,mobileNumber,password} = req.body
        if(!name || !email || !mobileNumber || !password) {
            return res.status(400).send({message: "Please fill all the fields."})
        }
        const existingUser = await Usermodel.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .send({ success: false, message: "User already exists with this email" });
        }
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = new Usermodel({
            name,
            email,
            mobileNumber,
            password: hashedPassword
        });
        await newUser.save()
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Token expiry
        );
        res.cookie("token", token, {
            // httpOnly: true, // Cookie cannot be accessed via JavaScript
            // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            // sameSite: "strict", // Protect against CSRF
            // maxAge: 3600000 // 1 hour expiry
        });
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user:newUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Server error" });
    }
}
const Signin = async (req, res) => {
    try {
        // Extract email and password from request body
        const { email, password } = req.body;

        // Validate fields
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find the user by email
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "1h" } // Token expiry
        );

        // Send token in HTTP-only cookie
        res.cookie("token", token, {
            // httpOnly: true, // Cookie cannot be accessed via JavaScript
            // secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            // sameSite: "strict", // Protect against CSRF
            // maxAge: 3600000 // 1 hour expiry
        });

        // Success response
        res.status(200).send({
            success: true,
            message: "Signin successful",
            user:user
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};
const checkAuth = async(req,res) => {
    try {
        res.status(200).send({
            success: true,
            message: "User is authenticated",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}
const logout = async(req,res) => {
    try {
        res.clearCookie("token", {
            // httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            // sameSite: "strict"
        });

        // Send success response
        res.status(200).send({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}
module.exports = {
    Signup,Signin,logout,checkAuth
}