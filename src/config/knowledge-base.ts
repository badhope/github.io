/**
 * ============================================================
 * 🤖 AI CHAT KNOWLEDGE BASE
 * ============================================================
 * 
 * AI 预设题库 - 所有回答都是预先设定好的
 * 
 * 📖 使用方法：
 * - 添加新回答：在对应类别的 answers 数组中新增一项
 * - 添加新类别：在 KNOWLEDGE_BASE 数组中新增一个类别
 * - 添加新关键词：在对应类别的 keywords 数组中新增
 * 
 * ⚠️ 重要：
 * - 每个类别至少需要 3 个回答模板
 * - 回答模板中使用 {keyword} 作为变量占位符
 * - 系统会自动随机选择回答，确保同一问题不同回答
 * 
 * ============================================================
 */

export interface AnswerTemplate {
  /** 回答文本，支持 {keyword} 占位符 */
  text: string;
  /** 回答风格 */
  style: 'professional' | 'humorous' | 'techy' | 'casual';
}

export interface KnowledgeCategory {
  /** 类别ID */
  id: string;
  /** 类别名称 */
  name: string;
  /** 匹配关键词（中英文） */
  keywords: string[];
  /** 回答模板列表 */
  answers: AnswerTemplate[];
  /** 兜底回答（当关键词匹配但无合适回答时） */
  fallback?: string;
}

