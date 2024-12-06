import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            kakaoApiKey: env.VITE_KAKAO_API_KEY,
          },
        },
      }),
    ],
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.[jt]sx?$/,
    },
    optimizeDeps: {
      include: ['msw'],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
  };
});