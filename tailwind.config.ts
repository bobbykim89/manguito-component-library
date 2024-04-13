import type { Config } from 'tailwindcss'
import { mclTheme } from './src/components/manguito-theme/mclTheme'

export default {
  content: ['./src/**/*.{vue,ts,js,cjs}'],
  plugins: [mclTheme({})],
} satisfies Config
