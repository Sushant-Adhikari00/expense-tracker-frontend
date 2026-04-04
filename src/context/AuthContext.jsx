import { createContext, useState, useEffect } from 'react';
import { tokenStorage } from '../utils/tokenStorage';
import { authApi }       from '../api/authApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser  = tokenStorage.getUser();
      const savedToken = tokenStorage.getToken();
      if (savedUser && savedToken) setUser(savedUser);
    } catch {
      tokenStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (authResponse) => {
    const { token, email, fullName } = authResponse;
    tokenStorage.saveToken(token);
    tokenStorage.saveUser({ email, fullName });
    setUser({ email, fullName });
  };

  const logout = async () => {
    try {
      // Tell backend to blacklist token
      await authApi.logout();
    } catch {
      // Even if API fails — still clear local state
    } finally {
      tokenStorage.clear();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};