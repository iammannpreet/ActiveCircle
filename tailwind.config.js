const { orange } = require('@mui/material/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#ff833f',
        darkGray: '#545454',
        lightGray: '#d7d7d7',
        orange: {
          DEFAULT: '#ff833f',
          100: '#ffe4d2',
          200: '#ffc2a1',
          300: '#ffa370',
          400: '#ff833f',
          500: '#e57133',
          600: '#cc6028',
          700: '#b34f1d',
          800: '#993e12',
          900: '#802f08',
        },
      },
      cursor: {
        none: 'none',
      },
      scale: {
        115: '1.15',
        120: '1.2',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
        interthin: ['InterThin', 'sans-serif'],
      },
      boxShadow: {
        'custom-lifted': '0 15px 30px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        underline: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        'underline-1': 'underline 1s forwards',
        'underline-2': 'underline 1s 1s forwards',
        'underline-3': 'underline 1s 2s forwards',
        scroll: 'scroll 20s linear infinite',
      },
    },
  },
  plugins: [],
};