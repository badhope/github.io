'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import styles from './GitHubStats.module.css';

interface Repo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  topics: string[];
  updated_at: string;
  open_issues_count: number;
  watchers_count: number;
  fork: boolean;
  private: boolean;
}

interface Stats {
  repos: number;
  stars: number;
  forks: number;
  totalIssues: number;
  totalWatchers: number;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5',
  Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c', Vue: '#41b883',
  Go: '#00ADD8', Rust: '#dea584', Shell: '#89e051', Markdown: '#083fa1',
};

const TOPICS = ['ai', 'web', 'tool', 'game', 'data', 'open-source', 'bot', 'template'];

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function GitHubStats() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [repos, setRepos] = useState<Repo[]>([]);
  const [stats, setStats] = useState<Stats>({ repos: 0, stars: 0, forks: 0, totalIssues: 0, totalWatchers: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'name'>('stars');
  const [displayedRepos, setDisplayedRepos] = useState<Repo[]>([]);
  const [liveTime, setLiveTime] = useState('');
  const [pulseCount, setPulseCount] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const countedStars = useCountUp(stats.stars, 2000, visible);
  const countedRepos = useCountUp(stats.repos, 1200, visible);
  const countedForks = useCountUp(stats.forks, 1800, visible);

  // Fetch repos
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/badhope/repos?sort=updated&per_page=100&type=owner');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        const publicRepos = Array.isArray(data) ? data.filter((r: Repo) => !r.fork) : [];
        
        setRepos(publicRepos);
        const total = publicRepos.reduce((acc: Stats, r: Repo) => ({
          repos: acc.repos + 1,
          stars: acc.stars + (r.stargazers_count || 0),
          forks: acc.forks + (r.forks_count || 0),
          totalIssues: acc.totalIssues + (r.open_issues_count || 0),
          totalWatchers: acc.totalWatchers + (r.watchers_count || 0),
        }), { repos: 0, stars: 0, forks: 0, totalIssues: 0, totalWatchers: 0 });
        setStats(total);
        setLoading(false);
      } catch {
        setError('Failed to load GitHub stats');
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  // Scroll visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Sort & filter
  useEffect(() => {
    let filtered = selectedTopic
      ? repos.filter(r => r.topics?.includes(selectedTopic) || r.description?.toLowerCase().includes(selectedTopic))
      : repos;
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'stars') return (b.stargazers_count || 0) - (a.stargazers_count || 0);
      if (sortBy === 'updated') return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      return a.name.localeCompare(b.name);
    });
    setDisplayedRepos(sorted.slice(0, 9));
  }, [repos, selectedTopic, sortBy]);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setLiveTime(now.toLocaleTimeString('zh-CN', { hour12: false }));
      setPulseCount(p => p + 1);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const langColor = (lang: string | null) => {
    if (!lang) return '#6b6b80';
    return LANG_COLORS[lang] || '#6b6b80';
  };

  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.headerTag}>/ GitHub Live Stats</span>
          <div className={styles.liveIndicator}>
            <span className={styles.liveDot} />
            <span className={styles.liveTime}>{liveTime}</span>
          </div>
        </motion.div>

        {/* Animated stats cards */}
        <div className={styles.statsGrid}>
          {[
            { labelZh: '公开仓库', labelEn: 'Repositories', value: countedRepos, icon: '📦', color: '#1a73e8' },
            { labelZh: '总 Stars', labelEn: 'Total Stars', value: countedStars, icon: '⭐', color: '#f0d060' },
            { labelZh: '总 Forks', labelEn: 'Total Forks', value: countedForks, icon: '🍴', color: '#7c3aed' },
            { labelZh: '活跃Issues', labelEn: 'Open Issues', value: stats.totalIssues, icon: '🐛', color: '#06b6d4' },
          ].map((stat, i) => (
            <motion.div
              key={stat.labelEn}
              className={styles.statCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: `0 8px 30px ${stat.color}33` }}
              style={{ '--accent': stat.color } as React.CSSProperties}
            >
              <span className={styles.statIcon}>{stat.icon}</span>
              <motion.span
                className={styles.statValue}
                key={stat.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {loading ? '...' : stat.value.toLocaleString()}
              </motion.span>
              <span className={styles.statLabel}>{isZh ? stat.labelZh : stat.labelEn}</span>
              <div className={styles.statGlow} style={{ background: stat.color }} />
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <div className={styles.topicFilter}>
            <button
              className={`${styles.topicBtn} ${!selectedTopic ? styles.active : ''}`}
              onClick={() => setSelectedTopic(null)}
            >
              {isZh ? '全部' : 'All'}
            </button>
            {TOPICS.map(t => (
              <button
                key={t}
                className={`${styles.topicBtn} ${selectedTopic === t ? styles.active : ''}`}
                onClick={() => setSelectedTopic(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className={styles.sortBtns}>
            {(['stars', 'updated', 'name'] as const).map(s => (
              <button
                key={s}
                className={`${styles.sortBtn} ${sortBy === s ? styles.activeSort : ''}`}
                onClick={() => setSortBy(s)}
              >
                {s === 'stars' ? '⭐' : s === 'updated' ? '🕐' : '🔤'}{' '}
                {isZh ? (s === 'stars' ? '星级' : s === 'updated' ? '最新' : '名称') : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Repo grid */}
        {loading ? (
          <div className={styles.loadingGrid}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : (
          <div className={styles.repoGrid}>
            {displayedRepos.map((repo, i) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className={styles.repoTop}>
                  <span className={styles.repoName}>{repo.name}</span>
                  <span className={styles.repoStars}>⭐ {repo.stargazers_count}</span>
                </div>
                <p className={styles.repoDesc}>
                  {repo.description || (isZh ? '暂无描述' : 'No description')}
                </p>
                <div className={styles.repoMeta}>
                  {repo.language && (
                    <span className={styles.langTag}>
                      <span className={styles.langDot} style={{ background: langColor(repo.language) }} />
                      {repo.language}
                    </span>
                  )}
                  <span className={styles.forksTag}>🍴 {repo.forks_count}</span>
                </div>
                {repo.topics?.slice(0, 3).map(t => (
                  <span key={t} className={styles.topicTag}>#{t}</span>
                ))}
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
