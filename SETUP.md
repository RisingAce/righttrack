# RightTrack Setup Guide

## 🔑 API Key Setup

RightTrack uses the ExerciseDB API from RapidAPI to provide animated GIFs and detailed exercise information.

### Step 1: Get Your API Key

1. Go to [ExerciseDB on RapidAPI](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)
2. Click "Sign Up" (or "Log In" if you have an account)
3. Subscribe to the **Basic Plan** (it's FREE!)
   - 100 requests/day
   - Perfect for personal use
4. Copy your API key from the code snippets section

### Step 2: Configure Your App

1. In the project root (`C:\RightTrack`), create a file named `.env`
2. Add your API key:

```
VITE_RAPIDAPI_KEY=your_api_key_here
```

3. Save the file

**Example:**
```
VITE_RAPIDAPI_KEY=7e307c4585fmad798577850c36da4d9f1a04ajan5e9682def4e8
```

### Step 3: Restart the Dev Server

If the server is already running, restart it:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## 🎬 How It Works

Once configured, RightTrack will:

1. **Auto-fetch** exercise GIFs when you view exercises
2. **Cache** them in IndexedDB for offline use
3. **Prefetch** common exercises on app load (chest, back, shoulders, legs, arms)
4. **Work offline** after initial cache

## 📦 Caching Strategy

- **IndexedDB**: Deep caching for 7 days
- **Automatic prefetch**: ~200 exercises on first load
- **Smart loading**: Exercises load on-demand and cache for next time
- **Offline-first**: Once cached, works without internet

## 🆓 API Limits

| Plan | Requests/Day | Cost |
|------|--------------|------|
| Basic | 100 | FREE |
| Pro | 10,000 | $9.99/mo |
| Ultra | 50,000 | $29.99/mo |

**For personal use:** The free tier (100 requests/day) is more than enough!

## 🔧 Troubleshooting

### "Failed to fetch exercise"
- Check your `.env` file exists and has the correct key
- Verify your RapidAPI subscription is active
- Check you haven't exceeded the daily limit

### No GIFs showing
- Open DevTools Console (F12)
- Look for API errors
- Clear IndexedDB cache (Application tab → IndexedDB → Delete)
- Restart the app

### Rate limit exceeded
- You've hit the 100 requests/day limit
- Wait 24 hours, or upgrade your plan
- Cached exercises will still work!

## 🎨 Features

With ExerciseDB integrated, you get:

- ✅ **1,300+ exercises** with animated GIFs
- ✅ **Detailed instructions** step-by-step
- ✅ **Muscle targeting** info (primary & secondary)
- ✅ **Equipment requirements**
- ✅ **Offline support** via deep caching
- ✅ **Beautiful modal** with exercise details
- ✅ **Smart search** by name, body part, or equipment

## 📱 PWA Benefits

The caching means:
- **Works at the gym** even with spotty WiFi
- **Fast loading** after first visit
- **No data waste** exercises only fetch once
- **Installs on phone** like a native app

---

Enjoy your workouts with RightTrack! 💪
