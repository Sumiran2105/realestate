/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0b2545',
          light: '#60a5fa',
          soft: '#dbeafe',
        },
      },
    },
  },
  plugins: [],
}