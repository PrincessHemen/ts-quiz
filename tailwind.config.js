/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      fontFamily: {
        eczar: ['Eczar', 'serif'],
        catamaran: ['Catamaran', 'sans-serif'], // Adding Catamaran to the font family list
      },
    },
  },
  plugins: [],
}

