import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './services/authContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

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
          <Route path="/" element={
            <AuthCheck>
              {(user) => user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />}
            </AuthCheck>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Helper component to access auth context in route element
function AuthCheck({ children }) {
  const { user } = useAuth();
  return children(user);
}

export default App;
