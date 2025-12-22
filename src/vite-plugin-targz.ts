import path from 'path';
import fs from 'fs';
import * as tar from 'tar';
import type {ResolvedConfig} from "vite";

export interface TarGzPluginOptions {
    fileName?: string;          // 压缩包名称，默认为 'dist'
    outputPath?: string;       // 压缩包输出路径
    folderPath?: string;       // 要压缩的文件夹路径
    enabled?: boolean;         // 是否启用插件
    compressionLevel?: number; // 压缩级别 1-9，默认为 9
}

export default function tarGzPlugin(options: TarGzPluginOptions = {}) {
    const {
        fileName = 'dist',
        outputPath,
        folderPath='./dist',
        enabled = true,
        compressionLevel = 9
    } = options;

    if (!enabled) {
        return {
            name: 'vite-plugin-tar-gz',
            apply: 'build',
            closeBundle: () => {}
        };
    }

    let distPath: string;
    let finalOutputPath: string;

    return {
        name: 'vite-plugin-tar-gz',
        apply: 'build',

        configResolved(config: ResolvedConfig) {
            distPath = folderPath ? path.resolve(folderPath) : path.resolve(config.build.outDir);
            finalOutputPath = outputPath ? path.resolve(outputPath) : path.resolve(distPath, '..');
        },

        async closeBundle() {
            try {
                console.log('🚀 开始生成 tar.gz 压缩包...');

                if (!fs.existsSync(distPath)) {
                    console.warn(`⚠️  目录不存在: ${distPath}`);
                    return;
                }

                const gzFileName = `${fileName}.tar.gz`;
                const gzPath = path.join(finalOutputPath, gzFileName);

                // 确保输出目录存在
                if (!fs.existsSync(finalOutputPath)) {
                    fs.mkdirSync(finalOutputPath, { recursive: true });
                }
                // 创建 tar 包
                await tar.c(
                    {
                        gzip: {
                            level: compressionLevel
                        },
                        file: gzPath,
                        cwd: path.resolve(folderPath), // 设置基准目录
                        prefix:''
                    },
                    ['.'] // 只打包目标目录
                );
                console.log(`✅ tar.gz 压缩包生成成功: ${gzPath}`);
                const stats = fs.statSync(gzPath);
                console.log(`📦 文件大小: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

            } catch (error) {
                console.error('❌ 生成 tar.gz 压缩包时出错:', error);
            }
        }
    };
}
