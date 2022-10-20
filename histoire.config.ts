import { defaultColors, defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: 'src/histoire.setup.ts',
  outDir: 'docs',
  theme: {
    title: 'Manguito Components Library',
    logo: {
      square: '/logo192.png',
      light: '/mcl-logo-light.png',
      dark: '/mcl-logo-dark.png',
    },
    favicon: './favicon.ico',
    logoHref: 'https://manguitopage.herokuapp.com/',
    colors: {
      primary: defaultColors.amber,
    },
  },
})
