import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteplugintargz from '../dist/vite-plugin-targz.js'

export default defineConfig({
  plugins: [vue(),
    viteplugintargz({
      fileName: 'dist',
      outputPath: './dist'
    })],
})
