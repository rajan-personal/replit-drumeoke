# 🥁 Drumeoke

**Drum + Karaoke = Drumeoke** - An interactive web application that lets you play along with your favorite YouTube songs using a virtual 3x3 Roland-format drum pad.

Built for the Replit Hackathon 2024.

## 🎵 What is Drumeoke?

Drumeoke is a music practice web app designed for drummers and rhythm enthusiasts. Browse through a curated library of songs, each with professionally recorded drum samples for different drum components (kick, snare, hi-hat, toms, crash, ride, floor tom), and play along in real-time while watching the original song on YouTube.

Whether you're learning to drum, practicing your timing, or just want to jam along to your favorite tracks, Drumeoke provides an engaging and interactive way to develop your rhythm skills.

## ✨ Key Features

### For Users
- **Browse Song Library** - Explore a collection of songs with custom drum samples
- **3x3 Drum Pad** - Roland-format grid layout featuring 9 drum components:
  - Crash, Ride, Hi-Hat (top row)
  - Tom 1, Tom 2, Tom 3 (middle row)
  - Kick, Snare, Floor Tom (bottom row)
- **YouTube Integration** - Watch the original song while you play
- **Favorite Songs** - Mark your favorite tracks for quick access
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Low-latency Audio** - Instant drum pad response using optimized audio playback

### For Admins
- **Song Management** - Add, edit, and delete songs
- **Element Upload** - Upload custom drum samples (MP3/WAV) for each drum component
- **Missing Elements Detection** - Automatically identifies which drum samples are missing from songs
- **Bulk Upload** - Add multiple drum elements to existing songs at once
- **YouTube Link Management** - Set and update YouTube video IDs for each song

## 🎨 Design System

Drumeoke features **Apple's Liquid Glass design system**, bringing premium aesthetics inspired by modern Apple interfaces:

- **Translucent Glass Surfaces** - Frosted glass effect with backdrop blur
- **SF Pro Typography** - Apple's system font family for a native feel
- **Apple Blue (#007AFF)** - Iconic Apple blue for primary actions
- **Circular Layered Icons** - 3D parallax effect with concentric corners
- **Capsule Buttons** - Pill-shaped buttons with 60px minimum touch targets
- **Ramp Animations** - Smooth, physics-based entrance animations
- **Responsive Layouts** - Adapts beautifully from mobile to desktop

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Wouter** - Lightweight routing library
- **TanStack Query (React Query)** - Server state management with caching
- **Shadcn/ui + Radix UI** - Accessible, composable component primitives
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Lucide React** - Beautiful icon library
- **React Hook Form + Zod** - Type-safe form validation

### Backend
- **Node.js + Express** - Web server framework
- **TypeScript** - End-to-end type safety
- **Passport.js** - Authentication with local strategy
- **Express Session** - Session-based auth with secure cookies
- **Multer** - Multipart form-data handling for file uploads

### Database & Storage
- **PostgreSQL (Neon)** - Serverless Postgres database
- **Drizzle ORM** - Type-safe SQL query builder
- **Google Cloud Storage** - Audio file hosting with CDN
- **Drizzle Kit** - Database migrations

### DevOps & Tools
- **Replit** - Cloud development and deployment platform
- **ESBuild** - Fast JavaScript bundler
- **Scrypt** - Password hashing with salt

## 📁 Project Structure

```
drumeoke/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable UI components (DrumPad, Header, etc.)
│   │   ├── pages/       # Route pages (Home, DrumPlayer, AdminManage, etc.)
│   │   ├── lib/         # Utilities (queryClient, hooks)
│   │   └── index.css    # Global styles and design tokens
├── server/              # Backend Express application
│   ├── routes.ts        # API endpoints
│   ├── storage.ts       # Database abstraction layer
│   ├── auth.ts          # Authentication logic
│   └── index.ts         # Server entry point
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle database schema + Zod validation
└── db/                  # Database utilities
    └── index.ts         # Database connection
```

## 🗃️ Database Schema

### Tables
- **users** - Authentication (email, password hash, admin flag)
- **songs** - Song metadata (name, YouTube video ID)
- **song_elements** - Drum component audio files (linked to songs, stored in GCS)
- **favorites** - User favorite songs (many-to-many relationship)

## 🎯 How It Works

1. **Browse** - Users browse the song library from the home page
2. **Select** - Click on a song to open the drum player
3. **Play** - Click or tap the 3x3 drum pad to play different drum sounds
4. **Watch** - Click "Watch on YouTube" to see the original music video
5. **Favorite** - Mark songs as favorites for quick access later
6. **Admin** - Admins can upload new songs with custom drum samples

## 🔐 Admin Access

Admin features are restricted to the designated admin user (`bittu15388@gmail.com`). Admin capabilities include:
- Full CRUD operations on songs
- Upload and manage drum element audio files
- Bulk upload missing drum elements
- Delete individual elements

## 🚀 Getting Started

This project is designed to run on Replit:

1. Open the project in Replit
2. The database and object storage are already configured
3. Click "Run" to start the development server
4. The app will be available at the provided Replit URL

### Environment Variables
All secrets are managed automatically by Replit:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key
- `DEFAULT_OBJECT_STORAGE_BUCKET_ID` - Google Cloud Storage bucket

## 🎓 Credits

Created for the **Replit Hackathon 2024** by demonstrating:
- Full-stack TypeScript development
- Modern React patterns with hooks and React Query
- Secure authentication and authorization
- Cloud file storage integration
- Responsive design with custom design system
- Type-safe database operations with Drizzle ORM

---

**© 2025 Drumeoke. Drum along to the rhythm.**
