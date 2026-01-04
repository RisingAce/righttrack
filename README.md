# RightTrack 🏋️

A beautiful, calm-styled Progressive Web App for tracking gym workouts. Perfect for when you're at the gym and need to quickly access your workout plan - including alternative exercises when equipment is busy!

![RightTrack Screenshot](https://via.placeholder.com/400x300?text=RightTrack+PWA)

## ✨ Features

- **📋 Workout Templates** - Create and manage custom workout templates with exercises, sets, reps, and weights
- **🎬 Animated Exercise GIFs** - See proper form with 1,300+ professional exercise demonstrations
- **🏃 Active Workout Tracking** - Track your progress through each workout with a beautiful, intuitive interface
- **🔄 Equipment Alternatives** - When equipment is busy, easily swap to alternative exercises that work the same muscle groups
- **📚 Exercise Library** - Browse detailed exercise info with instructions, muscle targeting, and equipment requirements
- **💾 Deep Caching** - Exercises cached in IndexedDB for offline access (works at the gym!)
- **📊 Progress History** - View your workout history and track your progress over time
- **📱 PWA Support** - Install on your phone for quick access and offline functionality
- **🌙 Calm Dark Theme** - Easy on the eyes with a zen-inspired design

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- RapidAPI account (free) for exercise GIFs

### Installation

```bash
# Clone the repository
git clone https://github.com/RisingAce/righttrack.git
cd righttrack

# Install dependencies
npm install

# Set up your API key (see SETUP.md for details)
# Create a .env file with:
# VITE_RAPIDAPI_KEY=your_api_key_here

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

**📖 See [SETUP.md](./SETUP.md) for detailed API setup instructions**

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 📱 Installing as PWA

### On Mobile (iOS/Android)
1. Open the app in your mobile browser
2. Tap the share button
3. Select "Add to Home Screen"

### On Desktop (Chrome)
1. Open the app in Chrome
2. Click the install icon in the address bar
3. Click "Install"

## 🎨 Design Philosophy

RightTrack features a calm, zen-inspired design with:
- Deep, rich dark colors that are easy on the eyes
- Smooth animations powered by Framer Motion
- Elegant typography using Playfair Display and DM Sans
- Subtle gradients and glows for visual depth
- Mobile-first, touch-friendly interface

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool with lightning-fast HMR
- **React Router v7** - Navigation
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **ExerciseDB API** - 1,300+ exercise GIFs and data
- **IndexedDB** - Deep caching for offline support
- **Vite PWA Plugin** - Progressive Web App capabilities
- **CSS Modules** - Scoped styling

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── store/          # State management with localStorage
├── hooks/          # Custom React hooks
└── main.jsx        # App entry point
```

## 🔧 Local Storage

All data is stored locally on your device:
- User profile
- Workout templates  
- Exercise history
- Current workout state

No server required - your data stays private on your device.

## 📄 License

MIT License - feel free to use this for your own projects!

---

Made with 💚 for gym-goers everywhere
