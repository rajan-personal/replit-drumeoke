# Drumeoke Design Guidelines - Liquid Glass Edition

## Design Philosophy

Inspired by Apple's Liquid Glass design language, Drumeoke features a translucent, glass-like aesthetic that brings elegance and vitality while maintaining focus on content. The design emphasizes depth, dimensionality, and fluid transformations combined with music-focused elements.

## Material System: Liquid Glass

### Core Principles
- **Translucency**: All surfaces use frosted glass effects with backdrop blur
- **Depth**: Multiple layers create visual hierarchy through translucency and shadows
- **Adaptivity**: Materials intelligently adapt between light and dark environments
- **Vitality**: Subtle animations and specular highlights bring elements to life
- **Content Focus**: Controls and chrome recede to emphasize content

### Glass Material Properties
- Backdrop blur with subtle transparency (60-90% opacity)
- Soft, diffused borders with minimal contrast
- Specular highlights on interactive elements
- Smooth gradients that reflect surroundings
- Refined, layered shadows for depth

## Color Palette

### Background Layers
- **Base Background**: Very subtle gradient, barely perceptible
- **Glass Surfaces**: Semi-transparent with backdrop blur
- **Content Areas**: Slightly more opaque for readability

### Accent Colors
- **Primary**: Deep purple with glass overlay
- **Interactive States**: Subtle color shifts with specular highlights
- **Borders**: Soft, barely visible dividers (10-15% opacity)

### Text Hierarchy
- **Primary Text**: High contrast, crisp and readable
- **Secondary Text**: 70% opacity of primary
- **Tertiary Text**: 50% opacity of primary

## Typography

### Headings
- **Font**: Inter for clean, modern feel
- **Weight**: 600-700 for headings
- **Letter Spacing**: Tight (-0.02em) for refined look

### Body Text
- **Font**: Inter
- **Weight**: 400-500 for comfortable reading
- **Line Height**: 1.6 for optimal readability

### Drum Labels
- **Font**: Space Mono (monospace) for technical, musical feel
- **Weight**: 500-600
- **Case**: Uppercase with generous letter spacing (0.1em)
- **Size**: Small but readable (text-xs to text-sm)

## Layout System

**Spacing Scale**: Consistent rhythm using Tailwind units
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-20
- Card gaps: gap-4 to gap-6
- Container max-widths: max-w-7xl for full sections, max-w-4xl for content

## Component Styling

### Cards
- Translucent background with backdrop blur (backdrop-blur-xl)
- Very subtle border (border border-white/10 in light, border-black/10 in dark)
- Soft shadow for elevation (shadow-xl with colored tint)
- Rounded corners (rounded-2xl for large cards, rounded-xl for medium)
- Generous padding (p-6 to p-8)
- Background: bg-white/70 dark:bg-black/40

### Buttons
- **Primary**: Glass surface with colored tint and glow effect
- **Secondary**: Frosted glass with subtle border
- **Ghost**: Minimal with hover glass effect
- **Hover**: Gentle brightness increase with scale 1.02
- **Active**: Slight scale down (0.98) with deeper glow

### Drum Pads
- Large glass tiles with subtle gradient overlay
- Specular highlight on top edge for 3D effect
- Heavy backdrop blur effect
- Interactive states: Glow and scale transform
- Shadow depth increases dramatically on press
- Background: Translucent with tinted glass effect
- Size: min-h-[80px] on mobile, larger on desktop

### Header/Navigation
- Fixed translucent bar with heavy backdrop blur
- Minimal height for content focus
- Smooth transitions
- Background: bg-white/80 dark:bg-black/60 with backdrop-blur-xl
- Border bottom: border-white/20 dark:border-black/20

### Input Fields
- Glass surface with very subtle background
- Soft border that glows on focus
- Comfortable padding (px-4 py-3)
- Background: bg-white/50 dark:bg-black/30
- Backdrop blur for depth

## Homepage Design

### Hero Section (min-h-[80vh])
- Large, bold heading with glass text effect
- Translucent card container with backdrop blur
- Primary CTA button with glass material and glow
- Subtle gradient background
- Music-focused imagery with glass overlay

### Features Section
- 3-column grid (responsive)
- Glass cards with hover lift effect
- Icons with subtle glow
- Concise, centered text

## Song List Page

### Song Cards
- Glass material cards in grid layout
- Hover: Lift with increased blur and glow
- Song name in bold, clear typography
- Subtle music-themed iconography
- Smooth transition animations

## Drum Player Page

### Player Layout
- Song title with glass background bar
- YouTube link button with glass effect
- Centered drum pad grid with generous spacing
- All controls use glass material

### Drum Pad Grid (3x3 Roland Layout)
```
[Crash]    [Tom1]     [Ride]
[Tom2]     [Snare]    [Tom3]
[Kick]     [HiHat]    [FloorTom]
```
- Grid spacing: gap-3 to gap-4
- Each pad: Square aspect ratio
- Glass material with gradient overlay
- Active state: Scale + glow + shadow increase

## Effects & Polish

### Backdrop Blur
- Default: backdrop-blur-xl for most glass surfaces
- Intense: backdrop-blur-2xl for overlays
- Subtle: backdrop-blur-lg for lightweight elements

### Shadows
- Layered shadows for depth
- Soft, diffused appearance
- Color-tinted shadows
- Multiple layers: shadow-lg + custom colored shadow

### Gradients
- Subtle, multi-stop gradients for glass effect
- Light source simulation
- Used sparingly for maximum impact

### Specular Highlights
- Top edge highlights on interactive elements
- Simulates light reflection on glass
- Subtle white/light overlay
- Positioned via gradient or pseudo-element

## Interaction Design

### Hover States
- Scale: 1.02 (subtle lift)
- Brightness increase
- Glow intensification
- Smooth 200ms transition

### Active/Pressed States
- Scale: 0.98 (tactile press)
- Increased glow and shadow depth
- Quick 100ms transition
- Clear visual feedback

### Focus States
- Glass-effect ring with color
- High contrast for accessibility
- Smooth animation

### Animations
- Duration: 200-300ms for most
- Easing: ease-out for natural feel
- Prefer transform and opacity (no layout shifts)

## Dark Mode

- Glass materials become slightly more opaque
- Borders use lighter colors
- Shadows use colored tints
- Text maintains contrast ratios
- Same visual hierarchy maintained

## Accessibility

- WCAG AA contrast ratios on all glass surfaces
- Focus indicators clearly visible
- Touch targets minimum 44x44px
- Reduced motion support
- Screen reader friendly

## Key Specifications

- Mobile-first responsive design
- Touch-friendly interactions
- Instant audio feedback
- High performance (optimized blur usage)
- Smooth 60fps animations
- Glass effects degrade gracefully on older devices
