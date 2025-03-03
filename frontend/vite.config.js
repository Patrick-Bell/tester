import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // or '@vitejs/plugin-react'
import path from 'path';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  base: '/', // ✅ Ensure correct path for production
  server: {
    middlewareMode: true, // ✅ Allows backend to handle routing
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
