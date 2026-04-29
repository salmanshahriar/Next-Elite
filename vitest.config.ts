import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    include: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/e2e/**',
      '.next/**',
      '.storybook/**',
      '**/*.stories.{ts,tsx}',
    ],
    env: {
      SKIP_ENV_VALIDATION: 'true',
    },
  },
});
