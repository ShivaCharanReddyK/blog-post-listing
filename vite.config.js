import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/blog-post-listing/', // ⚠️ change this
  plugins: [react()],
});
