import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target:       'http://localhost:8080',
        changeOrigin: true,
        secure:       false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying:', req.method, req.url, '→', 'http://localhost:8080' + req.url);
          });
          proxy.on('error', (err) => {
            console.log('Proxy error:', err.message);
          });
        },
      }
    }
  }
})