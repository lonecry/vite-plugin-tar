import e from "path";
import t from "fs";
import S from "zlib";
import * as P from "tar";
function $(u = {}) {
  const {
    fileName: c = "dist",
    outputPath: p,
    folderPath: a = "./dist",
    enabled: m = !0,
    compressionLevel: f = 9
  } = u;
  if (!m)
    return {
      name: "vite-plugin-tar-gz",
      apply: "build",
      closeBundle: () => {
      }
    };
  let i, r;
  return {
    name: "vite-plugin-tar-gz",
    apply: "build",
    configResolved(o) {
      i = a ? e.resolve(a) : e.resolve(o.build.outDir), r = p ? e.resolve(p) : e.resolve(i, "..");
    },
    async closeBundle() {
      try {
        if (console.log("🚀 开始生成 tar.gz 压缩包..."), !t.existsSync(i)) {
          console.warn(`⚠️  目录不存在: ${i}`);
          return;
        }
        const o = `${c}.tar`, d = `${c}.tar.gz`, n = e.join(r, o), s = e.join(r, d);
        t.existsSync(r) || t.mkdirSync(r, { recursive: !0 }), await P.c(
          {
            gzip: !1,
            // 先创建.tar包，再单独进行gzip压缩
            file: n,
            cwd: e.resolve(a),
            // 设置基准目录
            prefix: ""
          },
          ["."]
          // 只打包目标目录
        ), await new Promise((g, z) => {
          const v = S.createGzip({
            level: f
          }), h = t.createReadStream(n), l = t.createWriteStream(s);
          h.pipe(v).pipe(l), l.on("finish", () => {
            t.unlinkSync(n), console.log(`✅ tar.gz 压缩包生成成功: ${s}`);
            const y = t.statSync(s);
            console.log(`📦 文件大小: ${(y.size / 1024 / 1024).toFixed(2)} MB`), g();
          }), l.on("error", z);
        });
      } catch (o) {
        console.error("❌ 生成 tar.gz 压缩包时出错:", o);
      }
    }
  };
}
export {
  $ as default
};
//# sourceMappingURL=vite-plugin-targz.js.map
