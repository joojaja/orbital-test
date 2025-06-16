import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/authContext';
import ProtectedRoute from './components/protectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

// Helper component to access auth context in route element
function AuthCheck() {
  const { user } = useAuth();
  return user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>

          {/* Root path redirect */}
          <Route path="/" element={<AuthCheck />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
