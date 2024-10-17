/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#5271FF',
        secondary: '#38B6FF',
        accent: '#EC4899',
        hoverPrimary: '#3B61DB',
        hoverSecondary: '#2A91D1',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],  // Added backup fonts
      },
    },
  },
  plugins: [],
}
