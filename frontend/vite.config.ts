import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [vue()],
  root: resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/js', import.meta.url)),
      'styles': fileURLToPath(new URL('./src/scss', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://backend:8000/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/api/, ''),
      }
    }
  },
  test: {
    environment: 'jsdom',
  }
}));
