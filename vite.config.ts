import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,

    chunkSizeWarningLimit: 1000 // Adjust the limit as needed
  },
  preview: {
    host: true,
    port:8080,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
