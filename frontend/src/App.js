import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth} from './context/authContext';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProtectedRoute from './components/auth/protectedRoute';
import LoginPage from './pages/loginPage';
import MainLayout from './components/layout/mainLayout';
import CharactersPage from './pages/charactersPage';
import VotingPage from './pages/votingPage';
import HomePage from './pages/homePage';
import AdminPage from './pages/adminPage';

// protected route for admin access
const AdminProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
};

// error display component
const ErrorDisplay = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 4,
      bgcolor: 'background.default'
    }}
  >
    <Alert
      severity="error"
      sx={{
        maxWidth: 'md',
        '& .MuiAlert-message': {
          width: '100%'
        }
      }}
    >
      <AlertTitle sx={{ fontWeight: 'bold' }}>Configuration Error</AlertTitle>
      Google Client ID is not configured. Please set the REACT_APP_GOOGLE_CLIENT_ID environment variable.
      Contact <Link href="mailto:noz224@lehigh.edu">noz224@lehigh.edu</Link> if you need the key.
      <Box sx={{ mt: 1, fontSize: '0.875rem' }}>
        The application cannot function without proper Google OAuth configuration.
      </Box>
    </Alert>
  </Box>
);

function App() {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
      console.error('Missing REACT_APP_GOOGLE_CLIENT_ID environment variable');
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return <ErrorDisplay />;
  }
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
                      <AdminPage/>
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