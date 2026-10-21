import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      react: path.resolve(import.meta.dirname, '../node_modules/react'),
      'react-dom': path.resolve(import.meta.dirname, '../node_modules/react-dom'),
    },
    dedupe: ['react', 'react-dom'],
  },
});
