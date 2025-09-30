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
import { Ionicons } from '@expo/vector-icons';
import { formatDistanceToNow } from 'date-fns';
import { analyzeContent, getUserProfile } from '../services/api';
import { FeedItem, NewsArticle, SocialPost, PodcastEpisode, AIAnalysis } from '../types';
import { Colors, getTypeColor, getBiasColor } from '../theme/colors';

export default function ArticleDetailScreen({ route, navigation }: any) {
  const { item }: { item: FeedItem } = route.params;
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openInBrowser} style={{ marginRight: 8 }}>
          <Ionicons name="open-outline" size={24} color={Colors.primary} />
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
    if (url) Linking.openURL(url);
  };

  const typeColor = getTypeColor(item.type);

  return (
    <ScrollView style={styles.container}>
      {/* Type Badge */}
      <View style={styles.badgeContainer}>
        <View style={[styles.badge, { backgroundColor: typeColor }]}>
          <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
        </View>
        <Text style={styles.timestamp}>
          {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
        </Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{getTitle()}</Text>

      {/* Source */}
      <Text style={[styles.source, { color: typeColor }]}>{getSource()}</Text>

      {/* Content */}
      <Text style={styles.content}>{getContent()}</Text>

      {/* AI Analysis Button */}
      <TouchableOpacity
        style={[styles.analyzeButton, { backgroundColor: Colors.primary }]}
        onPress={loadAnalysis}
        disabled={loadingAnalysis}
      >
        <Ionicons name="sparkles" size={20} color="#FFFFFF" />
        <Text style={styles.analyzeButtonText}>
          {loadingAnalysis ? 'Analyzing...' : 'Generate Deep Insights'}
        </Text>
      </TouchableOpacity>

      {/* Loading State */}
      {loadingAnalysis && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>AI is analyzing patterns...</Text>
        </View>
      )}

      {/* Analysis Results */}
      {analysis && (
        <View style={styles.analysisContainer}>
          {/* Summary */}
          <InsightSection icon="document-text" title="Summary" color={Colors.primary}>
            <Text style={styles.insightText}>{analysis.summary}</Text>
          </InsightSection>

          {/* Deep Insights */}
          {analysis.deepInsights && (
            <>
              <SectionHeader icon="eye" title="Deep Insights" subtitle="Understanding the WHY" />
              
              <DeepInsightCard
                icon="target"
                label="The Motive"
                content={analysis.deepInsights.motive}
                color={Colors.accent}
              />
              
              <DeepInsightCard
                icon="git-network"
                label="Pattern Analysis"
                content={analysis.deepInsights.patterns}
                color={Colors.primary}
              />
              
              <DeepInsightCard
                icon="time"
                label="Why Now?"
                content={analysis.deepInsights.whyNow}
                color={Colors.tertiary}
              />
              
              <DeepInsightCard
                icon="people"
                label="Stakeholders"
                content={analysis.deepInsights.stakeholders}
                color={Colors.primary}
              />
              
              <DeepInsightCard
                icon="lock-open"
                label="Hidden Factors"
                content={analysis.deepInsights.hiddenFactors}
                color={Colors.accent}
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
                color={Colors.primary}
              />
              
              <ScenarioCard
                icon="arrow-up-circle"
                label="Best Case"
                content={analysis.whatHappensNext.bestCase}
                color={Colors.tertiary}
              />
              
              <ScenarioCard
                icon="arrow-down-circle"
                label="Worst Case"
                content={analysis.whatHappensNext.worstCase}
                color={Colors.accent}
              />
              
              <ScenarioCard
                icon="flash"
                label="Black Swan"
                content={analysis.whatHappensNext.blackSwan}
                color={Colors.textSecondary}
              />
            </>
          )}

          {/* Timeline */}
          {analysis.predictions && analysis.predictions.length > 0 && (
            <>
              <SectionHeader icon="calendar" title="Timeline" subtitle="Predictions over time" />
              
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

          {/* Personalized Insights */}
          {analysis.actionableInsights && analysis.actionableInsights.length > 0 && (
            <>
              <SectionHeader icon="person" title="For You" subtitle="Personalized recommendations" />
              
              <View style={styles.personalCard}>
                {analysis.actionableInsights.map((insight, idx) => (
                  <View key={idx} style={styles.personalItem}>
                    <View style={styles.personalNumber}>
                      <Text style={styles.personalNumberText}>{idx + 1}</Text>
                    </View>
                    <Text style={styles.personalText}>{insight}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* Connected Trends */}
          {analysis.relatedTrends && analysis.relatedTrends.length > 0 && (
            <>
              <SectionHeader icon="link" title="Connected Trends" subtitle="Related patterns" />
              
              <View style={styles.trendsContainer}>
                {analysis.relatedTrends.map((trend, idx) => (
                  <View key={idx} style={styles.trendChip}>
                    <Ionicons name="pulse" size={14} color={Colors.primary} />
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
                <View style={styles.biasRow}>
                  <Text style={styles.biasLabel}>Overall Bias:</Text>
                  <View style={[styles.biasBadge, { backgroundColor: getBiasColor(analysis.biasAnalysis.overall) }]}>
                    <Text style={styles.biasBadgeText}>
                      {analysis.biasAnalysis.overall.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.biasProgressBar}>
                  <View style={[
                    styles.biasProgress,
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
      <View style={styles.sectionIconCircle}>
        <Ionicons name={icon} size={20} color={Colors.primary} />
      </View>
      <View style={styles.sectionHeaderText}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

function InsightSection({ icon, title, color, children }: any) {
  return (
    <View style={styles.insightCard}>
      <View style={styles.insightHeader}>
        <Ionicons name={icon} size={18} color={color} />
        <Text style={[styles.insightTitle, { color }]}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function DeepInsightCard({ icon, label, content, color }: any) {
  return (
    <View style={styles.deepCard}>
      <View style={[styles.deepIcon, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View style={styles.deepContent}>
        <Text style={styles.deepLabel}>{label}</Text>
        <Text style={styles.deepText}>{content}</Text>
      </View>
    </View>
  );
}

function ScenarioCard({ icon, label, content, color }: any) {
  return (
    <View style={[styles.scenarioCard, { borderLeftColor: color, borderLeftWidth: 3 }]}>
      <View style={styles.scenarioHeader}>
        <Ionicons name={icon} size={18} color={color} />
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
        <View style={styles.timelineCircle}>
          <Text style={styles.timelineNumber}>{number}</Text>
        </View>
        {!isLast && <View style={styles.timelineLine} />}
      </View>
      <View style={styles.timelineRight}>
        <Text style={styles.timelineText}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.surface,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timestamp: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 10,
    lineHeight: 32,
  },
  source: {
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  analyzeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  analysisContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
    gap: 12,
  },
  sectionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  insightCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  insightTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  insightText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  deepCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  deepIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deepContent: {
    flex: 1,
  },
  deepLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  deepText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  scenarioCard: {
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  scenarioLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
  scenarioText: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textSecondary,
  },
  timelineContainer: {
    paddingVertical: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 12,
  },
  timelineCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineNumber: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: Colors.border,
    marginTop: 4,
  },
  timelineRight: {
    flex: 1,
    paddingTop: 2,
  },
  timelineText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  personalCard: {
    backgroundColor: Colors.tertiaryBg,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.tertiary + '30',
  },
  personalItem: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 10,
  },
  personalNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  personalText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  trendsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trendChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  biasCard: {
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  biasRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  biasLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  biasBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  biasBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  biasProgressBar: {
    height: 6,
    backgroundColor: Colors.background,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  biasProgress: {
    height: 6,
    borderRadius: 3,
  },
  biasConfidence: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 10,
    fontWeight: '600',
  },
  biasReasoning: {
    fontSize: 13,
    lineHeight: 20,
    color: Colors.textPrimary,
  },
});
