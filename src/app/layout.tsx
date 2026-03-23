import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  title: "badhope | 全栈开发者 & AI时代探索者",
  description:
    "badhope - 数据科学与大数据技术专业，全栈开发者，AI时代探索者。专注于前沿技术，开源贡献者。",
  keywords: [
    "badhope",
    "全栈开发",
    "数据科学",
    "AI",
    "Python",
    "Next.js",
    "开发者",
    "开源贡献",
  ],
  authors: [{ name: "badhope" }],
  openGraph: {
    title: "badhope | 全栈开发者 & AI时代探索者",
    description:
      "数据科学与大数据技术专业，全栈开发者，AI时代探索者。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "badhope | 全栈开发者",
    description: "AI时代探索者 & 开源贡献者",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">
        <Providers />
        {children}
      </body>
    </html>
  );
}
