/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#cf994d",
        "primary-dull": "#a3773a",
      }
    },
  },
  plugins: [],
};
