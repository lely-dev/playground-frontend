/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
    colors: {
      'red': '#ea0303',
      'nav-green': '#0e3939',
      'light-green': '#1D7373',
      'dark-green': '#042326',
      'white': '#FFFFFF',
      'shadow-green': '#93D8D3'
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
}


