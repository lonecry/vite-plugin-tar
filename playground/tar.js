import * as tar from 'tar';
import path from 'path';
import fs from 'fs';

const sourceDir = path.resolve('./dist');
const tarFilePath = path.resolve(sourceDir, 'dist.tar.gz');

async function createArchive() {
    try {
        // 确保 dist 目录存在
        if (!fs.existsSync(sourceDir)) {
            console.error('❌ 错误: dist 目录不存在，请先运行构建命令');
            return;
        }
        
        await tar.c(
            {
                gzip: true,
                file: tarFilePath,  // 应该是 'file' 而不是 'filePath'
                cwd: sourceDir
            },
            ['.']
        );
        console.log(`📦 打包成功: ${tarFilePath}`);
    } catch (e) {
        console.error('❌ 打包失败:', e);
    }
}

createArchive();
