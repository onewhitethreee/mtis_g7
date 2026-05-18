import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/orquestacion': {
        target: 'http://localhost:8082',
        changeOrigin: true
      },
      '/rest': {
        target: 'http://localhost:3030',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rest/, '')
      }
    }
  }
})
