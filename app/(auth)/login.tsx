import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedText type="title">Login</ThemedText>
      <ThemedText type="subtitle">This is a placeholder login screen.</ThemedText>

      <TouchableOpacity style={[styles.button, { backgroundColor: colors.tint }]}>
        <ThemedText type="button">Sign In</ThemedText>
      </TouchableOpacity>

      <Link href="/(auth)/register" style={styles.link}>
        <ThemedText type="link">Go to Register</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  button: { marginTop: 20, paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8 },
  link: { marginTop: 16 },
});