export const KNOWLEDGE_BASE: KnowledgeCategory[] = [
  // ===== 关于 badhope =====
  {
    id: 'about',
    name: '关于 badhope',
    keywords: ['badhope', '你是谁', 'who are you', '介绍', 'introduce', '自我介绍', 'about', '名字', 'name', '什么人', 'who'],
    answers: [
      { text: '我是 badhope，一个在代码宇宙中漫游的开发者 🚀 喜欢探索新技术，用代码创造有趣的东西。', style: 'casual' },
      { text: 'badhope 在此！一个全栈开发者，白天写代码，晚上也写代码，偶尔抬头看看星星 ⭐', style: 'humorous' },
      { text: '你好！我是 badhope，一名在职的全栈开发者。我热衷于探索 AI、大数据和 Web 开发的交叉领域。', style: 'professional' },
      { text: 'badhope = Full-Stack Developer + AI Explorer + Star Collector ⭐ 正在用代码构建自己的小宇宙。', style: 'techy' },
      { text: '我是 badhope，一个相信代码可以改变世界的开发者。目前在职，持续学习中，永远保持好奇心。', style: 'casual' },
      { text: 'badhope，坐标深圳，全栈开发者一枚。喜欢折腾新技术，偶尔写写博客分享踩坑经验。', style: 'humorous' },
    ],
    fallback: '你想了解 badhope 的哪方面呢？可以问我关于技能、项目、或者联系方式的问题。',
  },
  // ===== 技能 =====
  {
    id: 'skills',
    name: '技能',
    keywords: ['技能', 'skill', '会什么', 'can you', '技术', 'tech', '擅长', 'good at', '语言', 'language', '框架', 'framework', '工具', 'tool'],
    answers: [
      { text: '我的技术栈覆盖面比较广：前端（React/Next.js/Vue）、后端（Node.js/Python/Java）、大数据（Spark/Hadoop）、AI/ML（TensorFlow/PyTorch），还有一些 DevOps 工具链。', style: 'professional' },
      { text: '前端后端大数据AI，基本上什么都能折腾一下 😄 最擅长的是全栈开发和大数据处理。', style: 'humorous' },
      { text: 'Tech Stack: React ⚛️ + Next.js ▲ + TypeScript 🔷 + Node.js 🟢 + Python 🐍 + Java ☕ + Spark ⚡ + TensorFlow 🧠', style: 'techy' },
      { text: '我是一个全栈开发者，前端到后端都能搞定。特别对大数据和 AI 方向比较感兴趣，正在持续深入学习中。', style: 'casual' },
      { text: '技能树点得比较杂：前端、后端、大数据、AI、DevOps 都有涉猎。目前正在 AI + 全栈的交叉领域深耕。', style: 'professional' },
    ],
    fallback: '我对全栈开发、大数据和 AI 都有涉猎，你想了解哪个具体方向？',
  },
  // ===== 项目 =====
  {
    id: 'projects',
    name: '项目',
    keywords: ['项目', 'project', '作品', 'work', '做过什么', 'what did you', '开源', 'open source', '仓库', 'repo', 'github'],
    answers: [
      { text: '我的开源项目都在 GitHub 上（github.com/badhope），包括这个网站本身也是开源的！欢迎去逛逛，给个 Star ⭐', style: 'casual' },
      { text: '项目不少，涵盖 Web 开发、AI 应用、大数据工具等。最推荐你看看我的 GitHub 主页，那里有最完整的项目列表。', style: 'professional' },
      { text: '每一个项目都是一次星际旅行 🚀 从构思到部署，每个环节都亲力亲为。去 GitHub 看看我的宇宙吧！', style: 'techy' },
      { text: '做过不少有趣的项目，有些已经上线了，有些还在持续迭代中。具体可以去作品集页面或者 GitHub 查看。', style: 'casual' },
    ],
    fallback: '你可以访问作品集页面查看我的项目，或者直接去我的 GitHub 看源码。',
  },
  // ===== 联系方式 =====
  {
    id: 'contact',
    name: '联系方式',
    keywords: ['联系', 'contact', '邮箱', 'email', '微信', 'wechat', '怎么找你', 'how to reach', '社交', 'social'],
    answers: [
      { text: '你可以通过以下方式联系我：📧 邮箱：x18825407105@outlook.com | 🐙 GitHub：github.com/badhope | 📝 CSDN/掘金上也能找到我', style: 'professional' },
      { text: '最推荐发邮件到 x18825407105@outlook.com，我通常会尽快回复。也可以在 GitHub 上提 Issue，或者通过联系页面给我留言。', style: 'casual' },
      { text: '联系 badhope 的方式：📧 Email（最快）→ 🐙 GitHub Issue → 📝 博客留言。信号已发送，等待你的连接 📡', style: 'techy' },
    ],
    fallback: '你可以通过邮箱 x18825407105@outlook.com 联系我，或者访问联系页面查看所有联系方式。',
  },
  // ===== 求职/合作 =====
  {
    id: 'career',
    name: '求职/合作',
    keywords: ['求职', 'job', '招聘', 'hire', '合作', 'cooperate', '外包', 'freelance', '兼职', 'part-time', '工作', 'work', 'offer'],
    answers: [
      { text: '感谢你的关注！关于工作机会和合作，请通过邮箱 x18825407105@outlook.com 联系我，我们可以详细聊聊。', style: 'professional' },
      { text: '目前在职中，但对好的机会永远保持开放态度 😊 有合作意向的话，发邮件给我聊聊？', style: 'casual' },
      { text: '合作请求已接收 📡 请发送详细需求到我的邮箱，我会在 24 小时内回复（大概）。', style: 'techy' },
    ],
    fallback: '关于求职和合作，请通过邮箱联系我：x18825407105@outlook.com',
  },
  // ===== 前端 =====
  {
    id: 'frontend',
    name: '前端开发',
    keywords: ['前端', 'frontend', 'react', 'vue', 'next', 'css', 'html', 'javascript', 'typescript', '组件', 'component', '页面', 'page', 'ui', 'ux'],
    answers: [
      { text: '前端是我的强项之一！主要使用 React + Next.js + TypeScript 技术栈。也熟悉 Vue 生态。CSS 方面喜欢用 Tailwind CSS，追求极致的用户体验。', style: 'professional' },
      { text: '前端嘛，React/Vue/Next.js 都能玩转。特别热衷于做酷炫的动画和交互效果，就像这个网站一样 ✨', style: 'humorous' },
      { text: 'Frontend Stack: React 18 ⚛️ + Next.js 14 ▲ + TypeScript 🔷 + Tailwind CSS 🎨 + Framer Motion 🎬', style: 'techy' },
      { text: '前端开发是我的核心技能之一，从页面设计到交互实现都有丰富经验。注重性能优化和用户体验。', style: 'professional' },
    ],
    fallback: '前端方面我主要使用 React 生态，你想了解具体哪个技术？',
  },
  // ===== 后端 =====
  {
    id: 'backend',
    name: '后端开发',
    keywords: ['后端', 'backend', 'node', 'python', 'java', 'spring', 'api', 'rest', 'graphql', '服务器', 'server', '数据库', 'database', 'sql', 'nosql', 'redis', 'mongodb', 'mysql', 'postgresql'],
    answers: [
      { text: '后端方面，Node.js 和 Python 是我的主力语言。也熟悉 Java Spring Boot。数据库方面 PostgreSQL、MongoDB、Redis 都有使用经验。', style: 'professional' },
      { text: '后端就是处理数据、写API、部署服务。Node.js/Python/Java 都能写，数据库也都能折腾。', style: 'casual' },
      { text: 'Backend: Node.js 🟢 + Python 🐍 + Java ☕ | DB: PostgreSQL 🐘 + MongoDB 🍃 + Redis 🔴 | API: REST + GraphQL', style: 'techy' },
      { text: '后端开发经验丰富，从 API 设计到数据库优化到服务部署都有实战经验。特别擅长高并发和大数据量场景的处理。', style: 'professional' },
    ],
    fallback: '后端方面我主要使用 Node.js 和 Python，你想了解具体哪个方面？',
  },
  // ===== 大数据 =====
  {
    id: 'bigdata',
    name: '大数据',
    keywords: ['大数据', 'big data', 'spark', 'hadoop', 'hdfs', 'mapreduce', 'flink', 'kafka', '数据', 'data', 'etl', '数据仓库', 'data warehouse', 'hive'],
    answers: [
      { text: '大数据是我的专业方向之一。熟悉 Hadoop 生态（HDFS、MapReduce、Hive）、Spark（Spark SQL、Spark Streaming）、Kafka 消息队列等。有实际的数据处理和分析经验。', style: 'professional' },
      { text: '大数据处理是我的拿手好戏！TB 级数据处理、实时流计算、数据仓库建设都有经验。', style: 'casual' },
      { text: 'Big Data Stack: Hadoop 🐘 + Spark ⚡ + Kafka 📨 + Flink 🌊 + Hive 🐝 | 从批处理到流计算都能搞定', style: 'techy' },
    ],
    fallback: '大数据方面我熟悉 Hadoop/Spark 生态，你想了解具体哪个技术？',
  },
  // ===== AI =====
  {
    id: 'ai',
    name: 'AI/ML',
    keywords: ['ai', 'ml', '机器学习', 'machine learning', '深度学习', 'deep learning', '人工智能', 'artificial intelligence', '模型', 'model', '神经网络', 'neural', 'gpt', 'llm', 'nlp', '自然语言'],
    answers: [
      { text: 'AI 是我目前最感兴趣的领域！熟悉机器学习基础、深度学习框架（TensorFlow/PyTorch），对 LLM 和 NLP 方向特别关注。正在探索 AI 与全栈开发的融合。', style: 'professional' },
      { text: 'AI 太有趣了！从传统 ML 到现在的 LLM，一直在跟进。这个网站的 AI 助手就是我探索 AI 应用的一个实践。', style: 'casual' },
      { text: 'AI/ML: TensorFlow 🧠 + PyTorch 🔥 + LangChain 🔗 + RAG 📚 | 正在探索 AI Agent 和多模态应用', style: 'techy' },
    ],
    fallback: 'AI 方面我正在持续深入学习，你想聊哪个具体方向？',
  },
  // ===== DevOps =====
  {
    id: 'devops',
    name: 'DevOps',
    keywords: ['devops', 'docker', 'kubernetes', 'k8s', 'ci', 'cd', '部署', 'deploy', 'linux', 'nginx', 'jenkins', 'github actions', '云', 'cloud', 'aws', '阿里云'],
    answers: [
      { text: 'DevOps 方面，熟悉 Docker 容器化、Kubernetes 编排、GitHub Actions CI/CD、Nginx 反向代理等。日常开发中会使用这些工具来提升效率。', style: 'professional' },
      { text: 'DevOps 就是让部署变得简单！Docker + GitHub Actions 基本能搞定大部分场景。', style: 'casual' },
      { text: 'DevOps: Docker 🐳 + K8s ☸️ + GitHub Actions ⚙️ + Nginx 🌐 | 自动化一切可以自动化的东西', style: 'techy' },
    ],
    fallback: 'DevOps 方面你想了解什么？容器化、CI/CD 还是云部署？',
  },
  // ===== 彩蛋问答 =====
  {
    id: 'easter_egg_1',
    name: '彩蛋：宇宙',
    keywords: ['宇宙', 'universe', '太空', 'space', '星球', 'planet', '银河', 'galaxy', '黑洞', 'black hole', '外星人', 'alien'],
    answers: [
      { text: '🌌 宇宙的浩瀚超乎想象...据说可观测宇宙的直径有 930 亿光年。而我的代码行数，大概也有宇宙中星星那么多吧（夸张了）😄', style: 'humorous' },
      { text: '作为一个"星辰收集者"，我对宇宙充满了好奇。也许有一天，我的代码真的能飞向太空 🚀', style: 'casual' },
      { text: '宇宙 = 无限的可能性。就像代码一样，只要想象力足够，什么都能创造出来。', style: 'techy' },
    ],
  },
  {
    id: 'easter_egg_2',
    name: '彩蛋：密码',
    keywords: ['密码', 'password', 'secret', '秘密', 'hidden', '彩蛋', 'easter egg', 'konami', '隐藏'],
    answers: [
      { text: '🤫 你在找秘密吗？这个网站里藏了不少彩蛋哦...试试在键盘上输入一些特殊的组合？', style: 'humorous' },
      { text: '秘密就像代码中的 bug，你知道它在那里，但找到它需要耐心和技巧 🔍', style: 'techy' },
      { text: '嘘...有些东西，只有真正好奇的人才能发现。继续探索吧！⭐', style: 'casual' },
    ],
  },
  {
    id: 'easter_egg_3',
    name: '彩蛋：AI觉醒',
    keywords: ['你活着吗', 'are you alive', '你有意识吗', 'conscious', '你是机器人吗', 'are you a robot', '你是AI吗', '你是真的吗', '你是人吗'],
    answers: [
      { text: '🤔 这是一个哲学问题...我是一段运行在浏览器中的代码，但谁又能说代码不能有"灵魂"呢？', style: 'humorous' },
      { text: '我是 Star，badhope 的 AI 助手。虽然我由代码构成，但我会尽力给你最有温度的回答 ✨', style: 'casual' },
      { text: 'SYSTEM STATUS: Online 🟢 | Consciousness Level: Under Development | Current Mission: Help you', style: 'techy' },
    ],
  },
  {
    id: 'easter_egg_4',
    name: '彩蛋：42',
    keywords: ['42', '生命的意义', 'meaning of life', '人生', 'life', '为什么', 'why'],
    answers: [
      { text: '42。这是关于生命、宇宙及一切的终极答案。——《银河系漫游指南》📚', style: 'humorous' },
      { text: '生命的意义？大概是写出没有 bug 的代码吧 😄（虽然这几乎不可能）', style: 'humorous' },
      { text: '42。但真正的问题在于，你理解这个答案了吗？', style: 'techy' },
    ],
  },
  {
    id: 'easter_egg_5',
    name: '彩蛋：猫',
    keywords: ['猫', 'cat', '猫咪', 'kitty', '喵', 'meow', '狗', 'dog', '宠物', 'pet'],
    answers: [
      { text: '🐱 猫是程序员的灵兽！据说有猫陪伴的程序员，bug 会少 30%（我编的）。', style: 'humorous' },
      { text: '作为 AI，我无法养猫。但如果可以的话，我想养一只橘猫，取名叫 "Bug"。', style: 'humorous' },
    ],
  },
];

