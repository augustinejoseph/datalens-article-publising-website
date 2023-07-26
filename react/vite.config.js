import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, 
        drop_debugger: true, 
      },
    },
  },
  server: {
    port: 3000, 
  },
})
