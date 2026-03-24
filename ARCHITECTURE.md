# 🏗️ ARCHITECTURE.md - 系统架构说明

> **⚠️ AI READ THIS FIRST**
> 
> This document describes the complete architecture of badhope's Starbase.
> Read this before making any changes to understand the system.

## 📋 Overview

badhope's Starbase is a personal brand website built with Next.js 15, deployed as a static site on GitHub Pages.

### Tech Stack
- **Framework**: Next.js 15 (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Animation**: Framer Motion + HTML5 Canvas
- **3D**: Three.js + React Three Fiber + @react-three/drei
- **Deployment**: GitHub Pages via GitHub Actions
- **i18n**: Custom React Context (zh/en)

## 📁 Directory Structure

```
badhope.github.io/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions CI/CD
├── public/                  # Static assets
│   ├── favicon.ico
│   └── audio/              # Music files (user-configured)
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout (fonts, metadata)
│   │   ├── globals.css     # Global styles & CSS variables
│   │   ├── page.tsx        # Homepage (root /)
│   │   ├── not-found.tsx   # Custom 404 page
│   │   ├── projects/       # Portfolio page
│   │   ├── tools/          # Tools page
│   │   ├── news/           # News hub page
│   │   ├── blog/           # Blog page
│   │   ├── ai/             # AI assistant page
│   │   ├── resume/         # Resume page
│   │   ├── contact/        # Contact page
│   │   └── contact-unavailable/ # Social placeholder
│   ├── components/
│   │   ├── 3d/
│   │   │   └── StarLogo.tsx    # 3D morphing star logo
│   │   ├── animations/
│   │   │   ├── WarpLoader.tsx  # Warp speed intro animation
│   │   │   └── WarpLoader.module.css
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx  # Hero with typewriter
│   │   │   ├── AboutSection.tsx # About + timeline + skills
│   │   │   ├── DailyQuote.tsx   # Daily quote widget
│   │   │   └── Footer.tsx       # Site footer
│   │   ├── settings/
│   │   │   └── SettingsPanel.tsx # Settings UI
│   │   └── ui/
│   │       └── StarNavigation.tsx # Main navigation
│   ├── config/             # ⚙️ USER-CONFIGURABLE FILES
│   │   ├── ai.ts           # AI model API keys
│   │   ├── social.ts       # Social media links
│   │   ├── music.ts        # Background music config
│   │   ├── tools.ts        # Tool collection data
│   │   └── knowledge-base.ts # AI chat Q&A database
│   └── lib/
│       ├── ai/
│       │   └── response-engine.ts # AI answer generation
│       ├── i18n/
│       │   ├── LanguageContext.tsx # Language provider
│       │   └── translations.ts    # i18n strings
│       └── settings/
│           └── SettingsContext.tsx # Settings provider
├── tailwind.config.js
├── next.config.ts
├── tsconfig.json
├── package.json
├── README.md               # English documentation
└── README_CN.md            # Chinese documentation
```

## 🔄 Data Flow

### Homepage Flow
1. User visits `/`
2. `WarpLoader` shows warp speed animation
3. User clicks "ENTER"
4. Stars accelerate, progress bar fills
5. Transition animation plays
6. Main content appears (Hero → About → Quote → Footer)

### AI Chat Flow
1. User sends message
2. `response-engine.ts` extracts keywords
3. Matches against `knowledge-base.ts` categories
4. Selects random answer template
5. If API key configured → tries real AI API first
6. Falls back to local knowledge base
7. Displays response with typing animation

### Auto-sync Flow (GitHub Actions)
1. Triggered by push to main OR daily cron (19:00 UTC)
2. `npm run build` executes
3. Pages fetch data at build time (GitHub API, RSS feeds)
4. Static files output to `out/`
5. Deployed to GitHub Pages

## 🎨 Design System

### Colors
- Primary Background: `#020510` (deep space)
- Secondary Background: `#0a0e27` (dark blue)
- Gold Accent: `#d4af37` / `#f0d060`
- Blue Accent: `#1a73e8`
- Purple Accent: `#7c3aed`
- Text Primary: `#e8e8f0`
- Text Secondary: `#a0a0b8`
- Text Muted: `#6b6b80`

### Fonts
- Display: Orbitron (headings, logos)
- Heading: Space Grotesk (section titles)
- Body: Space Grotesk (paragraphs)
- Mono: JetBrains Mono (code, terminal)
- Terminal: Share Tech Mono (hints, labels)

### Spacing
- Section gap: 200px (desktop) / 100px (mobile)
- Card padding: 24px
- Border radius: 8-16px

## 🔧 Configuration Files

All user-configurable files are in `src/config/`:

| File | Purpose | Edit Frequency |
|------|---------|---------------|
| `ai.ts` | AI model API keys | Once |
| `social.ts` | Social media links | Occasionally |
| `music.ts` | Background music | Occasionally |
| `tools.ts` | Tool collection | Often |
| `knowledge-base.ts` | AI chat answers | Often |

## 🚀 Deployment

The site is automatically deployed via GitHub Actions:
- **On push** to `main` branch
- **Daily** at 19:00 UTC (3:00 AM Beijing time)
- **Manual** via workflow_dispatch

See [DEPLOYMENT.md](DEPLOYMENT.md) for details.
