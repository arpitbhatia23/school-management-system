import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// Load environment variables based on mode (e.g., development or production)
export default defineConfig(({ mode }) => {
  // Load the environment variables based on the mode
  const env = loadEnv(mode, process.cwd(), '');

  console.log(env.VITE_BASE_URL);
  return {
    server: {
      proxy: {
        '/api/v1': env.VITE_BASE_URL,
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
