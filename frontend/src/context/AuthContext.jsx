import React, { createContext, useContext, useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Try to hydrate from localStorage on initial load
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('lawlens_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('lawlens_user', JSON.stringify(userData));
    };

    const logout = () => {
        googleLogout();
        setUser(null);
        localStorage.removeItem('lawlens_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
