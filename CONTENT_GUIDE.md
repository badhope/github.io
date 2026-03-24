# 📝 CONTENT_GUIDE.md - 内容管理指南

> **⚠️ AI READ THIS FIRST**
> 
> This guide explains how to modify all content on the website.

## 📁 Configuration Files Location

All user-configurable content is in `src/config/`:

```
src/config/
├── ai.ts              # AI API keys
├── social.ts          # Social media links
├── music.ts           # Background music
├── tools.ts           # Developer tools collection
└── knowledge-base.ts  # AI chat answers
```

## 👤 Personal Information

### Name & Identity
- Edit `src/components/sections/HeroSection.tsx` - greeting text
- Edit `src/components/sections/AboutSection.tsx` - about section
- Edit `src/app/resume/page.tsx` - resume page

### Timeline
- Edit `src/components/sections/AboutSection.tsx` - `timeline` array
- Each entry: `{ year, titleZh, titleEn, descZh, descEn, icon }`

### Skills
- Edit `src/components/sections/AboutSection.tsx` - `skills` and `techStack` arrays

### Titles/Roles
- Edit `src/components/sections/HeroSection.tsx` - `titles` object

## 🔗 Social Links

Edit `src/config/social.ts`:

```typescript
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    nameZh: 'GitHub',
    url: 'https://github.com/badhope', // ← Change URL here
    icon: '🐙',
    external: true,
  },
  // To enable a disabled platform, replace the URL:
  {
    name: 'Twitter',
    url: 'https://twitter.com/your-handle', // ← Replace placeholder
    external: true,
  },
];
```

**Note**: Links starting with `/contact-unavailable` show a "coming soon" page.

## 🛠️ Tools Collection

Edit `src/config/tools.ts`:

### Add a new tool:
```typescript
{
  name: 'Tool Name',
  descriptionZh: '中文描述',
  descriptionEn: 'English description',
  url: 'https://example.com',
  icon: '🔧',
  tags: ['category', 'free'],
}
```

### Add a new category:
```typescript
{
  id: 'new-category',
  nameZh: '新分类',
  nameEn: 'New Category',
  icon: '📁',
  tools: [ /* tool items */ ],
}
```

## 🤖 AI Chat Knowledge Base

Edit `src/config/knowledge-base.ts`:

See [AI_CHAT_SYSTEM.md](AI_CHAT_SYSTEM.md) for detailed instructions.

## 📧 Contact Form

The contact form uses FormSubmit.co with the email `x18825407105@outlook.com`.

To change the receiving email, edit `src/app/contact/page.tsx`:
```typescript
fetch('https://formsubmit.co/ajax/YOUR_EMAIL@example.com', ...)
```

## 🎵 Background Music

Edit `src/config/music.ts`:

1. Place music files in `/public/audio/`
2. Uncomment and configure the track entries:
```typescript
{
  name: 'Track Name',
  url: '/audio/your-track.mp3',
  loop: true,
  volume: 0.3,
}
```

## 📡 News Hub Data Sources

The news hub fetches data from:
- AI Rankings: LMSYS Chatbot Arena API
- GitHub Trending: GitHub Search API
- Tech News: External links to CSDN, Juejin, Hacker News

To add new data sources, edit `src/app/news/page.tsx`.

## 🎨 Colors & Theme

Edit `src/app/globals.css` - CSS custom properties at the top:
```css
:root {
  --color-gold: #d4af37;
  --color-blue-primary: #1a73e8;
  /* etc. */
}
```

## 📝 Blog Sources

Blog posts are fetched from:
- CSDN: `https://blog.csdn.net/rss/weixin_56622231`
- Juejin: `https://rsshub.app/juejin/user/235011154247`

To change the CSDN/Juejin user, edit `src/app/blog/page.tsx`.
