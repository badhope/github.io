'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import styles from './not-found.module.css';

export default function NotFound() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <div className={styles.page}>
      <StarNavigation />
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Astronaut */}
          <motion.div
            className={styles.astronaut}
            animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🧑‍🚀
          </motion.div>

          {/* 404 number */}
          <motion.h1
            className={styles.errorCode}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
          >
            404
          </motion.h1>

          <motion.p
            className={styles.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {isZh ? '迷失在星空中' : 'Lost in Space'}
          </motion.p>

          <motion.p
            className={styles.desc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {isZh
              ? '这个星球不存在，或者已被黑洞吞噬...'
              : 'This planet doesn\'t exist, or it\'s been consumed by a black hole...'}
          </motion.p>

          {/* Terminal-style message */}
          <motion.div
            className={styles.terminal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span className={styles.terminalPrompt}>{'>'}</span>
            <span className={styles.terminalText}>
              route.not_found: {isZh ? '目标坐标不存在' : 'target coordinates not found'}
            </span>
          </motion.div>

          {/* Actions */}
          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <a href="/" className={styles.btnPrimary}>
              ⭐ {isZh ? '返回空间站' : 'Return to Starbase'}
            </a>
            <a
              href="https://github.com/badhope/badhope.github.io/issues/new"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              🐛 {isZh ? '报告问题' : 'Report Issue'}
            </a>
          </motion.div>
        </motion.div>

        {/* Decorative stars */}
        <div className={styles.stars}>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className={styles.star}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
