import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      zod: resolve('./packages/validator/node_modules/zod'),
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    globals: false,
    environment: 'node',
    coverage: {
      provider: 'v8',
      include: ['packages/*/src/**'],
      exclude: ['**/node_modules/**', '**/dist/**'],
    },
  },
})
