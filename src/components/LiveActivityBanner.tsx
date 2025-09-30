import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FeedItem, NewsArticle, SocialPost, PodcastEpisode } from '../types';

interface LiveActivityBannerProps {
  items: FeedItem[];
}

export default function LiveActivityBanner({ items }: LiveActivityBannerProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const getItemTitle = (item: FeedItem) => {
    if (item.type === 'news') return (item.data as NewsArticle).title;
    if (item.type === 'social') return (item.data as SocialPost).content;
    if (item.type === 'podcast') return (item.data as PodcastEpisode).title;
    return '';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'news': return 'newspaper';
      case 'social': return 'chatbubbles';
      case 'podcast': return 'mic';
      default: return 'flash';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.liveIndicator}>
          <Animated.View style={[styles.liveDot, { transform: [{ scale: pulseAnim }] }]} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        <Text style={styles.headerText}>Latest Updates</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {items.map((item, index) => (
          <View key={item.id} style={styles.activityCard}>
            <View style={[styles.iconContainer, { backgroundColor: getIconColor(item.type) }]}>
              <Ionicons name={getIcon(item.type) as any} size={16} color="#fff" />
            </View>
            <Text style={styles.activityText} numberOfLines={2}>
              {getItemTitle(item)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function getIconColor(type: string) {
  switch (type) {
    case 'news': return '#3B82F6';
    case 'social': return '#A855F7';
    case 'podcast': return '#10B981';
    default: return '#6B7280';
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 12,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  liveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#10B981',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  activityCard: {
    width: 200,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityText: {
    flex: 1,
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
  },
});

