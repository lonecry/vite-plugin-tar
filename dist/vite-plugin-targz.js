import t from "path";
import e from "fs";
import h from "zlib";
import * as P from "tar";
function $(p = {}) {
  const {
    fileName: c = "dist",
    outputPath: u,
    folderPath: m,
    enabled: f = !0,
    compressionLevel: d = 9
  } = p;
  if (!f)
    return {
      name: "vite-plugin-tar-gz",
      apply: "build",
      closeBundle: () => {
      }
    };
  let r, o;
  return {
    name: "vite-plugin-tar-gz",
    apply: "build",
    configResolved(a) {
      r = m ? t.resolve(m) : t.resolve(a.build.outDir), o = u ? t.resolve(u) : t.resolve(r, "..");
    },
    async closeBundle() {
      try {
        if (console.log("🚀 开始生成 tar.gz 压缩包..."), !e.existsSync(r)) {
          console.warn(`⚠️  目录不存在: ${r}`);
          return;
        }
        const a = `${c}.tar`, g = `${c}.tar.gz`, i = t.join(o, a), n = t.join(o, g);
        e.existsSync(o) || e.mkdirSync(o, { recursive: !0 }), [i, n].forEach((s) => {
          e.existsSync(s) && e.unlinkSync(s);
        }), await P.c(
          {
            gzip: !1,
            // 先创建.tar包，再单独进行gzip压缩
            file: i,
            cwd: t.dirname(r)
            // 设置基准目录
          },
          [t.basename(r)]
          // 只打包目标目录
        ), await new Promise((s, z) => {
          const y = h.createGzip({
            level: d
          }), S = e.createReadStream(i), l = e.createWriteStream(n);
          S.pipe(y).pipe(l), l.on("finish", () => {
            e.unlinkSync(i), console.log(`✅ tar.gz 压缩包生成成功: ${n}`);
            const v = e.statSync(n);
            console.log(`📦 文件大小: ${(v.size / 1024 / 1024).toFixed(2)} MB`), s();
          }), l.on("error", z);
        });
      } catch (a) {
        console.error("❌ 生成 tar.gz 压缩包时出错:", a);
      }
    }
  };
}
export {
  $ as default
};
//# sourceMappingURL=vite-plugin-targz.js.map
