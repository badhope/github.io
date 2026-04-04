'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import StarNavigation from '@/components/ui/StarNavigation';
import SettingsPanel from '@/components/settings/SettingsPanel';
import WarpLoader from '@/components/animations/WarpLoader';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import DailyQuote from '@/components/sections/DailyQuote';
import GitHubStats from '@/components/animations/GitHubStats';
import DynamicStatus from '@/components/sections/DynamicStatus';
import FunZone from '@/components/sections/FunZone';
import Footer from '@/components/sections/Footer';
import styles from './home.module.css';

const MouseTrail = dynamic(() => import('@/components/animations/MouseTrail'), { ssr: false });
const CosmicOrbit = dynamic(() => import('@/components/animations/CosmicOrbit'), { ssr: false });

export default function HomePage() {
  const [showLoader, setShowLoader] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
  }, []);

  return (
    <div className={styles.page}>
      {showLoader && <WarpLoader onComplete={handleLoaderComplete} />}

      {!showLoader && (
        <>
          <MouseTrail />
          <StarNavigation />
          <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

          <main className={styles.main}>
            {/* Hero Section */}
            <HeroSection />

            <div className={styles.divider} />

            {/* About Section */}
            <AboutSection />

            <div className={styles.divider} />

            {/* Cosmic Orbit Section */}
            <CosmicOrbitSection />

            <div className={styles.divider} />

            {/* GitHub Live Stats */}
            <GitHubStats />

            <div className={styles.divider} />

            {/* Dynamic Status Panel */}
            <DynamicStatusSection />

            <div className={styles.divider} />

            {/* Fun Zone */}
            <FunZone />

            <div className={styles.divider} />

            {/* Daily Quote */}
            <DailyQuote />
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}

function CosmicOrbitSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = (node: HTMLDivElement | null) => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setVisible(true); },
        { threshold: 0.2 }
      );
      observer.observe(node);
    }
  };

  return (
    <section
      ref={sectionRef}
      style={{ padding: '60px 24px', textAlign: 'center' }}
    >
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.85rem',
        color: '#d4af37',
        letterSpacing: '1px',
        marginBottom: '24px'
      }}>
        {'// ' + 'Cosmic Tech Orbit'}
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
