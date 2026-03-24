# 🚀 DEPLOYMENT.md - 部署指南

> **⚠️ AI READ THIS FIRST**
> 
> This document explains how to deploy and maintain the website.

## 📋 Deployment Overview

The website is deployed to GitHub Pages using GitHub Actions.

### Deployment Flow
```
Push to main → GitHub Actions → npm run build → Deploy to Pages
Daily cron (3AM Beijing) → GitHub Actions → npm run build → Deploy to Pages
```

## 🔧 Initial Setup

### 1. Fork/Clone Repository
```bash
git clone https://github.com/badhope/badhope.github.io.git
cd badhope.github.io
npm install
```

### 2. Configure GitHub Pages
1. Go to repo Settings → Pages
2. Source: GitHub Actions
3. The workflow `.github/workflows/deploy.yml` handles everything

### 3. Configure Secrets (Optional)
- Go to Settings → Secrets and variables → Actions
- Add any API keys needed (e.g., `GITHUB_TOKEN` for higher rate limits)

## 🏗️ Build Configuration

### next.config.ts
```typescript
const nextConfig = {
  output: 'export',     // Static HTML export
  images: { unoptimized: true }, // Required for static export
  trailingSlash: false,
};
```

### Build Command
```bash
npm run build  # Outputs to ./out/
```

## 🔄 GitHub Actions Workflow

The workflow (`.github/workflows/deploy.yml`) triggers on:
- **Push** to `main` branch
- **Schedule**: Daily at 19:00 UTC (3:00 AM Beijing time)
- **Manual**: Via workflow_dispatch button

### Why Daily Rebuild?
- Blog posts from CSDN/Juejin are fetched at build time
- GitHub repos data is fetched at build time
- AI rankings are fetched at build time
- Daily rebuild ensures data stays fresh

## 📁 Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production branch, auto-deploys |

## 🐛 Troubleshooting

### Build Fails
1. Check GitHub Actions tab for error logs
2. Run `npm run build` locally to reproduce
3. Check for TypeScript errors
4. Check for missing dependencies

### 404 Error
1. Verify GitHub Pages source is set to "GitHub Actions"
2. Check that `main` branch has the latest code
3. Wait 2-3 minutes after deployment

### API Data Not Loading
1. Check browser console for CORS errors
2. Verify API endpoints are accessible
3. Check rate limits
4. Fallback data will be used if APIs fail

## 🌐 Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file in `public/` with your domain
2. Configure DNS records with your domain provider
3. Enable "Enforce HTTPS" in GitHub Pages settings

## 📊 Monitoring

- **GitHub Actions**: Check `.github/workflows/deploy.yml` run history
- **Site Status**: Visit https://badhope.github.io to verify
- **Errors**: Check browser console for runtime errors
