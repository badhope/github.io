'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './SnakeGame.module.css';

const GRID = 20;
const CELL = 20;
const SPEED = 120;

interface Position { x: number; y: number; }

export default function SnakeGame() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showHint, setShowHint] = useState(true);

  const snakeRef = useRef<Position[]>([{ x: 10, y: 10 }]);
  const foodRef = useRef<Position>({ x: 15, y: 15 });
  const dirRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const nextDirRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const gameLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animationRef = useRef<number>(0);

  const placeFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID),
      };
    } while (snakeRef.current.some(s => s.x === newFood.x && s.y === newFood.y));
    foodRef.current = newFood;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = 'rgba(2, 5, 16, 0.95)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.08)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, GRID * CELL);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(GRID * CELL, i * CELL);
      ctx.stroke();
    }

    // Snake
    snakeRef.current.forEach((seg, i) => {
      const isHead = i === 0;
      const gradient = ctx.createRadialGradient(
        seg.x * CELL + CELL / 2, seg.y * CELL + CELL / 2, 0,
        seg.x * CELL + CELL / 2, seg.y * CELL + CELL / 2, CELL
      );
      if (isHead) {
        gradient.addColorStop(0, '#f0d060');
        gradient.addColorStop(1, '#d4af37');
      } else {
        const alpha = 0.6 + (0.4 * (snakeRef.current.length - i) / snakeRef.current.length);
        gradient.addColorStop(0, `rgba(212, 175, 55, ${alpha})`);
        gradient.addColorStop(1, `rgba(180, 148, 30, ${alpha * 0.8})`);
      }
      ctx.fillStyle = gradient;
      ctx.shadowColor = '#d4af37';
      ctx.shadowBlur = isHead ? 12 : 4;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2, 4);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Food (star)
    const fx = foodRef.current.x * CELL + CELL / 2;
    const fy = foodRef.current.y * CELL + CELL / 2;
    const pulse = Math.sin(Date.now() / 200) * 2;
    ctx.shadowColor = '#f0d060';
    ctx.shadowBlur = 15 + pulse * 2;
    ctx.fillStyle = '#f0d060';
    ctx.font = `${CELL - 2 + pulse}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★', fx, fy);
    ctx.shadowBlur = 0;

    animationRef.current = requestAnimationFrame(draw);
  }, []);

  const startGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    setScore(0);
    setShowHint(false);
    placeFood();
    setGameState('playing');
  }, [placeFood]);

  const step = useCallback(() => {
    dirRef.current = { ...nextDirRef.current };
    const head = snakeRef.current[0];
    const newHead: Position = {
      x: head.x + dirRef.current.x,
      y: head.y + dirRef.current.y,
    };

    // Wall collision
    if (newHead.x < 0 || newHead.x >= GRID || newHead.y < 0 || newHead.y >= GRID) {
      setGameState('gameover');
      setHighScore(prev => Math.max(prev, score));
      return;
    }

    // Self collision
    if (snakeRef.current.some(s => s.x === newHead.x && s.y === newHead.y)) {
      setGameState('gameover');
      setHighScore(prev => Math.max(prev, score));
      return;
    }

    snakeRef.current.unshift(newHead);

    // Food collision
    if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
      setScore(prev => prev + 10);
      placeFood();
    } else {
      snakeRef.current.pop();
    }
  }, [placeFood, score]);

  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }
    gameLoopRef.current = setInterval(step, SPEED);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, step]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = GRID * CELL;
      canvas.height = GRID * CELL;
    };
    resize();

    animationRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState === 'idle' || gameState === 'gameover') {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.preventDefault();
          startGame();
        }
        return;
      }
      if (e.code === 'Space' || e.code === 'Escape') {
        e.preventDefault();
        setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
        return;
      }
      const keyMap: Record<string, { x: number; y: number }> = {
        ArrowUp: { x: 0, y: -1 }, KeyW: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 }, KeyS: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 }, KeyA: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }, KeyD: { x: 1, y: 0 },
      };
      const newDir = keyMap[e.code];
      if (newDir) {
        e.preventDefault();
        const opposite = (a: { x: number; y: number }) =>
          a.x + newDir.x === 0 && a.y + newDir.y === 0;
        if (!opposite(dirRef.current)) {
          nextDirRef.current = newDir;
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, startGame]);

  return (
    <div className={styles.snakeGame}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.icon}>🐍</span>
        <span className={styles.title}>Snake Game</span>
        <div className={styles.scores}>
          <span className={styles.score}>⭐ {score}</span>
          <span className={styles.highScore}>🏆 {highScore}</span>
        </div>
      </div>

      {/* Canvas */}
      <div className={styles.canvasWrapper}>
        <canvas ref={canvasRef} className={styles.canvas} />
        
        <AnimatePresence>
          {gameState === 'idle' && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={styles.overlayContent}
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
              >
                <div className={styles.starIcon}>🐍</div>
                <h3 className={styles.overlayTitle}>
                  {isZh ? '贪吃蛇：宇宙版' : 'Snake Game: Cosmic Edition'}
                </h3>
                <p className={styles.overlayDesc}>
                  {isZh
                    ? '吃 ⭐ 得 10 分，避开边界和自己的身体！'
                    : 'Eat ⭐ for 10 points. Avoid walls and yourself!'}
                </p>
                <div className={styles.controls}>
                  <span>↑↓←→ / WASD</span>
                  <span>Space / Enter {isZh ? '开始' : 'Start'}</span>
                  <span>Esc {isZh ? '暂停' : 'Pause'}</span>
                </div>
                <motion.button
                  className={styles.startBtn}
                  onClick={startGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isZh ? '▶ 开始游戏' : '▶ Start Game'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={styles.overlayContent}
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
              >
                <div className={styles.gameOverIcon}>💥</div>
                <h3 className={styles.overlayTitle}>
                  {isZh ? '游戏结束！' : 'Game Over!'}
                </h3>
                <p className={styles.finalScore}>
                  {isZh ? '得分' : 'Score'}: <strong>⭐ {score}</strong>
                </p>
                {score >= highScore && score > 0 && (
                  <p className={styles.newHigh}>🎉 {isZh ? '新纪录！' : 'New Record!'}</p>
                )}
                <motion.button
                  className={styles.startBtn}
                  onClick={startGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isZh ? '↻ 再来一局' : '↻ Play Again'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {gameState === 'paused' && (
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className={styles.overlayContent} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                <div className={styles.pauseIcon}>⏸</div>
                <h3 className={styles.overlayTitle}>{isZh ? '已暂停' : 'Paused'}</h3>
                <p className={styles.overlayDesc}>
                  {isZh ? '按 Esc 或点击继续' : 'Press Esc or click to continue'}
                </p>
                <motion.button
                  className={styles.startBtn}
                  onClick={() => setGameState('playing')}
                  whileHover={{ scale: 1.05 }}
                >
                  ▶ {isZh ? '继续' : 'Resume'}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {gameState === 'playing' && showHint && (
          <motion.div
            className={styles.playingHint}
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0] }}
            transition={{ delay: 2, duration: 1 }}
            onClick={() => setShowHint(false)}
          >
            {isZh ? '使用 ↑↓←→ 或 WASD 控制方向' : 'Use arrow keys or WASD to move'}
          </motion.div>
        )}
      </div>

      {/* Decorative label */}
      <div className={styles.footer}>
        <span className={styles.footerText}>
          {isZh ? '💡 按空格键打开/关闭游戏' : '💡 Press Space to open/close game'}
        </span>
      </div>
    </div>
  );
}
