// src/components/admin/AdminTableCard.js
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Alert,
} from '@mui/material';
import { userService } from '../../services/api/userService';

// styles for table container and headers
const styles = {
  container: {
    mt: 4,
    bgcolor: 'grey.100', // light grey background
    borderRadius: 2, // rounded corners
    p: 2, // padding inside the container
  },
  headerCell: {
    bgcolor: 'grey.200', // distinct background color for header
    fontWeight: 'bold', // bold text
    textTransform: 'uppercase', // uppercase headings for distinction
    textAlign: 'left-align', //
    padding: 2, // padding for better spacing
  },
};

const AdminTableCard = ({ users, setUsers }) => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // handle role updates
  const handleRoleChange = async (userId, newRole) => {
    try {
      setSuccessMessage('');
      setError(null);

      // find the current user data from the state
      const currentUser = users.find((user) => user._id === userId);

      if (!currentUser) {
        setError('User not found in the state');
        return;
      }

      // call userService to update the role
      const response = await userService.update(userId, { role: newRole }, currentUser);

      // update local user state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: response.data.role } : user
        )
      );

      setSuccessMessage('Role updated successfully.');
    } catch (err) {
      console.error('Error updating role:', err);
      setError('Failed to update role.');
    }
  };

  return (
    <TableContainer component={Paper} sx={styles.container}>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={styles.headerCell}>Name</TableCell>
            <TableCell sx={styles.headerCell}>Email</TableCell>
            <TableCell sx={styles.headerCell}>Role</TableCell>
            <TableCell sx={styles.headerCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleRoleChange(user._id, user.role === 'admin' ? 'user' : 'admin')
                  }
                >
                  Toggle Role
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminTableCard;
