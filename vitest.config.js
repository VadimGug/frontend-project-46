/* eslint-disable import/no-unresolved, import/extensions */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },

      exclude: [
        'bin/**',
        'src/index.js',
        '**/*.config.*',
        '__tests__/**',
      ],
    },
  },
});
