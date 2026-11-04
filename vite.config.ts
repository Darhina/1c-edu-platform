import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Default base is '/' (standard for Vercel, Netlify and custom domains).
  // For GitHub Pages, the deploy command passes --base=/1c-edu-platform/
  base: '/',
});
