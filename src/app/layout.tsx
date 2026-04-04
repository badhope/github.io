import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "badhope's Starbase | 启明星空间站",
  description: 'Full-Stack Developer & AI Explorer - Exploring the universe of code and creativity. 全栈开发者 & AI探索者 - 探索代码与创意的宇宙。',
  keywords: ['badhope', 'full-stack developer', 'AI', 'web development', 'portfolio', '全栈开发', '人工智能', '前端', '后端', '大数据'],
  authors: [{ name: 'badhope' }],
  creator: 'badhope',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    title: "badhope's Starbase",
    description: 'Full-Stack Developer & AI Explorer - Exploring the universe of code and creativity.',
    siteName: "badhope's Starbase",
  },
  twitter: {
    card: 'summary_large_image',
    title: "badhope's Starbase",
    description: 'Full-Stack Developer & AI Explorer',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Pre-hydration language script - runs BEFORE React hydrates
const languageScript = `
(function() {
  try {
    var lang = localStorage.getItem('badhope-language');
    if (lang === 'zh' || lang === 'en') {
      document.documentElement.setAttribute('data-lang', lang);
      document.documentElement.classList.add('lang-' + lang);
    } else {
      var browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('zh')) {
        document.documentElement.setAttribute('data-lang', 'zh');
        document.documentElement.classList.add('lang-zh');
      } else {
        document.documentElement.setAttribute('data-lang', 'en');
        document.documentElement.classList.add('lang-en');
      }
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: languageScript }} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#020510" />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
