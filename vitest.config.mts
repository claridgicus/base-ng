import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./projects/base-ng/ui/src/test-setup.ts'],
    globals: true,
    include: ['projects/**/*.spec.ts'],
  },
});
