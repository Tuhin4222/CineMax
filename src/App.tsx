import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext';
import { AuthProvider } from './contexts/AuthContext';
import PublicLayout from './components/layouts/PublicLayout';
import AdminLayout from './components/layouts/AdminLayout';
import HomePage from './pages/public/HomePage';
import MovieDetail from './pages/public/MovieDetail';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import MovieManagement from './pages/admin/MovieManagement';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Router>
          <Routes>
            {/*
</script>
<script type="text/javascript" src="//easebestow.com/30397426753ae8fd254e2427e4d12b87/invoke.js"></script> Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="movie/:id" element={<MovieDetail />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="movies" element={<MovieManagement />} />
            </Route>
          </Routes>
        </Router>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;