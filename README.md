# राजस्थान परीक्षा तैयारी (Rajasthan Exam Preparation App)

A lightweight, mobile-optimized Progressive Web App (PWA) for Rajasthan competitive exam preparation (BSTC, REET, Patwari, Police, LDC).

## Features

### For Students
- **नोट्स (Notes):** Topic-wise Hindi notes (Geography, History, Art & Culture, Reasoning, Hindi, Teaching Aptitude)
- **PDF:** View and download study PDFs with in-app viewer
- **चित्र (Images):** Educational images, maps, charts in grid layout with full-screen viewer
- **वीडियो (Videos):** YouTube video lectures organized by topic
- **महत्वपूर्ण लिंक (Important Links):** Quick access to Telegram, WhatsApp, YouTube, Instagram channels
- **खोजें (Search):** Search across all content types
- **बुकमार्क (Bookmarks):** Save any content for quick access
- **ऑफलाइन (Offline):** Notes available offline via localStorage

### For Admin
- Upload Notes, PDFs, Images, Video links
- Manage and delete content
- No login required for users

## Tech Stack
- **Frontend:** React 19 + Vite
- **Routing:** React Router v7
- **Icons:** React Icons
- **Storage:** localStorage (offline-capable)
- **Design:** Mobile-first, blue/white theme, Hindi UI
- **PWA:** Installable on mobile devices

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Header.jsx    # Top navigation bar
│   └── BottomNav.jsx # Bottom tab navigation
├── context/          # React Context for state management
│   └── AppContext.jsx # Global app state
├── data/             # Sample data files
│   ├── notes.js      # Hindi study notes
│   ├── pdfs.js       # PDF resources
│   ├── images.js     # Educational images
│   ├── videos.js     # YouTube video links
│   └── links.js      # Social media links
├── pages/            # App screens
│   ├── Home.jsx      # Home screen with categories
│   ├── Notes.jsx     # Notes listing
│   ├── NoteDetail.jsx# Individual note view
│   ├── Pdfs.jsx      # PDF listing with viewer
│   ├── Images.jsx    # Image grid with modal
│   ├── Videos.jsx    # Video listing with player
│   ├── Links.jsx     # External links
│   ├── Admin.jsx     # Admin content management
│   ├── Bookmarks.jsx # Saved items
│   └── Search.jsx    # Search functionality
├── App.jsx           # Main app with routing
├── App.css           # All component styles
├── index.css         # Global styles
└── main.jsx          # App entry point
```

## Target Exams
- BSTC (Basic School Teaching Certificate)
- REET (Rajasthan Eligibility Examination for Teachers)
- Patwari (पटवारी)
- Rajasthan Police Constable
- LDC / Clerk

## Design Principles
- Lightweight (~87KB gzipped)
- Fast loading
- Simple blue/white UI
- Hindi language support
- Works on low-end Android devices
- PWA installable

## License
MIT
