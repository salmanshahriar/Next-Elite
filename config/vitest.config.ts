import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [react()],
  test: {
    exclude: ['**/node_modules/**', '**/e2e/**', '.next/**'],
    env: {
      SKIP_ENV_VALIDATION: 'true',
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['**/*.test.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'dom',
          environment: 'jsdom',
          include: ['**/*.test.tsx'],
          setupFiles: ['config/vitest.setup.ts'],
        },
      },
    ],
  },
});
