import type { Config } from 'tailwindcss'
import { mclTheme } from './src/components/manguito-theme/lib/mclTheme'

export default {
  content: [
    './src/components/**/*.{vue,ts,js,cjs}',
    './src/stories/**/*.{vue,ts}',
  ],
  plugins: [mclTheme({})],
} satisfies Config
