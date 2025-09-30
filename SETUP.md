# Datinsight - Quick Setup Guide

## 📱 Mobile App Development Setup

### For macOS (iOS + Android)

**Step 1: Install Dependencies**
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install Watchman (recommended for React Native)
brew install watchman

# Install Expo CLI globally
npm install -g expo-cli eas-cli
```

**Step 2: Install Xcode (for iOS)**
1. Download Xcode from Mac App Store
2. Open Xcode and install additional components
3. Install Command Line Tools:
```bash
xcode-select --install
```

**Step 3: Install Android Studio (for Android)**
1. Download from [developer.android.com/studio](https://developer.android.com/studio)
2. Install Android SDK and create virtual device
3. Add to `~/.bash_profile` or `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### For Windows (Android Only)

**Step 1: Install Node.js**
Download from [nodejs.org](https://nodejs.org)

**Step 2: Install Expo CLI**
```powershell
npm install -g expo-cli eas-cli
```

**Step 3: Install Android Studio**
1. Download from [developer.android.com/studio](https://developer.android.com/studio)
2. Install Android SDK
3. Create Android Virtual Device (AVD)
4. Add to Environment Variables:
   - `ANDROID_HOME`: `C:\Users\YourName\AppData\Local\Android\Sdk`
   - Add to PATH: `%ANDROID_HOME%\platform-tools`

### For Linux (Android Only)

**Step 1: Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Step 2: Install Expo CLI**
```bash
npm install -g expo-cli eas-cli
```

**Step 3: Install Android Studio**
Follow official guide: [developer.android.com/studio/install](https://developer.android.com/studio/install)

## 🚀 Project Setup

### 1. Clone and Install

```bash
# Navigate to project directory
cd datinsight

# Install dependencies
npm install
```

### 2. Configure Environment

Create `.env` file:
```bash
PORT=3000
OPENAI_API_KEY=sk-your-openai-key-here
NEWS_API_KEY=your-newsapi-key-here
```

### 3. Start Backend

**Terminal 1:**
```bash
npm run backend:dev
```

You should see:
```
🚀 Datinsight Backend running on port 3000
📡 API available at http://localhost:3000/api
```

### 4. Start Mobile App

**Terminal 2:**

For **iOS Simulator**:
```bash
npm run ios
```

For **Android Emulator**:
```bash
npm run android
```

For **Physical Device** (easier):
```bash
npm start
```
Then scan QR code with Expo Go app ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

## 🔑 Getting API Keys

### OpenAI (Required)

1. Go to [platform.openai.com](https://platform.openai.com)
2. Sign up or log in
3. Go to API Keys section
4. Click "Create new secret key"
5. Copy key and add to `.env`
6. Add payment method (required)

**Cost**: ~$0.002 per AI analysis (~$5/month for moderate usage)

### NewsAPI (Required)

1. Go to [newsapi.org](https://newsapi.org)
2. Sign up for free account
3. Copy API key from dashboard
4. Add to `.env`

**Free Tier**: 100 requests/day, 1 req/second

## 🧪 Testing the App

### Test Backend
```bash
curl http://localhost:3000/health
```

Should return: `{"status":"ok",...}`

### Test News API
```bash
curl http://localhost:3000/api/news?category=technology
```

### Test in App
1. Open app in simulator/device
2. Pull down to refresh feed
3. Tap any article
4. Click "Generate AI Analysis"
5. View predictions and bias analysis

## 📱 Physical Device Testing

### iOS (with Mac)

**Option 1: Expo Go** (Easiest)
1. Install [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from App Store
2. Run `npm start` in project
3. Scan QR code with Camera app
4. App opens in Expo Go

**Option 2: Development Build**
1. Connect iPhone via USB
2. Trust computer on device
3. Run: `expo run:ios --device`

### Android

**Option 1: Expo Go** (Easiest)
1. Install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) from Play Store
2. Run `npm start` in project
3. Scan QR code with Expo Go app

**Option 2: Direct Install**
1. Enable Developer Mode on Android device
2. Enable USB Debugging
3. Connect via USB
4. Run: `npm run android`

## 🏗️ Building Production APPs

### Setup EAS (Expo Application Services)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure project
eas build:configure
```

### Build iOS

```bash
# Create build
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

**Requirements:**
- Apple Developer Account ($99/year)
- App Store Connect access

### Build Android

```bash
# Create build
eas build --platform android

# Submit to Play Store
eas submit --platform android
```

**Requirements:**
- Google Play Developer Account ($25 one-time)
- Keystore for signing

## 🚀 Backend Deployment

### Deploy to Railway

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Add environment variables:
   - `OPENAI_API_KEY`
   - `NEWS_API_KEY`
   - `PORT` (Railway provides this automatically)
6. Deploy!

**Update app to use production backend:**

Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'
  : 'https://your-app.railway.app/api';  // Your Railway URL
```

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create datinsight-backend

# Set env vars
heroku config:set OPENAI_API_KEY=your-key
heroku config:set NEWS_API_KEY=your-key

# Deploy
git push heroku main
```

## 🐛 Common Issues

### iOS Simulator Not Opening
```bash
# Reset simulators
xcrun simctl erase all

# Restart Xcode
killall Simulator
```

### Android Emulator Not Starting
1. Open Android Studio
2. Go to AVD Manager
3. Delete and recreate virtual device
4. Ensure virtualization is enabled in BIOS

### "Unable to resolve module"
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### Backend Connection Failed
- **iOS Simulator**: Use `http://localhost:3000`
- **Android Emulator**: Use `http://10.0.2.2:3000`
- **Physical Device**: Use your computer's IP (e.g., `http://192.168.1.100:3000`)

To find your IP:
- macOS/Linux: `ifconfig | grep inet`
- Windows: `ipconfig`

### Expo Go Shows Error
```bash
# Clear Expo cache
expo start -c

# Update Expo Go app on device
```

## 📖 Next Steps

1. ✅ Test all features in the app
2. ✅ Customize interests and categories
3. ✅ Test AI analysis
4. ✅ Prepare app icons and screenshots
5. ✅ Build production versions
6. ✅ Submit to App Store and Play Store

## 📞 Need Help?

- Expo Documentation: [docs.expo.dev](https://docs.expo.dev)
- React Native Docs: [reactnative.dev](https://reactnative.dev)
- EAS Build Guide: [docs.expo.dev/build/introduction](https://docs.expo.dev/build/introduction)

---

Happy Coding! 🎉 📱
