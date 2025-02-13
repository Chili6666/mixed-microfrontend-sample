import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
//import { dependencies } from './package.json'

export default defineConfig({
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  plugins: [
    react(),
    federation({
      name: 'mfe3',
      filename: 'remoteEntry.js',
      exposes: {
        './remote-app': './src/App.tsx'
      },
      shared: {
        react: {
          //singleton: true,
          requiredVersion: "18.3.1",
          //eager: true
        },
        'react-dom': {
          //singleton: true,
          requiredVersion: "18.3.1",
          //eager: true
        }
      }
    })
  ]
})