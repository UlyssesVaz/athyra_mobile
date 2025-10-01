import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CoachScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [currentTime, setCurrentTime] = useState('');
  const [caloriesConsumed, setCaloriesConsumed] = useState(1247);
  const [targetCalories] = useState(2100);
  const [lastAnalysis, setLastAnalysis] = useState<any>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      setCurrentTime(timeString);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = Math.min((caloriesConsumed / targetCalories) * 100, 100);

  const handleVoicePress = () => {
    // Will implement voice recording in Step 7
    console.log('Voice button pressed');
  };

  const handleCameraPress = () => {
    // Will implement camera in Step 6
    console.log('Camera button pressed');
    router.push('/camera');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.time, { color: colors.text }]}>{currentTime}</Text>
        <TouchableOpacity style={styles.profileIcon}>
          <Ionicons name="person-circle" size={32} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Calorie Progress */}
      <View style={[styles.calorieCard, { backgroundColor: colors.card }]}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: colors.textSecondary }]}>
            Today's Calories
          </Text>
          <Text style={[styles.progressNumbers, { color: colors.text }]}>
            {caloriesConsumed.toLocaleString()} / {targetCalories.toLocaleString()}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.progressBg }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${progressPercentage}%`,
                  backgroundColor: colors.tint
                }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {lastAnalysis ? (
          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              ✅ LOGGED: {lastAnalysis.description}
            </Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={[styles.nutritionValue, { color: colors.text }]}>
                  {lastAnalysis.calories}
                </Text>
                <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>
                  calories
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Ready to Track
            </Text>
            <Text style={[styles.cardContent, { color: colors.textSecondary }]}>
              Tap the mic button to log food with voice, or use the camera to analyze visually
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.cameraButton, { backgroundColor: colors.card }]}
          onPress={handleCameraPress}
        >
          <Ionicons name="camera" size={28} color={colors.tint} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.voiceButton, { backgroundColor: colors.card }]}
          onPress={handleVoicePress}
        >
          <Ionicons name="mic" size={40} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.logButton, { backgroundColor: colors.card }]}
          onPress={() => console.log('Quick log')}
        >
          <Ionicons name="add-circle" size={28} color={colors.tint} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  time: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calorieCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 14,
  },
  progressNumbers: {
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    lineHeight: 20,
  },
  nutritionGrid: {
    flexDirection: 'row',
    marginTop: 12,
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  nutritionLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 20,
    paddingTop: 10,
  },
  voiceButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cameraButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});