import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        matrix: '#00ff41',
        romantic: {
          50: '#fef7ff',
          100: '#fce7fe',
          200: '#f8d3fc',
          300: '#f2b2f7',
          400: '#e879f0',
          500: '#ff69b4',
          600: '#e91e63',
          700: '#d91655',
          800: '#b91447',
          900: '#831843'
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        magic: {
          50: '#f3f4f6',
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87'
        }
      },
      animation: {
        'matrix-rain': 'matrix-rain 3s linear infinite',
        'color-shift': 'color-shift 4s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        'color-shift': {
          '0%, 100%': { color: '#00ff41' },
          '25%': { color: '#ff69b4' },
          '50%': { color: '#fbbf24' },
          '75%': { color: '#c084fc' }
        },
        'sparkle': {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'glow': {
          '0%': { textShadow: '0 0 10px currentColor' },
          '100%': { textShadow: '0 0 20px currentColor, 0 0 30px currentColor' }
        }
      },
      fontFamily: {
        'romantic': ['var(--font-dancing-script)', 'Dancing Script', 'cursive'],
        'elegant': ['var(--font-playfair-display)', 'Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
};
export default config;
