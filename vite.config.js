// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['@react-pdf/renderer'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  build: {
    sourcemap: true,
    target: 'es2020',
    commonjsOptions: {
      include: [/@react-pdf\/renderer/, /node_modules/],
    },
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});