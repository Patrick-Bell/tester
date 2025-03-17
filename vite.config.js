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
  root: path.resolve(__dirname, '../frontend'),  // Absolute path to the frontend directory
  build: {
    outDir: path.resolve(__dirname, '../backend/public/vite'),  // Output directory for assets in backend/public
    assetsDir: 'assets',  // Assets will be placed under backend/public/vite/assets
    manifest: true,  // Generates the manifest for Rails to use
    emptyOutDir: true,  // Empty out the output directory before building
  },
  base: '/',  // Root for asset URLs (make sure it works with your Rails routes)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../frontend/src'),  // Resolves '@' to frontend/src
    },
  },
});
