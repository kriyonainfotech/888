const jwt = require('jsonwebtoken');
const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token);
        
        if (!token) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized: No token provided"
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(401).send({
            success: false,
            message: "Unauthorized: Invalid or expired token"
        });
    }
};
module.exports = isLoggedIn;