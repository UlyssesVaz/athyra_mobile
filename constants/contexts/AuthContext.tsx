import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{
  user: string | null;
  signIn: (username: string) => void;
  signOut: () => void;
  isLoading: boolean;
}>({
  user: null,
  signIn: () => {},
  signOut: () => {},
  isLoading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for a stored user session when the app loads
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('fitness-app-user');
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (e) {
        console.error('Failed to load user from storage', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (username: string) => {
    const lowercasedUser = username.toLowerCase();
    setUser(lowercasedUser);
    await AsyncStorage.setItem('fitness-app-user', lowercasedUser);
    router.replace('/(tabs)/coach'); // Navigate to the main app
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('fitness-app-user');
    router.replace('/(auth)/login'); // Navigate to the login screen
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};