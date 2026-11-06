import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import globals from 'globals'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // Vue SFCs: the bug-catching rules only. The stricter presets are template
  // formatting, which the repo leaves to editors.
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
    rules: {
      // The core-rule adjustments typescript-eslint applies to .ts files only
      // (no-redeclare off for overloads, prefer-const and no-var on).
      ...tseslint.configs.eslintRecommended.rules,
      // TypeScript already reports undefined names, and no-undef does not know
      // browser globals or Vite's `define` constants.
      'no-undef': 'off',
      // Guards against clashing with HTML tags in in-DOM templates. Components
      // here are imported and used by PascalCase name (Footer, Sidebar), so a
      // single word cannot clash.
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    // Node scripts and config files run under Node, not the browser.
    files: ['**/*.{mjs,cjs,js}', 'scripts/**'],
    languageOptions: { globals: globals.node },
  },
  {
    // Built/served assets (dist, public, storybook-static), turbo cache and
    // git-ignored agent scratch dirs should never be linted.
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '.agents/**',
      '.superpowers/**',
      'public/**',
      'storybook-static/**',
      '.turbo/**',
      '**/coverage/**',
    ],
  },
  {
    rules: {
      // Public prop and slot types use `any`; retyping them changes published
      // .d.ts and is a separate, changeset-carrying release.
      '@typescript-eslint/no-explicit-any': 'off',
      // A leading underscore marks a deliberately-unused binding — a convention
      // used across the codebase for required-but-unused params and placeholders.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
)
