import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteplugintar from '../dist/vite-plugin-tar.js'

export default defineConfig({
  plugins: [vue(),
    viteplugintar({
      fileName: 'dist',
      outputPath: './dist'
    })],
})
