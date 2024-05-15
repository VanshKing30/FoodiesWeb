/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        green: '0 0 4px rgba(0, 255, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

