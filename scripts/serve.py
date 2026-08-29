#!/usr/bin/env python3
# 本地预览 Next.js `output: "export"` 产物，支持 clean URL（无 .html 后缀）。
# Next.js export 默认生成 /projects/<slug>.html，而站内链接是 /projects/<slug>。
# python3 -m http.server 不会把 clean URL 映射到 .html，导致本地预览 404。
# 本脚本补齐这层映射，替代 `python3 -m http.server` 使用。
#
# 用法：python3 scripts/serve.py [端口]      # 默认 3003，serve out/

import http.server
import os
import sys

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "out"))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 3003


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def translate_path(self, path):
        raw = super().translate_path(path)
        # 只对落在 out/ 内的路径做 clean URL 重写
        if not raw.startswith(ROOT):
            return raw

        # 目录 -> index.html（如 /foo/ -> /foo/index.html）
        if os.path.isdir(raw):
            idx = os.path.join(raw, "index.html")
            if os.path.isfile(idx):
                return idx

        # 文件已存在，直接返回
        if os.path.exists(raw):
            return raw

        # clean URL -> .html（/foo 或 /foo/ -> /foo.html）
        bare = raw.rstrip("/")
        if not os.path.splitext(bare)[1]:
            html = bare + ".html"
            if os.path.isfile(html):
                return html

        return raw

    def log_message(self, format, *args):
        sys.stderr.write("%s - %s\n" % (self.address_string(), format % args))


if __name__ == "__main__":
    if not os.path.isdir(ROOT):
        sys.exit("[serve.py] 找不到 out/ 目录，请先运行 npm run build")
    print(f"[serve.py] 服务 out/ 目录： http://127.0.0.1:{PORT}")
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
