<div align="center">

# ⭐ badhope's Starbase

**Exploring the Universe of Code & Creativity**

[![Deploy](https://github.com/badhope/badhope.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/badhope/badhope.github.io/actions/workflows/deploy.yml)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fbadhope.github.io)](https://badhope.github.io)
[![License](https://img.shields.io/github/license/badhope/badhope.github.io)](LICENSE)

[🌐 Live Demo](https://badhope.github.io) · [📖 中文文档](README_CN.md) · [🐛 Report Bug](https://github.com/badhope/badhope.github.io/issues)

</div>

---

## ✨ Features

- 🚀 **Warp Speed Loader** - First-person starfield warp animation
- ⭐ **3D Morphing Star Logo** - Sphere-to-star morphing with particle effects
- 🤖 **AI Assistant (Star)** - Dual mode: local knowledge base + real AI API
- 📡 **News Hub** - AI model rankings, tech news, GitHub trending
- 🛠️ **Developer Toolbox** - 80+ curated tools across 15 categories
- 💼 **Auto-synced Portfolio** - Auto-fetched from GitHub repos
- 📝 **Blog Aggregator** - CSDN & Juejin articles auto-synced
- 🌐 **i18n Support** - English & Chinese
- 🎨 **Cosmic Theme** - Deep blue + gold gradient design
- 🎮 **20+ Easter Eggs** - Hidden interactive surprises
- ⚙️ **Settings Panel** - Animation toggle, volume control
- 📱 **Responsive Design** - Desktop-first with mobile optimization
- ♿ **Accessible** - ARIA labels, keyboard navigation, reduced motion support

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| Framework | [Next.js 15](https://nextjs.org) + [TypeScript](https://typescriptlang.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) + CSS Modules |
| Animation | [Framer Motion](https://www.framer.com/motion/) + Canvas API |
| 3D | [Three.js](https://threejs.org) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) |
| Deployment | [GitHub Pages](https://pages.github.com) + [GitHub Actions](https://github.com/features/actions) |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/badhope/badhope.github.io.git
cd badhope.github.io

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (root)
│   ├── not-found.tsx      # Custom 404 page
│   ├── projects/          # Portfolio (GitHub auto-sync)
│   ├── tools/             # Developer toolbox
│   ├── news/              # News hub & rankings
│   ├── blog/              # Blog aggregator
│   ├── ai/                # AI assistant
│   ├── resume/            # Resume
│   ├── contact/           # Contact form
│   └── contact-unavailable/ # Social link placeholder
├── components/
│   ├── 3d/                # 3D components (Star Logo)
│   ├── animations/        # Warp loader, particles
│   ├── sections/          # Page sections (Hero, About, etc.)
│   ├── settings/          # Settings panel
│   └── ui/                # Navigation, shared UI
├── config/                # ⚙️ Configuration files
│   ├── ai.ts             # AI model API keys
│   ├── social.ts         # Social media links
│   ├── music.ts          # Background music
│   ├── tools.ts          # Tool collection
│   └── knowledge-base.ts # AI chat knowledge base
└── lib/
    ├── ai/               # AI response engine
    ├── i18n/             # Internationalization
    └── settings/         # Settings context
```

## ⚙️ Configuration

### AI Assistant

Edit `src/config/ai.ts` to configure AI model API keys:

```typescript
// Enable a model by setting enabled: true and adding your API key
{
  name: 'OpenAI',
  apiKey: 'your-api-key-here', // ← Add your key
  enabled: true,
}
```

Supported models: OpenAI, DeepSeek, 智谱AI, 通义千问, 文心一言, Moonshot, SiliconFlow

### Social Links

Edit `src/config/social.ts` to update social media URLs:

```typescript
{
  name: 'Twitter',
  url: 'https://twitter.com/your-handle', // ← Replace with real URL
}
```

### Knowledge Base

Edit `src/config/knowledge-base.ts` to add/modify AI chat responses.

### Tools Collection

Edit `src/config/tools.ts` to add/remove developer tools.

### Background Music

Edit `src/config/music.ts` to configure background music tracks.

## 🎮 Easter Eggs

This site contains 20+ hidden easter eggs. Can you find them all?

> 💡 Hint: Try keyboard shortcuts, clicking specific elements, and exploring at different times.

## 📄 Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - System architecture
- [AI_CHAT_SYSTEM.md](AI_CHAT_SYSTEM.md) - AI chat system design
- [CONTENT_GUIDE.md](CONTENT_GUIDE.md) - Content management guide
- [EASTER_EGGS.md](EASTER_EGGS.md) - Easter eggs guide
- [API_INTEGRATION.md](API_INTEGRATION.md) - API integration guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is open source under the [MIT License](LICENSE).

---

<div align="center">

**Built with ⭐ by [badhope](https://github.com/badhope)**

</div>
