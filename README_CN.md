<div align="center">

# ⭐ badhope's Starbase（启明星空间站）

**探索代码与创意的宇宙**

[![部署状态](https://github.com/badhope/badhope.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/badhope/badhope.github.io/actions/workflows/deploy.yml)
[![网站](https://img.shields.io/website?url=https%3A%2F%2Fbadhope.github.io)](https://badhope.github.io)
[![许可证](https://img.shields.io/github/license/badhope/badhope.github.io)](LICENSE)

[🌐 在线访问](https://badhope.github.io) · [📖 English](README.md) · [🐛 报告问题](https://github.com/badhope/badhope.github.io/issues)

</div>

---

## ✨ 功能特性

- 🚀 **曲速引导动画** - 第一人称穿越星空效果
- ⭐ **3D 变形启明星 Logo** - 球体⇄星星形态变换 + 粒子特效
- 🤖 **AI 助手 (Star)** - 双模式：本地题库 + 真实 AI API
- 📡 **资讯中心** - AI 排行榜、技术热文、GitHub Trending
- 🛠️ **开发者工具箱** - 80+ 精选工具，覆盖 15 个分类
- 💼 **自动同步作品集** - 从 GitHub 仓库自动获取
- 📝 **博客聚合** - CSDN & 掘金文章自动同步
- 🌐 **国际化** - 中英文双语支持
- 🎨 **宇宙主题** - 深蓝 + 金色渐变设计
- 🎮 **20+ 隐藏彩蛋** - 各种有趣的互动惊喜
- ⚙️ **设置面板** - 动画开关、音量控制
- 📱 **响应式设计** - 桌面端优先，移动端优化
- ♿ **无障碍** - ARIA 标签、键盘导航、减少动画支持

## 🛠️ 技术栈

| 分类 | 技术 |
|------|------|
| 框架 | [Next.js 15](https://nextjs.org) + [TypeScript](https://typescriptlang.org) |
| 样式 | [Tailwind CSS](https://tailwindcss.com) + CSS Modules |
| 动画 | [Framer Motion](https://www.framer.com/motion/) + Canvas API |
| 3D | [Three.js](https://threejs.org) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) |
| 部署 | [GitHub Pages](https://pages.github.com) + [GitHub Actions](https://github.com/features/actions) |

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装

```bash
# 克隆仓库
git clone https://github.com/badhope/badhope.github.io.git
cd badhope.github.io

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页（根路径）
│   ├── not-found.tsx      # 自定义 404 页面
│   ├── projects/          # 作品集（GitHub 自动同步）
│   ├── tools/             # 开发者工具箱
│   ├── news/              # 资讯中心 & 排行榜
│   ├── blog/              # 博客聚合
│   ├── ai/                # AI 助手
│   ├── resume/            # 简历
│   ├── contact/           # 联系表单
│   └── contact-unavailable/ # 社交链接占位页
├── components/
│   ├── 3d/                # 3D 组件（启明星 Logo）
│   ├── animations/        # 曲速加载器、粒子效果
│   ├── sections/          # 页面区块（Hero、About 等）
│   ├── settings/          # 设置面板
│   └── ui/                # 导航、共享 UI 组件
├── config/                # ⚙️ 配置文件（重要！）
│   ├── ai.ts             # AI 模型 API 密钥
│   ├── social.ts         # 社交媒体链接
│   ├── music.ts          # 背景音乐
│   ├── tools.ts          # 工具集合
│   └── knowledge-base.ts # AI 聊天题库
└── lib/
    ├── ai/               # AI 回答引擎
    ├── i18n/             # 国际化
    └── settings/         # 设置上下文
```

## ⚙️ 配置指南

### AI 助手

编辑 `src/config/ai.ts` 配置 AI 模型 API 密钥：

```typescript
// 将 enabled 设为 true 并填入 API 密钥即可启用
{
  name: 'OpenAI',
  apiKey: '你的API密钥', // ← 在此填入
  enabled: true,
}
```

支持的模型：OpenAI、DeepSeek、智谱AI、通义千问、文心一言、Moonshot、SiliconFlow

### 社交链接

编辑 `src/config/social.ts` 更新社交媒体链接：

```typescript
{
  name: 'Twitter',
  url: 'https://twitter.com/你的用户名', // ← 替换为真实链接
}
```

### AI 题库

编辑 `src/config/knowledge-base.ts` 添加/修改 AI 聊天回答。

### 工具集合

编辑 `src/config/tools.ts` 添加/删除开发者工具。

### 背景音乐

编辑 `src/config/music.ts` 配置背景音乐。

## 🎮 彩蛋

本站包含 20+ 个隐藏彩蛋，你能找到全部吗？

> 💡 提示：试试键盘快捷键、点击特定元素、在不同时间访问。

## 📄 文档

- [ARCHITECTURE.md](ARCHITECTURE.md) - 系统架构说明
- [AI_CHAT_SYSTEM.md](AI_CHAT_SYSTEM.md) - AI 聊天系统设计
- [CONTENT_GUIDE.md](CONTENT_GUIDE.md) - 内容管理指南
- [EASTER_EGGS.md](EASTER_EGGS.md) - 彩蛋指南
- [API_INTEGRATION.md](API_INTEGRATION.md) - API 接入指南
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📜 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

---

<div align="center">

**由 [badhope](https://github.com/badhope) 用 ⭐ 构建**

</div>
