# 🌟 熊泽城的个人网站

> AI 时代的探索者 | 全栈开发者 | 数据科学家

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site/deploys)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 📖 网站介绍

这是一个现代化的个人网站，展示了我在**人工智能**、**全栈开发**和**数据分析**等领域的技术能力和项目经验。网站采用蓝白主题设计，支持明暗模式切换，提供流畅的交互体验和响应式布局。

### ✨ 核心特性

- 🎨 **精美设计**：蓝白/黑色双主题，支持一键切换
- 🌌 **动态效果**：星空背景、流星效果、粒子动画
- 📱 **响应式布局**：完美适配桌面、平板和移动设备
- ⚡ **高性能**：优化的加载速度和动画性能
- ♿ **无障碍访问**：支持减少动画偏好
- 🔍 **SEO 优化**：完善的元数据和结构化数据
- 📝 **博客系统**：技术文章分享平台
- 🔐 **安全登录**：单一管理员认证系统
- ✏️ **在线编辑**：直接在浏览器中修改网站内容

## 功能特性

### 核心功能
- 双主题切换（亮色/暗色）
- 响应式设计，适配所有设备
- 流畅的动画和过渡效果
- 滚动进度条和返回顶部按钮

### 🔐 安全认证系统
- 单一管理员账户登录
- SHA-256 密码加密
- 防暴力破解（5 次失败锁定 30 分钟）
- 会话管理（120 分钟超时）
- CSRF & XSS 保护
- 安全日志记录

### ✏️ 在线编辑系统
- 文件浏览器（树形结构）
- 代码编辑器（HTML/CSS/JS/MD）
- 实时预览功能
- GitHub 直接提交
- 本地自动保存
- 快捷键支持（Ctrl+S）

### 访问控制
- 未登录用户：仅可查看简历摘要信息
- 已登录用户：可查看完整简历详情
- 留言功能：仅限已认证用户使用

### 留言系统
- 用户可发送留言
- 查看历史留言记录
- 留言数据本地存储

## 文件结构

```
github.io/
├── index.html          # 首页
├── login-secure.html   # 安全登录页面
├── admin-dashboard.html # 管理员后台
├── editor.html         # 在线编辑器
├── github-config.html  # GitHub 配置页面
├── resume.html         # 简历页面（含访问控制）
├── works.html          # 作品集页面
├── tools.html          # 工具站页面
├── contact.html        # 联系方式页面（含留言功能）
├── blog.html           # 博客列表页
├── blog-post.html      # 博客详情页
├── config/
│   └── admin.config.js # 管理员配置
├── js/
│   ├── auth.js         # 认证系统
│   └── main.js         # 主脚本
├── css/
│   └── style.css       # 统一样式
├── utils/
│   └── password-generator.html # 密码工具
├── netlify.toml        # Netlify配置
├── README.md           # 说明文档
├── EDITOR_GUIDE.md     # 编辑器使用指南
└── ONLINE_EDITOR_QUICKSTART.md # 快速配置指南
```

## 部署到 Netlify

### 方法一：通过 Netlify Dashboard

1. 登录 [Netlify](https://app.netlify.com/)
2. 点击 "Add new site" > "Import an existing project"
3. 选择 Git 提供商（GitHub）
4. 选择 `github.io` 仓库
5. 配置构建设置：
   - Build command: 留空或 `echo 'No build required'`
   - Publish directory: `.` 或 `/`
6. 点击 "Deploy site"

### 方法二：通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

### 环境变量配置

本项目为纯前端静态网站，无需配置环境变量。用户数据存储在浏览器 localStorage 中。

## 本地开发

```bash
# 使用 Python 启动本地服务器
python -m http.server 8080

# 或使用 Node.js
npx serve .
```

然后访问 http://localhost:8080

## 技术栈

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **字体**: Orbitron, Noto Sans SC, Cinzel
- **图标**: SVG 内联图标
- **存储**: localStorage（用户数据、留言数据）
- **部署**: Netlify / GitHub Pages

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 📚 文档

- [**在线编辑器使用指南**](EDITOR_GUIDE.md) - 详细的编辑器使用说明
- [**快速配置指南**](ONLINE_EDITOR_QUICKSTART.md) - 5 分钟快速上手
- [**安全实现说明**](SECURITY_IMPLEMENTATION.md) - 认证系统技术细节
- [**测试指南**](TESTING.md) - 功能测试步骤
- [**部署指南**](DEPLOYMENT.md) - Netlify 部署教程

## 安全说明

⚠️ **注意**: 
- 本项目的认证系统为前端演示版本，用户数据存储在浏览器 localStorage 中
- 生产环境请使用后端服务和数据库进行用户认证
- GitHub Token 仅存储在浏览器本地，请妥善保管
- 定期更新 GitHub Token（建议每 30-90 天）

## 许可证

MIT License

## 联系方式

- GitHub: [@badhope](https://github.com/badhope)
- 邮箱: 通过网站联系表单