import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "傅鹏伟 | AI 产品作品集",
  description:
    "傅鹏伟的 AI 产品作品集，聚焦智能体工作流、RAG 系统、ETL 分析与数据驱动的产品设计。",
  icons: {
    icon: [
      { url: "/pw-favicon.ico" },
      { url: "/pw-favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/pw-favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
