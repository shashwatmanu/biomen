/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'biomen-bg-primary': 'var(--color-bg-primary)',
        'biomen-bg-secondary': 'var(--color-bg-secondary)',
        'biomen-surface': 'var(--color-surface)',
        'biomen-accent': 'var(--color-accent)',
        'biomen-emerald': 'var(--color-emerald)',
        'biomen-mint': 'var(--color-mint)',
        'biomen-text-primary': 'var(--color-text-primary)',
        'biomen-text-secondary': 'var(--color-text-secondary)',
        'biomen-copper': 'var(--color-copper)',
        'biomen-copper-dark': 'var(--color-copper-dark)',
        'biomen-gold': 'var(--color-gold)',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
