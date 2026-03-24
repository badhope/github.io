'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import styles from './page.module.css';

function ContactUnavailableContent() {
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'unknown';
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const platformNames: Record<string, { zh: string; en: string; icon: string }> = {
    bilibili: { zh: 'B站', en: 'Bilibili', icon: '📺' },
    twitter: { zh: 'Twitter/X', en: 'Twitter/X', icon: '🐦' },
    linkedin: { zh: 'LinkedIn', en: 'LinkedIn', icon: '💼' },
    wechat: { zh: '微信', en: 'WeChat', icon: '💬' },
  };

  const info = platformNames[platform] || { zh: platform, en: platform, icon: '🔗' };

  return (
    <div className={styles.page}>
      <StarNavigation />
      <div className={styles.container}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className={styles.icon}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {info.icon}
          </motion.div>

          <h1 className={styles.title}>
            {isZh ? `${info.zh} 暂未开放` : `${info.en} Coming Soon`}
          </h1>

          <p className={styles.desc}>
            {isZh
              ? '该社交平台暂未开放，请通过其他方式联系 badhope'
              : 'This platform is not yet available. Please contact badhope through other channels.'}
          </p>

          <div className={styles.alternatives}>
            <span className={styles.altLabel}>
              {isZh ? '可用联系方式：' : 'Available channels:'}
            </span>
            <div className={styles.altLinks}>
              <a href="https://github.com/badhope" target="_blank" rel="noopener noreferrer" className={styles.altLink}>
                🐙 GitHub
              </a>
              <a href="mailto:x18825407105@outlook.com" className={styles.altLink}>
                📧 Email
              </a>
              <a href="/contact" className={styles.altLink}>
                📨 {isZh ? '联系表单' : 'Contact Form'}
              </a>
            </div>
          </div>

          <div className={styles.devNote}>
            <span className={styles.devTag}>DEV</span>
            <span className={styles.devText}>
              {isZh
                ? `// 在 src/config/social.ts 中配置 ${info.zh} 链接即可启用`
                : `// Configure ${info.en} link in src/config/social.ts to enable`}
            </span>
          </div>

          <a href="/" className={styles.backBtn}>
            ← {isZh ? '返回首页' : 'Back to Home'}
          </a>
        </motion.div>
      </div>
    </div>
  );
}

export default function ContactUnavailablePage() {
  return (
    <Suspense fallback={<div className={styles.page}><div className={styles.container}><p>Loading...</p></div></div>}>
      <ContactUnavailableContent />
    </Suspense>
  );
}
