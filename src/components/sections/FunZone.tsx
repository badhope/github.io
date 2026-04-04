'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import SnakeGame from '@/components/animations/SnakeGame';
import styles from './FunZone.module.css';

type ActiveGame = 'snake' | null;

export default function FunZone() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [activeGame, setActiveGame] = useState<ActiveGame>(null);

  const games = [
    {
      id: 'snake' as ActiveGame,
      icon: '🐍',
      titleZh: '贪吃蛇',
      titleEn: 'Snake Game',
      descZh: '吃星星的宇宙版贪吃蛇',
      descEn: 'Cosmic snake - eat stars!',
      color: '#d4af37',
      bg: 'rgba(212, 175, 55, 0.08)',
    },
    {
      id: null as ActiveGame,
      icon: '🎮',
      titleZh: '更多游戏中',
      titleEn: 'More Coming',
      descZh: '2048 / Pong / Tetris 即将上线',
      descEn: '2048 / Pong / Tetris coming soon',
      color: '#7c3aed',
      bg: 'rgba(124, 58, 237, 0.08)',
    },
    {
      id: null as ActiveGame,
      icon: '✨',
      titleZh: '彩蛋收集',
      titleEn: 'Easter Eggs',
      descZh: '发现页面隐藏的彩蛋',
      descEn: 'Find hidden easter eggs!',
      color: '#06b6d4',
      bg: 'rgba(6, 182, 212, 0.08)',
    },
  ];

  return (
    <section className={styles.funZone}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.headerTag}>/ Fun Zone</span>
          <h2 className={styles.headerTitle}>
            {isZh ? '🎮 趣味互动区' : '🎮 Interactive Zone'}
          </h2>
          <p className={styles.headerDesc}>
            {isZh
              ? '休息一下，玩个小游戏放松一下吧！'
              : 'Take a break and have some fun with mini games!'}
          </p>
        </motion.div>

        {/* Game cards */}
        <div className={styles.gameCards}>
          {games.map((game, i) => (
            <motion.div
              key={game.titleEn}
              className={styles.gameCard}
              style={{ '--game-color': game.color, '--game-bg': game.bg } as React.CSSProperties}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={game.id ? { y: -8, scale: 1.02 } : {}}
              onClick={() => game.id && setActiveGame(activeGame === game.id ? null : game.id)}
            >
              <span className={styles.gameIcon}>{game.icon}</span>
              <h3 className={styles.gameTitle}>
                {isZh ? game.titleZh : game.titleEn}
              </h3>
              <p className={styles.gameDesc}>
                {isZh ? game.descZh : game.descEn}
              </p>
              {game.id && (
                <span className={styles.playHint}>
                  {isZh ? '▶ 点击开始' : '▶ Click to play'}
                </span>
              )}
              <div className={styles.cardGlow} />
            </motion.div>
          ))}
        </div>

        {/* Snake Game Expand */}
        <AnimatePresence>
          {activeGame === 'snake' && (
            <motion.div
              className={styles.gameExpand}
              initial={{ opacity: 0, height: 0, scale: 0.9 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className={styles.gameWrapper}>
                <button
                  className={styles.closeBtn}
                  onClick={() => setActiveGame(null)}
                  aria-label={isZh ? '关闭' : 'Close'}
                >
                  ✕
                </button>
                <SnakeGame />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Easter egg hint */}
        <motion.div
          className={styles.eggHint}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <span className={styles.eggIcon}>💡</span>
          <p>
            {isZh
              ? '小提示：试着在页面上按住鼠标左键并移动，看看会发生什么~ 🎉'
              : 'Tip: Hold left mouse button and move around the page... something magical might happen! 🎉'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
