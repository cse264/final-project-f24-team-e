import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;