# Drumeoke Design Guidelines

## Design Approach
**Hybrid Approach**: Combine Spotify's music-focused aesthetics with Material Design's clear interaction patterns. Draw inspiration from music production tools (Ableton, FL Studio) for the drum pad interface while maintaining web-friendly simplicity.

**Core Principles**:
- Music-first visual language with bold typography and rhythm-focused layouts
- High-contrast, tactile drum pad design for immediate playability
- Clean, distraction-free player experience
- Energetic but not overwhelming visual treatment

## Typography
- **Headings**: Inter or Poppins (700-800 weight) - bold, modern, music-industry feel
- **Body**: Inter or DM Sans (400-500 weight) - clean readability
- **Drum Pad Labels**: Space Mono or JetBrains Mono (600 weight) - technical, precise feel
- **Hierarchy**: Hero titles (text-5xl to text-7xl), section headers (text-3xl to text-4xl), body (text-base to text-lg), drum labels (text-sm uppercase tracking-wide)

## Layout System
**Spacing Scale**: Use Tailwind units of 2, 4, 8, 12, 16 consistently
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-20
- Card gaps: gap-4 to gap-8
- Container max-widths: max-w-7xl for full sections, max-w-4xl for content

## Component Library

### Homepage
**Hero Section** (min-h-[70vh]):
- Large heading: "Drum Along to Your Favorite YouTube Songs"
- Subheading: Brief description of drumeoke concept
- Primary CTA: "Browse Songs" button (large, prominent)
- Hero Image: Vibrant drum kit or abstract rhythm visualization as background with gradient overlay

**Features Section** (py-16):
- 3-column grid (single column mobile) showcasing:
  - "Choose Your Song" - icon + brief description
  - "Play the Drum Pad" - icon + brief description  
  - "Practice & Improve" - icon + brief description
- Use Music Note, Drum, and Star icons from Heroicons

### Song List Page
**Header** (py-8):
- Page title: "Song Library"
- Simple navigation back to home

**Song Grid** (grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6):
- Cards with hover elevation effect
- Each card contains: Song name (text-xl font-semibold), subtle music note icon, clickable area
- Card design: Rounded corners (rounded-xl), padding (p-6), border treatment

### Drum Player Page
**Top Section** (py-6):
- Song name display (text-2xl to text-3xl font-bold)
- YouTube button link (prominent, with YouTube icon from Font Awesome)
- Clear spacing between elements (gap-4)

**Drum Pad Interface** (centered, max-w-2xl):
- 3x3 grid with equal-sized pads
- Grid spacing: gap-3 to gap-4
- Each pad:
  - Square aspect ratio (aspect-square)
  - Large clickable area (p-6 to p-8)
  - Drum label centered (uppercase, bold)
  - Active/pressed state with scale transform
  - Subtle shadow/border for depth

**Pad Layout** (Top to bottom, left to right):
```
[Crash]  [Tom1]    [Ride]
[Tom2]   [Snare]   [Tom3]
[Kick]   [HiHat]   [FloorTom]
```

## Images
**Hero Image**: Full-width background image featuring a modern drum kit or abstract rhythm visualization with dynamic energy. Apply gradient overlay (dark at bottom) for text readability. The image should convey energy and musicality.

**Optional**: Song list cards could have subtle background patterns or music-themed illustrations, but prioritize clean text-focused cards initially.

## Navigation
- Simple header: Logo/brand name left, "Browse Songs" link right
- Minimal footer: Copyright, simple links if needed
- Back navigation on player page to song list

## Interaction Patterns
- Drum pads: Immediate visual feedback on click (scale down slightly, brightness increase)
- Song cards: Subtle hover lift (translate-y-1 shadow-lg)
- Buttons: Standard hover states with smooth transitions
- No complex animations - focus on responsive, tactile feel

## Key Specifications
- Mobile-first responsive design
- Drum pad grid stacks to 2-column on small screens
- Touch-friendly pad sizes (minimum 80px x 80px on mobile)
- High contrast for pad labels and boundaries
- Fast, instant audio feedback on pad press