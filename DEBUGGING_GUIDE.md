# 🐛 Datinsight - Debugging & Testing Guide

## ✅ Pre-Flight Checklist

### **1. Verify File Structure**
```
✓ App.tsx exists
✓ package.json has all dependencies
✓ tsconfig.json is configured
✓ src/services/mockData.ts exists
✓ All screens in src/screens/
✓ All components in src/components/
✓ backend/server.js exists
```

### **2. Dependencies Check**
```bash
# Install all dependencies
npm install

# Should install ~50+ packages
# No errors should appear
```

### **3. TypeScript Check**
```bash
# Check for TypeScript errors
npx tsc --noEmit

# Should show 0 errors when dependencies are installed
```

---

## 🔧 Common Issues & Fixes

### **Issue 1: Module Not Found Errors**

**Error:**
```
Cannot find module 'react' or its corresponding type declarations
```

**Fix:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### **Issue 2: TypeScript Errors (Promise, JSX)**

**Error:**
```
Cannot use JSX unless the '--jsx' flag is provided
Promise only refers to a type
```

**Fix:** ✅ Already fixed in `tsconfig.json`
- Added `"lib": ["ES2020"]`
- Added `"jsx": "react-native"`
- Added `"skipLibCheck": true`

---

### **Issue 3: Expo Start Fails**

**Error:**
```
Cannot start Metro bundler
```

**Fix:**
```bash
# Clear Expo cache
npx expo start -c

# Or
rm -rf .expo node_modules
npm install
npx expo start
```

---

### **Issue 4: Backend Won't Start**

**Error:**
```
Error: Cannot find module 'express'
```

**Fix:**
```bash
# Backend dependencies are in main package.json
npm install

# Start backend
npm run backend:dev
```

---

### **Issue 5: Mock Data Not Loading**

**Error:**
```
Cannot find module './mockData'
```

**Fix:** Check import path in `src/services/api.ts`:
```typescript
import { mockFeedItems, mockAnalysis, mockUserProfile } from './mockData';
```

Should be relative path `'./mockData'` not `'@/services/mockData'`

---

### **Issue 6: Navigation Errors**

**Error:**
```
Couldn't find a 'Root' navigator
```

**Fix:** ✅ Already configured in `App.tsx`
- Stack Navigator wraps Tab Navigator
- All screens properly defined

---

### **Issue 7: Onboarding Loops**

**Symptom:** Onboarding keeps showing after completion

**Fix:** Clear AsyncStorage:
```typescript
// In Expo Go, shake device → Dev Menu → Clear AsyncStorage
```

---

## 🧪 Testing Checklist

### **Backend Testing**

```bash
# 1. Start backend
npm run backend:dev

# 2. Test health endpoint
curl http://localhost:3000/health

# Expected: {"status":"ok","timestamp":"..."}

# 3. Test news endpoint (requires NEWS_API_KEY)
curl http://localhost:3000/api/news?category=technology

# 4. Test AI analysis (requires OPENAI_API_KEY)
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Content","source":"Test"}'
```

### **Mobile App Testing**

```bash
# 1. Start Expo
npm start

# 2. Test on device/simulator
# iOS: npm run ios
# Android: npm run android
# Expo Go: Scan QR code

# 3. Test features:
```

**Feature Test Checklist:**
- [ ] App launches successfully
- [ ] Onboarding appears on first launch
- [ ] Can complete all 5 onboarding steps
- [ ] Dashboard loads with mock data
- [ ] Can see 6 feed items
- [ ] Can filter by type (News/Social/Podcast)
- [ ] Can tap article to open detail
- [ ] "Generate Deep Insights" button works
- [ ] AI analysis loads (2 second delay)
- [ ] All analysis sections visible:
  - [ ] Summary
  - [ ] Deep Insights (5 subsections)
  - [ ] What Happens Next (4 scenarios)
  - [ ] Timeline Predictions (5 items)
  - [ ] Personalized Insights (3-5 items)
  - [ ] Connected Trends (chips)
  - [ ] Bias Analysis (progress bar)
- [ ] Navigation works (all 4 tabs)
- [ ] Settings screen loads
- [ ] Can change notification frequency
- [ ] Pull-to-refresh works

---

## 🔍 Debug Mode

### **Enable Debug Logging**

Add to `src/services/api.ts`:
```typescript
const DEBUG = true;

if (DEBUG) {
  console.log('📱 API Call:', endpoint, params);
}
```

### **View Logs**

**In Expo:**
```bash
# Start with logs
npx expo start

# Logs appear in terminal
```

**In Browser (Snack):**
- Open browser console (F12)
- Check "Console" tab
- Look for `console.log` messages

**On Device (Expo Go):**
- Shake device
- Open "Debug Remote JS"
- Logs appear in browser console

---

## 📊 Performance Testing

### **App Size**
```bash
# Check bundle size
npx expo export

# Expected: ~25-35 MB
```

