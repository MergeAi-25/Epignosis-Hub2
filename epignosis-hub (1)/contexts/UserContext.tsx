
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import type { User } from '../types';
import { LOCAL_STORAGE_USER_KEY } from '../constants';
import { getUserDataService } from '../services/dataService'; // To initialize data on login

interface UserContextType {
  currentUser: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage:", error);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
    setIsLoading(false);
  }, []);

  const login = (name: string, email: string) => {
    // In a real app, this would involve an API call.
    // For mock purposes, we create a user object.
    const user: User = { id: Date.now().toString(), name, email };
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    setCurrentUser(user);
    // Initialize user data in localStorage if not already present
    getUserDataService(user.id); 
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    // Optionally, you might want to clear LOCAL_STORAGE_USER_DATA_KEY too,
    // or keep it if user might log back in. For this app, let's keep it.
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
