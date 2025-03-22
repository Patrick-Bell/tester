import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ], 
  build: {
    outDir: 'public', // Make sure this path is correct and points to your main HTML file
    assetsDir: '',
    manifest: true,
    emptyOutDir: true,
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  base: './'
});