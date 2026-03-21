'use client';

import { useRef, useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';
import { motion } from 'framer-motion';
import type { Tool } from '@/types';
import styles from './ToolCard.module.css';

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    VanillaTilt.init(element, {
      max: 10,
      speed: 300,
      glare: true,
      'max-glare': 0.15,
      scale: 1.02,
    });

    return () => {
      const tilt = element as HTMLElement & { vanillaTilt?: { destroy: () => void } };
      if (tilt.vanillaTilt) {
        tilt.vanillaTilt.destroy();
      }
    };
  }, []);

  return (
    <motion.a
      ref={cardRef}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(102, 126, 234, 0.25)' }}
    >
      <span className={styles.icon}>{tool.icon}</span>
      <div className={styles.content}>
        <h3 className={styles.name}>{tool.name}</h3>
        <p className={styles.description}>{tool.description}</p>
      </div>
    </motion.a>
  );
}