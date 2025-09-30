const express = require('express');
const cors = require('cors');
const axios = require('axios');
const OpenAI = require('openai').default;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// News API
app.get('/api/news', async (req, res) => {
  try {
    const { category = 'general', country = 'us' } = req.query;

    if (!process.env.NEWS_API_KEY) {
      return res.status(500).json({ error: 'News API key not configured' });
    }

    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: process.env.NEWS_API_KEY,
        category: category.toLowerCase(),
        country,
        pageSize: 20,
      },
    });

    const articles = response.data.articles.map(article => ({
      id: `news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: article.title,
      description: article.description || '',
      url: article.url,
      source: article.source.name,
      author: article.author,
      publishedAt: article.publishedAt,
      imageUrl: article.urlToImage,
      category,
    }));

    res.json({ articles, count: articles.length });
  } catch (error) {
    console.error('News API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch news', details: error.message });
  }
});

// Social Media API (Reddit)
app.get('/api/social', async (req, res) => {
  try {
    const { topic = 'technology' } = req.query;

    const response = await axios.get(
      `https://www.reddit.com/r/${topic}/hot.json`,
      {
        params: { limit: 15 },
        headers: { 'User-Agent': 'Datinsight/1.0' },
      }
    );

    const posts = response.data.data.children
      .filter(child => !child.data.stickied)
      .map(child => ({
        id: `reddit-${child.data.id}`,
        platform: 'reddit',
        content: child.data.title,
        author: child.data.author,
        url: `https://reddit.com${child.data.permalink}`,
        timestamp: new Date(child.data.created_utc * 1000).toISOString(),
        metrics: {
          likes: child.data.ups,
          comments: child.data.num_comments,
        },
      }));

    res.json({ posts, count: posts.length });
  } catch (error) {
    console.error('Social API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch social posts', details: error.message });
  }
});

// Podcast API (iTunes)
app.get('/api/podcasts', async (req, res) => {
  try {
    const { genre = 'technology' } = req.query;

    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term: genre,
        media: 'podcast',
        entity: 'podcastEpisode',
        limit: 15,
      },
    });

    const episodes = response.data.results.map(item => ({
      id: `podcast-${item.trackId}`,
      title: item.trackName || 'Untitled Episode',
      podcast: item.collectionName || 'Unknown Podcast',
      description: item.description || item.shortDescription || '',
      url: item.trackViewUrl,
      audioUrl: item.episodeUrl,
      publishedAt: item.releaseDate,
      duration: item.trackTimeMillis ? Math.floor(item.trackTimeMillis / 1000) : undefined,
      imageUrl: item.artworkUrl600 || item.artworkUrl100,
    }));

    res.json({ episodes, count: episodes.length });
  } catch (error) {
    console.error('Podcast API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch podcasts', details: error.message });
  }
});

// Enhanced AI Analysis API with deep insights
app.post('/api/analyze', async (req, res) => {
  try {
    const { title, content, source, userContext } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const contextInfo = userContext ? `User Context: ${JSON.stringify(userContext)}` : '';

    const prompt = `As an expert intelligence analyst, provide DEEP INSIGHTS for this news/event:

Title: ${title}
Content: ${content || 'No additional content provided'}
Source: ${source}
${contextInfo}

Provide comprehensive analysis in JSON format:

{
  "summary": "2-3 sentence concise summary",
  "deepInsights": {
    "motive": "What are the underlying motives, intentions, or driving forces behind this event?",
    "patterns": "What patterns do you see? Has this happened before? What are the recurring themes?",
    "whyNow": "Why is this happening NOW? What triggered this at this particular moment?",
    "stakeholders": "Who benefits? Who loses? What are the key players and their interests?",
    "hiddenFactors": "What factors aren't immediately obvious but are crucial to understanding this?"
  },
  "predictions": [
    "Immediate outcome (next 24-48 hours)",
    "Short-term consequence (next week)",
    "Medium-term impact (next month)",
    "Long-term implication (next 6-12 months)",
    "Unexpected possibility (wild card scenario)"
  ],
  "whatHappensNext": {
    "mostLikely": "Most probable outcome with reasoning",
    "bestCase": "Best possible scenario",
    "worstCase": "Worst possible scenario",
    "blackSwan": "Unexpected but impactful possibility"
  },
  "actionableInsights": [
    "Insight for the user based on their context (3-5 practical takeaways)"
  ],
  "biasAnalysis": {
    "overall": "left|center|right|mixed",
    "confidence": number (0-1),
    "reasoning": "Brief explanation of detected bias"
  },
  "relatedTrends": [
    "Connected trend 1",
    "Connected trend 2",
    "Connected trend 3"
  ]
}

Be analytical, forward-thinking, and insightful. Focus on WHY and WHAT'S NEXT, not just WHAT happened.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-1106',
      messages: [
        {
          role: 'system',
          content: 'You are an elite intelligence analyst who sees patterns, understands motives, and predicts futures. Provide deep, actionable insights that go beyond surface-level news. Think like a strategic advisor.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 1500,
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');
    res.json(analysis);
  } catch (error) {
    console.error('AI Analysis error:', error.message);
    res.status(500).json({ error: 'Failed to analyze content', details: error.message });
  }
});

// Unified Feed API
app.get('/api/feed', async (req, res) => {
  try {
    const { interests = 'technology' } = req.query;
    const interestList = interests.split(',');
    const baseUrl = `http://localhost:${PORT}`;

    // Fetch from all sources in parallel
    const [newsRes, socialRes, podcastsRes] = await Promise.all([
      axios.get(`${baseUrl}/api/news?category=${interestList[0]}`),
      axios.get(`${baseUrl}/api/social?topic=${interestList[0]}`),
      axios.get(`${baseUrl}/api/podcasts?genre=${interestList[0]}`),
    ]);

    // Combine all items into a unified feed
    const feedItems = [
      ...(newsRes.data.articles || []).map(article => ({
        id: article.id,
        type: 'news',
        data: article,
        timestamp: article.publishedAt,
      })),
      ...(socialRes.data.posts || []).map(post => ({
        id: post.id,
        type: 'social',
        data: post,
        timestamp: post.timestamp,
      })),
      ...(podcastsRes.data.episodes || []).slice(0, 5).map(episode => ({
        id: episode.id,
        type: 'podcast',
        data: episode,
        timestamp: episode.publishedAt,
      })),
    ];

    // Sort by timestamp (most recent first)
    feedItems.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    res.json({ 
      items: feedItems.slice(0, 30),
      count: feedItems.length 
    });
  } catch (error) {
    console.error('Feed API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch feed', details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Datinsight Backend running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});

