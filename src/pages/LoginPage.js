// handles user authentication and displays login/profile page
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {
 Box,
 Container,
 Paper,
 Typography,
 Button
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { login, logout, user } = useAuth();

    // render user profile and logout when authenticated
    if (user) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                }}
                >
                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '400px'
                    }}
                >
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Welcome, {user.name}!
                    </Typography>
                    <img
                        src={user.picture}
                        alt="profile"
                        style={{
                            borderRadius: '50%',
                            width: '100px',
                            height: '100px',
                            marginBottom: '20px'
                    }}
                    />
                    <Button
                        variant="outlined"
                        onClick={logout}
                        >
                        Logout
                    </Button>
                </Paper>
            </Box>
        );
    }

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
                onSuccess={login}
                onError={() => console.log('Login Failed')}
            />
        </Paper>
        </Container>
    </Box>
    );
};

export default LoginPage;