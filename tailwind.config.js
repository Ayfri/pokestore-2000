/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-thick': 'inset 2px 2px 4px rgba(0, 0, 0, 0.3)',
        'outer-thick': '3px 3px 6px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-metal': 'linear-gradient(145deg, #e6e6e6 0%, #ffffff 100%)',
      }
    },
  },
  plugins: [],
}