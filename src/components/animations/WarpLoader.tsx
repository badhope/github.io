'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WarpLoader.module.css';

interface WarpLoaderProps {
  onComplete: () => void;
}

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  size: number;
  color: string;
}

export default function WarpLoader({ onComplete }: WarpLoaderProps) {
  const [phase, setPhase] = useState<'idle' | 'warp' | 'transition'>('idle');
  const [progress, setProgress] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<{id: number; x: number; y: number; delay: number; duration: number}[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const speedRef = useRef(0);
  const targetSpeedRef = useRef(0);

  // Initialize stars
  useEffect(() => {
    const newStars: Star[] = [];
    const colors = ['#ffffff', '#d4af37', '#1a73e8', '#7c3aed', '#06b6d4', '#f0d060'];
    for (let i = 0; i < 800; i++) {
      newStars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1500 + 500,
        prevZ: 0,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    starsRef.current = newStars;
    setStars(newStars);

    // Initialize meteors
    const newMeteors = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 50,
      delay: Math.random() * 5,
      duration: 1 + Math.random() * 2,
    }));
    setMeteors(newMeteors);
  }, []);

  // Canvas animation loop
  useEffect(() => {
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

    const centerX = () => canvas.width / 2;
    const centerY = () => canvas.height / 2;

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 5, 16, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Smooth speed transition
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.02;

      const cx = centerX();
      const cy = centerY();

      starsRef.current.forEach((star) => {
        star.prevZ = star.z;
        star.z -= speedRef.current;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = 1500;
          star.prevZ = 1500;
        }

        // Project to 2D
        const sx = (star.x / star.z) * 300 + cx;
        const sy = (star.y / star.z) * 300 + cy;
        const px = (star.x / star.prevZ) * 300 + cx;
        const py = (star.y / star.prevZ) * 300 + cy;

        const size = Math.max(0.1, (1 - star.z / 1500) * star.size * 3);
        const alpha = Math.max(0, Math.min(1, 1 - star.z / 1500));

        // Draw star trail during warp
        if (speedRef.current > 5) {
          const trailLength = Math.min(speedRef.current * 0.5, 50);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = alpha * 0.6;
          ctx.lineWidth = size * 0.5;
          ctx.stroke();
        }

        // Draw star point
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        // Glow effect for bright stars
        if (size > 1.5) {
          ctx.beginPath();
          ctx.arc(sx, sy, size * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 3);
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.globalAlpha = alpha * 0.3;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;

      // Draw nebula clouds during warp
      if (speedRef.current > 10) {
        const time = Date.now() * 0.001;
        for (let i = 0; i < 3; i++) {
          const nx = cx + Math.sin(time + i * 2) * 200;
          const ny = cy + Math.cos(time + i * 1.5) * 150;
          const gradient = ctx.createRadialGradient(nx, ny, 0, nx, ny, 200);
          const colors = ['rgba(26,115,232,0.03)', 'rgba(124,58,237,0.03)', 'rgba(212,175,55,0.02)'];
          gradient.addColorStop(0, colors[i]);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Progress simulation
  useEffect(() => {
    if (phase !== 'warp') return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setPhase('transition');
          return 100;
        }
        return p + Math.random() * 3 + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [phase]);

  // Handle transition complete
  useEffect(() => {
    if (phase === 'transition') {
      const timer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  const handleEnter = useCallback(() => {
    setShowButton(false);
    setPhase('warp');
    targetSpeedRef.current = 50;
  }, []);

  const handleSkip = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    onComplete();
  }, [onComplete]);

  return (
    <div className={styles.loader}>
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Nebula background effects */}
      <div className={styles.nebula1} />
      <div className={styles.nebula2} />
      <div className={styles.nebula3} />

      {/* Meteors */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className={styles.meteor}
          style={{
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        />
      ))}

      {/* Central content */}
      <AnimatePresence mode="wait">
        {phase === 'idle' && showButton && (
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            transition={{ duration: 0.8 }}
          >
            {/* Star Logo */}
            <motion.div
              className={styles.logoContainer}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className={styles.logoStar}>⭐</div>
              <div className={styles.logoGlow} />
            </motion.div>

            <motion.h1
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className={styles.titleLine1}>badhope&apos;s</span>
              <span className={styles.titleLine2}>Starbase</span>
            </motion.h1>

            <motion.p
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Exploring the Universe of Code
            </motion.p>

            <motion.div
              className={styles.enterBtnContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <button className={styles.enterBtn} onClick={handleEnter}>
                <span className={styles.enterBtnText}>ENTER</span>
                <span className={styles.enterBtnSub}>进入空间站</span>
                <div className={styles.enterBtnGlow} />
              </button>
            </motion.div>

            <motion.div
              className={styles.hint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <span className={styles.hintText}>// Initializing starbase systems...</span>
            </motion.div>
          </motion.div>
        )}

        {phase === 'warp' && (
          <motion.div
            className={styles.warpContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className={styles.warpText}>
              <motion.span
                className={styles.warpLabel}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                WARP DRIVE ENGAGED
              </motion.span>
            </div>

            {/* Progress bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressTrack}>
                <motion.div
                  className={styles.progressFill}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <span className={styles.progressText}>
                {Math.min(Math.floor(progress), 100)}%
              </span>
            </div>

            {/* Warp speed indicator */}
            <div className={styles.speedIndicator}>
              <span className={styles.speedLabel}>WARP</span>
              <motion.span
                className={styles.speedValue}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {Math.floor(speedRef.current * 2.4)}
              </motion.span>
            </div>

            <button className={styles.skipBtn} onClick={handleSkip}>
              Skip →
            </button>
          </motion.div>
        )}

        {phase === 'transition' && (
          <motion.div
            className={styles.transitionOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <div className={styles.transitionFlash} />
            <motion.div
              className={styles.transitionText}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              ⭐ Welcome to Starbase
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
