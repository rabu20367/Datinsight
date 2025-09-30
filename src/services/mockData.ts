// Mock data for Expo Snack demo (when backend is not available)

export const mockFeedItems = [
  {
    id: 'news-1',
    type: 'news' as const,
    data: {
      id: 'news-1',
      title: 'AI Revolution: GPT-5 Breakthrough Changes Everything',
      description: 'OpenAI unveils next-generation AI with unprecedented reasoning capabilities. The model demonstrates human-level understanding across multiple domains, raising questions about the future of work and creativity.',
      url: 'https://example.com/ai-breakthrough',
      source: 'Tech Daily',
      author: 'Sarah Chen',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://via.placeholder.com/400x200/0EA5E9/ffffff?text=AI+Breakthrough',
      category: 'technology'
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'news-2',
    type: 'news' as const,
    data: {
      id: 'news-2',
      title: 'Climate Summit Reaches Historic Agreement on Carbon Neutrality',
      description: '195 countries commit to binding carbon neutrality targets by 2040. Major breakthrough in international cooperation on climate change, with unprecedented enforcement mechanisms.',
      url: 'https://example.com/climate-summit',
      source: 'World News Network',
      author: 'Michael Rodriguez',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://via.placeholder.com/400x200/10B981/ffffff?text=Climate+Summit',
      category: 'politics'
    },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'social-1',
    type: 'social' as const,
    data: {
      id: 'social-1',
      platform: 'reddit' as const,
      content: 'Major tech companies are quietly shifting their entire AI strategy. Nobody is talking about this but it will change everything in 6 months.',
      author: 'tech_insider_99',
      url: 'https://reddit.com/r/technology/comments/example',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      metrics: {
        likes: 12400,
        comments: 856,
      }
    },
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'podcast-1',
    type: 'podcast' as const,
    data: {
      id: 'podcast-1',
      title: 'The Future of Remote Work: 2025 Predictions',
      podcast: 'Tech Trends Weekly',
      description: 'Industry leaders discuss how AI, VR, and new collaboration tools are reshaping the workplace. Insights on which jobs will thrive in distributed environments.',
      url: 'https://example.com/podcast/remote-work',
      audioUrl: 'https://example.com/audio/episode-123.mp3',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      duration: 2847,
      imageUrl: 'https://via.placeholder.com/400x400/A855F7/ffffff?text=Podcast'
    },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'news-3',
    type: 'news' as const,
    data: {
      id: 'news-3',
      title: 'Quantum Computing Achieves Major Milestone in Drug Discovery',
      description: 'Researchers use quantum algorithms to simulate complex molecular interactions, potentially accelerating drug development by years. Pharmaceutical industry takes notice.',
      url: 'https://example.com/quantum-breakthrough',
      source: 'Science Today',
      author: 'Dr. Emily Watson',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      imageUrl: 'https://via.placeholder.com/400x200/8B5CF6/ffffff?text=Quantum+Computing',
      category: 'science'
    },
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'social-2',
    type: 'social' as const,
    data: {
      id: 'social-2',
      platform: 'reddit' as const,
      content: 'As a VC, I can confirm: the next wave of unicorns will all be AI+Industry combinations. Healthcare AI, Education AI, Legal AI. Traditional SaaS is dead.',
      author: 'silicon_valley_vc',
      url: 'https://reddit.com/r/startups/comments/example2',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      metrics: {
        likes: 8920,
        comments: 542,
      }
    },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
];

export const mockAnalysis = {
  summary: "This represents a pivotal moment in AI development, marking the transition from narrow AI capabilities to more general reasoning systems. The implications span across industries, from healthcare to creative fields, with both opportunities and challenges emerging.",
  deepInsights: {
    motive: "Tech companies are racing to establish dominance in the AI market before regulatory frameworks solidify. The first-mover advantage in this space is enormous - whoever sets the standards controls the ecosystem. Additionally, there's pressure from investors who've poured billions into AI, expecting revolutionary returns.",
    patterns: "This mirrors the smartphone revolution of 2007-2010. Early skepticism, followed by rapid adoption, then complete market transformation. We're seeing the same cycle: denial ('it's just a toy'), curiosity ('let me try it'), dependency ('I can't work without it'), and finally ubiquity. Historical data shows 18-24 month adoption curves for transformative technology.",
    whyNow: "Three converging factors made this possible: (1) Breakthrough in training efficiency reduced costs by 90%, (2) Hardware maturity with specialized AI chips reaching critical performance, (3) Data availability hitting critical mass. Additionally, COVID-19 accelerated digital transformation, creating market urgency. The timing is strategic - launch before competitors and before heavy regulation.",
    stakeholders: "Winners: Tech giants (platform control), AI-native startups (market opportunities), early adopters (competitive advantage), cloud providers (infrastructure demand). Losers: Traditional software companies (legacy tech), workers in routine cognitive tasks (automation risk), smaller competitors (can't match R&D). Wildcard: Regulatory bodies may become power brokers, content creators face uncertain IP landscape.",
    hiddenFactors: "Energy consumption is massive but rarely discussed - training these models uses city-level electricity. Data provenance questions linger - whose data trained this? Privacy implications of processing personal information at scale. Geopolitical tensions around AI sovereignty. The 'alignment problem' - ensuring AI goals match human values. Market concentration risks - only a few companies can afford to compete at this level."
  },
  predictions: [
    "Immediate (24-48h): Stock market reacts strongly - AI company valuations surge 10-15%, traditional tech sees pressure. Social media buzzes with demos. Early adopters start testing.",
    "Short-term (Next Week): Competitors scramble to announce their versions. Enterprise clients begin pilot programs. Developer ecosystem explodes with new tools and applications. Media scrutiny intensifies on risks and benefits.",
    "Medium-term (Next Month): First real-world deployments in enterprise. Regulatory discussions heat up in US, EU, China. Academic papers analyzing capabilities flood journals. Job market shifts begin - new roles emerge, traditional roles adapt.",
    "Long-term (6-12 months): Widespread adoption across industries fundamentally changes workflows. New business models emerge. Education systems scramble to adapt. Regulatory frameworks take shape. Market consolidation begins.",
    "Wild Card: Unexpected capability emerges that nobody predicted (like ChatGPT's coding ability). Or: Major failure/controversy causes temporary setback and regulatory crackdown. Or: Competitor achieves breakthrough making this obsolete."
  ],
  whatHappensNext: {
    mostLikely: "Gradual but accelerating adoption over 18 months. Initial focus on enterprise and professional tools, then consumer applications. Growing pains around reliability, bias, and misuse. Eventually becomes infrastructure - invisible but essential. Price drops 40-60% as competition increases and efficiency improves.",
    bestCase: "Revolutionary productivity gains transform entire industries. Healthcare breakthroughs accelerate by decades. Education becomes truly personalized. Creative tools democratize professional-level work. Economic growth surge as AI augments human capabilities. New jobs emerge faster than old ones disappear. Humanity enters new era of abundance and innovation.",
    worstCase: "Rapid job displacement outpaces retraining and social safety nets. Market concentration creates monopolistic behavior. Misinformation and manipulation scale exponentially. Privacy erodes as AI systems require massive data. Cybersecurity threats multiply. Wealth inequality accelerates. Social unrest grows. Regulatory backlash stifles innovation without solving core problems.",
    blackSwan: "AI achieves unexpected breakthrough in reasoning that wasn't anticipated (AGI earlier than predicted). Or: Critical vulnerability discovered that undermines trust. Or: Geopolitical event (war, embargo) disrupts AI supply chains. Or: Quantum computing suddenly makes current AI obsolete. Or: Biological enhancement competes with AI augmentation."
  },
  actionableInsights: [
    "For Entrepreneurs: Start building on this platform NOW - early ecosystem players capture disproportionate value. Consider AI+traditional industry combinations. Focus on problems that newly became solvable.",
    "For Professionals: Upskill in AI collaboration - learn to work alongside AI tools. Emphasize uniquely human skills (creativity, emotional intelligence, strategic thinking). Document your expertise to train custom models.",
    "For Investors: Diversify across AI value chain - chips, platforms, applications, infrastructure. Watch for AI+X plays (Healthcare AI, Legal AI, Education AI). Short companies slow to adapt. Consider regulatory winners.",
    "For Students: Focus on prompt engineering, AI system design, AI ethics. Traditional CS skills still valuable but application changes. Cross-disciplinary knowledge becomes more valuable (AI+Biology, AI+Psychology).",
    "For Everyone: Stay informed but skeptical. Experiment hands-on to understand capabilities and limitations. Consider privacy implications of AI tools. Prepare for rapid change in work and society."
  ],
  biasAnalysis: {
    overall: 'mixed' as const,
    confidence: 0.72,
    reasoning: "Source shows slight optimistic bias toward technology adoption, common in tech-focused publications. Some underreporting of risks and challenges. Limited critical analysis of market concentration and power dynamics. Minimal discussion of environmental costs. However, maintains factual accuracy and includes multiple perspectives."
  },
  relatedTrends: [
    "Quantum Computing Advances",
    "Edge AI Deployment",
    "AI Regulation Debates (EU AI Act, US Framework)",
    "Semiconductor Supply Chain Shifts",
    "Remote Work Evolution",
    "Creator Economy Transformation",
    "Healthcare AI Revolution",
    "Education Technology Disruption"
  ]
};

export const mockUserProfile = {
  goals: ['business', 'career'],
  background: 'entrepreneur',
  interests: ['technology', 'business'],
  additionalInfo: 'Tech startup founder interested in AI applications',
  notificationInterval: 60
};

