import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        runway: {
          50: '#f2f8ff',
          100: '#dceeff',
          400: '#5aa4ff',
          500: '#2f8dff',
          700: '#1f5fb0',
          900: '#0b1d36',
        },
      },
      boxShadow: {
        glow: '0 10px 35px rgba(47, 141, 255, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config
