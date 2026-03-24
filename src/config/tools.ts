/**
 * ============================================================
 * 🛠️ TOOLS COLLECTION - CONFIGURATION
 * ============================================================
 * 
 * 工具集配置文件 - 在此添加/修改/删除工具
 * 
 * 📖 使用方法：
 * - 添加新工具：在对应分类的 tools 数组中新增一项
 * - 添加新分类：在 TOOL_CATEGORIES 数组中新增一个分类对象
 * - 修改工具：直接编辑对应工具的属性
 * - 删除工具：从数组中移除对应项
 * 
 * ⚠️ 注意：
 * - url 必须是完整的 URL（包含 https://）
 * - descriptionZh 和 descriptionEn 都需要填写
 * - icon 使用 emoji
 * 
 * ============================================================
 */

export interface Tool {
  /** 工具名称 */
  name: string;
  /** 中文描述 */
  descriptionZh: string;
  /** 英文描述 */
  descriptionEn: string;
  /** 工具链接 */
  url: string;
  /** 图标 (emoji) */
  icon: string;
  /** 标签 */
  tags: string[];
}

export interface ToolCategory {
  /** 分类ID */
  id: string;
  /** 分类名称（中文） */
  nameZh: string;
  /** 分类名称（英文） */
  nameEn: string;
  /** 分类图标 */
  icon: string;
  /** 工具列表 */
  tools: Tool[];
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: 'editor',
    nameZh: '编辑器 / IDE',
    nameEn: 'Editors / IDE',
    icon: '🖥️',
    tools: [
      { name: 'VS Code', descriptionZh: '微软开源代码编辑器', descriptionEn: 'Microsoft open-source code editor', url: 'https://code.visualstudio.com', icon: '💻', tags: ['editor', 'free'] },
      { name: 'WebStorm', descriptionZh: 'JetBrains 专业 Web IDE', descriptionEn: 'JetBrains professional Web IDE', url: 'https://www.jetbrains.com/webstorm', icon: '🌊', tags: ['ide', 'paid'] },
      { name: 'Cursor', descriptionZh: 'AI 驱动的代码编辑器', descriptionEn: 'AI-powered code editor', url: 'https://cursor.sh', icon: '🖱️', tags: ['editor', 'ai', 'paid'] },
      { name: 'Vim', descriptionZh: '终端文本编辑器', descriptionEn: 'Terminal text editor', url: 'https://www.vim.org', icon: '📝', tags: ['editor', 'free'] },
      { name: 'Sublime Text', descriptionZh: '快速轻量代码编辑器', descriptionEn: 'Fast lightweight code editor', url: 'https://www.sublimetext.com', icon: '📄', tags: ['editor', 'paid'] },
      { name: 'Neovim', descriptionZh: '现代 Vim 编辑器', descriptionEn: 'Modern Vim editor', url: 'https://neovim.io', icon: '🆕', tags: ['editor', 'free'] },
      { name: 'Zed', descriptionZh: '高性能协作编辑器', descriptionEn: 'High-performance collaborative editor', url: 'https://zed.dev', icon: '⚡', tags: ['editor', 'free'] },
    ],
  },
  {
    id: 'ai',
    nameZh: 'AI 工具',
    nameEn: 'AI Tools',
    icon: '🤖',
    tools: [
      { name: 'ChatGPT', descriptionZh: 'OpenAI 对话式 AI', descriptionEn: 'OpenAI conversational AI', url: 'https://chat.openai.com', icon: '🧠', tags: ['ai', 'chat'] },
      { name: 'Claude', descriptionZh: 'Anthropic AI 助手', descriptionEn: 'Anthropic AI assistant', url: 'https://claude.ai', icon: '🤖', tags: ['ai', 'chat'] },
      { name: 'Gemini', descriptionZh: 'Google AI 助手', descriptionEn: 'Google AI assistant', url: 'https://gemini.google.com', icon: '💎', tags: ['ai', 'chat'] },
      { name: 'DeepSeek', descriptionZh: '深度求索 AI', descriptionEn: 'DeepSeek AI', url: 'https://chat.deepseek.com', icon: '🔍', tags: ['ai', 'chat', 'chinese'] },
      { name: '智谱清言', descriptionZh: '智谱 AI 对话助手', descriptionEn: 'Zhipu AI assistant', url: 'https://chatglm.cn', icon: '💬', tags: ['ai', 'chat', 'chinese'] },
      { name: '通义千问', descriptionZh: '阿里云 AI 助手', descriptionEn: 'Alibaba Cloud AI assistant', url: 'https://tongyi.aliyun.com', icon: '☁️', tags: ['ai', 'chat', 'chinese'] },
      { name: '文心一言', descriptionZh: '百度 AI 助手', descriptionEn: 'Baidu AI assistant', url: 'https://yiyan.baidu.com', icon: '📖', tags: ['ai', 'chat', 'chinese'] },
      { name: 'Kimi', descriptionZh: 'Moonshot AI 助手', descriptionEn: 'Moonshot AI assistant', url: 'https://kimi.moonshot.cn', icon: '🌙', tags: ['ai', 'chat', 'chinese'] },
      { name: '豆包', descriptionZh: '字节跳动 AI 助手', descriptionEn: 'ByteDance AI assistant', url: 'https://www.doubao.com', icon: '🫘', tags: ['ai', 'chat', 'chinese'] },
      { name: 'Midjourney', descriptionZh: 'AI 图像生成', descriptionEn: 'AI image generation', url: 'https://www.midjourney.com', icon: '🎨', tags: ['ai', 'image'] },
      { name: 'Stable Diffusion', descriptionZh: '开源 AI 图像生成', descriptionEn: 'Open-source AI image generation', url: 'https://stability.ai', icon: '🖼️', tags: ['ai', 'image', 'open-source'] },
      { name: 'GitHub Copilot', descriptionZh: 'AI 编程助手', descriptionEn: 'AI coding assistant', url: 'https://github.com/features/copilot', icon: '👨‍💻', tags: ['ai', 'coding'] },
      { name: 'Hugging Face', descriptionZh: 'AI 模型社区', descriptionEn: 'AI model community', url: 'https://huggingface.co', icon: '🤗', tags: ['ai', 'models', 'open-source'] },
      { name: 'Perplexity', descriptionZh: 'AI 搜索引擎', descriptionEn: 'AI search engine', url: 'https://www.perplexity.ai', icon: '🔮', tags: ['ai', 'search'] },
      { name: 'Poe', descriptionZh: '多模型 AI 聚合平台', descriptionEn: 'Multi-model AI platform', url: 'https://poe.com', icon: '🎭', tags: ['ai', 'chat', 'aggregator'] },
    ],
  },
  {
    id: 'design',
    nameZh: '设计工具',
    nameEn: 'Design Tools',
    icon: '🎨',
    tools: [
      { name: 'Figma', descriptionZh: '协作设计工具', descriptionEn: 'Collaborative design tool', url: 'https://www.figma.com', icon: '🎯', tags: ['design', 'free'] },
      { name: 'Canva', descriptionZh: '在线设计平台', descriptionEn: 'Online design platform', url: 'https://www.canva.com', icon: '🖼️', tags: ['design', 'free'] },
      { name: 'Coolors', descriptionZh: '配色方案生成器', descriptionEn: 'Color scheme generator', url: 'https://coolors.co', icon: '🌈', tags: ['design', 'colors'] },
      { name: 'Dribbble', descriptionZh: '设计灵感社区', descriptionEn: 'Design inspiration community', url: 'https://dribbble.com', icon: '🏀', tags: ['design', 'inspiration'] },
      { name: 'Behance', descriptionZh: 'Adobe 设计作品展示', descriptionEn: 'Adobe design showcase', url: 'https://www.behance.net', icon: '🎨', tags: ['design', 'inspiration'] },
      { name: 'Remove.bg', descriptionZh: 'AI 背景移除', descriptionEn: 'AI background removal', url: 'https://www.remove.bg', icon: '✂️', tags: ['design', 'ai'] },
    ],
  },
  {
    id: 'deploy',
    nameZh: '部署平台',
    nameEn: 'Deployment',
    icon: '🚀',
    tools: [
      { name: 'Vercel', descriptionZh: '前端部署平台', descriptionEn: 'Frontend deployment platform', url: 'https://vercel.com', icon: '▲', tags: ['deploy', 'free'] },
      { name: 'Netlify', descriptionZh: '静态站点部署', descriptionEn: 'Static site deployment', url: 'https://www.netlify.com', icon: '🌐', tags: ['deploy', 'free'] },
      { name: 'Railway', descriptionZh: '全栈应用部署', descriptionEn: 'Full-stack app deployment', url: 'https://railway.app', icon: '🚂', tags: ['deploy', 'paid'] },
      { name: 'Fly.io', descriptionZh: '边缘计算部署', descriptionEn: 'Edge computing deployment', url: 'https://fly.io', icon: '✈️', tags: ['deploy', 'paid'] },
      { name: 'Render', descriptionZh: '云应用托管', descriptionEn: 'Cloud app hosting', url: 'https://render.com', icon: '☁️', tags: ['deploy', 'free'] },
      { name: 'Supabase', descriptionZh: '开源 Firebase 替代', descriptionEn: 'Open-source Firebase alternative', url: 'https://supabase.com', icon: '⚡', tags: ['deploy', 'database', 'free'] },
      { name: 'PlanetScale', descriptionZh: '无服务器 MySQL', descriptionEn: 'Serverless MySQL', url: 'https://planetscale.com', icon: '🪐', tags: ['deploy', 'database'] },
    ],
  },
  {
    id: 'devops',
    nameZh: 'DevOps',
    nameEn: 'DevOps',
    icon: '🔧',
    tools: [
      { name: 'Docker Hub', descriptionZh: '容器镜像仓库', descriptionEn: 'Container image registry', url: 'https://hub.docker.com', icon: '🐳', tags: ['devops', 'containers'] },
      { name: 'GitHub Actions', descriptionZh: 'CI/CD 自动化', descriptionEn: 'CI/CD automation', url: 'https://github.com/features/actions', icon: '⚙️', tags: ['devops', 'ci-cd'] },
      { name: 'Jenkins', descriptionZh: '开源 CI/CD 工具', descriptionEn: 'Open-source CI/CD tool', url: 'https://www.jenkins.io', icon: '🔧', tags: ['devops', 'ci-cd'] },
      { name: 'Kubernetes', descriptionZh: '容器编排平台', descriptionEn: 'Container orchestration', url: 'https://kubernetes.io', icon: '☸️', tags: ['devops', 'containers'] },
      { name: 'Terraform', descriptionZh: '基础设施即代码', descriptionEn: 'Infrastructure as Code', url: 'https://www.terraform.io', icon: '🏗️', tags: ['devops', 'iac'] },
      { name: 'Nginx', descriptionZh: 'Web 服务器/反向代理', descriptionEn: 'Web server / reverse proxy', url: 'https://nginx.org', icon: '🌐', tags: ['devops', 'server'] },
    ],
  },
  {
    id: 'package',
    nameZh: '包管理 / CDN',
    nameEn: 'Package / CDN',
    icon: '📦',
    tools: [
      { name: 'npm', descriptionZh: 'Node.js 包管理器', descriptionEn: 'Node.js package manager', url: 'https://www.npmjs.com', icon: '📦', tags: ['package', 'node'] },
      { name: 'PyPI', descriptionZh: 'Python 包仓库', descriptionEn: 'Python package repository', url: 'https://pypi.org', icon: '🐍', tags: ['package', 'python'] },
      { name: 'Maven', descriptionZh: 'Java 包管理器', descriptionEn: 'Java package manager', url: 'https://maven.apache.org', icon: '☕', tags: ['package', 'java'] },
      { name: 'jsDelivr', descriptionZh: '开源 CDN 加速', descriptionEn: 'Open-source CDN', url: 'https://www.jsdelivr.com', icon: '⚡', tags: ['cdn', 'free'] },
      { name: 'cdnjs', descriptionZh: '前端库 CDN', descriptionEn: 'Frontend library CDN', url: 'https://cdnjs.com', icon: '📚', tags: ['cdn', 'free'] },
      { name: 'unpkg', descriptionZh: 'npm 包 CDN', descriptionEn: 'npm package CDN', url: 'https://unpkg.com', icon: '📤', tags: ['cdn', 'free'] },
    ],
  },
  {
    id: 'format',
    nameZh: '格式化 / 转换',
    nameEn: 'Formatters / Converters',
    icon: '🔄',
    tools: [
      { name: 'JSON Formatter', descriptionZh: 'JSON 格式化验证', descriptionEn: 'JSON format & validate', url: 'https://jsonformatter.org', icon: '{}', tags: ['format', 'json'] },
      { name: 'Base64 Encode/Decode', descriptionZh: 'Base64 编解码', descriptionEn: 'Base64 encode/decode', url: 'https://www.base64encode.org', icon: '🔐', tags: ['format', 'encoding'] },
      { name: 'Regex101', descriptionZh: '正则表达式测试', descriptionEn: 'Regex testing tool', url: 'https://regex101.com', icon: '🔍', tags: ['format', 'regex'] },
      { name: 'CyberChef', descriptionZh: '数据转换瑞士军刀', descriptionEn: 'Data conversion swiss army knife', url: 'https://gchq.github.io/CyberChef', icon: '👨‍🍳', tags: ['format', 'encoding'] },
      { name: 'Transform.tools', descriptionZh: '代码格式转换', descriptionEn: 'Code format conversion', url: 'https://transform.tools', icon: '🔄', tags: ['format', 'code'] },
      { name: 'Cronitor', descriptionZh: 'Cron 表达式编辑器', descriptionEn: 'Cron expression editor', url: 'https://crontab.guru', icon: '⏰', tags: ['format', 'cron'] },
    ],
  },
  {
    id: 'font-color',
    nameZh: '字体 / 颜色',
    nameEn: 'Fonts / Colors',
    icon: '🎨',
    tools: [
      { name: 'Google Fonts', descriptionZh: '免费开源字体库', descriptionEn: 'Free open-source font library', url: 'https://fonts.google.com', icon: '🔤', tags: ['font', 'free'] },
      { name: 'FontPair', descriptionZh: '字体搭配推荐', descriptionEn: 'Font pairing suggestions', url: 'https://fontpair.co', icon: '👫', tags: ['font', 'design'] },
      { name: 'Font Awesome', descriptionZh: '图标字体库', descriptionEn: 'Icon font library', url: 'https://fontawesome.com', icon: '⭐', tags: ['font', 'icons'] },
      { name: 'Heroicons', descriptionZh: 'Tailwind CSS 图标', descriptionEn: 'Tailwind CSS icons', url: 'https://heroicons.com', icon: '🦸', tags: ['font', 'icons'] },
      { name: 'Color Hunt', descriptionZh: '配色方案灵感', descriptionEn: 'Color palette inspiration', url: 'https://colorhunt.co', icon: '🎨', tags: ['color', 'design'] },
      { name: 'Adobe Color', descriptionZh: '专业配色工具', descriptionEn: 'Professional color tool', url: 'https://color.adobe.com', icon: '🎯', tags: ['color', 'design'] },
    ],
  },
  {
    id: 'image',
    nameZh: '图片 / 图标',
    nameEn: 'Images / Icons',
    icon: '📸',
    tools: [
      { name: 'Unsplash', descriptionZh: '免费高质量图片', descriptionEn: 'Free high-quality images', url: 'https://unsplash.com', icon: '📷', tags: ['image', 'free'] },
      { name: 'Pexels', descriptionZh: '免费图片视频素材', descriptionEn: 'Free images and videos', url: 'https://www.pexels.com', icon: '🖼️', tags: ['image', 'free'] },
      { name: 'Flaticon', descriptionZh: '免费图标库', descriptionEn: 'Free icon library', url: 'https://www.flaticon.com', icon: '✨', tags: ['icon', 'free'] },
      { name: 'Iconify', descriptionZh: '统一图标平台', descriptionEn: 'Unified icon platform', url: 'https://iconify.design', icon: '🎯', tags: ['icon', 'free'] },
      { name: 'TinyPNG', descriptionZh: '图片压缩工具', descriptionEn: 'Image compression tool', url: 'https://tinypng.com', icon: '🐼', tags: ['image', 'compression'] },
      { name: 'Squoosh', descriptionZh: 'Google 图片优化', descriptionEn: 'Google image optimizer', url: 'https://squoosh.app', icon: '📦', tags: ['image', 'compression', 'free'] },
      { name: 'Placeholder', descriptionZh: '占位图生成器', descriptionEn: 'Placeholder image generator', url: 'https://placeholder.com', icon: '🔲', tags: ['image', 'placeholder'] },
    ],
  },
  {
    id: 'security',
    nameZh: '安全 / 加密',
    nameEn: 'Security / Encryption',
    icon: '🔒',
    tools: [
      { name: 'SSL Labs', descriptionZh: 'SSL 证书检测', descriptionEn: 'SSL certificate check', url: 'https://www.ssllabs.com/ssltest', icon: '🔐', tags: ['security', 'ssl'] },
      { name: 'Have I Been Pwned', descriptionZh: '密码泄露检查', descriptionEn: 'Password breach check', url: 'https://haveibeenpwned.com', icon: '💀', tags: ['security', 'password'] },
      { name: 'JWT.io', descriptionZh: 'JWT 调试工具', descriptionEn: 'JWT debugging tool', url: 'https://jwt.io', icon: '🎫', tags: ['security', 'jwt'] },
      { name: 'SecurityHeaders', descriptionZh: 'HTTP 安全头检测', descriptionEn: 'HTTP security headers check', url: 'https://securityheaders.com', icon: '🛡️', tags: ['security', 'headers'] },
    ],
  },
  {
    id: 'docs',
    nameZh: '文档 / 笔记',
    nameEn: 'Docs / Notes',
    icon: '📝',
    tools: [
      { name: 'Notion', descriptionZh: '全能笔记协作工具', descriptionEn: 'All-in-one notes & collaboration', url: 'https://www.notion.so', icon: '📓', tags: ['docs', 'notes'] },
      { name: 'Obsidian', descriptionZh: '本地 Markdown 笔记', descriptionEn: 'Local Markdown notes', url: 'https://obsidian.md', icon: '💜', tags: ['docs', 'notes', 'free'] },
      { name: 'Swagger', descriptionZh: 'API 文档工具', descriptionEn: 'API documentation tool', url: 'https://swagger.io', icon: '📖', tags: ['docs', 'api'] },
      { name: 'Docusaurus', descriptionZh: '开源文档网站生成器', descriptionEn: 'Open-source docs site generator', url: 'https://docusaurus.io', icon: '🦖', tags: ['docs', 'generator', 'free'] },
      { name: 'GitBook', descriptionZh: '现代文档平台', descriptionEn: 'Modern documentation platform', url: 'https://www.gitbook.com', icon: '📚', tags: ['docs', 'platform'] },
    ],
  },
  {
    id: 'seo',
    nameZh: 'SEO / 分析',
    nameEn: 'SEO / Analytics',
    icon: '📊',
    tools: [
      { name: 'Google Analytics', descriptionZh: '网站分析工具', descriptionEn: 'Website analytics', url: 'https://analytics.google.com', icon: '📈', tags: ['seo', 'analytics'] },
      { name: 'Google Search Console', descriptionZh: '搜索优化工具', descriptionEn: 'Search optimization tool', url: 'https://search.google.com/search-console', icon: '🔍', tags: ['seo', 'search'] },
      { name: 'Lighthouse', descriptionZh: '网站性能审计', descriptionEn: 'Website performance audit', url: 'https://developers.google.com/web/tools/lighthouse', icon: '🏠', tags: ['seo', 'performance'] },
      { name: 'PageSpeed Insights', descriptionZh: '页面速度分析', descriptionEn: 'Page speed analysis', url: 'https://pagespeed.web.dev', icon: '⚡', tags: ['seo', 'performance'] },
      { name: 'Ahrefs', descriptionZh: 'SEO 分析工具', descriptionEn: 'SEO analysis tool', url: 'https://ahrefs.com', icon: '🔗', tags: ['seo', 'backlinks'] },
    ],
  },
  {
    id: 'test',
    nameZh: '测试工具',
    nameEn: 'Testing Tools',
    icon: '🧪',
    tools: [
      { name: 'Jest', descriptionZh: 'JavaScript 测试框架', descriptionEn: 'JavaScript testing framework', url: 'https://jestjs.io', icon: '🃏', tags: ['test', 'javascript'] },
      { name: 'Playwright', descriptionZh: '浏览器自动化测试', descriptionEn: 'Browser automation testing', url: 'https://playwright.dev', icon: '🎭', tags: ['test', 'e2e'] },
      { name: 'Postman', descriptionZh: 'API 测试工具', descriptionEn: 'API testing tool', url: 'https://www.postman.com', icon: '📮', tags: ['test', 'api'] },
      { name: 'BrowserStack', descriptionZh: '跨浏览器测试', descriptionEn: 'Cross-browser testing', url: 'https://www.browserstack.com', icon: '🌐', tags: ['test', 'browser'] },
      { name: 'Cypress', descriptionZh: '前端 E2E 测试', descriptionEn: 'Frontend E2E testing', url: 'https://www.cypress.io', icon: '🌲', tags: ['test', 'e2e'] },
    ],
  },
  {
    id: 'learn',
    nameZh: '学习资源',
    nameEn: 'Learning Resources',
    icon: '📖',
    tools: [
      { name: 'MDN Web Docs', descriptionZh: 'Web 技术权威文档', descriptionEn: 'Authoritative web docs', url: 'https://developer.mozilla.org', icon: '🦊', tags: ['learn', 'docs', 'free'] },
      { name: 'freeCodeCamp', descriptionZh: '免费编程学习', descriptionEn: 'Free coding education', url: 'https://www.freecodecamp.org', icon: '🏕️', tags: ['learn', 'free'] },
      { name: 'LeetCode', descriptionZh: '算法刷题平台', descriptionEn: 'Algorithm practice platform', url: 'https://leetcode.com', icon: '🧩', tags: ['learn', 'algorithms'] },
      { name: 'Coursera', descriptionZh: '在线课程平台', descriptionEn: 'Online course platform', url: 'https://www.coursera.org', icon: '🎓', tags: ['learn', 'courses'] },
      { name: 'Stack Overflow', descriptionZh: '编程问答社区', descriptionEn: 'Programming Q&A community', url: 'https://stackoverflow.com', icon: '📚', tags: ['learn', 'qa'] },
      { name: 'DevDocs', descriptionZh: 'API 文档聚合', descriptionEn: 'API documentation aggregator', url: 'https://devdocs.io', icon: '📖', tags: ['learn', 'docs', 'free'] },
      { name: 'W3Schools', descriptionZh: 'Web 技术教程', descriptionEn: 'Web technology tutorials', url: 'https://www.w3schools.com', icon: '🌐', tags: ['learn', 'tutorials', 'free'] },
    ],
  },
  {
    id: 'fun',
    nameZh: '开发者娱乐',
    nameEn: 'Developer Fun',
    icon: '🎮',
    tools: [
      { name: 'CSS Battle', descriptionZh: 'CSS 代码艺术挑战', descriptionEn: 'CSS code art challenges', url: 'https://cssbattle.dev', icon: '🎨', tags: ['fun', 'css'] },
      { name: 'Codewars', descriptionZh: '编程 kata 挑战', descriptionEn: 'Programming kata challenges', url: 'https://www.codewars.com', icon: '⚔️', tags: ['fun', 'algorithms'] },
      { name: 'Advent of Code', descriptionZh: '编程日历挑战', descriptionEn: 'Programming calendar challenges', url: 'https://adventofcode.com', icon: '🎄', tags: ['fun', 'algorithms'] },
      { name: 'Exercism', descriptionZh: '多语言编程练习', descriptionEn: 'Multi-language coding exercises', url: 'https://exercism.org', icon: '🏋️', tags: ['fun', 'practice', 'free'] },
    ],
  },
  {
    id: 'api',
    nameZh: '免费 API',
    nameEn: 'Free APIs',
    icon: '🔌',
    tools: [
      { name: 'JSONPlaceholder', descriptionZh: '假数据 REST API', descriptionEn: 'Fake REST API for testing', url: 'https://jsonplaceholder.typicode.com', icon: '📋', tags: ['api', 'testing', 'free'] },
      { name: 'OpenWeatherMap', descriptionZh: '天气数据 API', descriptionEn: 'Weather data API', url: 'https://openweathermap.org/api', icon: '🌤️', tags: ['api', 'weather'] },
      { name: 'NASA APIs', descriptionZh: 'NASA 太空数据', descriptionEn: 'NASA space data', url: 'https://api.nasa.gov', icon: '🚀', tags: ['api', 'space', 'free'] },
      { name: 'PokeAPI', descriptionZh: '宝可梦数据 API', descriptionEn: 'Pokémon data API', url: 'https://pokeapi.co', icon: '🎮', tags: ['api', 'fun', 'free'] },
      { name: 'Public APIs', descriptionZh: '免费 API 合集', descriptionEn: 'Free API collection', url: 'https://github.com/public-apis/public-apis', icon: '📚', tags: ['api', 'collection', 'free'] },
    ],
  },
];

/**
 * 获取所有工具的扁平列表
 */
export function getAllTools(): (Tool & { categoryId: string; categoryName: string })[] {
  return TOOL_CATEGORIES.flatMap((cat) =>
    cat.tools.map((tool) => ({
      ...tool,
      categoryId: cat.id,
      categoryName: cat.nameEn,
    }))
  );
}

/**
 * 搜索工具
 */
export function searchTools(query: string): (Tool & { categoryId: string; categoryName: string })[] {
  const q = query.toLowerCase();
  return getAllTools().filter(
    (tool) =>
      tool.name.toLowerCase().includes(q) ||
      tool.descriptionEn.toLowerCase().includes(q) ||
      tool.descriptionZh.includes(q) ||
      tool.tags.some((tag) => tag.includes(q))
  );
}
