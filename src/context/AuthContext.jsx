import { createContext, useEffect, useState } from 'react';
import { registerRequest } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (errors) alert(errors);
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res?.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data.error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
