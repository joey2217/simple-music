/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
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
