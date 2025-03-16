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
    outDir: '../backend/public',  // This puts the compiled assets in the Rails 'public' folder
    assetsDir: 'assets',                // Ensure assets go directly into the 'public' folder
    manifest: true,               // Enables asset management in Rails
  },  
  base: '/',  // Ensure correct path for assets
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend/src'),  // Path resolution for the frontend
    },
  },
});
