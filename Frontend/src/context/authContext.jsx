import axios from 'axios';
import  { createContext, useContext, useState, useEffect } from 'react';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const apiurl = import.meta.env.VITE_API_URL; 
  // Check if user is logged in
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${apiurl}/auth/checkAuth`,{withCredentials:true}); // Endpoint to verify token
      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error.message);
      console.log(error);
      
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus(); // Run on component mount
  }, []);

  const login = async (obj) => {
    try {
      const response = await axios.post(`${apiurl}/auth/signin`, obj,{withCredentials:true});
      if (response.data.success) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };
  const register = async (obj) => {
    try {
      const response = await axios.post(`${apiurl}/auth/signup`, obj,{withCredentials:true});
      if (response.data.success) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  };


  const logout = async () => {
    try {
      await axios.get(`${apiurl}/auth/logout`); // Logout endpoint
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login,register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
