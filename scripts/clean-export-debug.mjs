// Next.js 16.2.x + `output: "export"` 会在 out/ 下写一批 RSC debug artifact
// （__next._tree.txt、index.txt、_not-found.txt、<slug>.txt 等），并且给动态路由
// 生成只有 .txt 的目录（如 out/projects/<slug>/），目录里没有 index.html。
// 用 python3 -m http.server 预览时，访问 trailing-slash 路径会因找不到 index.html
// 而列出这些 debug 文件。本脚本在 build 后清掉它们，让本地静态预览恢复正常。
// 只删 Next.js 生成的 debug 物，不动任何真实静态资源（.html/.svg/.png/.js/.css 等）。

import { readdir, stat, unlink, rmdir } from "node:fs/promises";
import { join, basename } from "node:path";

const OUT_DIR = join(process.cwd(), "out");

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

// 递归列出 out/ 下所有文件（绝对路径）
async function collectFiles(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    const st = await stat(full);
    if (st.isDirectory()) {
      out.push(...(await collectFiles(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

// 判断是否为 Next.js 的 debug artifact
async function isDebugFile(filePath) {
  const name = basename(filePath);

  // 1) 所有 __next.*.txt（route tree snapshot、head、full 等）
  if (name.startsWith("__next")) return true;

  // 2) 顶层 index.txt / _not-found.txt
  if (name === "index.txt" || name === "_not-found.txt") return true;

  // 3) 与同名 .html 成对的 .txt（如 out/projects/<slug>.txt）
  if (name.endsWith(".txt")) {
    const htmlPath = filePath.slice(0, -4) + ".html";
    if (await exists(htmlPath)) return true;
  }

  return false;
}

// 删除空目录（自底向上，不删 out 本身）
async function removeEmptyDirs(dir) {
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    const st = await stat(full).catch(() => null);
    if (st && st.isDirectory()) {
      await removeEmptyDirs(full);
    }
  }
  // 子目录处理完后，若当前目录已空则删除（保留 out 根）
  if (dir !== OUT_DIR) {
    const remaining = await readdir(dir).catch(() => []);
    if (remaining.length === 0) {
      await rmdir(dir).catch(() => {});
    }
  }
}

async function main() {
  if (!(await exists(OUT_DIR))) {
    console.log("[clean-export-debug] out/ 不存在，跳过");
    return;
  }

  const files = await collectFiles(OUT_DIR);
  let removed = 0;

  for (const file of files) {
    if (await isDebugFile(file)) {
      await unlink(file).catch(() => {});
      removed++;
    }
  }

  await removeEmptyDirs(OUT_DIR);

  console.log(`[clean-export-debug] 已清理 ${removed} 个 debug 文件及空目录`);
}

main().catch((err) => {
  console.error("[clean-export-debug] 失败:", err);
  process.exit(1);
});
