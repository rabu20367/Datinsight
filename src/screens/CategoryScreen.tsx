import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../components/Logo';
import { CATEGORIES, Category } from '../types';
import { Colors } from '../theme/colors';

const CATEGORY_ICONS: Record<Category, keyof typeof Ionicons.glyphMap> = {
  'Technology': 'hardware-chip',
  'Politics': 'analytics',
  'Business': 'business',
  'Science': 'flask',
  'Health': 'fitness',
  'Entertainment': 'film',
  'Sports': 'basketball',
};

export default function CategoryScreen() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(['Technology']);

  const toggleCategory = async (category: Category) => {
    let newCategories: Category[];
    
    if (selectedCategories.includes(category)) {
      newCategories = selectedCategories.filter(c => c !== category);
    } else {
      newCategories = [...selectedCategories, category];
    }
    
    setSelectedCategories(newCategories);
    await AsyncStorage.setItem('selectedCategories', JSON.stringify(newCategories));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size="small" showText={false} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Your Interests</Text>
          <Text style={styles.headerSubtitle}>
            Select topics to personalize your feed
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {CATEGORIES.map((category, index) => {
          const isSelected = selectedCategories.includes(category);
          const colors = [Colors.primary, Colors.accent, Colors.tertiary];
          const iconColor = colors[index % 3];
          
          return (
            <TouchableOpacity
              key={category}
              style={[styles.categoryCard, isSelected && styles.categoryCardActive]}
              onPress={() => toggleCategory(category)}
            >
              <View style={[styles.iconContainer, { backgroundColor: iconColor + '15' }]}>
                <Ionicons
                  name={CATEGORY_ICONS[category]}
                  size={24}
                  color={iconColor}
                />
              </View>
              
              <View style={styles.categoryText}>
                <Text style={[styles.categoryTitle, isSelected && { color: Colors.primary }]}>
                  {category}
                </Text>
                <Text style={styles.categoryDescription}>
                  Latest {category.toLowerCase()} insights
                </Text>
              </View>

              {isSelected && (
                <Ionicons name="checkmark-circle" size={24} color={Colors.accent} />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {selectedCategories.length} {selectedCategories.length === 1 ? 'interest' : 'interests'} selected
        </Text>
      </View>
    </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  categoryCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryBg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  footer: {
    padding: 20,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
