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
    outDir: '../backend/public', // Ensure that Vite's build output is directed to backend's public folder
    assetsDir: 'assets',         // Place assets like JS and CSS under the 'assets' directory inside public
  },
  base: '/',  // Ensure correct path for assets
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
