/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#172033',
          950: '#0B1120'
        },
        onec: {
          yellow: {
            DEFAULT: '#FBBF24',
            light: '#FEF08A',
            lighter: '#FEF9C3',
            50: '#FFFBEB',
            100: '#FEF3C7',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            brand: '#FFCC00',
            hover: '#E5B700',
            dark: '#D4A000'
          },
          red: {
            DEFAULT: '#DC2626',
            light: '#F87171',
            dark: '#B91C1C',
            accent: '#C53030'
          },
          slate: {
            850: '#172033',
            950: '#0B1120'
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Courier New', 'monospace']
      }
    },
  },
  plugins: [],
}
