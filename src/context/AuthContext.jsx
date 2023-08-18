import { createContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authErrors, setAuthErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res?.data);
      setIsAuthenticated(true);
      setAuthErrors([]);
    } catch (error) {
      console.log(error);
      setAuthErrors(error.response.data.error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res?.data);
      setIsAuthenticated(true);
      setAuthErrors([]);
    } catch (error) {
      console.log(error);
      setAuthErrors(error.response.data.error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };
  useEffect(() => {
    if (authErrors.length > 0) {
      const timer = setTimeout(() => {
        setAuthErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authErrors]);

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, authErrors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
