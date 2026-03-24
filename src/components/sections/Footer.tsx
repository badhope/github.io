'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './Footer.module.css';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/badhope', icon: '🐙' },
  { name: 'CSDN', url: 'https://blog.csdn.net/weixin_56622231', icon: '📚' },
  { name: '掘金', url: 'https://juejin.cn/user/235011154247', icon: '💎' },
  { name: 'Bilibili', url: '/contact-unavailable?platform=bilibili', icon: '📺' },
  { name: 'Twitter', url: '/contact-unavailable?platform=twitter', icon: '🐦' },
  { name: 'LinkedIn', url: '/contact-unavailable?platform=linkedin', icon: '💼' },
];

export default function Footer() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top section */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.brandLogo}>⭐</span>
            <div>
              <h3 className={styles.brandName}>badhope&apos;s Starbase</h3>
              <p className={styles.brandTagline}>
                {isZh ? '探索代码与创意的宇宙' : 'Exploring the Universe of Code & Creativity'}
              </p>
            </div>
          </div>

          <div className={styles.social}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.url.startsWith('/') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className={styles.socialLink}
                whileHover={{ scale: 1.2, y: -3 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                title={link.name}
              >
                <span className={styles.socialIcon}>{link.icon}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom section */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} badhope.{' '}
            {isZh ? '用 ❤️ 和代码构建' : 'Built with ❤️ and code'}
          </p>
          <p className={styles.terminal}>
            <span className={styles.terminalPrompt}>{'>'}</span>
            <span className={styles.terminalText}>
              {isZh ? '启明星空间站系统运行正常' : 'Starbase systems operational'}
            </span>
            <span className={styles.terminalCursor}>_</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
