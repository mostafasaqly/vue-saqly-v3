// tailwind.config.js — Tailwind CSS configuration for Vue project
/** @type {import('tailwindcss').Config} */
export default {
  // IMPORTANT: include all Vue files in content array
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  // Dark mode via class strategy (e.g., add 'dark' class to <html>)
  darkMode: 'class',

  theme: {
    extend: {
      // Custom colors matching Vue's brand
      colors: {
        vue: {
          50: '#f0faf6',
          100: '#d4f1e3',
          200: '#a8e3c7',
          300: '#72ceaa',
          400: '#42b883', // Vue's primary green
          500: '#33a06f',
          600: '#26845b',
          700: '#1a6447',
          800: '#134834',
          900: '#0c2f22',
        },
      },
      // Custom fonts
      fontFamily: {
        arabic: ['Noto Sans Arabic', 'Segoe UI', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'monospace'],
      },
      // Custom border radius
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      // Custom shadows
      boxShadow: {
        card: '0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
    },
  },

  plugins: [
    // Add Tailwind plugins here:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}

/*
Installation steps:
1. npm install -D tailwindcss postcss autoprefixer
2. npx tailwindcss init -p
3. Add to src/assets/main.css:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
4. Import in src/main.js:
   import './assets/main.css'
*/
