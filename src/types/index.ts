export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  author?: string;
  publishedAt: string;
  imageUrl?: string;
  category?: string;
}

export interface SocialPost {
  id: string;
  platform: 'twitter' | 'reddit';
  content: string;
  author: string;
  url: string;
  timestamp: string;
  metrics: {
    likes?: number;
    shares?: number;
    comments?: number;
  };
}

export interface PodcastEpisode {
  id: string;
  title: string;
  podcast: string;
  description: string;
  url: string;
  audioUrl?: string;
  publishedAt: string;
  duration?: number;
  imageUrl?: string;
}

export interface AIAnalysis {
  summary: string;
  deepInsights?: {
    motive: string;
    patterns: string;
    whyNow: string;
    stakeholders: string;
    hiddenFactors: string;
  };
  predictions: string[];
  whatHappensNext?: {
    mostLikely: string;
    bestCase: string;
    worstCase: string;
    blackSwan: string;
  };
  actionableInsights?: string[];
  biasAnalysis?: {
    overall: 'left' | 'center' | 'right' | 'mixed';
    confidence: number;
    reasoning: string;
  };
  relatedTrends?: string[];
}

export interface UserProfile {
  goals: string[];
  background: string;
  interests: string[];
  notificationInterval: number;
  additionalInfo?: string;
}

export interface FeedItem {
  id: string;
  type: 'news' | 'social' | 'podcast';
  data: NewsArticle | SocialPost | PodcastEpisode;
  analysis?: AIAnalysis;
  timestamp: string;
}

export const CATEGORIES = [
  'Technology',
  'Politics',
  'Business',
  'Science',
  'Health',
  'Entertainment',
  'Sports',
] as const;

export type Category = typeof CATEGORIES[number];

