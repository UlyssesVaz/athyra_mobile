import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Mock data - will be replaced with API calls later
  const energyBalance = { current: 1300, target: 2100 };
  const macros = {
    protein: { current: 85, target: 120, percentage: 71 },
    carbs: { current: 180, target: 220, percentage: 82 },
    fats: { current: 65, target: 80, percentage: 81 }
  };

  const MacroItem = ({ name, data, color }: any) => (
    <View style={[styles.macroItem, { backgroundColor: colors.card }]}>
      <View style={styles.macroInfo}>
        <Text style={[styles.macroName, { color: colors.text }]}>{name}</Text>
        <Text style={[styles.macroDescription, { color: colors.textSecondary }]}>
          {name === 'Protein' && 'For muscle repair & fullness'}
          {name === 'Carbs' && 'For energy to move & think'}
          {name === 'Fats' && 'For hormone health'}
        </Text>
      </View>
      <View style={styles.macroProgress}>
        <Text style={[styles.macroValue, { color: colors.text }]}>
          {data.current}g / {data.target}g
        </Text>
        <View style={styles.progressBarSmall}>
          <View 
            style={[
              styles.progressFillSmall, 
              { 
                width: `${data.percentage}%`,
                backgroundColor: color
              }
            ]} 
          />
        </View>
        <Text style={[styles.percentageText, { color: colors.textSecondary }]}>
          {data.percentage}%
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Progress</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Track your daily energy and achievements
          </Text>
        </View>

        {/* Energy Balance Card */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.energyHeader}>
            <Text style={[styles.energyBalance, { color: colors.text }]}>
              {energyBalance.current} / {energyBalance.target}
            </Text>
            <Text style={[styles.timeIndicator, { color: colors.textSecondary }]}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { backgroundColor: colors.progressBg }]}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${(energyBalance.current / energyBalance.target) * 100}%`,
                    backgroundColor: colors.tint
                  }
                ]} 
              />
            </View>
            <View style={styles.progressLabels}>
              <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>0</Text>
              <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
                Target: {energyBalance.target}
              </Text>
            </View>
          </View>
        </View>

        {/* Macros Section */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            What's in your Fuel?
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Track your macro nutrients for optimal health
          </Text>
          
          <View style={styles.macroGrid}>
            <MacroItem name="Protein" data={macros.protein} color="#4ade80" />
            <MacroItem name="Carbs" data={macros.carbs} color="#06b6d4" />
            <MacroItem name="Fats" data={macros.fats} color="#f59e0b" />
          </View>
        </View>

        {/* Exercise Section */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            How You Used Your Energy
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
            Every movement matters
          </Text>
          
          <View style={styles.emptyState}>
            <Ionicons name="fitness-outline" size={48} color={colors.textSecondary} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No workouts logged today
            </Text>
          </View>
        </View>

        {/* Streak Section */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Streak
          </Text>
          <View style={styles.streakContainer}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={[styles.streakNumber, { color: colors.text }]}>5 days</Text>
            <Text style={[styles.streakLabel, { color: colors.textSecondary }]}>
              Best: 12 days
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  energyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  energyBalance: {
    fontSize: 24,
    fontWeight: '700',
  },
  timeIndicator: {
    fontSize: 14,
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  macroGrid: {
    gap: 12,
  },
  macroItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  macroInfo: {
    flex: 1,
  },
  macroName: {
    fontSize: 16,
    fontWeight: '600',
  },
  macroDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  macroProgress: {
    alignItems: 'flex-end',
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressBarSmall: {
    width: 80,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFillSmall: {
    height: '100%',
    borderRadius: 2,
  },
  percentageText: {
    fontSize: 11,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
  },
  streakContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  streakEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  streakLabel: {
    fontSize: 14,
  },
});