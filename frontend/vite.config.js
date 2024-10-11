import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Forward to backend server
        changeOrigin: true, // Adjust the origin of the host header to the target URL
         // Optional, depending on your backend API routes
      },
    },
  },
});
