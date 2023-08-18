import { createContext, useState } from 'react';
import { registerRequest } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res?.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setUser(null);
      isAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