### **Load Time**
- First launch: < 3 seconds
- Subsequent launches: < 1 second
- Feed load: < 2 seconds
- AI analysis: 2-4 seconds (with mock: exactly 2s)

### **Memory Usage**
- Idle: ~80-120 MB
- Active scrolling: ~150-200 MB
- AI analysis: ~180-250 MB

---

## 🎯 Integration Testing

### **Test with Real Backend**

1. Deploy backend to Railway/Heroku
2. Update `src/services/api.ts`:
```typescript
const USE_MOCK_DATA = false;
const API_BASE_URL = 'https://your-backend.railway.app/api';
```
3. Add `.env` with API keys
4. Test all features

### **Test Notifications**

```typescript
// In Settings, set to 1 minute
// Wait 1 minute
// Notification should appear
```

---

## 🚨 Emergency Fixes

### **App Crashes on Launch**

```bash
# Nuclear option - full reset
rm -rf node_modules .expo package-lock.json
npm install
npx expo start -c
```

### **Can't Push to GitHub**

```bash
# Check remote
git remote -v

# If no remote:
git remote add origin https://github.com/rabu20367/Datinsight.git

# Force push if needed (careful!)
git push -f origin main
```

### **Expo Snack Won't Load**

1. Check repo is public
2. Verify all files committed
3. Try direct import URL:
   `snack.expo.dev/@YOUR-USERNAME/datinsight`
4. Clear Snack cache (refresh page)

---

## 📱 Device-Specific Issues

### **iOS Simulator**

**Issue:** Simulator not opening
```bash
# Reset simulator
xcrun simctl erase all

# Restart Expo
npx expo start -c
npm run ios
```

### **Android Emulator**

**Issue:** Emulator not starting
```bash
# List available devices
emulator -list-avds

# Start specific device
emulator -avd Pixel_5_API_31

# Then
npm run android
```

### **Physical Device (Expo Go)**

**Issue:** Can't connect to backend
```typescript
// Use your computer's IP address
const API_BASE_URL = 'http://192.168.1.XXX:3000/api';

// Find IP:
// Windows: ipconfig
// Mac/Linux: ifconfig | grep inet
```

---

## 🎓 Debugging Tips

### **1. Start Simple**
- Test onboarding first
- Then dashboard
- Then article detail
- Then AI analysis

### **2. Check Console**
- Look for `console.log` messages
- Mock data shows: "📱 Using mock feed data"
- AI analysis shows: "🧠 Using mock AI analysis"

### **3. Verify Mock Data**
```typescript
// Check USE_MOCK_DATA flag
// In src/services/api.ts line 14
const USE_MOCK_DATA = true; // Should be true for Snack
```

### **4. Test in Browser First**
- Expo Snack shows errors clearly
- Easier to debug than device
- Console.log works well

### **5. Gradual Enable Features**
- Start with mock data
- Test UI thoroughly
- Then connect real backend
- Then add notifications

---

## ✅ Ready for Production Checklist

Before deploying:

- [ ] All TypeScript errors fixed
- [ ] All features tested manually
- [ ] Backend deployed and accessible
- [ ] API keys secured in .env
- [ ] `USE_MOCK_DATA = false` when using real backend
- [ ] App tested on real devices (iOS + Android)
- [ ] Notifications working
- [ ] No console errors
- [ ] Performance acceptable
- [ ] App icons added
- [ ] Splash screen configured
- [ ] Privacy policy ready
- [ ] App Store assets prepared

---

## 🆘 Get Help

If still stuck:

1. **Check logs** - Most issues show in console
2. **Read error messages** - They usually tell you what's wrong
3. **Google error** - Likely someone had same issue
4. **Check Expo docs** - [docs.expo.dev](https://docs.expo.dev)
5. **Check React Navigation docs** - [reactnavigation.org](https://reactnavigation.org)

---

## 📊 Health Check Commands

Run these to verify everything works:

```bash
# 1. Check Node version
node --version  # Should be 18+

# 2. Check npm version
npm --version   # Should be 9+

# 3. Check dependencies
npm list        # Shows all installed packages

# 4. Check TypeScript
npx tsc --version  # Should be 5.3+

# 5. Check Expo CLI
npx expo --version  # Should be latest

# 6. Verify git
git status      # Should show clean or pending changes

# 7. Test backend health
curl http://localhost:3000/health

# 8. Start everything
npm run backend:dev  # Terminal 1
npm start            # Terminal 2
```

---

## ✨ Success Indicators

You know everything works when:

✅ `npm install` completes without errors  
✅ `npx expo start` launches successfully  
✅ App opens in simulator/Expo Go  
✅ Onboarding completes smoothly  
✅ Feed loads with 6 items  
✅ AI analysis generates after 2 seconds  
✅ All sections render correctly  
✅ Navigation works between tabs  
✅ Settings can change preferences  
✅ No red error screens  
✅ Console shows only info logs (no errors)  

---

**Your app is debugged and ready! 🎉**

If you see all green checkmarks above, you're good to go to Expo Snack!

