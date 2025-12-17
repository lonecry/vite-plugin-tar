// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/vite-plugin-tar.ts'),
            name: 'vite-plugin-tar',
            // the proper extensions will be added
            fileName: 'vite-plugin-tar'
        } ,
        rollupOptions: {
            external: ['tar', 'minipass', 'fs', 'path', 'zlib']
        }
    },
    // 配置 Node.js 模块的外部化
    optimizeDeps: {
        exclude: ['tar', 'minipass', 'fs', 'path', 'zlib']
    }
})
