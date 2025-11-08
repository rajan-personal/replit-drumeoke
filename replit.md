# Drumeoke

## Overview

Drumeoke is an interactive drum practice web application that allows users to play along with YouTube songs using a virtual drum pad. Users can browse a library of songs, each with custom drum samples for different drum components (kick, snare, hi-hat, toms, crash, ride, floor tom). The application provides an engaging way to practice drumming skills by combining video playback with real-time audio feedback from the drum pad interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management and data fetching with built-in caching

**UI Component Strategy**
- Shadcn/ui component library with Radix UI primitives for accessible, headless components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theme system using CSS variables for colors, spacing, and typography
- Design guidelines emphasize music-focused aesthetics inspired by Spotify and music production tools

**State Management**
- React Context API for authentication state (AuthProvider)
- TanStack Query for server state (songs, favorites, user data)
- Local component state with React hooks for UI interactions
- Audio playback managed through imperative refs (Map of HTMLAudioElement instances)

**Key Design Patterns**
- Component composition with separation of presentational and container components
- Custom hooks for reusable logic (useAuth, useIsMobile, useToast)
- Query key-based cache invalidation for optimistic updates
- Protected routes through authentication context checking

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- Session-based authentication using Passport.js with local strategy
- In-memory session storage with MemoryStore (suitable for development, would need Redis/PostgreSQL for production scaling)
- Custom middleware for request logging and JSON parsing with raw body preservation

**Authentication & Authorization**
- Scrypt-based password hashing with salt for secure credential storage
- Role-based access control with isAdmin flag for administrative features
- Session cookies with 30-day expiration
- Protected API routes using requireAuth and requireAdmin middleware

**API Design**
- RESTful endpoints organized by resource type (songs, song elements, favorites, auth)
- File upload handling with Multer for audio file storage
- Zod schemas for request validation (insertUserSchema, insertSongSchema, insertSongElementSchema)
- Consistent error handling and response formatting

### Data Storage

**Database**
- PostgreSQL as the primary database (via Neon serverless)
- Drizzle ORM for type-safe database queries and schema management
- WebSocket-based connection pooling for serverless environment compatibility

**Schema Design**
- `users` table: email/password authentication with admin flag
- `songs` table: song metadata with YouTube music link
- `song_elements` table: individual drum component audio files linked to songs (cascade delete on song removal)
- `favorites` table: many-to-many relationship between users and songs (composite primary key)

**Data Access Pattern**
- Repository pattern through DbStorage class implementing IStorage interface
- All database operations return promises for async/await usage
- Proper foreign key relationships with cascade deletes for data integrity

### External Dependencies

**Cloud Services**
- Google Cloud Storage for audio file hosting (public access with CDN-friendly cache headers)
- Neon serverless PostgreSQL for database hosting
- YouTube for video playback integration (via ytMusic URL stored per song)

**Key Third-Party Libraries**
- `@neondatabase/serverless`: PostgreSQL client optimized for serverless/edge environments
- `drizzle-orm`: Type-safe ORM with zero-overhead query building
- `passport`: Authentication middleware with strategy-based authentication
- `@google-cloud/storage`: Official GCP SDK for object storage operations
- `multer`: Multipart form-data handling for file uploads
- `@radix-ui/*`: Accessible component primitives (25+ components)
- `react-hook-form` with `@hookform/resolvers`: Form validation with Zod integration
- `lucide-react`: Icon library for consistent iconography

**Development Tools**
- TypeScript for type safety across client, server, and shared code
- ESBuild for server-side bundling in production
- Drizzle Kit for database migrations and schema management
- Custom Vite plugins for Replit integration (cartographer, dev banner, runtime error overlay)

**Audio & Media**
- Native HTML5 Audio API for drum pad sound playback
- YouTube embedded player (implied by ytMusic field) for backing track
- Client-side audio preloading and caching strategy using Map of audio elements