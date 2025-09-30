import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import { Colors } from '../theme/colors';

interface OnboardingProps {
  onComplete: () => void;
}

const ONBOARDING_STEPS = [
  { id: 'welcome', title: 'Welcome to Datinsight', subtitle: "Your intelligent insights companion", icon: 'sparkles' },
  { id: 'purpose', title: "What's your goal?", subtitle: 'Help us personalize your insights', icon: 'target' },
  { id: 'background', title: 'About you', subtitle: 'So we can tailor the analysis', icon: 'person' },
  { id: 'interests', title: 'Your interests', subtitle: 'Topics you want to follow', icon: 'heart' },
  { id: 'notifications', title: 'Stay updated', subtitle: 'How often do you want insights?', icon: 'notifications' },
];

const GOALS = [
  { id: 'business', label: 'Business Growth', icon: 'trending-up', desc: 'Market trends & opportunities' },
  { id: 'career', label: 'Career Development', icon: 'briefcase', desc: 'Industry insights & skills' },
  { id: 'investment', label: 'Investment Research', icon: 'cash', desc: 'Financial markets & analysis' },
  { id: 'education', label: 'Learning & Education', icon: 'school', desc: 'Knowledge & discoveries' },
  { id: 'awareness', label: 'Stay Informed', icon: 'newspaper', desc: 'Current events & trends' },
  { id: 'innovation', label: 'Innovation & Tech', icon: 'rocket', desc: 'Cutting-edge developments' },
];

const BACKGROUNDS = [
  { id: 'entrepreneur', label: 'Entrepreneur', icon: 'bulb' },
  { id: 'professional', label: 'Professional', icon: 'briefcase' },
  { id: 'investor', label: 'Investor', icon: 'cash' },
  { id: 'student', label: 'Student', icon: 'school' },
  { id: 'researcher', label: 'Researcher', icon: 'flask' },
  { id: 'enthusiast', label: 'Enthusiast', icon: 'heart' },
];

const CATEGORIES = [
  { id: 'technology', label: 'Technology', icon: 'hardware-chip' },
  { id: 'politics', label: 'Politics', icon: 'analytics' },
  { id: 'business', label: 'Business', icon: 'business' },
  { id: 'science', label: 'Science', icon: 'flask' },
  { id: 'health', label: 'Health', icon: 'fitness' },
  { id: 'entertainment', label: 'Entertainment', icon: 'film' },
  { id: 'sports', label: 'Sports', icon: 'basketball' },
];

const NOTIFICATION_INTERVALS = [
  { id: 1, label: 'Every Minute', value: 1, icon: 'flash' },
  { id: 5, label: 'Every 5 Minutes', value: 5, icon: 'time' },
  { id: 15, label: 'Every 15 Minutes', value: 15, icon: 'timer' },
  { id: 30, label: 'Every 30 Minutes', value: 30, icon: 'alarm' },
  { id: 60, label: 'Every Hour', value: 60, icon: 'hourglass' },
  { id: 180, label: 'Every 3 Hours', value: 180, icon: 'moon' },
];

