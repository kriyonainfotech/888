import  { useState } from 'react';
import "../../css/signin.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const apiurl = import.meta.env.VITE_API_URL; 
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate()
  const handleLogin = async(e) => {
    e.preventDefault();
    let obj = {
      email,password
    }
     try {
      await login(obj)
      navigate('/')
     } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
     }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src="logo.png"  className="logo" /> {/* Replace with your logo */}
        </div>
        <h2>Welcome Back !!</h2>
        <form onSubmit={handleLogin}>
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
          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <div className="sign-up">
           Don't have an account? <a href="/signup">SignUp</a>
        </div>
      </div>
    </div>
  );
}

export default Signin;
