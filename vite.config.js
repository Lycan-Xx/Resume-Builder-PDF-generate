// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react', 'react', 'react-dom', 'react-router-dom'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  build: {
    sourcemap: true,
    target: 'esnext'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
