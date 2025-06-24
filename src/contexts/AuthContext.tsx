import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  specialty?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'patient' | 'doctor', name?: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const formatNameFromEmail = (email: string): string => {
    const localPart = email.split('@')[0];
    const words = localPart
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return words.join(' ');
  };

  const login = (
    email: string,
    password: string,
    role: 'patient' | 'doctor',
    name?: string
  ): boolean => {
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: name || (role === 'patient' ? formatNameFromEmail(email) : 'Dr. Sarah Wilson'),
        email,
        role,
        specialty: role === 'doctor' ? 'Cardiology' : undefined,
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
