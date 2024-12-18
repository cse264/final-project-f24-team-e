// authentication context for managing user state and auth flows
import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { userService } from '../services/api/userService';

// create auth context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    // initialize with saved user data from localStorage for persistence
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // process google login response and store user data
    const login = async (credentialResponse) => {
        try {

            const decoded = jwtDecode(credentialResponse.credential);

            // check if user exists in our database
            const existingUser = await userService.getByEmail(decoded.email);

            let userData;

            if (!existingUser.data) {
                // create new user if they don't exist
                const newUser = await userService.create({
                    email: decoded.email,
                    name: decoded.name,
                    role: 'user' // default role for new users
                });
                userData = newUser.data;
            } else {
                userData = existingUser.data;
            }

            // combine database user data with auth info
            const authData = {
                ...userData,
                token: credentialResponse.credential
            };

            setUser(authData);
            localStorage.setItem('user', JSON.stringify(authData));
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    // clear user data on logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // check for token expiration
    useEffect(() => {
    if (user?.token) {
        const decoded = jwtDecode(user.token);
        if (decoded.exp * 1000 < Date.now()) {
            logout();
        }
    }
    }, [user]);

    // provide auth state and methods to app
    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook for accessing auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};