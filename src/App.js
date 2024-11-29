import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/authContext';
import ProtectedRoute from './components/auth/protectedRoute';
import LoginPage from './pages/loginPage';
import MainLayout from './components/layout/mainLayout';

// placeholder components until we create them
const HomePage = () => <div>Home Page</div>;
const CharactersPage = () => <div>Characters Page</div>;
const VotingPage = () => <div>Voting Page</div>;
const AdminDashboard = () => <div>Admin Dashboard</div>;

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
                <Route path="/admin" element={<AdminDashboard />} />
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