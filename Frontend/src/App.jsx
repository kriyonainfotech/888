// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import PublicRoute from './routes/publicRoutes';
import Signin from './pages/auth/signin';
import Signup from './pages/auth/signup';
import ProtectedRoute from './routes/protectedRoutes';
import Home from './pages/home/home';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <Signin />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup/>
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home/>
              </ProtectedRoute>
            }
          />

          {/* Redirect Unknown Routes */}
          {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
