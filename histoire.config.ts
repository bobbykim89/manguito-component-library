import { defaultColors, defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  plugins: [HstVue()],
  setupFile: 'src/histoire.setup.ts',
  outDir: 'dist',
  theme: {
    title: 'Manguito Components Library',
    logo: {
      square: '/mcl-logo-square.png',
      light: '/mcl-logo-light.png',
      dark: '/mcl-logo-dark.png',
    },
    favicon: './favicon.ico',
    logoHref: 'https://manguitopage.herokuapp.com/',
    colors: {
      primary: defaultColors.amber,
    },
  },
  tree: {
    groups: [
      {
        id: 'design-system',
        title: 'Design System',
      },
      {
        id: 'base-comp',
        title: 'Base Components',
      },
      {
        id: 'section-comp',
        title: 'Section Components',
      },
    ],
  },
})
