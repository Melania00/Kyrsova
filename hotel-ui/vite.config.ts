import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This tells Vite: "Any request starting with /api should go to the .NET backend"
      '/api': {
        target: 'http://localhost:5064', 
        changeOrigin: true,
        secure: false, 
      },
    },
  },
});