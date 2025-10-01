import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// This should match your backend URL
const API_BASE = 'https://athyra.onrender.com';

export default function RegisterScreen() {
  const { signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState(''); // Simple text input for now
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('maintain'); // Default goal
  const [isLoading, setIsLoading] = useState(false);

  const colorScheme = 'dark'; // Forcing dark theme
  const colors = Colors[colorScheme];
  
  const handleRegister = async () => {
    if (!username.trim() || !age || !sex.trim() || !height || !weight) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.toLowerCase().trim(),
          age: parseInt(age, 10),
          sex: sex.toLowerCase().trim(),
          height_cm: parseInt(height, 10),
          weight_kg: parseInt(weight, 10),
          goal: goal,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => signIn(result.username) },
        ]);
      } else {
        const err = await response.json();
        Alert.alert('Registration Failed', err.detail || 'An error occurred.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', width: '100%' }}>
        <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
        
        <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} placeholder="Username" placeholderTextColor={colors.textSecondary} value={username} onChangeText={setUsername} autoCapitalize="none" />
        <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} placeholder="Age" placeholderTextColor={colors.textSecondary} value={age} onChangeText={setAge} keyboardType="numeric" />
        <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} placeholder="Sex (male/female)" placeholderTextColor={colors.textSecondary} value={sex} onChangeText={setSex} autoCapitalize="none" />
        <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} placeholder="Height (cm)" placeholderTextColor={colors.textSecondary} value={height} onChangeText={setHeight} keyboardType="numeric" />
        <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} placeholder="Weight (kg)" placeholderTextColor={colors.textSecondary} value={weight} onChangeText={setWeight} keyboardType="numeric" />
        {/* We can replace the Goal input with a picker component later */}
        <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} placeholder="Goal (lose_weight, gain_muscle, maintain)" placeholderTextColor={colors.textSecondary} value={goal} onChangeText={setGoal} autoCapitalize="none" />

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.tint }]} 
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator color="#fff" /> : <ThemedText type="button">Get Started</ThemedText>}
        </TouchableOpacity>

        <Link href="/(auth)/login" style={styles.link}>
          <ThemedText type="link">Already have an account? Sign In</ThemedText>
        </Link>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { marginBottom: 20, marginTop: 40, },
  input: { width: '100%', padding: 15, borderRadius: 12, fontSize: 16, marginBottom: 15, borderWidth: 1, borderColor: '#444' },
  button: { width: '100%', paddingVertical: 15, borderRadius: 12, alignItems: 'center' },
  link: { marginTop: 20, marginBottom: 40 },
});