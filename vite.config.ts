import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 3004 },
  preview: { port: 3004 },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
    },
  },
})
