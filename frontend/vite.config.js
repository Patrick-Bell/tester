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
  root: path.resolve(__dirname, './'), // Current directory since you're already in frontend
  build: {
    outDir: '../public', // Build to Rails public directory
    emptyOutDir: true,
  },
  base: '/', // This should be fine if serving from domain root
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Resolve @ to src in current directory
    },
  },
  server: {
    historyApiFallback: true,
  },
});