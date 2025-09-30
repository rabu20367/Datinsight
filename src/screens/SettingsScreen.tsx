import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import Logo from '../components/Logo';
import { Colors } from '../theme/colors';

const NOTIFICATION_INTERVALS = [
  { id: 1, label: 'Every Minute', value: 1 },
  { id: 5, label: 'Every 5 Min', value: 5 },
  { id: 15, label: 'Every 15 Min', value: 15 },
  { id: 30, label: 'Every 30 Min', value: 30 },
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
    
    await Notifications.cancelAllScheduledNotificationsAsync();
    
    if (notificationsEnabled) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🧠 New Insights Available',
          body: 'Datinsight has analyzed new patterns for you',
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
          body: 'Datinsight has analyzed new patterns for you',
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
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Logo size="small" showText={false} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Manage your preferences</Text>
        </View>
      </View>

      {/* Profile */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PROFILE</Text>
        
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <Ionicons name="person" size={28} color={Colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userBackground || 'User'}</Text>
            <Text style={styles.profileGoals}>
              {userGoals.length > 0 ? userGoals.join(' • ') : 'No goals set'}
            </Text>
          </View>
        </View>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        
        <View style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: Colors.accentBg }]}>
              <Ionicons name="notifications" size={22} color={Colors.accent} />
            </View>
            <View>
              <Text style={styles.settingText}>Smart Alerts</Text>
              <Text style={styles.settingDescription}>
                Intelligent insights delivery
              </Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: Colors.border, true: Colors.primary }}
            thumbColor={'#FFFFFF'}
          />
        </View>

        {notificationsEnabled && (
          <View style={styles.intervalSection}>
            <Text style={styles.intervalTitle}>Delivery Frequency</Text>
            
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
                      <Ionicons name="checkmark-circle" size={18} color={Colors.accent} />
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

      {/* App */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>APP</Text>
        
        <View style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: Colors.tertiaryBg }]}>
              <Ionicons name="color-palette" size={22} color={Colors.tertiary} />
            </View>
            <Text style={styles.settingText}>Theme</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.settingValue}>System</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </View>
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingLeft}>
            <View style={[styles.settingIcon, { backgroundColor: Colors.primaryBg }]}>
              <Ionicons name="information-circle" size={22} color={Colors.primary} />
            </View>
            <Text style={styles.settingText}>Version</Text>
          </View>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.resetButton} onPress={resetOnboarding}>
          <Ionicons name="refresh" size={18} color={Colors.accent} />
          <Text style={styles.resetButtonText}>Reset Personalization</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with intelligence
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  profileIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    textTransform: 'capitalize',
    marginBottom: 2,
  },
  profileGoals: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  settingDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingValue: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  intervalSection: {
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  intervalTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  intervalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  intervalCard: {
    width: '48%',
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    position: 'relative',
  },
  intervalCardActive: {
    backgroundColor: Colors.primaryBg,
    borderColor: Colors.primary,
  },
  intervalCheck: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  intervalLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  intervalLabelActive: {
    color: Colors.primary,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.accent + '30',
  },
  resetButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.accent,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
});
