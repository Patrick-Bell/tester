import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // or '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy API requests to Rails backend in development
    },
    https: true, // Enable HTTPS for Vite server if required in dev
  },
  base: '/',  // Ensure correct path for assets
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
