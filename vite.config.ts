import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/vite-plugin-tar.ts'),
            name: 'vite-plugin-tar',
            fileName: 'vite-plugin-tar',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['tar', 'minipass', 'fs', 'path', 'zlib'],
            output: {
                // 确保在 UMD 构建中正确处理 Node.js 模块
                globals: {
                    path: 'path',
                    fs: 'fs',
                    zlib: 'zlib'
                }
            }
        },
        // 生成类型声明文件
        sourcemap: true
    },
    optimizeDeps: {
        exclude: ['tar', 'minipass', 'fs', 'path', 'zlib']
    }
})