export default function OnboardingScreen({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [notificationInterval, setNotificationInterval] = useState(60);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const progress = (currentStep + 1) / ONBOARDING_STEPS.length;

  const handleNext = async () => {
    if (currentStep === ONBOARDING_STEPS.length - 1) {
      await AsyncStorage.setItem('onboardingComplete', 'true');
      await AsyncStorage.setItem('userGoals', JSON.stringify(selectedGoals));
      await AsyncStorage.setItem('userBackground', selectedBackground);
      await AsyncStorage.setItem('userInterests', JSON.stringify(selectedInterests));
      await AsyncStorage.setItem('notificationInterval', String(notificationInterval));
      await AsyncStorage.setItem('additionalInfo', additionalInfo);
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId) ? prev.filter(id => id !== goalId) : [...prev, goalId]
    );
  };

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestId) ? prev.filter(id => id !== interestId) : [...prev, interestId]
    );
  };

  const canProceed = () => {
    switch (ONBOARDING_STEPS[currentStep].id) {
      case 'welcome': return true;
      case 'purpose': return selectedGoals.length > 0;
      case 'background': return selectedBackground !== '';
      case 'interests': return selectedInterests.length > 0;
      case 'notifications': return true;
      default: return false;
    }
  };

  const renderStepContent = () => {
    const step = ONBOARDING_STEPS[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <View style={styles.welcomeContent}>
            <Logo size="large" showText={false} />
            <Text style={styles.welcomeTitle}>Datinsight</Text>
            <Text style={styles.welcomeSubtitle}>
              Intelligent insights that understand you
            </Text>
            <View style={styles.featureList}>
              <FeatureItem icon="eye" text="Deep pattern analysis" color={Colors.primary} />
              <FeatureItem icon="bulb" text="Understand motives & causes" color={Colors.accent} />
              <FeatureItem icon="trending-up" text="Predict future outcomes" color={Colors.tertiary} />
              <FeatureItem icon="notifications" text="Smart personalized alerts" color={Colors.primary} />
            </View>
          </View>
        );

      case 'purpose':
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.gridContainer}>
              {GOALS.map(goal => {
                const isSelected = selectedGoals.includes(goal.id);
                return (
                  <TouchableOpacity
                    key={goal.id}
                    style={[styles.goalCard, isSelected && styles.goalCardSelected]}
                    onPress={() => toggleGoal(goal.id)}
                  >
                    <View style={[styles.goalIcon, isSelected && styles.goalIconSelected]}>
                      <Ionicons name={goal.icon as any} size={24} color={isSelected ? '#FFFFFF' : Colors.primary} />
                    </View>
                    <Text style={[styles.goalLabel, isSelected && styles.goalLabelSelected]}>
                      {goal.label}
                    </Text>
                    <Text style={styles.goalDesc}>{goal.desc}</Text>
                    {isSelected && (
                      <View style={styles.checkmark}>
                        <Ionicons name="checkmark-circle" size={20} color={Colors.accent} />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        );

      case 'background':
        return (
          <View>
            <View style={styles.backgroundGrid}>
              {BACKGROUNDS.map(bg => {
                const isSelected = selectedBackground === bg.id;
                return (
                  <TouchableOpacity
                    key={bg.id}
                    style={[styles.backgroundCard, isSelected && styles.backgroundCardSelected]}
                    onPress={() => setSelectedBackground(bg.id)}
                  >
                    <Ionicons name={bg.icon as any} size={28} color={isSelected ? '#FFFFFF' : Colors.primary} />
                    <Text style={[styles.backgroundLabel, isSelected && styles.backgroundLabelSelected]}>
                      {bg.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Tell us more (optional)</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Tech startup founder interested in AI trends..."
                placeholderTextColor={Colors.textMuted}
                multiline
                numberOfLines={4}
                value={additionalInfo}
                onChangeText={setAdditionalInfo}
              />
            </View>
          </View>
        );

      case 'interests':
        return (
          <View style={styles.interestsContainer}>
            {CATEGORIES.map(category => {
              const isSelected = selectedInterests.includes(category.id);
              return (
                <TouchableOpacity
                  key={category.id}
                  style={[styles.interestChip, isSelected && styles.interestChipSelected]}
                  onPress={() => toggleInterest(category.id)}
                >
                  <Ionicons name={category.icon as any} size={18} color={isSelected ? '#FFFFFF' : Colors.primary} />
                  <Text style={[styles.interestLabel, isSelected && styles.interestLabelSelected]}>
                    {category.label}
                  </Text>
                  {isSelected && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </TouchableOpacity>
              );
            })}
          </View>
        );

      case 'notifications':
        return (
          <View>
            <Text style={styles.notificationDesc}>
              Choose your preferred frequency for intelligent insights
            </Text>
            <View style={styles.notificationGrid}>
              {NOTIFICATION_INTERVALS.map(interval => {
                const isSelected = notificationInterval === interval.value;
                return (
                  <TouchableOpacity
                    key={interval.id}
                    style={[styles.notificationCard, isSelected && styles.notificationCardSelected]}
                    onPress={() => setNotificationInterval(interval.value)}
                  >
                    <Ionicons name={interval.icon as any} size={28} color={isSelected ? '#FFFFFF' : Colors.primary} />
                    <Text style={[styles.notificationLabel, isSelected && styles.notificationLabelSelected]}>
                      {interval.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        {currentStep > 0 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
        )}
        <View style={styles.headerContent}>
          <View style={styles.iconCircle}>
            <Ionicons name={ONBOARDING_STEPS[currentStep].icon as any} size={32} color={Colors.primary} />
          </View>
          <Text style={styles.title}>{ONBOARDING_STEPS[currentStep].title}</Text>
          <Text style={styles.subtitle}>{ONBOARDING_STEPS[currentStep].subtitle}</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderStepContent()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === ONBOARDING_STEPS.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FeatureItem({ icon, text, color }: any) {
  return (
    <View style={styles.featureItem}>
      <View style={[styles.featureIcon, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: Colors.border,
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.primary,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: Colors.surface,
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  welcomeContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 24,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  featureList: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    fontSize: 15,
    color: Colors.textPrimary,
    flex: 1,
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  goalCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryBg,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  goalIconSelected: {
    backgroundColor: Colors.primary,
  },
  goalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  goalLabelSelected: {
    color: Colors.primary,
  },
  goalDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  backgroundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backgroundCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  backgroundCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  backgroundLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 8,
  },
  backgroundLabelSelected: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginTop: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: Colors.border,
    textAlignVertical: 'top',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    gap: 6,
  },
  interestChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  interestLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  interestLabelSelected: {
    color: '#FFFFFF',
  },
  notificationDesc: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
    lineHeight: 22,
  },
  notificationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  notificationCard: {
    width: '48%',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  notificationCardSelected: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  notificationLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 8,
    textAlign: 'center',
  },
  notificationLabelSelected: {
    color: '#FFFFFF',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonDisabled: {
    backgroundColor: Colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
