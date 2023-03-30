/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  darkMode:['class'],
  content: [
    "./src/renderer/**/*.{jsx,tsx,html}",
  ],
  theme: {
    colors: {
      primary: '#8bbb11'
    },
    extend: {},
  },
  plugins: [],
}
