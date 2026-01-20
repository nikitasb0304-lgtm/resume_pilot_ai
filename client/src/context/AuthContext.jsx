import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Simulate login and user data fetching
    console.log('Login attempt', email);
    
    let userData = {
      email,
      name: email, // Default to full email as requested
      id: Date.now().toString()
    };

    // Specific mapping for requested user
    if (email.toLowerCase().includes('hadareikita') || email.toLowerCase().includes('nikita')) {
      userData.name = 'Nikita Vernari';
      userData.bio = 'Passionate software engineer with a focus on AI and web development.';
      userData.phone = '+1 (555) 123-4567';
      userData.address = 'San Francisco, CA';
    }

    setUser(userData);
  };

  const register = async (userData) => {
    // Placeholder register function
    console.log('Register attempt', userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
