# 🤖 AI_CHAT_SYSTEM.md - AI 聊天系统设计

> **⚠️ AI READ THIS FIRST**
> 
> This document describes the complete AI chat system. Read this before modifying any AI-related code.

## 📋 Overview

The AI chat system has two modes:
1. **Local Mode** (default): Uses a pre-built knowledge base with keyword matching
2. **API Mode**: Connects to real AI models (OpenAI, DeepSeek, etc.)

## 🏗️ Architecture

```
User Input
    ↓
[Keyword Extraction] ← response-engine.ts
    ↓
[Category Matching] ← knowledge-base.ts
    ↓
[Answer Selection] ← Random from matched category
    ↓
[Extra Info] ← 30% chance to append
    ↓
[Output]
```

## 📁 Files

| File | Purpose |
|------|---------|
| `src/config/ai.ts` | AI model API configurations |
| `src/config/knowledge-base.ts` | Q&A knowledge base |
| `src/lib/ai/response-engine.ts` | Answer generation engine |
| `src/app/ai/page.tsx` | Chat UI component |

## 🔧 How to Add API Key

Edit `src/config/ai.ts`:

```typescript
{
  name: 'OpenAI',
  endpoint: 'https://api.openai.com/v1/chat/completions',
  apiKey: 'sk-your-key-here', // ← ADD YOUR KEY HERE
  model: 'gpt-3.5-turbo',
  enabled: true, // ← SET TO true
  maxTokens: 2048,
  temperature: 0.7,
}
```

The system will automatically use the first enabled model with a valid API key.

## 📚 How to Add Knowledge Base Entries

Edit `src/config/knowledge-base.ts`:

### Add a new category:
```typescript
{
  id: 'new_category',
  name: 'Category Name',
  keywords: ['keyword1', 'keyword2', '关键词1'],
  answers: [
    { text: 'Answer template 1', style: 'professional' },
    { text: 'Answer template 2', style: 'humorous' },
    { text: 'Answer template 3', style: 'techy' },
    // Add at least 3 answers for variety
  ],
  fallback: 'Fallback message when matched but no good answer',
}
```

### Add new keywords to existing category:
```typescript
keywords: ['existing', 'keywords', 'new_keyword', '新关键词'],
```

### Answer styles:
- `professional` - Formal, informative
- `humorous` - Fun, witty
- `techy` - Technical, code-like
- `casual` - Friendly, relaxed

## 🧠 Response Engine Algorithm

1. **Preprocess**: Convert to lowercase, remove special chars
2. **Extract Keywords**: Split into English words + Chinese 2-3 char combinations
3. **Match Categories**: Score each category by keyword overlap
4. **Select Best Match**: Use highest-scoring category
5. **Random Answer**: Pick random template from matched category
6. **Maybe Add Extra**: 30% chance to append helpful info
7. **Output**: Return final response string

## 🔌 Supported AI Models

| Model | Provider | Endpoint |
|-------|----------|----------|
| GPT-3.5/4 | OpenAI | api.openai.com |
| DeepSeek | DeepSeek | api.deepseek.com |
| GLM-4 | 智谱AI | open.bigmodel.cn |
| Qwen | 通义千问 | dashscope.aliyuncs.com |
| ERNIE | 文心一言 | aip.baidubce.com |
| Moonshot | Kimi | api.moonshot.cn |
| Qwen | SiliconFlow | api.siliconflow.cn |

All models use the OpenAI-compatible chat completions API format.

## ⚠️ Important Notes

- API keys should NEVER be committed to public repositories
- The knowledge base works without any API key
- Each category should have at least 3 answer templates for variety
- The system automatically handles greetings and thank-yous
- Fallback responses are used when no category matches
