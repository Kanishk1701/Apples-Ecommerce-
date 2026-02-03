/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      serif: ['"Playfair Display"', 'serif'], // For Headings (Luxury)
      sans: ['"Lato"', 'sans-serif'],        // For Body text (Readable)
    },
    colors: {
      'apples-black': '#1a1a1a', // Softer than pure black
      'apples-gold': '#d4af37',  // Luxurious gold accent
    }
  },
},
  plugins: [],
}