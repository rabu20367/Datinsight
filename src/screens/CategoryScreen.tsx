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
import { CATEGORIES, Category } from '../types';

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
        <Text style={styles.headerTitle}>Interests</Text>
        <Text style={styles.headerSubtitle}>
          Select topics you want to follow
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {CATEGORIES.map(category => {
          const isSelected = selectedCategories.includes(category);
          
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryCard,
                isSelected && styles.categoryCardActive
              ]}
              onPress={() => toggleCategory(category)}
            >
              <View style={styles.categoryContent}>
                <View style={[
                  styles.iconContainer,
                  isSelected && styles.iconContainerActive
                ]}>
                  <Ionicons
                    name={CATEGORY_ICONS[category]}
                    size={28}
                    color={isSelected ? '#fff' : '#0EA5E9'}
                  />
                </View>
                
                <View style={styles.categoryText}>
                  <Text style={[
                    styles.categoryTitle,
                    isSelected && styles.categoryTitleActive
                  ]}>
                    {category}
                  </Text>
                  <Text style={styles.categoryDescription}>
                    Latest {category.toLowerCase()} news and trends
                  </Text>
                </View>
              </View>

              {isSelected && (
                <Ionicons name="checkmark-circle" size={24} color="#10B981" />
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
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardActive: {
    borderColor: '#0EA5E9',
    backgroundColor: '#F0F9FF',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconContainerActive: {
    backgroundColor: '#0EA5E9',
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  categoryTitleActive: {
    color: '#0369A1',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});

