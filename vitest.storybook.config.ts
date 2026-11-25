import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Every Storybook story runs as a Vitest browser test, with the a11y addon's
// axe check after render. Run it with `pnpm test:storybook`; it is also a
// project in vitest.config.ts (for Storybook's sidebar runner), which
// `pnpm test` excludes so it stays browser-free. Neither entry loads
// vite.config.ts, so it is merged in for the Vue plugin and the `@` alias.
export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [
      storybookTest({
        // Storybook's sidebar runner filters on `storybook:<its config dir>`
        // and the plugin names the project from this option, so reuse the
        // directory Storybook passes when it launches Vitest.
        configDir:
          process.env.STORYBOOK_CONFIG_DIR ?? path.join(dirname, '.storybook'),
      }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: playwright(),
        instances: [{ browser: 'chromium' }],
      },
    },
  }),
)
