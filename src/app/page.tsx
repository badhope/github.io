'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import StarNavigation from '@/components/ui/StarNavigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import DailyQuote from '@/components/sections/DailyQuote';
import Footer from '@/components/sections/Footer';
import SettingsPanel from '@/components/settings/SettingsPanel';
import styles from './home/page.module.css';

const MouseTrail = dynamic(() => import('@/components/animations/MouseTrail'), { ssr: false });
const CosmicOrbit = dynamic(() => import('@/components/animations/CosmicOrbit'), { ssr: false });
const GitHubStats = dynamic(() => import('@/components/animations/GitHubStats'), { ssr: false });
const DynamicStatus = dynamic(() => import('@/components/sections/DynamicStatus'), { ssr: false });
const FunZone = dynamic(() => import('@/components/sections/FunZone'), { ssr: false });

export default function RootPage() {
  // 根页面：跳过 WarpLoader，直接显示内容（sessionStorage 防止重复弹窗）
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <MouseTrail />
      <StarNavigation />

      {/* SettingsPanel 必须在这里（不在 main 内），否则 z-index 受父容器限制 */}
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <main className={styles.main}>
        <HeroSection />
        <div className={styles.divider} />

        <AboutSection />
        <div className={styles.divider} />

        <CosmicOrbitSection />
        <div className={styles.divider} />

        <GitHubStats />
        <div className={styles.divider} />

        <DynamicStatusSection />
        <div className={styles.divider} />

        <FunZone />
        <div className={styles.divider} />

        <DailyQuote />
      </main>

      <Footer />
    </div>
  );
}

function CosmicOrbitSection() {
  const [visible, setVisible] = useState(false);
  const ref = (node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(node);
  };
  return (
    <section ref={ref} style={{ padding: '60px 24px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#d4af37', letterSpacing: '1px', marginBottom: '24px' }}>
        {'// Cosmic Tech Orbit'}
      </div>
      {visible && <CosmicOrbit size={360} />}
    </section>
  );
}

function DynamicStatusSection() {
  return (
    <section style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <DynamicStatus />
      </div>
    </section>
  );
}
