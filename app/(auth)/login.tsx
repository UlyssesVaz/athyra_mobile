// app/(auth)/login.tsx - REPLACE ENTIRE FILE
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const API_BASE = 'https://athyra.onrender.com';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const colorScheme = 'dark';
  const colors = Colors[colorScheme];

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Please enter a username.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.toLowerCase().trim() }),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: () => signIn(result.username) },
        ]);
      } else {
        Alert.alert('Login Failed', 'User not found.');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Welcome Back</ThemedText>
      
      <TextInput
        style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
        placeholder="Username"
        placeholderTextColor={colors.textSecondary}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tint }]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : <ThemedText type="button">Sign In</ThemedText>}
      </TouchableOpacity>

      <Link href="/(auth)/register" style={styles.link}>
        <ThemedText type="link">No account? Create Account</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { marginBottom: 30, textAlign: 'center' },
  input: { width: '100%', padding: 15, borderRadius: 12, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: '#444' },
  button: { width: '100%', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  link: { marginTop: 20, alignSelf: 'center' },
});