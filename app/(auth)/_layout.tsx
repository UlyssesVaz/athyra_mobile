import { useAuth } from '@/contexts/AuthContext';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    // Redirect to the main app if the user is already signed in
    return <Redirect href="/(tabs)/coach" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}