# 🔌 API_INTEGRATION.md - API 接入指南

> **⚠️ AI READ THIS FIRST**
> 
> This document describes all API integrations and how to modify them.

## 📡 Current API Integrations

### Free APIs (No Key Required)

| API | Purpose | File | Status |
|-----|---------|------|--------|
| GitHub API | Fetch repos, trending | `projects/page.tsx`, `news/page.tsx` | ✅ Active |
| Quotable API | Daily quotes | `DailyQuote.tsx` | ✅ Active |
| ZenQuotes API | Daily quotes (fallback) | `DailyQuote.tsx` | ✅ Active |
| LMSYS Arena | AI model rankings | `news/page.tsx` | ✅ Active |
| FormSubmit.co | Contact form | `contact/page.tsx` | ✅ Active |
| RSS2JSON | Blog RSS parsing | `blog/page.tsx` | ✅ Active |

### Configurable APIs (Key Required)

| API | Purpose | Config File | Status |
|-----|---------|-------------|--------|
| OpenAI | AI chat | `config/ai.ts` | ⚪ Not configured |
| DeepSeek | AI chat | `config/ai.ts` | ⚪ Not configured |
| 智谱AI | AI chat | `config/ai.ts` | ⚪ Not configured |
| 通义千问 | AI chat | `config/ai.ts` | ⚪ Not configured |
| 文心一言 | AI chat | `config/ai.ts` | ⚪ Not configured |
| Moonshot | AI chat | `config/ai.ts` | ⚪ Not configured |
| SiliconFlow | AI chat | `config/ai.ts` | ⚪ Not configured |

## 🔧 How to Add a New API

### Step 1: Add API Call

```typescript
const fetchData = async () => {
  try {
    const res = await fetch('https://api.example.com/data', {
      signal: AbortSignal.timeout(8000), // 8 second timeout
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    return data;
  } catch (error) {
    // Handle error gracefully with fallback data
    return fallbackData;
  }
};
```

### Step 2: Add Fallback Data

Always provide fallback data in case the API fails:

```typescript
const fallbackData = [
  { title: 'Example', value: 42 },
];
```

### Step 3: Handle CORS

For APIs with CORS issues:
- Use a proxy like `api.allorigins.win`
- Or fetch at build time (for static sites)
- Or use a CORS proxy service

## ⚠️ Rate Limits

| API | Rate Limit | Notes |
|-----|-----------|-------|
| GitHub (unauthenticated) | 60 req/hour | Use token for higher limits |
| Quotable | 100 req/hour | |
| ZenQuotes | Unlimited (with delay) | |
| FormSubmit | 50 submissions/month | Free tier |

## 🔑 GitHub API Authentication

To increase GitHub API rate limits, add a token to `.env`:
```
NEXT_PUBLIC_GITHUB_TOKEN=ghp_your_token
```

Then use it in fetch calls:
```typescript
fetch('https://api.github.com/users/badhope/repos', {
  headers: { 'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` }
})
```
