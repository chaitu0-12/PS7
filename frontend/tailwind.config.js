/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        pastel: {
          lavender: '#E6E6FA',
          mint: '#E0F7F1',
          peach: '#FFE5D9',
          sky: '#E3F2FD',
        },
        neon: {
          cyan: '#00f3ff',
          purple: '#bc13fe',
        },
        dark: {
          bg: '#0B0F19',
          card: '#1A1F2E',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
