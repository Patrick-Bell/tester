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
  base: '/assets/',
  build: {
    outDir: '../public',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': process.env.VITE_RAILS_ENV === 'development' ? 'http://localhost:3000' : 'https://minifigs-mania-47c93479337f.herokuapp.com',
    },
    historyApiFallback: true,
  },
  base: '/'
});