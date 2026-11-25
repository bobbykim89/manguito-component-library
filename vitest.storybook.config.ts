import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// Every Storybook story runs as a Vitest browser test, with the a11y addon's
// axe check after render. Kept out of vitest.config.ts so `pnpm test` stays
// browser-free; run it with `pnpm test:storybook`. `--config` skips
// vite.config.ts, so it is merged in for the Vue plugin and the `@` alias.
export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
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
