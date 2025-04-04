import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Proxy Rails API requests
    },
  },
  build: {
    outDir: "public",
    assetsDir: 'assets'
  }
});
