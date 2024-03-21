/** @type {import('tailwindcss').Config} */

const {
  mclTheme,
} = require('./src/components/manguito-theme/themeVariables.cjs')

module.exports = {
  content: ['./src/**/*.{vue,ts,js,cjs}'],
  plugins: [mclTheme()],
}
