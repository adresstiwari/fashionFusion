import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Remove the proxy for production
  },
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable sourcemaps for smaller build size
    rollupOptions: {
      external: []
    }
  },
  // Add this for proper routing in production
  define: {
    'process.env': {}
  }
})