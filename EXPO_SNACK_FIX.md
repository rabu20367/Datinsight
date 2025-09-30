# 🔧 Expo Snack - Quick Fix Guide

## ⚠️ Issues You're Seeing

The errors you're seeing are because:
1. **Backend packages** (express, dotenv, cors, openai) don't work in Expo Snack
2. **Version mismatch** - You have SDK 50, Snack uses SDK 53
3. **React hooks warnings** - Missing dependencies in useEffect

---

## ✅ **QUICK FIX - Use This package.json**

### **In Expo Snack, replace your `package.json` with this:**

```json
{
  "name": "datinsight",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "dependencies": {
    "expo": "~53.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5",
    "react-native-safe-area-context": "5.4.0",
    "react-native-screens": "~4.11.1",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "expo-status-bar": "~2.2.3",
    "expo-notifications": "~0.31.4",
    "expo-constants": "~17.1.7",
    "expo-linear-gradient": "~14.1.5",
    "@expo/vector-icons": "^14.1.0",
    "axios": "^1.6.0",
    "date-fns": "^3.3.0",
    "react-native-reanimated": "~3.17.4",
    "react-native-gesture-handler": "~2.24.0",
    "@react-native-async-storage/async-storage": "2.1.2",
    "expo-secure-store": "~14.2.4"
  }
}
```

### **What I Removed:**
- ❌ `express` - Backend only, won't work in Snack
- ❌ `cors` - Backend only
- ❌ `dotenv` - Backend only
- ❌ `openai` - Backend only, needs Node.js crypto

### **What I Updated:**
- ✅ Expo SDK 50 → 53 (Snack's version)
- ✅ All packages to SDK 53 compatible versions
- ✅ React Native 0.73 → 0.76.5

---

## 🎯 **How to Fix in Snack**

### **Method 1: Copy-Paste (Easiest)**

1. In Expo Snack, click on **`package.json`** file in left sidebar
2. **Select all** content (Ctrl+A)
3. **Delete** it
4. **Copy the JSON above** from this file
5. **Paste** into Snack
6. Click **"Save"** or just wait (auto-saves)
7. Wait for dependencies to install (30-60 seconds)
8. Click **"Run"** ▶️

---

### **Method 2: Click "Update" Buttons**

1. For each warning in Snack, click **"Update to X.X.X"** button
2. Wait for each update
3. For the **"Failed to resolve"** errors (express, dotenv), just **ignore** them or:
   - Click on `package.json`
   - Manually delete these lines:
     - `"express": "^4.18.0",`
     - `"cors": "^2.8.5",`
     - `"dotenv": "^16.4.0",`
     - `"openai": "^4.28.0"`

---

## ✅ **After Fix - What Should Work**

Once you fix `package.json`:

✅ All dependencies install successfully  
✅ No "Failed to resolve" errors  
✅ App runs in preview  
✅ Onboarding works  
✅ Dashboard works  
✅ AI analysis works (with mock data)  
✅ All navigation works  

**ESLint warnings** (react-hooks) are **non-critical** - app still works!

---

## 🚀 **Alternative: Use Pre-Fixed Version**

I've created `package.snack.json` in your repo with correct versions.

**In Snack:**
1. Delete current `package.json`
2. Rename `package.snack.json` to `package.json`
3. Or just copy contents from `package.snack.json`

---

## 📱 **Why This Happens**

**Expo Snack** = React Native in browser  
**Your Backend** = Node.js server  

They're **separate**:
- Snack = Mobile app only
- Backend = Runs separately

**In Snack**: You don't need backend packages because mock data is used!

---

## ✅ **Quick Action**

**Right now in Expo Snack:**

1. Click on **`package.json`**
2. Find and **DELETE** these 4 lines:
   ```json
   "express": "^4.18.0",
   "cors": "^2.8.5",
   "dotenv": "^16.4.0",
   "openai": "^4.28.0",
   ```

3. Change **`"expo": "~50.0.0"`** to **`"expo": "~53.0.0"`**

4. Change **`"react": "18.2.0"`** to **`"react": "18.3.1"`**

5. Change **`"react-native": "0.73.0"`** to **`"react-native": "0.76.5"`**

6. Click the **"Update"** buttons for other packages

7. Wait for install

8. Click **"Run"** ▶️

**Done!** ✅

---

## 🎯 **Expected Result**

After fix:
- ✅ No dependency errors
- ✅ All packages install
- ✅ App runs
- ✅ Mock data works
- ⚠️ 2 ESLint warnings (safe to ignore)

---

## 💡 **Pro Tip**

**Copy this exact package.json** (optimized for Snack):

```json
{
  "name": "datinsight",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "dependencies": {
    "expo": "~53.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5",
    "react-native-safe-area-context": "5.4.0",
    "react-native-screens": "~4.11.1",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "expo-status-bar": "~2.2.3",
    "expo-notifications": "~0.31.4",
    "expo-constants": "~17.1.7",
    "expo-linear-gradient": "~14.1.5",
    "@expo/vector-icons": "^14.1.0",
    "axios": "^1.6.0",
    "date-fns": "^3.3.0",
    "react-native-reanimated": "~3.17.4",
    "react-native-gesture-handler": "~2.24.0",
    "@react-native-async-storage/async-storage": "2.1.2",
    "expo-secure-store": "~14.2.4"
  }
}
```

**Just paste this entire thing into your `package.json` in Snack!**

---

**Fix this and your app will run perfectly!** 🎉

