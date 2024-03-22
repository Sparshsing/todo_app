import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // const [authTokens, setAuthTokens] = useState(null);
  const [authTokens, setAuthTokens] = useState(() => {
    // Try to get tokens from localStorage on initial load
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  useEffect(() => {
    const storedTokens = localStorage.getItem('authTokens');
    if (storedTokens) {
      setAuthTokens(JSON.parse(storedTokens));
    }
  }, []);

  const login = (tokens) => {
    setAuthTokens(tokens);
    localStorage.setItem('authTokens', JSON.stringify(tokens)); // Store tokens in local storage
  };

  const logout = () => {
    setAuthTokens(null);
    localStorage.removeItem('authTokens'); // Clear tokens from local storage
  };

  const isAuthenticated = () => !!authTokens;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authTokens }}>
      {children}
    </AuthContext.Provider>
  );
};
