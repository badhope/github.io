'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSettings } from '@/lib/settings/SettingsContext';
import styles from './HeroSection.module.css';

const StarLogo = dynamic(() => import('@/components/3d/StarLogo'), {
  ssr: false,
  loading: () => <div className={styles.logoPlaceholder}>⭐</div>,
});

const titles = {
  zh: ['全栈开发者', 'AI 探索者', '代码创造者', '开源贡献者', '技术博主', '终端爱好者', '星辰收集者', '大数据工程师', '后端架构师', '宇宙漫游者'],
  en: ['Full-Stack Developer', 'AI Explorer', 'Code Creator', 'Open Source Contributor', 'Tech Blogger', 'Terminal Enthusiast', 'Star Collector', 'Big Data Engineer', 'Backend Architect', 'Space Wanderer'],
};

export default function HeroSection() {
  const { t, language } = useLanguage();
  const { settings } = useSettings();
  const [currentTitle, setCurrentTitle] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!mounted) return;
    const titleList = titles[language] || titles.en;
    const currentFullText = titleList[currentTitle % titleList.length];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitle((prev) => (prev + 1) % titleList.length);
        }
      }
    }, isDeleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitle, language, mounted]);

  // Dynamic star background
  useEffect(() => {
    if (!mounted || !settings.showParticles) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const stars: { x: number; y: number; size: number; speed: number; opacity: number; twinkleSpeed: number }[] = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.twinkleSpeed *= -1;
        }
        star.y -= star.speed;
        if (star.y < -10) {
          star.y = canvas.height + 10;
          star.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${star.opacity * 0.6})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [mounted, settings.showParticles]);

  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (!mounted) return null;

  const isZh = language === 'zh';

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.starCanvas} />

      {/* Background gradients */}
      <div className={styles.bgGradient} />
      <div className={styles.bgGradient2} />
      <div className={styles.bgGradient3} />

      {/* Decorative elements */}
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />
      <div className={styles.decorOrbit} />

      <div className={styles.content}>
        {/* 3D Logo */}
        <motion.div
          className={styles.logoWrapper}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <StarLogo size={200} />
        </motion.div>

        {/* Terminal-style greeting */}
        <motion.div
          className={styles.terminalGreeting}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className={styles.terminalPrompt}>{'>'}</span>
          <span className={styles.terminalText}>
            {isZh ? '你好，我是' : "Hello, I'm"}
          </span>
          <span className={styles.terminalName}> badhope</span>
          <span className={styles.terminalCursor}>_</span>
        </motion.div>

        {/* Typewriter title */}
        <motion.div
          className={styles.titleContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h1 className={styles.title}>
            <span className={styles.titleText}>{displayText}</span>
            <span className={styles.titleCursor}>|</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {isZh
            ? '在代码的宇宙中探索，用技术点亮星辰'
            : 'Exploring the universe of code, illuminating stars with technology'}
        </motion.p>

        {/* Buttons */}
        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <button className={styles.btnPrimary} onClick={scrollToAbout}>
            <span>{isZh ? '探索更多' : 'Explore More'}</span>
            <span className={styles.btnArrow}>→</span>
          </button>
          <a href="/contact" className={styles.btnSecondary}>
            {isZh ? '联系我' : 'Contact Me'}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className={styles.stat}>
            <span className={styles.statNumber}>∞</span>
            <span className={styles.statLabel}>{isZh ? '好奇心' : 'Curiosity'}</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>24/7</span>
            <span className={styles.statLabel}>{isZh ? '编码中' : 'Coding'}</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>⭐</span>
            <span className={styles.statLabel}>{isZh ? '启明星' : 'Starbase'}</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={scrollToAbout}
      >
        <span className={styles.scrollText}>
          {isZh ? '向下滚动' : 'Scroll Down'}
        </span>
        <motion.div
          className={styles.scrollDot}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
