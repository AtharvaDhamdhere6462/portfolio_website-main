# Atharva Dhamdhere - Portfolio

A modern, animated portfolio website built with React, TypeScript, and Tailwind CSS. Features interactive elements, smooth animations, and a fully customizable design through JSON data files.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)

## ✨ Features

- **Loading Screen** - Animated logo with progress percentage
- **Theme System** - Dark/Light mode with smooth color transitions (700ms)
- **Interactive Cursor** - Custom target cursor that snaps to interactive elements, theme-aware (Black/White)
- **Animated Hero** - Threads background using OGL with mouse interaction and Scroll Indicator
- **Floating Navigation** - Glassmorphism effects with underline section indicator
- **Skills Showcase** - PixelTransition hover effects on skill icons
- **Project Cards** - Stacked card layout with images, Live/Coming Soon badges
- **Circular Text** - Rotating text animation in Contact section (Bottom-Right aligned)
- **Journey Timeline** - Alternating timeline with scroll animations
- **Responsive Design** - Optimized for all screen sizes

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite 7 | Build Tool |
| Tailwind CSS v4 | Styling |
| GSAP | Advanced Animations |
| Three.js | 3D Effects |
| OGL | WebGL Threads Background |
| Motion | Animation Library |

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── AboutSection.tsx
│   ├── CircularText.tsx    # Rotating text animation
│   ├── ContactSection.tsx
│   ├── EducationSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── JourneySection.tsx
│   ├── LoadingScreen.tsx   # Loading animation with progress
│   ├── MobileMenu.tsx
│   ├── Navigation.tsx      # Floating pill navbar
│   ├── PixelTransition.tsx
│   ├── ProjectsSection.tsx
│   ├── SkillsSection.tsx
│   ├── Stack.tsx           # Card stack component
│   ├── TargetCursor.tsx    # Custom cursor
│   └── Threads.tsx         # OGL background animation
├── data/                 # JSON data files
│   ├── profile.json      # Name, email, bio, resume URL
│   ├── about.json        # Stats, description
│   ├── education.json    # Education entries
│   ├── journey.json      # Timeline milestones
│   ├── projects.json     # Project cards
│   ├── skills.json       # Skills with icons
│   └── social.json       # Social media links
└── style.css             # Global styles and theme
```

## 📝 Customization

All content is managed through JSON files in `src/data/`:

| File | Content |
|------|---------|
| `profile.json` | Name, email, bio, resume URL, availability |
| `about.json` | Stats (projects, experience, etc.), description |
| `education.json` | Education entries with grades |
| `journey.json` | Timeline milestones |
| `projects.json` | Project cards with images, tags and links |
| `skills.json` | Skills with devicon classes |
| `social.json` | Social media links |

## 🚀 Getting Started

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

## 🎨 Theme Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Brick Ember | `#d00000` | Primary accent |
| Deep Saffron | `#f48c06` | Main theme color, highlights |
| Amber Flame | `#ffba08` | Stats, hover states |
| Orange | `#faa307` | Interactive elements |

## 📦 Dependencies

### Production
- react, react-dom (v19)
- motion - Animation library
- ogl - WebGL renderer
- three, @types/three - 3D graphics
- gsap - Animation platform
- clsx, tailwind-merge - Utility classes
- framer-motion - Animations
- postprocessing - Post effects
- lucide-react - Icons
- recharts - Charts
- face-api.js - Facial recognition (dependency)

### Recent Updates
- **Mobile Optimization**: improved touch device detection and custom cursor behavior.
- **Bug Fixes**: resolved sticky hover states on mobile navigation and layout glitches.

### Development
- vite - Build tool
- typescript - Type checking
- @vitejs/plugin-react - React plugin

## 📱 Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`
- Max container width: `1400px`

## 🔧 Environment

No environment variables required. All configuration is done through JSON data files.

## 📄 License

MIT © Atharva Dhamdhere
