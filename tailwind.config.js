/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customColor: '#484b6a',
        aliceblue: '#f0f8ff',
        cadetblue: '#5f9ea0',
        lightcadetblue: '#84bbbd'
      },
      boxShadow: {
        green: '0 0 4px rgba(0, 255, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

