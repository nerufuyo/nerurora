# Project Plan: Romantic Animated Demo "Kaysa"

## 🎯 Project Overview
Membuat demo animasi web interaktif dengan efek visual romantis, musik latar, dan quotes cinta yang ditujukan untuk Kaysa.

## 📋 Fitur Utama

### 1. **Matrix Code Effect**
- Kumpulan karakter/code random berjatuhan dari atas layar
- Menggunakan karakter ASCII, simbol, dan angka
- Warna hijau Matrix-style yang perlahan berubah
- Durasi: 3-5 detik

### 2. **Transisi Animasi**
- Code perlahan menghilang dengan fade effect
- Membentuk shapes secara bertahap:
  - ❤️ Love/heart shape
  - 🌸 Bunga/flower patterns  
  - 🎆 Kembang api/fireworks
  - 💫 Sparkle effects

### 3. **Text Reveal**
- Nama "Kaysa" muncul dengan elegant typography
- Quotes cinta dari literatur klasik (original interpretation)
- Font yang romantic dan readable

### 4. **Audio Integration**
- Lagu "My Love" by Westlife
- Auto-play ketika animasi selesai
- Loop seamless
- Volume control

### 5. **Animated Lyrics Display**
- Lirik berwarna-warni di bagian bawah
- Sinkronisasi dengan musik
- Rainbow/gradient color effects
- Smooth scrolling

## 🛠️ Teknologi Stack

### Frontend
- **TypeScript**: Type safety dan better development experience
- **React**: Component-based architecture
- **Tailwind CSS**: Utility-first styling dengan custom animations
- **Framer Motion**: Powerful animation library untuk React
- **Canvas API**: Particle systems untuk complex effects

### Libraries & Tools
- **Next.js**: React framework dengan SSG/SSR
- **Howler.js**: Audio management dan synchronization
- **Lucide React**: Beautiful icons
- **clsx**: Conditional className utility
- **Three.js**: 3D effects (jika diperlukan)

## 📁 Struktur Project
```
kaysa-romantic-demo/
├── public/
│   ├── audio/
│   │   └── background-music.mp3
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── MatrixEffect.tsx
│   │   ├── ShapeFormation.tsx
│   │   ├── TextReveal.tsx
│   │   ├── LyricsDisplay.tsx
│   │   ├── AudioController.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── VolumeSlider.tsx
│   ├── hooks/
│   │   ├── useAudio.ts
│   │   ├── useAnimationSequence.ts
│   │   └── useParticles.ts
│   ├── types/
│   │   ├── animation.ts
│   │   ├── audio.ts
│   │   └── particles.ts
│   ├── utils/
│   │   ├── particleSystem.ts
│   │   ├── audioUtils.ts
│   │   └── animationHelpers.ts
│   ├── data/
│   │   ├── lyrics.ts
│   │   └── quotes.ts
│   ├── styles/
│   │   └── globals.css
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   └── index.tsx
│   └── lib/
│       └── constants.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## ⏱️ Development Roadmap

### Phase 1: Project Setup (Day 1-2)
- [x] Initialize Next.js project dengan TypeScript
- [x] Setup Tailwind CSS configuration
- [x] Install Framer Motion dan dependencies
- [x] Configure ESLint, Prettier
- [x] Setup project structure dan types

### Phase 2: Core Components (Day 3-5)
- [x] Implement MatrixEffect component dengan Canvas
- [x] Create particle system dengan TypeScript classes
- [x] Build ShapeFormation component menggunakan Framer Motion
- [x] Develop TextReveal dengan staggered animations

### Phase 3: Audio Integration (Day 6-7)
- [x] Setup Howler.js untuk audio management
- [x] Create useAudio custom hook
- [x] Implement AudioController component
- [x] Build LyricsDisplay dengan synchronized animations

### Phase 4: Animation Orchestration (Day 8-9)
- [x] Create useAnimationSequence hook
- [x] Implement timeline management
- [x] Add transition animations between phases
- [x] Optimize performance dengan useMemo/useCallback

### Phase 5: Styling & Polish (Day 10-11)
- [x] Design responsive layout dengan Tailwind
- [x] Create custom Tailwind animations
- [x] Implement theme system
- [x] Add loading states dan error handling

### Phase 6: Testing & Deployment (Day 12-13)
- [x] Cross-browser testing
- [x] Mobile responsiveness testing
- [x] Performance optimization
- [x] Deploy ke Vercel

## 🎨 Design Specifications

## 🎨 Design & Animation Specifications

### Tailwind Color Palette
```typescript
// tailwind.config.js custom colors
colors: {
  matrix: '#00ff41',
  romantic: {
    50: '#fef7ff',
    500: '#ff69b4',
    600: '#e91e63',
    900: '#831843'
  },
  gold: {
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706'
  },
  magic: {
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea'
  }
}
```

### Framer Motion Variants
```typescript
// Animation variants untuk konsistensi
const matrixVariants = {
  initial: { opacity: 1, y: -100 },
  animate: { opacity: 0, y: 100 },
  exit: { opacity: 0, scale: 0 }
}

const textRevealVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -50, scale: 1.2 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}
```

### Custom Tailwind Animations
```css
/* globals.css */
@keyframes matrix-rain {
  0% { transform: translateY(-100vh) }
  100% { transform: translateY(100vh) }
}

@keyframes color-shift {
  0%, 100% { color: theme('colors.matrix') }
  25% { color: theme('colors.romantic.500') }
  50% { color: theme('colors.gold.500') }
  75% { color: theme('colors.magic.500') }
}

@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0) }
  50% { opacity: 1; transform: scale(1) }
}
```

## 🎵 Audio Requirements

### Music Integration
- Format: MP3 (untuk compatibility)
- Bitrate: 128kbps minimum
- Duration: Full song dengan fade in/out
- Preload: metadata untuk smooth start

### Lyrics Display
- Timing file: JSON dengan timestamps
- Color transitions per line
- Smooth scrolling effects
- Responsive text sizing

## 📱 Responsive Considerations

### Desktop (1200px+)
- Full-screen experience
- High particle count
- Complex animations

### Tablet (768px - 1199px)
- Reduced particle count
- Simplified animations
- Touch-friendly controls

### Mobile (< 768px)
- Minimal particles
- Essential animations only
- Vertical layout optimization

## 🔧 TypeScript Interfaces & Types

### Core Types
```typescript
// types/animation.ts
export interface AnimationPhase {
  id: string;
  duration: number;
  delay?: number;
  component: React.ComponentType;
}

export interface ParticleConfig {
  count: number;
  speed: number;
  color: string;
  size: { min: number; max: number };
  shape: 'circle' | 'heart' | 'star';
}

// types/audio.ts
export interface AudioConfig {
  src: string;
  volume: number;
  loop: boolean;
  fadeIn?: number;
  fadeOut?: number;
}

export interface LyricsLine {
  timestamp: number;
  text: string;
  duration: number;
  color?: string;
}

// types/particles.ts
export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}
```

## 🚀 Deployment Options

### Option 1: GitHub Pages
- Free hosting
- Easy deployment
- Custom domain support
- HTTPS built-in

### Option 2: Netlify
- Drag & drop deployment
- Form handling
- CDN optimization
- Branch previews

### Option 3: Vercel
- Automatic deployments
- Performance analytics
- Edge functions support
- Team collaboration

## 📊 Success Metrics

### Technical Performance
- Page load time < 3 seconds
- Smooth 60fps animations
- No audio sync issues
- Mobile compatibility 95%+

### User Experience
- Emotional impact rating
- Share/engagement metrics
- Device compatibility
- Accessibility compliance

## 🎁 Bonus Features (Optional)

### Interactive Elements
- Click untuk trigger effects
- Volume slider
- Fullscreen toggle
- Social sharing buttons

### Advanced Animations
- 3D particle systems
- Physics-based movements
- Parallax scrolling
- Mouse interaction effects

### Customization Options
- Color theme selector
- Animation speed control
- Text customization panel
- Photo overlay option

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18.0.0
npm atau yarn atau pnpm
```

### Setup Commands
```bash
# 1. Create Next.js project dengan TypeScript
npx create-next-app@latest kaysa-romantic-demo --typescript --tailwind --app

# 2. Install dependencies
cd kaysa-romantic-demo
npm install framer-motion howler @types/howler lucide-react clsx

# 3. Install dev dependencies
npm install -D @types/node prettier eslint-config-prettier

# 4. Setup Tailwind config
# Edit tailwind.config.js dengan custom colors dan animations

# 5. Start development server
npm run dev
```

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "format": "prettier --write ."
  }
}
```

### Environment Setup
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_AUDIO_PATH=/audio/background-music.mp3
```

## 📝 Notes
- Pastikan hak cipta musik sesuai penggunaan
- Test di berbagai browser dan device
- Optimize untuk performa mobile
- Siapkan fallback untuk browser lama
- Consider accessibility (audio controls, motion sensitivity)