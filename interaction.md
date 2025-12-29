# Project Volt - Interactive Presentation Design

## Core Interactive Components

### 1. Financial Dashboard Simulator
**Location**: Financial Projections page
**Functionality**: 
- Interactive sliders for key variables (ASP, Volume, Supply Chain Savings, B2B Mix, Data Revenue)
- Real-time calculation of EBITDA impact showing sensitivity analysis
- Scenario comparison (Bear/Base/Bull cases) with probability weighting
- Visual waterfall chart showing revenue bridge FY26→FY30

### 2. Regional Strategy Map
**Location**: Geographic Strategy page  
**Functionality**:
- Interactive India map with region selection (South, West, North, East)
- Click regions to see detailed metrics: investment allocation, market share, revenue projections
- Hover tooltips showing city-wise breakdown and strategy notes
- Toggle between B2C vs B2B focus by region

### 3. Product Portfolio Optimizer
**Location**: Product Mix page
**Functionality**:
- Drag sliders to adjust product mix percentages (450X, 450S, Rizta, Dash, Accessories)
- Real-time calculation of blended margin impact
- Visual matrix showing product positioning (Growth vs Margin)
- Timeline slider to see mix evolution FY26→FY30

### 4. Risk Assessment Matrix
**Location**: Risk Matrix page
**Functionality**:
- Interactive risk heat map with clickable risk items
- Expandable risk cards showing mitigation strategies
- Contingency capital allocation simulator
- Trigger-based action plans with timeline

## User Journey Flow

1. **Landing** → Animated title slide with key metrics preview
2. **Situation Analysis** → Scroll-triggered infographics revealing the paradox
3. **Strategic Framework** → Interactive VOLT framework with hover details
4. **Capital Allocation** → Bubble chart with investment ROI comparison
5. **Supply Chain** → Cost breakdown with localization potential
6. **Product Mix** → Portfolio optimizer with real-time calculations
7. **B2B vs B2C** → Side-by-side comparison with toggle views
8. **Fleet Model** → Economics calculator with input variables
9. **Customer Personas** → Filterable persona cards with metrics
10. **Geographic Strategy** → Interactive map with regional data
11. **Data Monetization** → Revenue stream waterfall with projections
12. **Implementation** → Timeline with milestone tracking
13. **Financial Projections** → Dashboard simulator with scenarios
14. **Risk Matrix** → Interactive risk assessment tool
15. **Roadmap** → 100-day checklist and 5-year journey visualization

## Navigation Design

- **Fixed top navigation** with progress indicator
- **Slide dots** on right side for quick navigation
- **Previous/Next** buttons with slide preview
- **Section headers** showing current topic
- **Search functionality** to jump to specific content

## Data Visualization Features

- **ECharts.js** for all interactive charts and graphs
- **Anime.js** for smooth transitions and reveals
- **Scroll-triggered animations** for infographic elements
- **Hover states** with detailed tooltips
- **Responsive design** ensuring mobile compatibility
- **Export functionality** for key charts and data

## Interactive Elements Behavior

- **Hover Effects**: Subtle lift, glow, or color change
- **Click Actions**: Expand details, show tooltips, navigate
- **Scroll Triggers**: Progressive reveal of content sections
- **Form Interactions**: Real-time validation and calculation
- **Animation Timing**: 300ms transitions, staggered reveals
- **Loading States**: Skeleton screens for data-heavy sections