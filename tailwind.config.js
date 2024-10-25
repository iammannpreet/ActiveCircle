const { orange } = require('@mui/material/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    orange: '#ff833f',
    extend: {
      cursor: {
        'none': 'none', // Custom cursor style
      },
      scale: {
        '115': '1.15',  // Scale by 115%
        '120': '1.2',   // Scale by 120%
      },
      colors: {
        orange: '#ff833f',
        darkGray: '#545454', // Custom dark gray color
        lightGray: '#d7d7d7', // Custom light gray color
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'], interthin: ['InterThin', 'sans-serif'],  // Added backup fonts
      },
      boxShadow: {
        'custom-lifted': '0 15px 30px rgba(0, 0, 0, 0.5)', // Adjust shadow size and intensity
      },
      keyframes: {
        underline: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        'underline-1': 'underline 1s forwards',
        'underline-2': 'underline 1s 1s forwards', // starts after 1s delay
        'underline-3': 'underline 1s 2s forwards', // starts after 2s delay
      },
    },
  },
  plugins: [],
};
