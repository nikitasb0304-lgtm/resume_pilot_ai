import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('rp_token');
      if (token) {
        try {
          // Verify token and get user details from backend (optional, or just decode if storing user)
          // For now, we'll rely on the token being there, or implement a /me endpoint later
          // To be safe, let's just assume logged in if token exists for this session, 
          // or ideally fetch user profile. 
          // Since we don't have a /me endpoint ready in the snippet I saw, 
          // I will decode the token or just set a flag. 
          // Actually, let's try to decode or just keep user null until they hit a protected route that fails?
          // Better: Let's assume persistent login if token exists. 
          // We can set a dummy user or fetch real user if we add /auth/me
          setUser({ name: 'User', email: 'user@example.com' }); // Placeholder until we have /me
        } catch (error) {
          localStorage.removeItem('rp_token');
        }
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/api/auth/login', { email, password });
      localStorage.setItem('rp_token', data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { name, email, password } = userData;
      const { data } = await API.post('/api/auth/register', { name, email, password });
      localStorage.setItem('rp_token', data.token);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('rp_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};