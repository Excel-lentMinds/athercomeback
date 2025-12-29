# Project Volt - Design Style Guide

## Design Philosophy

### Visual Language
**Modern Tech-Forward Aesthetic**: Clean, data-driven design that reflects Ather's innovative positioning in the EV market. The visual language emphasizes precision, intelligence, and strategic thinking through sophisticated data visualizations and professional layouts.

### Color Palette
- **Primary**: Electric Green (#00D26A) - Innovation, growth, sustainability
- **Secondary**: Charcoal (#1A1A2E) - Professional, sophisticated, tech-focused  
- **Accent**: Golden Yellow (#FFB800) - Highlights, call-to-actions, key metrics
- **Background**: Pure White (#FFFFFF) or Light Gray (#F5F5F5) - Clean, spacious
- **Text**: Dark Gray (#2C2C2C) for body text on light backgrounds
- **Data Visualization**: Monochromatic greens with saturation below 50%

### Typography
- **Headlines**: Montserrat Bold (28-48pt) - Strong, modern, attention-grabbing
- **Subheads**: Montserrat Semi-Bold (18-24pt) - Clear hierarchy, professional
- **Body Text**: Open Sans (12-16pt) - Highly readable, clean, neutral
- **Data/Numbers**: Roboto Mono (10-14pt) - Monospace for precise alignment
- **Captions**: Open Sans Italic (10-12pt) - Subtle, informative

## Visual Effects & Animation

### Core Libraries Used
1. **ECharts.js** - All interactive charts, graphs, and data visualizations
2. **Anime.js** - Smooth transitions, element reveals, and micro-interactions
3. **Splitting.js** - Text animation effects for headlines
4. **Typed.js** - Typewriter effect for key metrics and insights
5. **Splide.js** - Image carousels and content sliders
6. **p5.js** - Background particle effects and creative coding elements
7. **Pixi.js** - Advanced visual effects and shader backgrounds

### Animation Strategy
- **Scroll Reveals**: Elements fade in with 16px upward motion when 50% visible
- **Staggered Timing**: 100ms delays between related elements
- **Hover Effects**: Subtle lift (2px), glow, or color transitions (200ms duration)
- **Chart Animations**: Progressive data loading with smooth transitions
- **Text Effects**: Typewriter for key metrics, split-letter for headlines

### Background Effects
- **Primary**: Subtle circuit board pattern with low opacity
- **Secondary**: Flowing data streams with particle systems
- **Accent**: Geometric grid patterns in charcoal
- **Interactive**: Hover-responsive background elements

## Layout Principles

### Grid System
- **Desktop**: 12-column grid with 24px gutters
- **Tablet**: 8-column grid with 20px gutters  
- **Mobile**: 4-column grid with 16px gutters
- **Max Width**: 1400px for optimal readability

### Content Hierarchy
1. **Hero Section**: 40% viewport height with key visual and headline
2. **Main Content**: 60% visual, 40% text ratio for data-heavy sections
3. **Infographics**: Maximum 3 per slide with clear visual separation
4. **White Space**: Generous padding (48px sections, 24px elements)

### Navigation Design
- **Fixed Header**: Translucent background with backdrop blur
- **Progress Indicator**: Visual progress bar showing presentation completion
- **Slide Dots**: Right-side navigation for quick jumping between sections
- **Section Labels**: Clear topic identification for each slide

## Data Visualization Standards

### Chart Styling
- **Color Consistency**: Maximum 3 colors per chart, green-dominant palette
- **Typography**: Roboto Mono for all numerical data
- **Spacing**: 16px minimum between chart elements
- **Borders**: 1px solid #E0E0E0 for containers
- **Shadows**: Subtle drop shadows (0 2px 8px rgba(0,0,0,0.1))

### Interactive Elements
- **Tooltips**: White background, charcoal text, green accent border
- **Hover States**: 10% opacity increase, subtle glow effect
- **Click Actions**: Immediate visual feedback with 150ms transition
- **Loading States**: Skeleton screens with animated placeholders

### Infographic Types
1. **Waterfall Charts**: Revenue/profit breakdowns with step-by-step reveals
2. **Bubble Charts**: Multi-dimensional data (X, Y, Size, Color)
3. **Heat Maps**: Risk assessment and regional analysis
4. **Funnel Diagrams**: Market sizing and conversion tracking
5. **Treemaps**: Cost breakdowns and hierarchical data
6. **Radar Charts**: Multi-parameter comparisons
7. **Sankey Diagrams**: Flow and dependency visualizations

## Component Design System

### Cards
- **Background**: White with 1px border (#E0E0E0)
- **Border Radius**: 8px for modern feel
- **Padding**: 24px internal spacing
- **Hover**: Lift 2px with enhanced shadow

### Buttons
- **Primary**: Green background, white text, 8px border radius
- **Secondary**: White background, green border, green text
- **Hover**: 10% darker, subtle scale (1.02x)

### Tables
- **Header**: Charcoal background, white text
- **Rows**: Alternating white and light gray (#FAFAFA)
- **Borders**: 1px solid #E0E0E0
- **Hover**: Light green background (#F0FFF4)

### Metrics Display
- **Large Numbers**: Montserrat Bold, 32-48pt in electric green
- **Labels**: Open Sans Semi-Bold, 12-14pt in charcoal
- **Context**: Open Sans Regular, 10-12pt in medium gray

## Responsive Behavior

### Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 320px to 767px

### Adaptation Strategy
- **Charts**: Simplified versions for mobile with fewer data points
- **Navigation**: Collapsible menu for tablet/mobile
- **Typography**: Scaled down proportionally (80% on mobile)
- **Spacing**: Reduced by 25% on tablet, 40% on mobile

## Accessibility Standards

### Color Contrast
- **Text on White**: Minimum 4.5:1 ratio (charcoal passes)
- **Green on White**: 4.6:1 ratio (passes AA standard)
- **Interactive Elements**: Clear focus indicators

### Alternative Text
- **Images**: Descriptive alt text for all visual elements
- **Charts**: Data tables provided as alternatives
- **Icons**: Text labels accompanying all iconography

### Keyboard Navigation
- **Tab Order**: Logical flow through interactive elements
- **Focus Indicators**: Visible outline for keyboard users
- **Skip Links**: Available for screen readers

This design system ensures a cohesive, professional, and highly functional presentation that effectively communicates complex strategic data while maintaining visual appeal and usability across all devices.