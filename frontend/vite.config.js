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
  root: '../frontend',
  build: {
    outDir: '../backend/public', // Make sure this points to the Rails public folder
    assetsDir: '',                      // Ensure Vite's assets are placed in the correct folder
    manifest: true,                     // Generate manifest.json for asset management
  },
  base: '/',  // Ensure correct path for assets
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
