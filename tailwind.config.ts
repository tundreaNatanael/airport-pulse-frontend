import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        text: '#0e0916',
        background: '#f8f6fb',
        primary: '#7b54ba',
        secondary: '#d494cd',
        accent: '#cb7dae',
      },
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
      boxShadow: {
        glow: '0 10px 35px rgba(123, 84, 186, 0.28)',
      },
    },
  },
  plugins: [],
}

export default config
