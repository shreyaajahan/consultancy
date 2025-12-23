import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import './styles/App.css';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Projects from './pages/public/Projects';
import Contact from './pages/public/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminServices from './pages/admin/AdminServices';
import AdminProjects from './pages/admin/AdminProjects';
import AdminEnquiries from './pages/admin/AdminEnquiries';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/services" 
          element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/projects" 
          element={
            <ProtectedRoute>
              <AdminProjects />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/enquiries" 
          element={
            <ProtectedRoute>
              <AdminEnquiries />
            </ProtectedRoute>
          } 
        />

        {/* Redirect /admin to /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
