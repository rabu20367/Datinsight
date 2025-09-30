import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FeedItem, NewsArticle, SocialPost, PodcastEpisode } from '../types';
import { Colors, getTypeColor } from '../theme/colors';

interface LiveActivityBannerProps {
  items: FeedItem[];
}

export default function LiveActivityBanner({ items }: LiveActivityBannerProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
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
  }, [pulseAnim]);

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

  if (items.length === 0) return null;

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
        {items.map((item) => {
          const typeColor = getTypeColor(item.type);
          return (
            <View key={item.id} style={styles.activityCard}>
              <View style={[styles.iconContainer, { backgroundColor: typeColor }]}>
                <Ionicons name={getIcon(item.type) as any} size={14} color="#FFFFFF" />
              </View>
              <Text style={styles.activityText} numberOfLines={2}>
                {getItemTitle(item)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 10,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.accentBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.accent,
    letterSpacing: 0.5,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  activityCard: {
    width: 180,
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textPrimary,
    lineHeight: 17,
    fontWeight: '500',
  },
});
