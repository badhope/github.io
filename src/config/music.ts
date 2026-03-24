/**
 * ============================================================
 * 🎵 BACKGROUND MUSIC - CONFIGURATION
 * ============================================================
 * 
 * 背景音乐配置文件
 * 
 * 📖 使用方法：
 * 1. 将音乐文件放入 /public/audio/ 目录
 * 2. 在下方配置音乐URL
 * 3. 支持多个音轨，系统会随机或按顺序播放
 * 
 * ⚠️ 注意：
 * - 建议使用较短的循环音乐（30秒-2分钟）
 * - 文件大小建议控制在 5MB 以内
 * - 支持 mp3, ogg, wav 格式
 * 
 * ============================================================
 */

export interface MusicTrack {
  /** 音乐名称 */
  name: string;
  /** 音乐文件URL（相对于public目录） */
  url: string;
  /** 是否循环 */
  loop: boolean;
  /** 音量 (0-1) */
  volume: number;
}

/**
 * 背景音乐列表
 * 
 * 示例配置（取消注释并填入真实URL即可启用）：
 */
export const MUSIC_TRACKS: MusicTrack[] = [
  // {
  //   name: 'Ambient Space',
  //   url: '/audio/ambient-space.mp3',
  //   loop: true,
  //   volume: 0.3,
  // },
  // {
  //   name: 'Cosmic Journey',
  //   url: '/audio/cosmic-journey.mp3',
  //   loop: true,
  //   volume: 0.2,
  // },
];

/**
 * 音效配置
 */
export const SOUND_EFFECTS = {
  /** 按钮点击音效 */
  click: '/audio/click.mp3',
  /** 页面过渡音效 */
  transition: '/audio/transition.mp3',
  /** 彩蛋触发音效 */
  easterEgg: '/audio/easter-egg.mp3',
  /** 通知音效 */
  notification: '/audio/notification.mp3',
};
