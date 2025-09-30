import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_INTERVALS = [
  { id: 1, label: 'Every Minute', value: 1 },
  { id: 5, label: 'Every 5 Minutes', value: 5 },
  { id: 15, label: 'Every 15 Minutes', value: 15 },
  { id: 30, label: 'Every 30 Minutes', value: 30 },
  { id: 60, label: 'Every Hour', value: 60 },
  { id: 180, label: 'Every 3 Hours', value: 180 },
];

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationInterval, setNotificationInterval] = useState(60);
  const [userGoals, setUserGoals] = useState<string[]>([]);
  const [userBackground, setUserBackground] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const interval = await AsyncStorage.getItem('notificationInterval');
      const goals = await AsyncStorage.getItem('userGoals');
      const background = await AsyncStorage.getItem('userBackground');
      
      if (interval) setNotificationInterval(parseInt(interval));
      if (goals) setUserGoals(JSON.parse(goals));
      if (background) setUserBackground(background);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const updateNotificationInterval = async (value: number) => {
    setNotificationInterval(value);
    await AsyncStorage.setItem('notificationInterval', String(value));
    
    // Reschedule notifications
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    if (notificationsEnabled) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🧠 New Insights Available',
          body: 'Datinsight has analyzed new patterns and predictions for you',
          sound: true,
        },
        trigger: {
          seconds: value * 60,
          repeats: true,
        },
      });
    }
  };

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    
    if (value) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🧠 New Insights Available',
          body: 'Datinsight has analyzed new patterns and predictions for you',
          sound: true,
        },
        trigger: {
          seconds: notificationInterval * 60,
          repeats: true,
        },
      });
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem('onboardingComplete');
    // You would typically restart the app here or navigate to onboarding
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#0EA5E9', '#A855F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </LinearGradient>

      {/* User Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Profile</Text>
        
        <View style={styles.profileCard}>
          <View style={styles.profileIconContainer}>
            <LinearGradient
              colors={['#0EA5E9', '#A855F7']}
              style={styles.profileIcon}
            >
              <Ionicons name="person" size={32} color="#fff" />
            </LinearGradient>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileLabel}>{userBackground || 'User'}</Text>
            <Text style={styles.profileGoals}>
              {userGoals.length > 0 ? userGoals.join(', ') : 'No goals set'}
            </Text>
          </View>
        </View>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Intelligent Notifications</Text>
        
        <View style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="notifications" size={24} color="#0EA5E9" />
            </View>
            <View>
              <Text style={styles.settingText}>Enable Notifications</Text>
              <Text style={styles.settingDescription}>
                Get insights and pattern alerts
              </Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#D1D5DB', true: '#0EA5E9' }}
            thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        {notificationsEnabled && (
          <View style={styles.intervalSection}>
            <Text style={styles.intervalTitle}>Notification Frequency</Text>
            <Text style={styles.intervalDescription}>
              Choose how often you want to receive insights
            </Text>
            
            <View style={styles.intervalGrid}>
              {NOTIFICATION_INTERVALS.map(interval => (
                <TouchableOpacity
                  key={interval.id}
                  style={[
                    styles.intervalCard,
                    notificationInterval === interval.value && styles.intervalCardActive
                  ]}
                  onPress={() => updateNotificationInterval(interval.value)}
                >
                  {notificationInterval === interval.value && (
                    <View style={styles.intervalCheck}>
                      <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    </View>
                  )}
                  <Text style={[
                    styles.intervalLabel,
                    notificationInterval === interval.value && styles.intervalLabelActive
                  ]}>
                    {interval.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        
        <TouchableOpacity style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="color-palette" size={24} color="#0EA5E9" />
            </View>
            <Text style={styles.settingText}>Theme</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>System</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="language" size={24} color="#0EA5E9" />
            </View>
            <Text style={styles.settingText}>Language</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>English</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </View>
        </TouchableOpacity>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        
        <View style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="information-circle" size={24} color="#0EA5E9" />
            </View>
            <Text style={styles.settingText}>Version</Text>
          </View>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>

        <TouchableOpacity style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="shield-checkmark" size={24} color="#0EA5E9" />
            </View>
            <Text style={styles.settingText}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View style={styles.settingIconContainer}>
              <Ionicons name="document-text" size={24} color="#0EA5E9" />
            </View>
            <Text style={styles.settingText}>Terms of Service</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.dangerButton} onPress={resetOnboarding}>
          <Ionicons name="refresh" size={20} color="#EF4444" />
          <Text style={styles.dangerButtonText}>Reset Personalization</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ for intelligent insights
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
    marginBottom: 8,
  },
  profileIconContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  profileIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textTransform: 'capitalize',
  },
  profileGoals: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  settingDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValue: {
    fontSize: 15,
    color: '#6B7280',
  },
  intervalSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  intervalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  intervalDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  intervalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  intervalCard: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  intervalCardActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#0EA5E9',
  },
  intervalCheck: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  intervalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  intervalLabelActive: {
    color: '#0369A1',
    fontWeight: '600',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
