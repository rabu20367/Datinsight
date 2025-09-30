import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { analyzeContent, getUserProfile } from '../services/api';
import { FeedItem, NewsArticle, SocialPost, PodcastEpisode, AIAnalysis } from '../types';

export default function ArticleDetailScreen({ route, navigation }: any) {
  const { item }: { item: FeedItem } = route.params;
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openInBrowser} style={{ marginRight: 8 }}>
          <Ionicons name="open-outline" size={24} color="#0EA5E9" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const loadAnalysis = async () => {
    try {
      setLoadingAnalysis(true);
      const title = getTitle();
      const content = getContent();
      const source = getSource();
      const userContext = await getUserProfile();
      
      const result = await analyzeContent(title, content, source, userContext);
      setAnalysis(result);
    } catch (error) {
      console.error('Failed to load analysis:', error);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  const getTitle = () => {
    if (item.type === 'news') return (item.data as NewsArticle).title;
    if (item.type === 'social') return (item.data as SocialPost).content;
    if (item.type === 'podcast') return (item.data as PodcastEpisode).title;
    return '';
  };

  const getContent = () => {
    if (item.type === 'news') return (item.data as NewsArticle).description;
    if (item.type === 'social') return (item.data as SocialPost).content;
    if (item.type === 'podcast') return (item.data as PodcastEpisode).description;
    return '';
  };

  const getSource = () => {
    if (item.type === 'news') return (item.data as NewsArticle).source;
    return item.type;
  };

  const getUrl = () => {
    if (item.type === 'news') return (item.data as NewsArticle).url;
    if (item.type === 'social') return (item.data as SocialPost).url;
    if (item.type === 'podcast') return (item.data as PodcastEpisode).url;
    return '';
  };

  const openInBrowser = () => {
    const url = getUrl();
    if (url) {
      Linking.openURL(url);
    }
  };

  const getBiasColor = (bias: string) => {
    switch (bias) {
      case 'left': return '#3B82F6';
      case 'right': return '#EF4444';
      case 'center': return '#10B981';
      case 'mixed': return '#A855F7';
      default: return '#6B7280';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Type Badge */}
      <View style={styles.badgeContainer}>
        <LinearGradient
          colors={getTypeBadgeGradient(item.type)}
          style={styles.badge}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
        </LinearGradient>
        <Text style={styles.timestamp}>
          {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
        </Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{getTitle()}</Text>

      {/* Source */}
      <Text style={styles.source}>{getSource()}</Text>

      {/* Content */}
      <Text style={styles.content}>{getContent()}</Text>

      {/* AI Analysis Button */}
      <TouchableOpacity
        style={styles.analyzeButton}
        onPress={loadAnalysis}
        disabled={loadingAnalysis}
      >
        <LinearGradient
          colors={['#0EA5E9', '#A855F7']}
          style={styles.analyzeButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Ionicons name="sparkles" size={24} color="#fff" />
          <Text style={styles.analyzeButtonText}>
            {loadingAnalysis ? 'Analyzing...' : 'Generate Deep Insights'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Loading State */}
      {loadingAnalysis && (
        <View style={styles.loadingContainer}>
          <LinearGradient
            colors={['#F0F9FF', '#F3E8FF']}
            style={styles.loadingCard}
          >
            <ActivityIndicator size="large" color="#0EA5E9" />
            <Text style={styles.loadingText}>AI is analyzing patterns and motives...</Text>
            <Text style={styles.loadingSubtext}>Uncovering hidden insights</Text>
          </LinearGradient>
        </View>
      )}

      {/* Analysis Results */}
      {analysis && (
        <View style={styles.analysisContainer}>
          {/* Summary */}
          <InsightCard
            icon="document-text"
            title="Summary"
            color="#0EA5E9"
            gradientColors={['#EFF6FF', '#DBEAFE']}
          >
            <Text style={styles.insightText}>{analysis.summary}</Text>
          </InsightCard>

          {/* Deep Insights */}
          {analysis.deepInsights && (
            <>
              <SectionHeader icon="eye" title="Deep Insights" subtitle="Understanding the WHY" />
              
              <DeepInsightItem
                icon="target"
                label="The Motive"
                content={analysis.deepInsights.motive}
                color="#F59E0B"
              />
              
              <DeepInsightItem
                icon="git-network"
                label="Pattern Analysis"
                content={analysis.deepInsights.patterns}
                color="#8B5CF6"
              />
              
              <DeepInsightItem
                icon="time"
                label="Why Now?"
                content={analysis.deepInsights.whyNow}
                color="#EC4899"
              />
              
              <DeepInsightItem
                icon="people"
                label="Stakeholders"
                content={analysis.deepInsights.stakeholders}
                color="#06B6D4"
              />
              
              <DeepInsightItem
                icon="lock-open"
                label="Hidden Factors"
                content={analysis.deepInsights.hiddenFactors}
                color="#10B981"
              />
            </>
          )}

          {/* What Happens Next */}
          {analysis.whatHappensNext && (
            <>
              <SectionHeader icon="trending-up" title="What Happens Next?" subtitle="Future scenarios" />
              
              <ScenarioCard
                icon="checkmark-circle"
                label="Most Likely"
                content={analysis.whatHappensNext.mostLikely}
                color="#10B981"
              />
              
              <ScenarioCard
                icon="arrow-up-circle"
                label="Best Case"
                content={analysis.whatHappensNext.bestCase}
                color="#3B82F6"
              />
              
              <ScenarioCard
                icon="arrow-down-circle"
                label="Worst Case"
                content={analysis.whatHappensNext.worstCase}
                color="#EF4444"
              />
              
              <ScenarioCard
                icon="flash"
                label="Black Swan"
                content={analysis.whatHappensNext.blackSwan}
                color="#A855F7"
              />
            </>
          )}

          {/* Timeline Predictions */}
          {analysis.predictions && analysis.predictions.length > 0 && (
            <>
              <SectionHeader icon="calendar" title="Timeline Predictions" subtitle="What to expect" />
              
              <View style={styles.timelineContainer}>
                {analysis.predictions.map((prediction, idx) => (
                  <TimelineItem
                    key={idx}
                    number={idx + 1}
                    content={prediction}
                    isLast={idx === analysis.predictions.length - 1}
                  />
                ))}
              </View>
            </>
          )}

          {/* Actionable Insights */}
          {analysis.actionableInsights && analysis.actionableInsights.length > 0 && (
            <>
              <SectionHeader icon="bulb" title="For You" subtitle="Personalized insights" />
              
              <LinearGradient
                colors={['#FEF3C7', '#FDE68A']}
                style={styles.actionableCard}
              >
                {analysis.actionableInsights.map((insight, idx) => (
                  <View key={idx} style={styles.actionableItem}>
                    <View style={styles.actionableNumber}>
                      <Text style={styles.actionableNumberText}>{idx + 1}</Text>
                    </View>
                    <Text style={styles.actionableText}>{insight}</Text>
                  </View>
                ))}
              </LinearGradient>
            </>
          )}

          {/* Related Trends */}
          {analysis.relatedTrends && analysis.relatedTrends.length > 0 && (
            <>
              <SectionHeader icon="link" title="Connected Trends" subtitle="The bigger picture" />
              
              <View style={styles.trendsContainer}>
                {analysis.relatedTrends.map((trend, idx) => (
                  <View key={idx} style={styles.trendChip}>
                    <Ionicons name="pulse" size={16} color="#0EA5E9" />
                    <Text style={styles.trendText}>{trend}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Bias Analysis */}
          {analysis.biasAnalysis && (
            <>
              <SectionHeader icon="analytics" title="Bias Analysis" subtitle="Perspective check" />
              
              <View style={styles.biasCard}>
                <View style={styles.biasHeader}>
                  <Text style={styles.biasLabel}>Overall Bias:</Text>
                  <View style={[
                    styles.biasBadge,
                    { backgroundColor: getBiasColor(analysis.biasAnalysis.overall) }
                  ]}>
                    <Text style={styles.biasBadgeText}>
                      {analysis.biasAnalysis.overall.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.biasConfidenceBar}>
                  <View style={[
                    styles.biasConfidenceFill,
                    {
                      width: `${analysis.biasAnalysis.confidence * 100}%`,
                      backgroundColor: getBiasColor(analysis.biasAnalysis.overall)
                    }
                  ]} />
                </View>
                <Text style={styles.biasConfidence}>
                  {Math.round(analysis.biasAnalysis.confidence * 100)}% confidence
                </Text>
                <Text style={styles.biasReasoning}>{analysis.biasAnalysis.reasoning}</Text>
              </View>
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

function SectionHeader({ icon, title, subtitle }: any) {
  return (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={24} color="#0EA5E9" />
      <View style={styles.sectionHeaderText}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

function InsightCard({ icon, title, color, gradientColors, children }: any) {
  return (
    <LinearGradient colors={gradientColors} style={styles.insightCard}>
      <View style={styles.insightHeader}>
        <Ionicons name={icon} size={20} color={color} />
        <Text style={[styles.insightTitle, { color }]}>{title}</Text>
      </View>
      {children}
    </LinearGradient>
  );
}

function DeepInsightItem({ icon, label, content, color }: any) {
  return (
    <View style={styles.deepInsightItem}>
      <View style={[styles.deepInsightIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={styles.deepInsightContent}>
        <Text style={styles.deepInsightLabel}>{label}</Text>
        <Text style={styles.deepInsightText}>{content}</Text>
      </View>
    </View>
  );
}

function ScenarioCard({ icon, label, content, color }: any) {
  return (
    <View style={[styles.scenarioCard, { borderLeftColor: color }]}>
      <View style={styles.scenarioHeader}>
        <Ionicons name={icon} size={20} color={color} />
        <Text style={[styles.scenarioLabel, { color }]}>{label}</Text>
      </View>
      <Text style={styles.scenarioText}>{content}</Text>
    </View>
  );
}

function TimelineItem({ number, content, isLast }: any) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineLeft}>
        <LinearGradient
          colors={['#0EA5E9', '#A855F7']}
          style={styles.timelineNumber}
        >
          <Text style={styles.timelineNumberText}>{number}</Text>
        </LinearGradient>
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.timelineContent}>
        <Text style={styles.timelineText}>{content}</Text>
      </View>
    </View>
  );
}

function getTypeBadgeGradient(type: string) {
  switch (type) {
    case 'news': return ['#3B82F6', '#2563EB'];
    case 'social': return ['#A855F7', '#9333EA'];
    case 'podcast': return ['#10B981', '#059669'];
    default: return ['#6B7280', '#4B5563'];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  timestamp: {
    fontSize: 14,
    color: '#6B7280',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    paddingHorizontal: 16,
    marginBottom: 12,
    lineHeight: 34,
  },
  source: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0EA5E9',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: '#374151',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  analyzeButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  analyzeButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  loadingContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  loadingCard: {
    alignItems: 'center',
    padding: 32,
    borderRadius: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  loadingSubtext: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  analysisContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    gap: 12,
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  insightCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  insightText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
  },
  deepInsightItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    gap: 16,
  },
  deepInsightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deepInsightContent: {
    flex: 1,
  },
  deepInsightLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  deepInsightText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  scenarioCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  scenarioLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  scenarioText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  timelineContainer: {
    paddingVertical: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  timelineNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 4,
  },
  timelineText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
  },
  actionableCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  actionableItem: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  actionableNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionableNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  actionableText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 24,
    color: '#78350F',
    fontWeight: '500',
  },
  trendsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  trendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0369A1',
  },
  biasCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
  },
  biasHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  biasLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
  },
  biasBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  biasBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  biasConfidenceBar: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  biasConfidenceFill: {
    height: 8,
    borderRadius: 4,
  },
  biasConfidence: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 12,
  },
  biasReasoning: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
});
