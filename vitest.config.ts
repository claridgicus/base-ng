import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./projects/base-ng/ui/src/test-setup.ts'],
  },
});
