# Datinsight 🌊

**Real-Time Data Intelligence for iOS & Android**

Datinsight is a mobile-first application that aggregates, analyzes, and predicts trends from real-time data sources including news, social media, and podcasts. Powered by AI, it provides intelligent summaries, future predictions, and bias analysis for comprehensive understanding of current events.

## ✨ Features

### 📱 Mobile-First Design
- Native iOS and Android apps built with React Native & Expo
- Smooth, native animations and gestures
- Push notifications for breaking news
- Offline support (coming soon)

### 🔄 Real-Time Aggregated Feed
- Unified feed merging content from news, social media (Reddit), and podcasts
- Personalized content based on user interests
- Live Activity Banner for glanceable updates
- Pull-to-refresh for instant updates

### 🤖 AI-Powered Analysis
- **Smart Summaries**: Concise AI-generated briefings
- **"What's Next?" Predictions**: 3-5 plausible future scenarios
- **Bias Analysis**: Political perspective analysis (left/center/right/mixed)
- **Data-Driven Insights**: Analytical predictions, not guarantees

### 🎯 User Personalization
- 7 interest categories: Technology, Politics, Business, Science, Health, Entertainment, Sports
- Filter by content type (News, Social, Podcasts)
- Bookmark functionality
- Customizable notifications

### 🎨 Modern UI/UX
- Clean, card-based layout
- Native iOS and Android design patterns
- Smooth animations
- Dark mode support
- Responsive to all screen sizes

## 🚀 Tech Stack

- **Mobile**: React Native + Expo
- **Navigation**: React Navigation
- **Backend**: Node.js + Express
- **AI**: OpenAI GPT-3.5
- **APIs**: NewsAPI, Reddit, iTunes/Apple Podcasts
- **State**: React Hooks + AsyncStorage
- **Animations**: React Native Reanimated

## 📋 Prerequisites

- Node.js 18+
- iOS: macOS with Xcode (for iOS development)
- Android: Android Studio (for Android development)
- Expo CLI
- API Keys:
  - OpenAI API Key (required)
  - NewsAPI Key (required, free tier available)

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Backend Setup

Create `.env` file in the root directory:

```bash
# Copy from example
cp env.template .env
```

Edit `.env` with your API keys:

```env
PORT=3000
OPENAI_API_KEY=sk-your-key-here
NEWS_API_KEY=your-news-api-key-here
```

### 3. Start Backend Server

```bash
npm run backend:dev
```

Backend will run on `http://localhost:3000`

### 4. Start Mobile App

**iOS Simulator:**
```bash
npm run ios
```

**Android Emulator:**
```bash
npm run android
```

**Expo Go (Physical Device):**
```bash
npm start
```

Then scan the QR code with Expo Go app.

## 📁 Project Structure

```
datinsight/
├── App.tsx                  # Main app entry
├── app.json                # Expo configuration
├── src/
│   ├── screens/            # Main screens
│   │   ├── DashboardScreen.tsx
│   │   ├── CategoryScreen.tsx
│   │   ├── ArticleDetailScreen.tsx
│   │   ├── SavedScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/         # Reusable components
│   │   ├── FeedCard.tsx
│   │   └── LiveActivityBanner.tsx
│   ├── services/           # API services
│   │   └── api.ts
│   └── types/              # TypeScript types
│       └── index.ts
├── backend/                # Backend server
│   └── server.js
└── assets/                 # Images, icons, fonts
```

## 🔧 Configuration

### Get API Keys

**OpenAI** (Required):
1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up and add payment method
3. Generate API key
4. Cost: ~$0.002 per analysis

**NewsAPI** (Required):
1. Go to [newsapi.org](https://newsapi.org)
2. Sign up for free account
3. Get API key
4. Free tier: 100 requests/day

### Customize Backend URL

Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'  // Development
  : 'https://your-api.com/api';  // Production
```

### Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run backend` - Start backend server
- `npm run backend:dev` - Start backend with nodemon
- `npm run build:ios` - Build iOS app (requires EAS)
- `npm run build:android` - Build Android app (requires EAS)

## 📱 Building for Production

### Using Expo Application Services (EAS)

1. **Install EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Login to Expo:**
```bash
eas login
```

3. **Configure Project:**
```bash
eas build:configure
```

4. **Build iOS:**
```bash
npm run build:ios
```

5. **Build Android:**
```bash
npm run build:android
```

6. **Submit to App Stores:**
```bash
npm run submit:ios     # Submit to Apple App Store
npm run submit:android # Submit to Google Play Store
```

## 🌐 Backend Deployment

### Deploy to Railway (Recommended)

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Add environment variables
5. Deploy!

### Other Options

- **Heroku**: Easy deployment with free tier
- **AWS**: EC2 or Elastic Beanstalk
- **DigitalOcean**: App Platform
- **Vercel**: Serverless functions

## 🎯 iOS App Store Submission

### Prerequisites
- Apple Developer Account ($99/year)
- App icons and screenshots
- Privacy policy URL
- App description

### Steps
1. Build with EAS: `npm run build:ios`
2. Download `.ipa` file
3. Upload to App Store Connect
4. Fill app information
5. Submit for review

**Approval time**: 1-3 days typically

## 🤖 Google Play Store Submission

### Prerequisites
- Google Play Developer Account ($25 one-time)
- App icons and screenshots
- Privacy policy URL
- Content rating questionnaire

### Steps
1. Build with EAS: `npm run build:android`
2. Download `.aab` file
3. Upload to Google Play Console
4. Fill app information
5. Submit for review

**Approval time**: 1-7 days typically

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| Apple Developer | $99/year | Required for iOS |
| Google Play | $25 one-time | Required for Android |
| Backend Hosting | $0-20/month | Railway/Heroku free tier |
| OpenAI API | $5-50/month | ~$0.002 per analysis |
| NewsAPI | $0/month | Free tier: 100 req/day |
| **Total (first year)** | **$129-$1,788** | Depends on usage |
| **Total (ongoing)** | **$5-150/month** | After first year |

## 🔮 Features Roadmap

**Phase 2:**
- [ ] User authentication
- [ ] Persistent bookmarks
- [ ] Push notifications for breaking news
- [ ] Offline mode

**Phase 3:**
- [ ] Share to social media
- [ ] In-app podcast player
- [ ] Custom alert keywords
- [ ] Widget support (iOS 14+)

**Phase 4:**
- [ ] Multi-language support
- [ ] Premium subscription
- [ ] Advanced analytics
- [ ] Custom data sources

## 🐛 Troubleshooting

**Backend not connecting:**
- Check if backend is running on port 3000
- Update API_BASE_URL in `src/services/api.ts`
- For iOS simulator: use `http://localhost:3000`
- For Android emulator: use `http://10.0.2.2:3000`
- For physical device: use your computer's IP address

**Build errors:**
```bash
rm -rf node_modules
npm install
expo start -c  # Clear cache
```

**iOS simulator issues:**
```bash
xcrun simctl erase all  # Reset all simulators
```

## 📄 App Store Requirements

### iOS
- Privacy policy URL
- App icons (1024x1024)
- Screenshots (6.5" and 5.5" displays)
- App description
- Keywords
- Support URL
- Marketing URL (optional)

### Android
- Privacy policy URL
- Feature graphic (1024x500)
- Screenshots (min 2)
- Short description (80 chars)
- Full description (4000 chars)
- Content rating

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- News data from [NewsAPI](https://newsapi.org)
- Social data from Reddit
- Podcast data from iTunes
- AI powered by OpenAI
- Built with [Expo](https://expo.dev)

---

**Built with ❤️ for iOS and Android** 🍎 🤖
