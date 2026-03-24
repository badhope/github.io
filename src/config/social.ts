/**
 * ============================================================
 * 🔗 SOCIAL LINKS - CONFIGURATION
 * ============================================================
 * 
 * 社交链接配置文件 - 在此配置所有社交平台链接
 * 
 * 📖 使用方法：
 * - 将 placeholder 链接替换为真实链接即可启用
 * - 如果链接为空或以 '/contact-unavailable' 开头，将显示"暂未开放"提示
 * - 添加新平台只需在数组中新增一项
 * 
 * ============================================================
 */

export interface SocialLink {
  /** 平台名称 */
  name: string;
  /** 平台中文名 */
  nameZh: string;
  /** 链接URL - 填入真实链接即可启用 */
  url: string;
  /** 图标 (emoji) */
  icon: string;
  /** 是否在新标签页打开 */
  external: boolean;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    nameZh: 'GitHub',
    url: 'https://github.com/badhope',
    icon: '🐙',
    external: true,
  },
  {
    name: 'CSDN',
    nameZh: 'CSDN',
    url: 'https://blog.csdn.net/weixin_56622231',
    icon: '📚',
    external: true,
  },
  {
    name: 'Juejin',
    nameZh: '掘金',
    url: 'https://juejin.cn/user/235011154247',
    icon: '💎',
    external: true,
  },
  {
    name: 'Bilibili',
    nameZh: 'B站',
    url: '/contact-unavailable?platform=bilibili', // ← 替换为真实B站链接
    icon: '📺',
    external: false,
  },
  {
    name: 'Twitter',
    nameZh: 'Twitter/X',
    url: '/contact-unavailable?platform=twitter', // ← 替换为真实Twitter链接
    icon: '🐦',
    external: false,
  },
  {
    name: 'LinkedIn',
    nameZh: 'LinkedIn',
    url: '/contact-unavailable?platform=linkedin', // ← 替换为真实LinkedIn链接
    icon: '💼',
    external: false,
  },
  {
    name: 'WeChat',
    nameZh: '微信',
    url: '/contact-unavailable?platform=wechat', // ← 替换为真实微信链接
    icon: '💬',
    external: false,
  },
];

/**
 * 获取可用的社交链接（有真实URL的）
 */
export function getAvailableLinks(): SocialLink[] {
  return SOCIAL_LINKS.filter((link) => !link.url.startsWith('/contact-unavailable'));
}

/**
 * 获取不可用的社交链接（需要配置的）
 */
export function getUnavailableLinks(): SocialLink[] {
  return SOCIAL_LINKS.filter((link) => link.url.startsWith('/contact-unavailable'));
}
