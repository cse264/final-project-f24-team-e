// src/pages/adminPage.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Divider
} from '@mui/material';
import { userService } from '../services/api/userService';
import AdminTableCard from '../components/admin/adminTableCard';

// styles for page sections
const styles = {
  header: {
    textAlign: 'center',
    mb: 6,
    position: 'relative'
  },
  title: {
    fontWeight: 500,
    letterSpacing: 1
  },
};

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userService.getAll();
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // loading state
  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  // error state
  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* page header */}
        <Box sx={styles.header}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={styles.title}
          >
            Admin Dashboard
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Manage users and assign roles
          </Typography>
          <Divider sx={{ mt: 3 }} />
        </Box>

        {/* admin table card */}
        <AdminTableCard users={users} setUsers={setUsers} />
      </Box>
    </Container>
  );
};

export default AdminPage;
