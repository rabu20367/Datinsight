import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingProps {
  onComplete: () => void;
}

const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to Datinsight',
    subtitle: "Your AI-powered intelligence companion",
    icon: 'sparkles',
  },
  {
    id: 'purpose',
    title: "What's your goal?",
    subtitle: 'Help us understand what matters to you',
    icon: 'target',
  },
  {
    id: 'background',
    title: 'Tell us about yourself',
    subtitle: 'So we can personalize your insights',
    icon: 'person',
  },
  {
    id: 'interests',
    title: 'What interests you?',
    subtitle: 'Select topics you want to follow',
    icon: 'heart',
  },
  {
    id: 'notifications',
    title: 'Stay informed',
    subtitle: 'How often do you want insights?',
    icon: 'notifications',
  },
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
      // Save preferences
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
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };

  const toggleInterest = (interestId: string) => {
    if (selectedInterests.includes(interestId)) {
      setSelectedInterests(selectedInterests.filter(id => id !== interestId));
    } else {
      setSelectedInterests([...selectedInterests, interestId]);
    }
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
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={['#0EA5E9', '#A855F7']}
                style={styles.iconGradient}
              >
                <Ionicons name="sparkles" size={80} color="#fff" />
              </LinearGradient>
            </View>
            <Text style={styles.welcomeText}>
              Get personalized insights that matter to you
            </Text>
            <View style={styles.featureList}>
              <FeatureItem icon="trending-up" text="Deep pattern analysis" />
              <FeatureItem icon="bulb" text="Understand motives & causes" />
              <FeatureItem icon="eye" text="Predict future outcomes" />
              <FeatureItem icon="notifications" text="Real-time intelligent alerts" />
            </View>
          </View>
        );

      case 'purpose':
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.gridContainer}>
              {GOALS.map(goal => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.goalCard,
                    selectedGoals.includes(goal.id) && styles.goalCardSelected
                  ]}
                  onPress={() => toggleGoal(goal.id)}
                >
                  <View style={[
                    styles.goalIconContainer,
                    selectedGoals.includes(goal.id) && styles.goalIconContainerSelected
                  ]}>
                    <Ionicons
                      name={goal.icon as any}
                      size={28}
                      color={selectedGoals.includes(goal.id) ? '#fff' : '#0EA5E9'}
                    />
                  </View>
                  <Text style={[
                    styles.goalLabel,
                    selectedGoals.includes(goal.id) && styles.goalLabelSelected
                  ]}>
                    {goal.label}
                  </Text>
                  <Text style={styles.goalDesc}>{goal.desc}</Text>
                  {selectedGoals.includes(goal.id) && (
                    <View style={styles.checkmark}>
                      <Ionicons name="checkmark-circle" size={24} color="#10B981" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        );

      case 'background':
        return (
          <View>
            <View style={styles.backgroundGrid}>
              {BACKGROUNDS.map(bg => (
                <TouchableOpacity
                  key={bg.id}
                  style={[
                    styles.backgroundCard,
                    selectedBackground === bg.id && styles.backgroundCardSelected
                  ]}
                  onPress={() => setSelectedBackground(bg.id)}
                >
                  <Ionicons
                    name={bg.icon as any}
                    size={32}
                    color={selectedBackground === bg.id ? '#fff' : '#0EA5E9'}
                  />
                  <Text style={[
                    styles.backgroundLabel,
                    selectedBackground === bg.id && styles.backgroundLabelSelected
                  ]}>
                    {bg.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Tell us more (optional)
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., I'm a fintech startup founder interested in AI trends..."
                placeholderTextColor="#9CA3AF"
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
            {CATEGORIES.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.interestChip,
                  selectedInterests.includes(category.id) && styles.interestChipSelected
                ]}
                onPress={() => toggleInterest(category.id)}
              >
                <Ionicons
                  name={category.icon as any}
                  size={20}
                  color={selectedInterests.includes(category.id) ? '#fff' : '#0EA5E9'}
                />
                <Text style={[
                  styles.interestLabel,
                  selectedInterests.includes(category.id) && styles.interestLabelSelected
                ]}>
                  {category.label}
                </Text>
                {selectedInterests.includes(category.id) && (
                  <Ionicons name="checkmark" size={18} color="#fff" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        );

      case 'notifications':
        return (
          <View>
            <Text style={styles.notificationDesc}>
              Choose how frequently you want to receive intelligent insights and pattern alerts
            </Text>
            <View style={styles.notificationGrid}>
              {NOTIFICATION_INTERVALS.map(interval => (
                <TouchableOpacity
                  key={interval.id}
                  style={[
                    styles.notificationCard,
                    notificationInterval === interval.value && styles.notificationCardSelected
                  ]}
                  onPress={() => setNotificationInterval(interval.value)}
                >
                  <Ionicons
                    name={interval.icon as any}
                    size={32}
                    color={notificationInterval === interval.value ? '#fff' : '#0EA5E9'}
                  />
                  <Text style={[
                    styles.notificationLabel,
                    notificationInterval === interval.value && styles.notificationLabelSelected
                  ]}>
                    {interval.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.notificationInfo}>
              <Ionicons name="information-circle" size={20} color="#6B7280" />
              <Text style={styles.notificationInfoText}>
                You can change this anytime in settings
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#F0F9FF', '#F3E8FF']}
      style={styles.container}
    >
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      {/* Header */}
      <View style={styles.header}>
        {currentStep > 0 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#0EA5E9" />
          </TouchableOpacity>
        )}
        <View style={styles.headerContent}>
          <Ionicons
            name={ONBOARDING_STEPS[currentStep].icon as any}
            size={40}
            color="#0EA5E9"
          />
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
          <LinearGradient
            colors={canProceed() ? ['#0EA5E9', '#A855F7'] : ['#D1D5DB', '#D1D5DB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === ONBOARDING_STEPS.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

function FeatureItem({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIconContainer}>
        <Ionicons name={icon as any} size={20} color="#0EA5E9" />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#0EA5E9',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  welcomeContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconGradient: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
  },
  featureList: {
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  goalCardSelected: {
    borderColor: '#0EA5E9',
    backgroundColor: '#F0F9FF',
  },
  goalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalIconContainerSelected: {
    backgroundColor: '#0EA5E9',
  },
  goalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  goalLabelSelected: {
    color: '#0369A1',
  },
  goalDesc: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
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
    marginBottom: 24,
  },
  backgroundCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  backgroundCardSelected: {
    borderColor: '#0EA5E9',
    backgroundColor: '#0EA5E9',
  },
  backgroundLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
  },
  backgroundLabelSelected: {
    color: '#fff',
  },
  inputContainer: {
    marginTop: 8,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlignVertical: 'top',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    gap: 8,
  },
  interestChipSelected: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
  },
  interestLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },
  interestLabelSelected: {
    color: '#fff',
  },
  notificationDesc: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 22,
  },
  notificationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  notificationCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  notificationCardSelected: {
    backgroundColor: '#0EA5E9',
    borderColor: '#0EA5E9',
  },
  notificationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 8,
    textAlign: 'center',
  },
  notificationLabelSelected: {
    color: '#fff',
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    gap: 8,
  },
  notificationInfoText: {
    flex: 1,
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  nextButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  nextButtonDisabled: {
    opacity: 0.5,
    elevation: 0,
    shadowOpacity: 0,
  },
  nextButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

