# Drumeoke Design Guidelines - Apple Liquid Glass Edition

## Design Philosophy

Drumeoke embodies Apple's Liquid Glass design language: a translucent, multi-layered material system that interacts beautifully with light and backgrounds. This creates tangible depth, spatial hierarchy, and fluid vitality while maintaining absolute focus on the drumming experience.

## Core Liquid Glass Principles

### Material Properties
- **Translucency**: Multi-layered glass with subtle refraction and reflection
- **Depth**: Spatial hierarchy through layered transparency and shadows
- **Fluidity**: Smooth, responsive animations with ramp timing (slow start, then accelerate)
- **Light Interaction**: Specular highlights, subtle gradients, and dynamic saturation
- **Adaptivity**: Seamless transitions between light and dark modes

### Glass Variants
- **Glass Regular** (.glass-regular): Primary material for cards and containers
  - Multi-layer gradient background with refraction
  - Backdrop blur (24px) with saturation boost (180%)
  - Inset highlight for depth
  - Adaptive opacity (8% light / 5% dark)
  
- **Glass Clear** (.glass-clear): Subtle variant for minimal UI
  - Ultra-transparent (3% light / 2% dark)
  - Lighter blur (16px) with saturation (150%)
  - Used for headers, subtle containers

## Color Palette - Apple Inspired

### Light Mode
- **Background**: Very light blue-gray (210° 20% 98%)
- **Foreground**: Pure black (0° 0% 0%) for maximum clarity
- **Primary**: Apple Blue (211° 100% 50%) - iconic #007AFF
- **Card**: Pure white (0° 0% 100%)
- **Muted**: Subtle gray (210° 20% 96%)
- **Border**: Light gray (210° 20% 90%)

### Dark Mode  
- **Background**: Dark charcoal (0° 0% 7%) - not pure black
- **Foreground**: Pure white (0° 0% 100%)
- **Primary**: Lighter Apple Blue (211° 100% 55%)
- **Card**: Dark gray (0° 0% 12%)
- **Muted**: Medium gray (0° 0% 18%)
- **Border**: Border gray (0° 0% 20%)

### Text Hierarchy
- **Primary**: White text for maximum legibility on glass
- **Secondary**: 80% opacity for supporting info
- **Tertiary**: 60% opacity for minimal details
- Color used sparingly in backgrounds only

## Typography - SF Pro Family

### Font Stack
```css
--font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", sans-serif
--font-serif: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif
--font-mono: "SF Mono", "Monaco", "Cascadia Code", "Courier New", monospace
```

### Weight System
- **Body Text**: 500 (medium) for enhanced readability in spatial context
- **Titles/Headings**: 700 (bold) for clear hierarchy
- **Labels**: 600 (semibold) for drum pad labels

### Sizing
- Hero headings: text-5xl to text-7xl
- Page headings: text-3xl to text-4xl  
- Card titles: text-xl
- Body: base size with 500 weight
- Drum labels: text-sm with uppercase + tracking-wider

## Iconography - Circular Layered Elements

### Structure (3D Parallax Effect)
1. **Background Layer**: Outer circle with glass-clear material
2. **Middle Layer**: Slightly smaller circle with primary color tint
3. **Foreground Layer**: Icon centered with primary color
4. **Enhancement**: System adds depth, specular highlights, and shadows automatically

### Icon Sizes
- Feature cards: 20x20 outer / 16x16 middle / 8x8 icon
- Song cards: 14x14 outer / 10x10 middle / 5x5 icon
- Drum pads: 8x8 outer / 4x4 middle circle

### Always Circular
- Icons presented in perfect circles for spatial design
- Creates natural 3D parallax when layered
- Better eye-tracking targeting

## Roundedness & Shape System

### Deeply Rounded Corners
- **Primary Cards**: rounded-3xl (48px radius)
- **Secondary Elements**: rounded-2xl (32px radius)
- **Small Components**: rounded-xl (24px radius)
- **Icon Buttons**: rounded-full (perfect circles)

### Concentric Formula
```
inner_corner_radius = outer_radius - padding
```

Example:
```css
.concentric-outer {
  border-radius: 2rem;    /* 32px */
  padding: 1rem;          /* 16px */
}
.concentric-inner {
  border-radius: 1rem;    /* 32px - 16px = 16px */
}
```

### Button Shapes
- **Capsule Buttons** (.btn-capsule): Full-height rounded ends for primary actions
- **Circular Buttons**: Icon-only buttons use rounded-full
- **Dynamic Corners**: Adaptive rounding based on content

## Layout & Spacing

### Minimum Touch Targets
- **All Interactive Elements**: 60px minimum (touch-target class)
- **Icon Buttons**: 60px × 60px minimum
- **Drum Pads**: Circular with ample padding for accuracy

