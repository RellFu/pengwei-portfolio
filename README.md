# Pengwei Portfolio

个人作品集网站，基于 Next.js App Router 构建，当前已连接 GitHub 与 Vercel 自动部署。

## Current Status

- GitHub repo: `https://github.com/RellFu/pengwei-portfolio`
- Deploy flow: push to `main` -> Vercel auto deploy
- Latest confirmed deployed commit: `5cf4c50`
- Production deployment status: `Ready`

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- lucide-react

## Local Development

安装依赖并启动本地环境：

```bash
npm install
npm run dev
```

默认访问：

```bash
http://localhost:3000
```

生产构建检查：

```bash
npm run build
```

## Key Paths

- Homepage: `src/app/page.tsx`
- Global layout + metadata: `src/app/layout.tsx`
- Public assets: `public/`
- School logos source: `school_logos/`
- Portrait source: `AIheadshot/`

## Important Runtime Assets

这些资源已经在项目正式路径中，被网站运行直接使用：

- `public/ByteDance_logo_English.svg`
- `public/id_card.png`
- `public/menu.png`
- `public/store_front.png`
- `public/pw-favicon.ico`
- `public/pw-favicon-16x16.png`
- `public/pw-favicon-32x32.png`
- `public/apple-touch-icon.png`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

只要 GitHub 仓库里这些文件还在，线上网站就不依赖当前这台电脑。

## Safe Handoff Before Returning This Computer

在清空本地文件前，先确认以下事项：

1. GitHub 仓库代码已 push
2. Vercel 最新部署状态为 `Ready`
3. GitHub / Vercel 账号使用的是自己长期可访问的邮箱
4. 已保存 GitHub 和 Vercel 的 2FA 恢复信息
5. 需要保留的未跟踪素材已备份到网盘或其他仓库

## Untracked Local Folders

当前本地存在未跟踪目录：

- `bytedance_logo/`
- `case-studies/`
- `chat_image/`
- `didi_demo/`
- `example/`
- `favicon/`
- `issue/`

这些目录**不会影响当前线上网站运行**，但其中部分可能是后续复用素材。

建议：

- 先备份再删：
  - `bytedance_logo/`
  - `chat_image/`
  - `favicon/`
- 可以直接删除：
  - `case-studies/`
  - `didi_demo/`
  - `example/`
  - `issue/`
  - 所有 `.DS_Store`

## Moving to a New Computer

未来换电脑后，按以下步骤继续维护：

```bash
git clone https://github.com/RellFu/pengwei-portfolio.git
cd pengwei-portfolio
npm install
npm run dev
```

修改完成后：

```bash
git add .
git commit -m "your update message"
git push origin main
```

Vercel 会自动重新部署。

## Notes

- 当前首页已支持中英文切换
- 详情页暂未做完整双语
- 线上网站不依赖本地 dev 服务持续运行
