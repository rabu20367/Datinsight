import axios from 'axios';
import Constants from 'expo-constants';
import { FeedItem, AIAnalysis } from '../types';
import { mockFeedItems, mockAnalysis, mockUserProfile } from './mockData';

// Update this to your backend URL
// For local development: http://localhost:3000
// For production: https://your-backend-url.com
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'
  : 'https://your-production-api.com/api';

// Enable mock data for Expo Snack or when backend is unavailable
const USE_MOCK_DATA = true; // Set to false when backend is ready

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function fetchFeed(interests: string[]): Promise<FeedItem[]> {
  // Return mock data for demo
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('📱 Using mock feed data for demo');
        resolve(mockFeedItems);
      }, 800);
    });
  }

  try {
    const response = await api.get('/feed', {
      params: { interests: interests.join(',') },
    });
    return response.data.items || [];
  } catch (error: any) {
    console.error('Failed to fetch feed:', error.message);
    // Fallback to mock data if API fails
    return mockFeedItems;
  }
}

export async function fetchNews(category: string = 'technology') {
  // Return mock data for demo
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => {
        const newsItems = mockFeedItems.filter(item => item.type === 'news');
        resolve(newsItems.map(item => item.data));
      }, 500);
    });
  }

  try {
    const response = await api.get('/news', {
      params: { category },
    });
    return response.data.articles || [];
  } catch (error: any) {
    console.error('Failed to fetch news:', error.message);
    return [];
  }
}

export async function fetchSocialPosts(topic: string = 'technology') {
  // Return mock data for demo
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => {
        const socialItems = mockFeedItems.filter(item => item.type === 'social');
        resolve(socialItems.map(item => item.data));
      }, 500);
    });
  }

  try {
    const response = await api.get('/social', {
      params: { topic },
    });
    return response.data.posts || [];
  } catch (error: any) {
    console.error('Failed to fetch social posts:', error.message);
    return [];
  }
}

export async function fetchPodcasts(genre: string = 'technology') {
  // Return mock data for demo
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => {
        const podcastItems = mockFeedItems.filter(item => item.type === 'podcast');
        resolve(podcastItems.map(item => item.data));
      }, 500);
    });
  }

  try {
    const response = await api.get('/podcasts', {
      params: { genre },
    });
    return response.data.episodes || [];
  } catch (error: any) {
    console.error('Failed to fetch podcasts:', error.message);
    return [];
  }
}

export async function analyzeContent(
  title: string,
  content: string,
  source: string,
  userContext?: any
): Promise<AIAnalysis> {
  // Return mock data for demo
  if (USE_MOCK_DATA) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('🧠 Using mock AI analysis for demo');
        resolve(mockAnalysis);
      }, 2000); // Simulate AI processing time
    });
  }

  try {
    const response = await api.post('/analyze', {
      title,
      content,
      source,
      userContext,
    });
    return response.data;
  } catch (error: any) {
    console.error('Failed to analyze content:', error.message);
    // Fallback to mock data if API fails
    return mockAnalysis;
  }
}

export async function getUserProfile(): Promise<any> {
  // Return mock profile for demo
  if (USE_MOCK_DATA) {
    return mockUserProfile;
  }

  try {
    const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
    const goals = await AsyncStorage.getItem('userGoals');
    const background = await AsyncStorage.getItem('userBackground');
    const interests = await AsyncStorage.getItem('userInterests');
    const additionalInfo = await AsyncStorage.getItem('additionalInfo');
    
    return {
      goals: goals ? JSON.parse(goals) : [],
      background: background || '',
      interests: interests ? JSON.parse(interests) : [],
      additionalInfo: additionalInfo || '',
    };
  } catch (error) {
    return mockUserProfile;
  }
}

