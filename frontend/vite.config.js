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
  build: {
    outDir: "dist",  // Ensures all output goes into "dist/"
    emptyOutDir: true,  // Clears old files before building
  },
  base: '/',  // Ensure correct path for assets
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
