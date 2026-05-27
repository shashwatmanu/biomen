/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'biomen-dark': '#030705',
        'biomen-green': '#052E22',
        'biomen-accent': '#16C784',
        'biomen-emerald': '#0FA36B',
        'biomen-mint': '#7FE7B3',
        'biomen-white': '#F4F6F2',
        'biomen-muted': '#A8B3AA',
        'biomen-copper': '#D85A1F',
        'biomen-gold': '#BFA46A',
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
