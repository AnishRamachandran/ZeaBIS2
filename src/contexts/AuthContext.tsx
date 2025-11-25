import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

export type UserRole = 'Admin' | 'Delivery Manager' | 'Project Manager' | 'Finance Manager' | 'Account Manager' | 'Team Member';

interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
  employeeId?: string;
  active: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = api.getToken();
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.auth.getCurrentUser();
      setUser(response.user);
    } catch (error) {
      console.error('Error fetching current user:', error);
      api.setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.auth.login({ email, password });
      api.setToken(response.token);
      setUser(response.user);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      api.setToken(null);
      setUser(null);
    }
  };

  const hasRole = (roles: UserRole[]) => {
    return user && user.role ? roles.includes(user.role) : false;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
