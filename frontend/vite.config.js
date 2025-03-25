import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';



export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
  ], 
  build: {
    outDir: '../public',
    emptyOutDir: true,
    manifest: true,
    assetsDir: 'assets'
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': 'https://minifigs-mania-47c93479337f.herokuapp.com',
    }
  },
  base: './'
});