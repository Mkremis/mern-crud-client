import { createContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest } from '../api/auth';
import Cookies from 'js-cookie';

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
      setUser(null);
      setIsAuthenticated(false);
      if (!Array.isArray(error.response.data.error))
        return setAuthErrors([error.response.data.error]);
      setAuthErrors(error.response.data.error);
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
      setUser(null);
      setIsAuthenticated(false);
      if (!Array.isArray(error?.response?.data?.error))
        return setAuthErrors([error?.response?.data?.error]);
      setAuthErrors(error?.response?.data?.error);
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

  useEffect(() => {
    const cookies = Cookies.get();
    if (cookies?.token) console.log(cookies.token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, authErrors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
