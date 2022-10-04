/** @type {import('tailwindcss').Config} */

const {
  mclTheme,
  mclHeading,
} = require('./src/components/manguito-theme/themeVariables.cjs')
module.exports = {
  content: ['./src/**/*.{vue,ts,js,cjs}'],
  theme: mclTheme,
  plugins: [mclHeading],
}
