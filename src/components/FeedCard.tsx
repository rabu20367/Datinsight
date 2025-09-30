import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { FeedItem, NewsArticle, SocialPost, PodcastEpisode } from '../types';

interface FeedCardProps {
  item: FeedItem;
  onPress: () => void;
}

export default function FeedCard({ item, onPress }: FeedCardProps) {
  const getTitle = () => {
    if (item.type === 'news') return (item.data as NewsArticle).title;
    if (item.type === 'social') return (item.data as SocialPost).content;
    if (item.type === 'podcast') return (item.data as PodcastEpisode).title;
    return '';
  };

  const getSubtitle = () => {
    if (item.type === 'news') return (item.data as NewsArticle).source;
    if (item.type === 'social') return (item.data as SocialPost).author;
    if (item.type === 'podcast') return (item.data as PodcastEpisode).podcast;
    return '';
  };

  const getDescription = () => {
    if (item.type === 'news') return (item.data as NewsArticle).description;
    if (item.type === 'podcast') return (item.data as PodcastEpisode).description;
    return '';
  };

  const getTypeColor = () => {
    switch (item.type) {
      case 'news': return '#3B82F6';
      case 'social': return '#A855F7';
      case 'podcast': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (item.type) {
      case 'news': return 'newspaper';
      case 'social': return 'chatbubbles';
      case 'podcast': return 'mic';
      default: return 'document';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor() }]}>
          <Ionicons name={getTypeIcon()} size={14} color="#fff" />
          <Text style={styles.typeBadgeText}>{item.type.toUpperCase()}</Text>
        </View>
        
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <Text style={styles.title} numberOfLines={2}>
        {getTitle()}
      </Text>
      
      <Text style={styles.subtitle}>{getSubtitle()}</Text>
      
      {getDescription() && (
        <Text style={styles.description} numberOfLines={2}>
          {getDescription()}
        </Text>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.timeContainer}>
          <Ionicons name="time-outline" size={14} color="#6B7280" />
          <Text style={styles.timeText}>
            {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.aiButton}>
          <Ionicons name="sparkles" size={14} color="#A855F7" />
          <Text style={styles.aiButtonText}>AI Analysis</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0EA5E9',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3E8FF',
    borderRadius: 12,
    gap: 4,
  },
  aiButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A855F7',
  },
});

