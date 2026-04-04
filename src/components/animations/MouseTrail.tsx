'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './MouseTrail.module.css';

interface Trail {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; color: string;
  letters: string[];
  letterIdx: number;
}

const LETTERS = ['★', '✦', '✧', '·', '◈', '◇', '○', '⬡', '☆', '⚝'];
const COLORS = ['#d4af37', '#f0d060', '#3178c6', '#7c3aed', '#06b6d4', '#a78bfa'];
const MAX_TRAILS = 20;

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailsRef = useRef<Trail[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trailsRef.current = trailsRef.current.filter(t => t.life > 0);

    trailsRef.current.forEach((t, idx) => {
      t.x += t.vx;
      t.y += t.vy;
      t.vy += 0.05;
      t.vx *= 0.97;
      t.life -= 1.5;
      t.letterIdx = (t.letterIdx + 0.3) % t.letters.length;

      const alpha = (t.life / t.maxLife) * 0.9;
      const progress = 1 - t.life / t.maxLife;
      const size = t.size * (1 - progress * 0.5);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = t.color;
      ctx.shadowBlur = 10 * alpha;
      ctx.fillStyle = t.color;
      ctx.font = `${size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Glow
      const grd = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, size);
      grd.addColorStop(0, t.color + 'aa');
      grd.addColorStop(1, t.color + '00');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
      ctx.fill();

      // Letter
      ctx.globalAlpha = alpha;
      ctx.fillStyle = t.color;
      ctx.fillText(t.letters[Math.floor(t.letterIdx)], t.x, t.y);

      ctx.restore();
    });

    rafRef.current = requestAnimationFrame(draw);
  }, []);

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

    rafRef.current = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseRef.current.x;
      const dy = e.clientY - mouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 2 && trailsRef.current.length < MAX_TRAILS) {
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const letters = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () =>
          LETTERS[Math.floor(Math.random() * LETTERS.length)]
        );
        trailsRef.current.push({
          x: e.clientX, y: e.clientY,
          vx: dx * 0.1 + (Math.random() - 0.5) * 2,
          vy: dy * 0.1 + (Math.random() - 0.5) * 2 - 1,
          life: 40 + speed * 0.5,
          maxLife: 40 + speed * 0.5,
          size: 10 + Math.random() * 12,
          color, letters,
          letterIdx: 0,
        });
      }
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  return <canvas ref={canvasRef} className={styles.trailCanvas} aria-hidden="true" />;
}
