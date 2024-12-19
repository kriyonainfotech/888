import  { useState } from 'react';
import '../../css/signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const apiurl = import.meta.env.VITE_API_URL; 
  const { register } = useAuth();
  const handleSignup = async(e) => {
    e.preventDefault();
    let obj = {
       name,email,mobileNumber,password
      }
       try {
       await register(obj)
       navigate('/')
       } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || 'An error occurred. Please try again.');
       }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo-container">
          <img src="logo.png" alt="Logo" className="logo" /> {/* Replace with your logo */}
        </div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          {/* Name Field */}
          <div className="input-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="input-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Mobile Number Field */}
          <div className="input-group">
            <label htmlFor="mobileNumber">Mobile Number *</label>
            <input
              type="tel"
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Password Field */}
          <div className="input-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {/* Submit Button */}
          <button type="submit" className="signup-button">SIGN UP</button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/signin">Signin</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
