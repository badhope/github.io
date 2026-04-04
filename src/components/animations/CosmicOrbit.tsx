'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './CosmicOrbit.module.css';

interface Orb {
  angle: number; radius: number; speed: number;
  size: number; color: string; glow: string;
  label: string; icon: string;
}

const ORBIT_ITEMS: Orb[] = [
  { angle: 0, radius: 100, speed: 0.008, size: 12, color: '#f0d060', glow: '#f0d060', label: 'TypeScript', icon: 'TS' },
  { angle: 1.2, radius: 140, speed: -0.006, size: 10, color: '#3178c6', glow: '#3178c6', label: 'React', icon: '⚛' },
  { angle: 2.5, radius: 110, speed: 0.01, size: 8, color: '#06b6d4', glow: '#06b6d4', label: 'Next.js', icon: '▲' },
  { angle: 3.8, radius: 130, speed: -0.007, size: 9, color: '#7c3aed', glow: '#7c3aed', label: 'Python', icon: '🐍' },
  { angle: 5.0, radius: 95, speed: 0.012, size: 7, color: '#22c55e', glow: '#22c55e', label: 'Node.js', icon: '⬢' },
  { angle: 0.8, radius: 150, speed: -0.005, size: 11, color: '#a78bfa', glow: '#a78bfa', label: 'AI / ML', icon: '🤖' },
];

export default function CosmicOrbit({ size = 340 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef(ORBIT_ITEMS.map(item => ({ ...item })));
  const [hoveredOrb, setHoveredOrb] = useState<Orb | null>(null);
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const scale = size / 340;

    // Background glow
    const bgGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.7 * scale);
    bgGrd.addColorStop(0, 'rgba(212, 175, 55, 0.05)');
    bgGrd.addColorStop(0.5, 'rgba(26, 115, 232, 0.02)');
    bgGrd.addColorStop(1, 'transparent');
    ctx.fillStyle = bgGrd;
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.7 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Orbit rings
    const radii = [95, 125, 155].map(r => r * scale);
    radii.forEach((r, i) => {
      ctx.strokeStyle = `rgba(212, 175, 55, ${0.06 + i * 0.02})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Center logo
    const centerGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28 * scale);
    centerGrd.addColorStop(0, 'rgba(240, 208, 96, 0.3)');
    centerGrd.addColorStop(0.6, 'rgba(212, 175, 55, 0.15)');
    centerGrd.addColorStop(1, 'transparent');
    ctx.fillStyle = centerGrd;
    ctx.beginPath();
    ctx.arc(cx, cy, 28 * scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#d4af37';
    ctx.font = `bold ${14 * scale}px Orbitron, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BH', cx, cy);

    // Orbs
    orbsRef.current.forEach((orb) => {
      orb.angle += orb.speed;
      const ox = cx + Math.cos(orb.angle) * orb.radius * scale;
      const oy = cy + Math.sin(orb.angle) * orb.radius * scale * 0.5;
      const pulse = Math.sin(Date.now() / 500 + orb.angle) * 2;
      const isHovered = hoveredOrb === orb;
      const orbSize = (orb.size + pulse + (isHovered ? 4 : 0)) * scale;

      // Glow
      ctx.shadowColor = orb.glow;
      ctx.shadowBlur = isHovered ? 25 : 15;

      // Gradient orb
      const grd = ctx.createRadialGradient(ox, oy, 0, ox, oy, orbSize);
      grd.addColorStop(0, orb.color);
      grd.addColorStop(1, orb.color + '66');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(ox, oy, orbSize, 0, Math.PI * 2);
      ctx.fill();

      // Icon/text
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff';
      ctx.font = `${(orbSize * 0.9)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(orb.icon, ox, oy);

      // Label
      if (isHovered || window.innerWidth > 768) {
        ctx.shadowColor = orb.glow;
        ctx.shadowBlur = 8;
        ctx.fillStyle = orb.color;
        ctx.font = `${8 * scale}px JetBrains Mono, monospace`;
        ctx.fillText(orb.label, ox, oy + orbSize + 10 * scale);
        ctx.shadowBlur = 0;
      }
    });

    rafRef.current = requestAnimationFrame(draw);
  }, [size, hoveredOrb]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = size + 60;
      canvas.height = size * 0.65 + 60;
    };
    resize();
    rafRef.current = requestAnimationFrame(draw);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - canvas.width / 2;
      const my = e.clientY - rect.top - (canvas.height / 2);
      const scale = size / 340;
      let closest: Orb | null = null;
      let minDist = 9999;

      orbsRef.current.forEach(orb => {
        const ox = Math.cos(orb.angle) * orb.radius * scale;
        const oy = Math.sin(orb.angle) * orb.radius * scale * 0.5;
        const dist = Math.sqrt((mx - ox) ** 2 + (my - oy) ** 2);
        if (dist < orb.size * scale * 1.5 && dist < minDist) {
          minDist = dist;
          closest = orb;
        }
      });
      setHoveredOrb(closest);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [draw, size]);

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
