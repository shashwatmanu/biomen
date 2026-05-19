/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'biomen-green': '#0B1C14',
        'biomen-olive': '#1B2B24',
        'biomen-silver': '#C0C0C0',
        'biomen-accent': '#00d671', // Keeping the accent for highlights
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
