'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './DynamicStatus.module.css';

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  city: string;
  humidity: number;
  wind: number;
}

interface GitHubLive {
  followers: number;
  following: number;
  publicRepos: number;
}

const WEATHER_ICONS: Record<string, string> = {
  sunny: '☀️', cloudy: '☁️', rainy: '🌧️', stormy: '⛈️',
  snowy: '❄️', foggy: '🌫️', partly: '⛅', night: '🌙',
  clear: '🌤️', overcast: '🌥️',
};

const GREETINGS = {
  zh: ['早起的码农有虫吃 ☀️', '晚安，代码梦乡见 🌙', '下午茶时间，继续搬砖 ☕', '深夜 coding，效率翻倍 🌃'],
  en: ['Early bird gets the code 🐛', 'Sweet dreams, coder 🌙', 'Coffee time, keep shipping ☕', 'Night owls ship faster 🌃'],
};

function getGreeting(isZh: boolean): string {
  const hour = new Date().getHours();
  const idx = hour < 6 ? 1 : hour < 12 ? 0 : hour < 18 ? 2 : 3;
  return isZh ? GREETINGS.zh[idx] : GREETINGS.en[idx];
}

function getWeatherCondition(code: number): { text: string; icon: string } {
  if (code === 1000) return { text: 'Clear', icon: 'sunny' };
  if (code <= 1003) return { text: 'Partly Cloudy', icon: 'partly' };
  if (code <= 1009) return { text: 'Cloudy', icon: 'overcast' };
  if (code <= 1063) return { text: 'Rainy', icon: 'rainy' };
  if (code <= 1069) return { text: 'Snowy', icon: 'snowy' };
  if (code <= 1087) return { text: 'Stormy', icon: 'stormy' };
  return { text: 'Foggy', icon: 'foggy' };
}

async function fetchWeather(city = 'Shenzhen'): Promise<WeatherData | null> {
  try {
    const res = await fetch(
      `https://wttr.in/${encodeURIComponent(city)}?format=j1`,
      { next: { revalidate: 900 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const current = data.current_condition?.[0];
    if (!current) return null;
    const code = parseInt(current.weatherCode || '0');
    const cond = getWeatherCondition(code);
    return {
      temp: parseInt(current.temp_C || '20'),
      condition: cond.text,
      icon: WEATHER_ICONS[cond.icon] || '🌤️',
      city: city,
      humidity: parseInt(current.humidity || '60'),
      wind: parseInt(current.windspeedKmph || '10'),
    };
  } catch {
    return null;
  }
}

async function fetchGitHubLive(): Promise<GitHubLive | null> {
  try {
    const res = await fetch('https://api.github.com/users/badhope', { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      followers: data.followers || 0,
      following: data.following || 0,
      publicRepos: data.public_repos || 0,
    };
  } catch {
    return null;
  }
}

export default function DynamicStatus() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [greeting, setGreeting] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [ghLive, setGhLive] = useState<GitHubLive | null>(null);
  const [uptime, setUptime] = useState(0);
  const [sessionCount, setSessionCount] = useState(Math.floor(Math.random() * 5000) + 1000);
  const [particles, setParticles] = useState(0);
  const startTime = Date.now();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('zh-CN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDate(now.toLocaleDateString(isZh ? 'zh-CN' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
      setGreeting(getGreeting(isZh));
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [isZh, startTime]);

  useEffect(() => {
    fetchWeather('Shenzhen').then(setWeather);
    fetchGitHubLive().then(setGhLive);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSessionCount(c => c + Math.floor(Math.random() * 3));
      setParticles(p => Math.min(p + 1, 999));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const uptimeStr = `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${uptime % 60}s`;

  return (
    <div className={styles.statusPanel}>
      {/* Time & Greeting */}
      <motion.div
        className={styles.clock}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        <div className={styles.timeDisplay}>
          <span className={styles.time}>{time}</span>
          <span className={styles.date}>{date}</span>
        </div>
        <p className={styles.greeting}>{greeting}</p>
      </motion.div>

      {/* Weather */}
      <motion.div
        className={styles.weatherCard}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {weather ? (
          <>
            <span className={styles.weatherIcon}>{weather.icon}</span>
            <div className={styles.weatherInfo}>
              <span className={styles.weatherTemp}>{weather.temp}°C</span>
              <span className={styles.weatherCity}>📍 {weather.city}</span>
              <span className={styles.weatherCondition}>{weather.condition}</span>
              <span className={styles.weatherMeta}>💧 {weather.humidity}% · 💨 {weather.wind}km/h</span>
            </div>
          </>
        ) : (
          <div className={styles.weatherLoading}>
            <span className={styles.loadingIcon}>🌡️</span>
            <span>{isZh ? '加载天气...' : 'Loading weather...'}</span>
          </div>
        )}
      </motion.div>

      {/* Live GitHub */}
      <motion.div
        className={styles.ghCard}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className={styles.ghHeader}>
          <span>🐙 GitHub Live</span>
          <span className={styles.livePulse} />
        </div>
        {ghLive ? (
          <div className={styles.ghStats}>
            <span>👥 {ghLive.followers} <small>followers</small></span>
            <span>📦 {ghLive.publicRepos} <small>repos</small></span>
          </div>
        ) : (
          <span className={styles.ghLoading}>{isZh ? '同步中...' : 'Syncing...'}</span>
        )}
      </motion.div>

      {/* Fun stats */}
      <motion.div
        className={styles.funStats}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <div className={styles.funStat}>
          <motion.span
            className={styles.funValue}
            key={sessionCount}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            🚀 {sessionCount.toLocaleString()}
          </motion.span>
          <span className={styles.funLabel}>{isZh ? '页面访问' : 'Page Views'}</span>
        </div>
        <div className={styles.funStat}>
          <span className={styles.funValue}>⭐ {particles}</span>
          <span className={styles.funLabel}>{isZh ? '已收集粒子' : 'Stars Collected'}</span>
        </div>
        <div className={styles.funStat}>
          <span className={styles.funValue}>⏱️ {uptimeStr}</span>
          <span className={styles.funLabel}>{isZh ? '本次浏览时长' : 'Session Time'}</span>
        </div>
      </motion.div>

      {/* Cosmic progress bar */}
      <motion.div
        className={styles.progressBar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className={styles.progressTrack}>
          <motion.div
            className={styles.progressFill}
            animate={{ width: [`${(uptime % 60) / 60 * 100}%`, `${((uptime + 1) % 60) / 60 * 100}%`] }}
            transition={{ duration: 1, ease: 'linear' }}
          />
          <div className={styles.progressGlow} />
        </div>
        <span className={styles.progressLabel}>
          {isZh ? '页面活跃度' : 'Page Activity'} · {(uptime % 60)}s / 60s
        </span>
      </motion.div>
    </div>
  );
}
