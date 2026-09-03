// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import vueParser from 'vue-eslint-parser'
import tseslint from '@typescript-eslint/parser'

export default withNuxt([
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint,
        extraFileExtensions: ['.vue']
      }
    },
    rules: {
      // Аргументы с префиксом _ считаются намеренно неиспользуемыми
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    }
  }
])
