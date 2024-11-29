// handles user authentication and displays login/profile page
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import {
 Box,
 Container,
 Paper,
 Typography
} from '@mui/material';
import { useAuth } from '../context/authContext';

const LoginPage = () => {
    const { login} = useAuth();

    const navigate = useNavigate();

    // handle successful login and redirect
    const handleLoginSuccess = async (credentialResponse) => {
        try {
            await login(credentialResponse);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // render login page for unauthenticated users
    return (
    <Box
        sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            overflow: 'hidden'
        }}
    >
        <Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
        <Paper
            elevation={3}
            sx={{
                p: { xs: 3, sm: 5 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mx: 'auto',
                bgcolor: 'background.paper'
            }}
        >
            <Typography
                component="h1"
                variant="h4"
                align="center"
                sx={{ mb: 2, fontSize: { xs: '1.5rem', sm: '2rem' } }}
                >
                Sign in to The Office Favorites
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ mb: 4, fontSize: { xs: '0.875rem', sm: '1rem' } }}
                >
                Welcome, sign in to continue
            </Typography>

            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => console.log('Login Failed')}
            />
        </Paper>
        </Container>
    </Box>
    );
};

export default LoginPage;