'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSettings } from '@/lib/settings/SettingsContext';
import styles from './SettingsPanel.module.css';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { language } = useLanguage();
  const { settings, updateSettings } = useSettings();
  const isZh = language === 'zh';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.panel}
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>
                {isZh ? '设置' : 'Settings'}
              </h2>
              <button className={styles.closeBtn} onClick={onClose}>✕</button>
            </div>

            <div className={styles.content}>
              {/* Animation toggle */}
              <div className={styles.settingGroup}>
                <div className={styles.settingRow}>
                  <div className={styles.settingInfo}>
                    <span className={styles.settingLabel}>
                      {isZh ? '动画效果' : 'Animations'}
                    </span>
                    <span className={styles.settingDesc}>
                      {isZh ? '开启/关闭页面动画' : 'Enable/disable page animations'}
                    </span>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.showAnimations ? styles.toggleOn : ''}`}
                    onClick={() => updateSettings({ showAnimations: !settings.showAnimations })}
                    aria-label="Toggle animations"
                  >
                    <div className={styles.toggleThumb} />
                  </button>
                </div>
              </div>

              {/* Particles toggle */}
              <div className={styles.settingGroup}>
                <div className={styles.settingRow}>
                  <div className={styles.settingInfo}>
                    <span className={styles.settingLabel}>
                      {isZh ? '粒子效果' : 'Particles'}
                    </span>
                    <span className={styles.settingDesc}>
                      {isZh ? '开启/关闭背景粒子' : 'Enable/disable background particles'}
                    </span>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.showParticles ? styles.toggleOn : ''}`}
                    onClick={() => updateSettings({ showParticles: !settings.showParticles })}
                    aria-label="Toggle particles"
                  >
                    <div className={styles.toggleThumb} />
                  </button>
                </div>
              </div>

              {/* Sound control */}
              <div className={styles.settingGroup}>
                <div className={styles.settingRow}>
                  <div className={styles.settingInfo}>
                    <span className={styles.settingLabel}>
                      {isZh ? '音量' : 'Volume'}
                    </span>
                    <span className={styles.settingDesc}>
                      {isZh ? '调整背景音乐音量' : 'Adjust background music volume'}
                    </span>
                  </div>
                  <div className={styles.volumeControl}>
                    <span className={styles.volumeIcon}>🔊</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={settings.volume ?? 50}
                      onChange={(e) => updateSettings({ volume: parseInt(e.target.value) })}
                      className={styles.volumeSlider}
                      aria-label="Volume"
                    />
                    <span className={styles.volumeValue}>{settings.volume ?? 50}%</span>
                  </div>
                </div>
              </div>

              {/* Background music placeholder */}
              <div className={styles.settingGroup}>
                <div className={styles.settingRow}>
                  <div className={styles.settingInfo}>
                    <span className={styles.settingLabel}>
                      {isZh ? '背景音乐' : 'Background Music'}
                    </span>
                    <span className={styles.settingDesc}>
                      {isZh ? '在 src/config/music.ts 中配置音乐URL' : 'Configure music URL in src/config/music.ts'}
                    </span>
                  </div>
                  <span className={styles.placeholder}>
                    {isZh ? '待配置' : 'Configure'}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className={styles.info}>
                <p className={styles.infoText}>
                  {isZh
                    ? '💡 提示：关闭动画可提升低性能设备的体验'
                    : '💡 Tip: Disabling animations improves experience on low-performance devices'}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
