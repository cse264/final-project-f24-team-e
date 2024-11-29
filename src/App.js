import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth} from './context/authContext';
import ProtectedRoute from './components/auth/protectedRoute';
import LoginPage from './pages/loginPage';
import MainLayout from './components/layout/mainLayout';
import CharactersPage from './pages/charactersPage';
import VotingPage from './pages/votingPage';
import HomePage from './pages/homePage';

// placeholder components until we create them
const AdminDashboard = () => <div>Admin Dashboard</div>;

// protected route for admin access
const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/characters" element={<CharactersPage />} />
                <Route path="/vote" element={<VotingPage />} />
                {/* admin route with role-based access */}
                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminDashboard />
                    </AdminProtectedRoute>
                  }
                />
              </Route>
            </Route>

            {/* redirect other routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;