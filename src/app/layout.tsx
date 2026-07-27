import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pengwei Fu | AI Product Portfolio",
  description:
    "Pengwei Fu's AI product portfolio, focused on agent workflows, RAG systems, ETL analytics, and data-driven product design.",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
