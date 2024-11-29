// src/services/api/userService.js
import { apiRequest } from '../utils/apiUtils';
import { ValidationError, APIError } from '../errors';
import { API_CONFIG } from '../config';

export const userService = {
  // checks if user data meets requirements
  validateUserData(userData) {
    const errors = {};
    if (!userData.email) errors.email = 'Email is required';
    if (!userData.name) errors.name = 'Name is required';

    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Invalid user data', errors, 400);
    }
  },

  // retrieves all users from the database
  async getAll() {
    try {
      const users = await apiRequest('/users', {
        baseUrl: API_CONFIG.URLS.LOCAL_API
      });
      return {
        status: 200,
        data: users,
        message: 'Users retrieved successfully'
      };
    } catch (error) {
      throw new APIError('Failed to fetch users', 500);
    }
  },

  // finds a specific user by their email
  async getByEmail(email) {
    if (!email) {
      throw new ValidationError('Email is required', { email: 'Required field' }, 400);
    }

    try {
      const users = await apiRequest(`/users?email=${encodeURIComponent(email)}`, {
        baseUrl: API_CONFIG.URLS.LOCAL_API
      });

      return {
        status: 200,
        data: users.length > 0 ? users[0] : null,
        message: users.length > 0 ? 'User found successfully' : 'User not found'
      };
    } catch (error) {
      throw new APIError('Failed to fetch user', 500);
    }
  },

  // updates a specific user's details
  async update(userId, updates) {
    if (!userId || !updates || !updates.role) {
      throw new ValidationError('User ID and role are required', {}, 400);
    }

    try {
      // fetch current user data
      const currentUser = await apiRequest(`/users/${userId}`, {
        baseUrl: API_CONFIG.URLS.LOCAL_API,
      });

      if (!currentUser) {
        throw new APIError('User not found', 404);
      }

      // merge updates into existing user data
      const updatedUser = { ...currentUser, ...updates };

      // send updated user back to server
      const response = await apiRequest(`/users/${userId}`, {
        baseUrl: API_CONFIG.URLS.LOCAL_API,
        method: 'PUT',
        body: JSON.stringify(updatedUser),
      });

      return {
        status: 200,
        data: response,
        message: 'User updated successfully',
      };
    } catch (error) {
      throw new APIError('Failed to update user', 500);
    }
  },

  // adds a new user to the database
  async create(userData) {
    try {
      this.validateUserData(userData);

      const newUser = {
        email: userData.email,
        name: userData.name,
        role: 'user'
      };

      const created = await apiRequest('/users', {
        baseUrl: API_CONFIG.URLS.LOCAL_API,
        method: 'POST',
        body: JSON.stringify(newUser)
      });

      return {
        status: 201,
        data: created,
        message: 'User created successfully'
      };
    } catch (error) {
      throw new APIError('Failed to create user', 500);
    }
  }
};