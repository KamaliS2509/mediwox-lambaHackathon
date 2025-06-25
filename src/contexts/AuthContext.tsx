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
  login: (email: string, password: string, role: 'patient' | 'doctor', name?: string) => Promise<boolean>;
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

  const login = async (
    email: string,
    password: string,
    role: 'patient' | 'doctor',
    name?: string
  ): Promise<boolean> => {
    try {
      if (role === 'doctor') {
        const response = await fetch('https://77dy1g1hwf.execute-api.ap-southeast-2.amazonaws.com/prod', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // ✅ only send email and password
        });

        if (!response.ok) {
          const errText = await response.text();
          console.error('Doctor login failed:', errText); // ✅ helpful debugging
          return false;
        }

        const data = await response.json();

        setUser({
          id: data.doctorId,
          name: data.name,
          email: data.email,
          role: 'doctor',
          specialty: 'Cardiology', // You can later replace with actual value if returned
        });

        return true;
      } else {
        // Mock patient login
        const mockUser: User = {
          id: '1',
          name: name || formatNameFromEmail(email),
          email,
          role: 'patient',
        };
        setUser(mockUser);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
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
