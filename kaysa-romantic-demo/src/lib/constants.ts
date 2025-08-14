// Animation constants
export const ANIMATION_DURATIONS = {
  MATRIX_EFFECT: 5000,
  SHAPE_FORMATION: 3000,
  TEXT_REVEAL: 4000,
  TRANSITION: 1000
} as const;

export const PARTICLE_CONFIGS = {
  HEART: {
    count: 30,
    speed: { min: 0.5, max: 2 },
    size: { min: 2, max: 6 },
    color: ['#ff69b4', '#e91e63', '#fbbf24'],
    shape: 'heart' as const,
    gravity: 0.01,
    friction: 0.99
  },
  STAR: {
    count: 25,
    speed: { min: 0.5, max: 2 },
    size: { min: 2, max: 6 },
    color: ['#fbbf24', '#f59e0b', '#c084fc'],
    shape: 'star' as const,
    gravity: 0.01,
    friction: 0.99
  },
  FIREWORKS: {
    count: 80,
    speed: { min: 1, max: 4 },
    size: { min: 2, max: 6 },
    color: ['#ff69b4', '#fbbf24', '#c084fc', '#00ff41'],
    shape: 'circle' as const,
    gravity: 0.01,
    friction: 0.99
  }
} as const;

// Audio constants
export const AUDIO_CONFIG = {
  DEFAULT_VOLUME: 0.5,
  FADE_DURATION: 1000,
  PRELOAD: true,
  LOOP: true
} as const;

// Theme colors
export const THEME_COLORS = {
  MATRIX: '#00ff41',
  ROMANTIC: '#ff69b4',
  GOLD: '#fbbf24',
  MAGIC: '#c084fc',
  BLACK: '#000000',
  WHITE: '#ffffff'
} as const;

// Z-index layers
export const Z_INDEX = {
  MATRIX: 50,
  SHAPE_FORMATION: 40,
  TEXT_REVEAL: 30,
  AUDIO_CONTROLLER: 30,
  LYRICS: 20,
  BACKGROUND: 10
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

// Matrix characters for rain effect
export const MATRIX_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

// Animation sequence phases
export const ANIMATION_PHASES = {
  MATRIX: 'matrix',
  HEART: 'heart',
  STAR: 'star',
  FIREWORKS: 'fireworks',
  TEXT_REVEAL: 'text-reveal',
  LYRICS: 'lyrics'
} as const;
