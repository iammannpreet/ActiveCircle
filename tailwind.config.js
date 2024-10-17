/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#F59E0B',
        accent: '#EC4899',
      }
    },
  },
  plugins: [],
}

