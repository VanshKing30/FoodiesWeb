/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode based on 'class' attribute
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scan these files for Tailwind CSS classes
  ],
  theme: {
    extend: {
      colors: {
        customColor: '#484b6a',
        customBlue: '#151586',
        aliceblue: '#f0f8ff',
        cadetblue: '#5f9ea0',
        lightcadetblue: '#84bbbd',
      },
      boxShadow: {
        green: '0 0 4px rgba(0, 255, 0, 0.5)',
      },
      borderWidth: {
        '3': '4px', // Custom border width utility
      },
    },
  },
  plugins: [], // No additional Tailwind CSS plugins used
};
