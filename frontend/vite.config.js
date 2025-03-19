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
    outDir: '../public', // Ensure build output goes to Rails `public/`
    assetsDir: 'vite/assets', // Keep assets inside `public/vite/`
    manifest: true, // Generates manifest.json for Rails to use
    emptyOutDir: true, // Clears the directory before building
  },
  base: '/',  // Root for asset URLs (make sure it works with your Rails routes)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../frontend/src'),  // Resolves '@' to frontend/src
    },
  },
  server: {
    historyApiFallback: true,  // Ensure Vite serves index.html for all routes
  },
});
