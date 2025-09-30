import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';

export default function PlannerScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const FeatureCard = ({ icon, title, description, available }: any) => (
    <TouchableOpacity 
      style={[
        styles.featureCard, 
        { backgroundColor: colors.card, opacity: available ? 1 : 0.6 }
      ]}
      disabled={!available}
    >
      <View style={[styles.featureIcon, { backgroundColor: colors.progressBg }]}>
        <Ionicons 
          name={icon as any} 
          size={32} 
          color={available ? colors.tint : colors.textSecondary} 
        />
      </View>
      <View style={styles.featureContent}>
        <Text style={[styles.featureTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
          {description}
        </Text>
      </View>
      <View 
        style={[
          styles.featureStatus, 
          { backgroundColor: available ? 'rgba(74, 222, 128, 0.2)' : 'rgba(156, 163, 175, 0.2)' }
        ]}
      >
        <Text 
          style={[
            styles.featureStatusText,
            { color: available ? '#4ade80' : '#9ca3af' }
          ]}
        >
          {available ? 'Available' : 'Coming Soon'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Planner+</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Plan your meals and workouts
          </Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <FeatureCard
            icon="restaurant"
            title="Mindful Meal Planner"
            description="Generate a personalized weekly meal plan based on your goals and budget."
            available={true}
          />
          <FeatureCard
            icon="barbell"
            title="Workout Scheduler"
            description="Plan your weekly workouts and track your progress against your goals."
            available={false}
          />
          <FeatureCard
            icon="cart"
            title="Smart Grocery List"
            description="Auto-generate shopping lists from your meal plans with budget tracking."
            available={false}
          />
          <FeatureCard
            icon="nutrition"
            title="Recipe Library"
            description="Access healthy recipes tailored to your dietary preferences."
            available={false}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
              <Ionicons name="add-circle" size={24} color={colors.tint} />
              <Text style={[styles.actionText, { color: colors.text }]}>New Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
              <Ionicons name="document-text" size={24} color={colors.tint} />
              <Text style={[styles.actionText, { color: colors.text }]}>View Plans</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 10 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14 },
  featuresContainer: { paddingHorizontal: 20, gap: 16 },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  featureDescription: { fontSize: 13, lineHeight: 18 },
  featureStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  featureStatusText: { fontSize: 12, fontWeight: '600' },
  quickActions: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  actionGrid: { flexDirection: 'row', gap: 12 },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
  },
  actionText: { marginLeft: 8, fontSize: 14, fontWeight: '500' },
});
