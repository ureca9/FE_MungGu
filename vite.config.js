import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
  },
  optimizeDeps: {
    include: ['msw'],
  },
<<<<<<< HEAD
});
=======
  resolve: {
    extensions: ['.js', '.jsx'],
  },
});
>>>>>>> f9ddb28a09dd76610f5d097851668f0d04c5391b
