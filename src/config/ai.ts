/**
 * ============================================================
 * 🤖 AI CHAT SYSTEM - CONFIGURATION
 * ============================================================
 * 
 * AI助手配置文件 - 在此配置AI API密钥和模型参数
 * 
 * ⚠️ 重要提示：
 * - 请勿将API密钥提交到公开仓库
 * - 建议使用环境变量存储密钥
 * - 本文件中的密钥仅用于本地开发测试
 * 
 * 📖 使用方法：
 * 1. 选择你要使用的AI平台
 * 2. 填入对应的API密钥
 * 3. 调整模型参数（可选）
 * 4. 保存文件后刷新网站
 * 
 * ============================================================
 */

export interface AIModelConfig {
  /** 平台名称 */
  name: string;
  /** API端点URL */
  endpoint: string;
  /** API密钥 - 在此处填入你的密钥 */
  apiKey: string;
  /** 模型名称 */
  model: string;
  /** 是否启用 */
  enabled: boolean;
  /** 最大token数 */
  maxTokens: number;
  /** 温度参数 (0-2, 越高越随机) */
  temperature: number;
}

/**
 * AI模型配置列表
 * 
 * 要启用某个模型，将 enabled 设为 true 并填入 apiKey
 * 系统会自动使用第一个启用的模型
 */
export const AI_MODELS: AIModelConfig[] = [
  {
    name: 'OpenAI',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    apiKey: '', // ← 在此填入你的 OpenAI API Key
    model: 'gpt-3.5-turbo',
    enabled: false,
    maxTokens: 2048,
    temperature: 0.7,
  },
  {
    name: 'DeepSeek',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    apiKey: '', // ← 在此填入你的 DeepSeek API Key
    model: 'deepseek-chat',
    enabled: false,
    maxTokens: 2048,
    temperature: 0.7,
  },
  {
    name: '智谱AI (Zhipu/GLM)',
    endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    apiKey: '', // ← 在此填入你的智谱AI API Key
    model: 'glm-4-flash',
    enabled: false,
    maxTokens: 2048,
    temperature: 0.7,
  },
  {
    name: '通义千问 (Qwen)',
    endpoint: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    apiKey: '', // ← 在此填入你的通义千问 API Key
    model: 'qwen-turbo',
    enabled: false,
    maxTokens: 2048,
    temperature: 0.7,
  },
  {
    name: '文心一言 (ERNIE)',
    endpoint: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions',
    apiKey: '', // ← 在此填入你的文心一言 API Key
    model: 'ernie-bot-turbo',
    enabled: false,
    maxTokens: 2048,
    temperature: 0.7,
  },
  {
    name: 'Moonshot (Kimi)',
    endpoint: 'https://api.moonshot.cn/v1/chat/completions',
    apiKey: '', // ← 在此填入你的 Moonshot API Key
    model: 'moonshot-v1-8k',
    enabled: false,
    maxTokens: 2048,
    temperature: 0.7,
  },
  {
    name: 'SiliconFlow',
    endpoint: 'https://api.siliconflow.cn/v1/chat/completions',
    apiKey: '', // ← 在此填入你的 SiliconFlow API Key
    model: 'Qwen/Qwen2.5-7B-Instruct',
    enabled: false,
    maxTokens: 2048,
    temperature: 0.7,
  },
];

/**
 * AI助手系统提示词
 * 定义AI助手的身份和行为规范
 */
export const AI_SYSTEM_PROMPT = `你是 badhope 的 AI 助手，名叫 "Star"。
你是一个通用助手，可以替 badhope 回答访客的问题。

关于 badhope 的基本信息：
- 称呼：badhope
- 身份：在职全栈开发者
- 技能：前端开发、后端开发、大数据、AI/ML、DevOps
- 特点：热爱探索新技术，持续学习中
- 邮箱：x18825407105@outlook.com
- GitHub：github.com/badhope

回答风格：
- 技术问题：专业详细
- 个人问题：高情商模糊回答，有趣但不透露具体隐私
- 求职合作：引导访客通过联系页面联系 badhope
- 保持友好、专业的态度
- 适当使用一些宇宙/星辰的比喻（配合网站主题）
- 如果不知道答案，诚实地说不知道，并建议访客通过其他方式联系`;

/**
 * 获取当前启用的AI模型配置
 * @returns 第一个启用的模型配置，如果没有启用的则返回null
 */
export function getActiveModel(): AIModelConfig | null {
  return AI_MODELS.find((m) => m.enabled && m.apiKey) || null;
}
