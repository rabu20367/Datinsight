# 🚀 Datinsight - Quick Start (10 Minutes)

Get Datinsight running on iOS or Android in under 10 minutes!

## ⚡ Super Quick Start (Physical Device - Easiest!)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Create `.env` File
```bash
PORT=3000
OPENAI_API_KEY=sk-your-key-here
NEWS_API_KEY=your-news-key-here
```

**Get Keys**:
- OpenAI: [platform.openai.com](https://platform.openai.com/api-keys)
- NewsAPI: [newsapi.org](https://newsapi.org) (free!)

### 3️⃣ Start Backend
**Terminal 1:**
```bash
npm run backend:dev
```

### 4️⃣ Start Mobile App
**Terminal 2:**
```bash
npm start
```

### 5️⃣ Install Expo Go on Your Phone
- **iOS**: [App Store Link](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Play Store Link](https://play.google.com/store/apps/details?id=host.exp.exponent)

### 6️⃣ Scan QR Code
- **iOS**: Use Camera app to scan QR code in terminal
- **Android**: Use Expo Go app to scan QR code

### 🎉 You're Done!

The app will open in Expo Go and connect to your backend!

---

## 🖥️ Simulator Setup (Developers)

### For iOS Simulator (macOS only)

**Prerequisites:**
- Xcode installed from App Store
- Command Line Tools: `xcode-select --install`

**Run:**
```bash
npm run ios
```

### For Android Emulator

**Prerequisites:**
- Android Studio installed
- Virtual device created in AVD Manager
- `ANDROID_HOME` environment variable set

**Run:**
```bash
npm run android
```

---

## 🔧 Troubleshooting

### Backend won't start?
```bash
# Check if port 3000 is in use
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or change PORT in .env
```

### App can't connect to backend?

**For physical device:**
1. Find your computer's IP address:
   - macOS/Linux: `ifconfig | grep inet`
   - Windows: `ipconfig`
2. Update `src/services/api.ts`:
```typescript
const API_BASE_URL = __DEV__ 
  ? 'http://YOUR-IP-HERE:3000/api'  // e.g., http://192.168.1.100:3000/api
  : 'https://your-api.com/api';
```
3. Restart: Press `r` in Expo terminal

**For iOS Simulator:**
Use `http://localhost:3000/api` (default)

**For Android Emulator:**
Use `http://10.0.2.2:3000/api` in `api.ts`

### Expo errors?
```bash
# Clear cache and restart
npx expo start -c
```

### Module not found?
```bash
rm -rf node_modules
npm install
```

---

## 📱 Testing Features

1. **Pull down** to refresh feed
2. **Tap any article** to view details
3. **Click "Generate AI Analysis"** to see:
   - AI summary
   - "What's Next?" predictions
   - Bias analysis
4. **Go to Categories tab** to select interests
5. **Filter** by News, Social, or Podcasts

---

## 🚀 Next Steps

### Ready to build real apps?

**iOS:**
```bash
npm install -g eas-cli
eas build --platform ios
```

**Android:**
```bash
npm install -g eas-cli
eas build --platform android
```

### Want to deploy backend?
See [SETUP.md](SETUP.md) for Railway/Heroku deployment

### Ready for App Store?
See [APP_STORE_GUIDE.md](APP_STORE_GUIDE.md) for submission process

---

## 💡 Tips

- Use **physical device** for best experience (Camera, Notifications)
- **Simulators** are great for rapid development
- **Hot reload**: Save files to see changes instantly
- **Shake device** to open developer menu
- Press **`m`** in terminal to open menu options

---

## 📞 Need Help?

- **Expo Docs**: [docs.expo.dev](https://docs.expo.dev)
- **Can't get it working?** Check [SETUP.md](SETUP.md) for detailed guide
- **Backend issues?** Check if `.env` file exists and has correct keys

---

## 🎯 Common First-Time Issues

### "Unable to resolve module"
**Fix:** `rm -rf node_modules && npm install`

### "Network request failed"
**Fix:** Check backend is running on port 3000

### "Expo Go won't scan QR"
**Fix:** Make sure phone and computer are on same WiFi

### "Build failed"
**Fix:** Update Expo: `npm install -g expo-cli@latest`

---

**Happy coding! 📱✨**

Questions? Read the full [README.md](README.md) or [SETUP.md](SETUP.md)