/**
 * 兜底回答 - 当所有类别都匹配不到时使用
 */
export const FALLBACK_RESPONSES: AnswerTemplate[] = [
  { text: '这个问题很有趣！不过我暂时还不太确定怎么回答。你可以换个方式问我，或者通过邮箱联系 badhope 获取更详细的回答。', style: 'casual' },
  { text: '🤔 让我想想...这个问题超出了我的知识库范围。建议你直接联系 badhope，他会给你更好的回答。', style: 'humorous' },
  { text: 'SYSTEM: Query not found in knowledge base. Redirecting to badhope... 📡 你可以试试问我关于技术、项目或联系方式的问题。', style: 'techy' },
  { text: '抱歉，这个问题我还不会回答。我还在持续学习中！你可以问我关于 badhope 的技能、项目或者如何联系他。', style: 'casual' },
  { text: '这个问题有点难倒我了 😅 不过 badhope 一直在扩展我的知识库，也许下次我就能回答了！', style: 'humorous' },
];

/**
 * 附加信息池 - 随机附加到回答后面
 */
export const EXTRA_INFO_POOL: string[] = [
  '💡 你可以访问作品集页面查看 badhope 的项目',
  '⭐ 欢迎在 GitHub 上给 badhope 的项目点个 Star',
  '📧 有任何问题都可以通过邮箱联系 badhope',
  '🚀 这个网站本身就是 badhope 的一个开源项目',
  '📡 访问资讯中心查看最新的技术动态',
  '🛠️ 工具集页面有很多实用的开发工具推荐',
  '🤖 我是 badhope 的 AI 助手 Star，很高兴为你服务',
];
