// src/pages/adminPage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { userService } from '../services/api/userService';
import AdminTableCard from '../components/admin/adminTableCard';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch all users on component load
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

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      {/* render admin table */}
      <AdminTableCard users={users} setUsers={setUsers} />
    </Container>
  );
};

export default AdminPage;
