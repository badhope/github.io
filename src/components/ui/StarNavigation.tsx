'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import SettingsPanel from '@/components/settings/SettingsPanel';
import styles from './StarNavigation.module.css';

interface NavItem {
  path: string;
  labelZh: string;
  labelEn: string;
  icon: string;
  group: 'main' | 'more';
}

const navItems: NavItem[] = [
  { path: '/', labelZh: '首页', labelEn: 'Home', icon: '🏠', group: 'main' },
  { path: '/projects', labelZh: '作品集', labelEn: 'Projects', icon: '💼', group: 'main' },
  { path: '/tools', labelZh: '工具集', labelEn: 'Tools', icon: '🛠️', group: 'main' },
  { path: '/news', labelZh: '资讯中心', labelEn: 'News Hub', icon: '📡', group: 'main' },
  { path: '/blog', labelZh: '博客', labelEn: 'Blog', icon: '📝', group: 'more' },
  { path: '/ai', labelZh: 'AI 助手', labelEn: 'AI Assistant', icon: '🤖', group: 'more' },
  { path: '/resume', labelZh: '简历', labelEn: 'Resume', icon: '📄', group: 'more' },
  { path: '/contact', labelZh: '联系我', labelEn: 'Contact', icon: '📧', group: 'more' },
];

export default function StarNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const navRef = useRef<HTMLDivElement>(null);
  const isZh = language === 'zh';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close nav on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mainItems = navItems.filter((item) => item.group === 'main');
  const moreItems = navItems.filter((item) => item.group === 'more');

  return (
    <>
      {/* Top bar */}
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.navInner}>
          {/* Logo button */}
          <button
            className={styles.logoBtn}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            <motion.span
              className={styles.logoStar}
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              ⭐
            </motion.span>
          </button>

          {/* Language toggle */}
          <button
            className={styles.langBtn}
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
            aria-label="Toggle language"
          >
            {language === 'zh' ? 'EN' : '中'}
          </button>

          {/* Settings button */}
          <button
            className={styles.settingsBtn}
            onClick={() => setSettingsOpen(true)}
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
      </motion.nav>

      {/* Settings panel */}
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Side navigation panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              ref={navRef}
              className={styles.panel}
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Panel header */}
              <div className={styles.panelHeader}>
                <div className={styles.panelLogo}>⭐</div>
                <div>
                  <h2 className={styles.panelTitle}>Starbase</h2>
                  <p className={styles.panelSubtitle}>
                    {isZh ? '导航系统' : 'Navigation'}
                  </p>
                </div>
              </div>

              {/* Main navigation */}
              <div className={styles.navGroup}>
                <span className={styles.groupLabel}>
                  {isZh ? '主导航' : 'Main'}
                </span>
                {mainItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
                    >
                      <span className={styles.navIcon}>{item.icon}</span>
                      <span className={styles.navLabel}>
                        {isZh ? item.labelZh : item.labelEn}
                      </span>
                      {pathname === item.path && (
                        <motion.div
                          className={styles.activeIndicator}
                          layoutId="activeNav"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* More navigation */}
              <div className={styles.navGroup}>
                <span className={styles.groupLabel}>
                  {isZh ? '更多' : 'More'}
                </span>
                {moreItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (mainItems.length + index) * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      className={`${styles.navLink} ${pathname === item.path ? styles.active : ''}`}
                    >
                      <span className={styles.navIcon}>{item.icon}</span>
                      <span className={styles.navLabel}>
                        {isZh ? item.labelZh : item.labelEn}
                      </span>
                      {pathname === item.path && (
                        <motion.div
                          className={styles.activeIndicator}
                          layoutId="activeNav"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Panel footer */}
              <div className={styles.panelFooter}>
                <span className={styles.footerText}>
                  {isZh ? 'badhope\'s Starbase' : 'badhope\'s Starbase'}
                </span>
                <span className={styles.footerVersion}>v2.0</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
