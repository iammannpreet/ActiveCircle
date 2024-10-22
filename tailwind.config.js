const { orange } = require('@mui/material/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    orange: '#ff833f',
    extend: {
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
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],  // Added backup fonts
      },
      boxShadow: {
        'custom-lifted': '0 15px 30px rgba(0, 0, 0, 0.5)', // Adjust shadow size and intensity
      },
      keyframes: {
        expandEffect: {
          '0%': { transform: 'scale(0) rotate(45deg)', opacity: '0' },
          '93%': { transform: 'scale(0) rotate(45deg)', opacity: '0.1' },
          '95%': { transform: 'scale(4) rotate(45deg)', opacity: '0.6' },
          '100%': { transform: 'scale(50) rotate(45deg)', opacity: '0' },
        },
      },
      animation: {
        expandEffect: 'expandEffect 2s forwards',
      },
    },
  },
  plugins: [],
};
