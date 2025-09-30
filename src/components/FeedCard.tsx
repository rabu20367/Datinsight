import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { FeedItem, NewsArticle, SocialPost, PodcastEpisode } from '../types';
import { Colors, getTypeColor } from '../theme/colors';

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

  const typeColor = getTypeColor(item.type);

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
      {/* Header with colored left border */}
      <View style={[styles.colorBar, { backgroundColor: typeColor }]} />
      
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={[styles.typeIcon, { backgroundColor: typeColor + '15' }]}>
            <Ionicons name={getTypeIcon()} size={16} color={typeColor} />
          </View>
          <Text style={[styles.typeText, { color: typeColor }]}>
            {item.type.toUpperCase()}
          </Text>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={20} color={Colors.textMuted} />
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
            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.timeText}>
              {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
            </Text>
          </View>
          
          <View style={styles.aiIndicator}>
            <Ionicons name="sparkles" size={14} color={Colors.tertiary} />
            <Text style={styles.aiText}>AI Ready</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  colorBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  cardContent: {
    padding: 16,
    paddingLeft: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  typeIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 6,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  aiIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Colors.tertiaryBg,
    borderRadius: 10,
    gap: 4,
  },
  aiText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.tertiary,
  },
});
