import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { login as loginApi, signup as signupApi, logout as logoutApi } from '../api/auth';
import { parseJwt } from '../utils/jwt';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (accessToken) {
      const decodedToken: any = parseJwt(accessToken);
      if (decodedToken && decodedToken.iss && decodedToken.sub) {
        setUser({ name: decodedToken.iss, email: decodedToken.sub });
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginApi(email, password);
      const token = data.access_token;
      const decodedToken: any = parseJwt(token);

      if (decodedToken && decodedToken.iss && decodedToken.sub) {
        setUser({ name: decodedToken.iss, email: decodedToken.sub });
        sessionStorage.setItem('accessToken', token);
      } else {
        console.error('Invalid token format:', decodedToken);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      await signupApi(name, email, password);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = () => {
    logoutApi();
    setUser(null);
    sessionStorage.removeItem('accessToken');
  };

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
