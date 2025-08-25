import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';

const config: UserConfig = {
  root: './',
  resolve: {
    // add alias
  },
  plugins: [react(), Inspect()],
  server: {
    open: true,
    port: 3030,
    host: '127.0.0.1',
  },
  build: {
    minify: true,
    sourcemap: false, // nếu muốn debug có thể để true
    rollupOptions: {
      external: ['@rsuite/icons'],
    },
    outDir: "dist",
  },
  define: {
    global: "globalThis", // ✅ an toàn hơn {}
  },
};

export default defineConfig(config);