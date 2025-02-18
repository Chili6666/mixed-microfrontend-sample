import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // All components starting with "inf-" are web components
          isCustomElement: tag => tag.startsWith('react-'),
        },
      },
    }),
    federation({
      name: 'app-shell',
      remotes: {
        mfe1: 'http://localhost:4001/assets/remoteEntry.js',
        mfe2: 'http://localhost:4002/assets/remoteEntry.js',
        mfe3: 'http://localhost:4003/assets/remoteEntry.js'
      },
      shared: ['vue', 'react', 'react-dom']
    })
  ],
  server: {
    port: 5000
  },
  build: {
    minify: true
  }
})