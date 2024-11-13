import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Export Vite config
export default defineConfig({
  mode: 'production', // This explicitly sets production mode for builds
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
