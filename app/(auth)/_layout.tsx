// Add these imports
import { useAuth } from '@/contexts/AuthContext';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';

// ... keep existing imports

export default function TabLayout() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // If the user is not signed in, redirect to the login page.
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
     // ... rest of the file is unchanged
     // ...
    </Tabs>
  );
}