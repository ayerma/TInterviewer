import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig(({ command }) => ({
  plugins: [solidPlugin()],
  base: command === 'build' ? '/TInterviewer/' : '/',
  build: {
    target: 'esnext',
  },
}));
