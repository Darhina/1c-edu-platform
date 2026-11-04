import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/1c-edu-platform/', // Base path for GitHub Pages (https://Darhina.github.io/1c-edu-platform/)
});
