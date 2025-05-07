import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';




export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ], 
  build: {
    outDir: '../public',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  server: {
    historyApiFallback: true,
  },
  base: '/'
});