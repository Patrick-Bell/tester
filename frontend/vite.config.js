// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // or '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import svgr from "vite-plugin-svgr";




export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr()
  ],
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'public/assets', // ✅ Ensure correct path
    manifest: true,
  },
  base: './',  // ✅ Ensure correct path
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
