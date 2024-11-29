import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const LoginPage = () => {

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

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
      <Container
        maxWidth="sm"
        sx={{
          px: { xs: 2, sm: 3 },
          width: '100%'
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mx: 'auto',
            maxWidth: '100%',
            bgcolor: 'background.paper'
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            color="text.primary"
            align="center"
            sx={{
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Sign in to The Office Favorites
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{
              mb: 4,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Welcome, sign in to continue
          </Typography>

          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            fullWidth
            sx={{
              textTransform: 'none',
              px: { xs: 2, sm: 4 },
              py: 1
            }}
          >
            Sign in with Google
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
