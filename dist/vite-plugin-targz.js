import e from "path";
import l from "fs";
import * as d from "tar";
function v(n = {}) {
  const {
    fileName: c = "dist",
    outputPath: a,
    folderPath: i = "./dist",
    enabled: u = !0,
    compressionLevel: g = 9
  } = n;
  if (!u)
    return {
      name: "vite-plugin-tar-gz",
      apply: "build",
      closeBundle: () => {
      }
    };
  let o, r;
  return {
    name: "vite-plugin-tar-gz",
    apply: "build",
    configResolved(t) {
      o = i ? e.resolve(i) : e.resolve(t.build.outDir), r = a ? e.resolve(a) : e.resolve(o, "..");
    },
    async closeBundle() {
      try {
        if (console.log("🚀 开始生成 tar.gz 压缩包..."), !l.existsSync(o)) {
          console.warn(`⚠️  目录不存在: ${o}`);
          return;
        }
        const t = `${c}.tar.gz`, s = e.join(r, t);
        l.existsSync(r) || l.mkdirSync(r, { recursive: !0 }), await d.c(
          {
            gzip: {
              level: g
            },
            file: s,
            cwd: e.resolve(i),
            // 设置基准目录
            prefix: ""
          },
          ["."]
          // 只打包目标目录
        ), console.log(`✅ tar.gz 压缩包生成成功: ${s}`);
        const p = l.statSync(s);
        console.log(`📦 文件大小: ${(p.size / 1024 / 1024).toFixed(2)} MB`);
      } catch (t) {
        console.error("❌ 生成 tar.gz 压缩包时出错:", t);
      }
    }
  };
}
export {
  v as default
};
//# sourceMappingURL=vite-plugin-targz.js.map