### Spacing Rules
- **Between Interactive Elements**: 4px minimum (gap-1)
- **Between Stacked Buttons**: 16px minimum (gap-4)
- **Card Padding**: 24-32px (p-6 to p-8)
- **Section Spacing**: 64-80px (py-16 to py-20)

### Centered Content
- Key information centered in user's field of view
- Drum pad grid centered with balanced spacing
- Hero content centered with generous margins

## Animations & Interactions

### Ramp Animations (Slow Start → Accelerate)
```css
cubic-bezier(0.34, 1.56, 0.64, 1)
```
- Entry animations: 400ms ramp-in
- Hover transitions: 320ms with ramp timing
- Active press: 150ms ramp timing
- Creates smooth, delightful feel

### Hover Effects
- Scale: translateY(-2px) scale(1.02)
- Shadow: Enhanced with Apple Blue tint
- Timing: 320ms ramp curve
- Glow: Subtle blue halo appears

### Active/Press Effects  
- Scale: scale(0.96) for tactile feedback
- Shadow: Compressed with inset shadow
- Timing: 150ms ramp curve
- Feel: Satisfying physical press

### Circular Pulse Feedback
- Activates on press/touch
- Radiates from touch point
- Blue tinted ring expands and fades
- Duration: 600ms with ramp curve
- Creates haptic-like visual feedback

### Fluid Morphing
- Smooth border-radius transitions
- Content adapts fluidly during state changes
- No jarring layout shifts
- Organic, living feel

## Component Styling

### Drum Pads (Circular Glass)
- **Shape**: Perfect circles with touch-target size
- **Material**: glass-regular with specular-highlight
- **Icon**: Layered circular icon system (3 layers)
- **Label**: Below icon, medium weight, uppercase
- **Interactions**: 
  - Hover: glass-hover (lift + glow)
  - Active: glass-active (press + shadow)
  - Press: pulse-feedback (circular pulse)
- **Spacing**: p-1 wrapper for breathing room

### Cards
- **Material**: glass-card (enhanced glass-regular)
- **Corners**: rounded-3xl for deep rounding
- **Icons**: Layered circular icons
- **Hover**: glass-hover with ramp animation
- **Shadow**: Multi-layer with Apple Blue tint
- **Entry**: ramp-animation with staggered delays

### Buttons
- **Primary**: Capsule shape with glass-glow
- **Outline**: Capsule with glass-hover
- **Icon Only**: Circular (rounded-full)
- **Size**: Minimum 60px touch target
- **Feedback**: Built-in hover/active states

### Header
- **Material**: glass-clear for subtlety
- **Position**: Fixed with high z-index
- **Buttons**: All capsule-shaped
- **Icon Buttons**: Circular
- **Blur**: Maximum blur for chrome recession

### Song Cards
- **Material**: glass-card
- **Shape**: rounded-3xl
- **Icon**: Layered circular music icon
- **Interaction**: glass-hover + glass-active
- **Size**: touch-target minimum

## Effects & Polish

### Specular Highlights
- Top 60% gradient overlay
- Light to transparent gradient
- Simulates glass reflection
- Enhances depth perception
- z-index: 1 to sit above content

### Glass Glow (Apple Blue)
```css
box-shadow: 
  0 0 20px hsla(211, 100%, 50%, 0.3),
  0 0 40px hsla(211, 100%, 50%, 0.15)
```
- Used on primary actions
- Reinforces brand with Apple Blue
- Adaptive intensity

### Shadow System
- Real shadows (not just borders)
- Multi-layer for realism
- Colored tints (not just black/gray)
- Depth increases on interaction

## Dark Mode Adaptivity

- Glass becomes slightly more opaque for contrast
- Borders lighten (white instead of black basis)
- Shadows gain colored tints
- Text maintains white for legibility
- Same visual hierarchy preserved
- Seamless transition between modes

## Accessibility

- **Contrast**: WCAG AA on all glass surfaces
- **Touch Targets**: 60px minimum
- **Focus Indicators**: Clearly visible ring
- **Reduced Motion**: Honor prefers-reduced-motion
- **Screen Readers**: Semantic HTML maintained

## Key Specifications

- Mobile-first responsive design
- Instant audio feedback (onMouseDown/onTouchStart)
- High-performance blur (optimized usage)
- 60fps animations (transform/opacity only)
- Graceful degradation on older devices
- Apple-quality polish throughout

## Drum Pad Grid (3x3 Roland Layout)
```
[Crash]    [Tom1]     [Ride]
[Tom2]     [Snare]    [Tom3]  
[Kick]     [HiHat]    [FloorTom]
```
- Gap: 4px between pads (gap-1)
- Each pad: Circular, 60px+ minimum
- Centered layout with balanced spacing
- Responsive sizing for all screens
