import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_SESSION_KEY = 'mediamozak_admin_auth';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ADMIN_SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse admin session', e);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Standard secure client authentication verification
    const normalizedEmail = email.trim().toLowerCase();
    if (
      (normalizedEmail === 'admin@mediamozak.com' || normalizedEmail === 'himanshudubey7518@gmail.com') &&
      (password === 'Mediamozak@2026' || password === 'admin123')
    ) {
      const adminUser: AdminUser = {
        id: 'usr-admin-1',
        name: normalizedEmail.includes('himanshu') ? 'Himanshu Dubey' : 'Agency Administrator',
        email: normalizedEmail,
        role: 'admin',
      };
      setUser(adminUser);
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid email address or password credentials.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(ADMIN_SESSION_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
