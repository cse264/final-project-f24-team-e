// src/components/admin/AdminTableCard.js
import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Select, MenuItem, Button, Alert
} from '@mui/material';
import { userService } from '../../services/api/userService';

const AdminTableCard = ({ users, setUsers }) => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // handle role updates
  const handleRoleChange = async (userId, newRole) => {
    try {
      setSuccessMessage('');
      setError(null);

      // call the userService to update the role
      const response = await userService.update(userId, { role: newRole });

      // update local user state with the new role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: response.data.role } : user
        )
      );

      setSuccessMessage('Role updated successfully.');
    } catch (err) {
      setError('Failed to update role.');
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleRoleChange(user.id, user.role === 'admin' ? 'user' : 'admin')
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
