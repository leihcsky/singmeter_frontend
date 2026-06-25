import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          // Heavy audio libs — only pulled in by tool pages, keep isolated
          if (/[\\/]node_modules[\\/]tone[\\/]/.test(id)) return 'tone'
          if (/[\\/]node_modules[\\/]pitchy[\\/]/.test(id)) return 'pitchy'
          if (/[\\/]node_modules[\\/]react-router/.test(id)) return 'react-router'
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) return 'react'
          return 'vendor'
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
