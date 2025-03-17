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
  root: '../frontend',  // Root directory of your frontend code
  build: {
    outDir: '../backend/public',  // Output the compiled assets to the backend public folder under `vite`
    assetsDir: '',  // No separate assets directory; put them directly into the `vite` folder
    manifest: true,  // Ensures that Vite generates a manifest file for Rails to reference
    emptyOutDir: true,
  },  
  base: '/',  // Make sure asset URLs are rooted correctly
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../frontend/src'),  // Path resolution for the frontend
    },
  },
});
