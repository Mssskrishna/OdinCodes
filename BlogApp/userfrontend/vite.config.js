import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests starting with /api to your backend server
      '/api': {
        target: 'http://localhost:3000', // Replace with your backend URL
        changeOrigin: true, // This is important for virtual hosted sites
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: if your backend doesn't use the /api prefix
      },
    },
  },
})
