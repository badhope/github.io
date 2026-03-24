'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import styles from './page.module.css';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  'C++': '#f34b7d',
  C: '#555555',
};

export default function ProjectsPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/users/badhope/repos?sort=updated&per_page=100', {
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) throw new Error('Failed to fetch repos');
        const data: GitHubRepo[] = await res.json();
        // Filter out forks and empty repos
        const filtered = data
          .filter((r) => !r.fork && (r.description || r.language))
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(filtered);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className={styles.page}>
      <StarNavigation />
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.headerTag}>
            {'// ' + (isZh ? '作品集' : 'Projects')}
          </span>
          <h1 className={styles.headerTitle}>
            {isZh ? '开源作品集' : 'Open Source Portfolio'}
          </h1>
          <p className={styles.headerDesc}>
            {isZh
              ? '自动同步 GitHub 仓库，展示最新项目'
              : 'Auto-synced from GitHub, showcasing latest projects'}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.stat}>
            <span className={styles.statNumber}>{repos.length}</span>
            <span className={styles.statLabel}>{isZh ? '仓库' : 'Repos'}</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>
              {repos.reduce((sum, r) => sum + r.stargazers_count, 0)}
            </span>
            <span className={styles.statLabel}>⭐ Stars</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>
              {new Set(repos.map((r) => r.language).filter(Boolean)).size}
            </span>
            <span className={styles.statLabel}>{isZh ? '语言' : 'Languages'}</span>
          </div>
        </motion.div>

        {/* Repos grid */}
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner} />
            <span className={styles.loadingText}>
              {isZh ? '正在从 GitHub 同步...' : 'Syncing from GitHub...'}
            </span>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠️</span>
            <p className={styles.errorText}>
              {isZh ? '无法加载项目数据' : 'Unable to load project data'}
            </p>
            <a href="https://github.com/badhope?tab=repositories" target="_blank" rel="noopener noreferrer" className={styles.errorLink}>
              {isZh ? '在 GitHub 查看 →' : 'View on GitHub →'}
            </a>
          </div>
        ) : repos.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📭</span>
            <p className={styles.emptyText}>
              {isZh ? '暂无公开仓库' : 'No public repositories yet'}
            </p>
          </div>
        ) : (
          <div className={styles.reposGrid}>
            {repos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.repoCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6, borderColor: 'rgba(212, 175, 55, 0.3)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}
              >
                <div className={styles.repoHeader}>
                  <span className={styles.repoIcon}>📦</span>
                  <h3 className={styles.repoName}>{repo.name}</h3>
                </div>

                <p className={styles.repoDesc}>
                  {repo.description || (isZh ? '暂无描述' : 'No description')}
                </p>

                <div className={styles.repoMeta}>
                  {repo.language && (
                    <span className={styles.repoLang}>
                      <span
                        className={styles.langDot}
                        style={{ background: languageColors[repo.language] || '#8b8b8b' }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className={styles.repoStat}>⭐ {repo.stargazers_count}</span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className={styles.repoStat}>🍴 {repo.forks_count}</span>
                  )}
                </div>

                {repo.topics && repo.topics.length > 0 && (
                  <div className={styles.repoTopics}>
                    {repo.topics.slice(0, 5).map((topic) => (
                      <span key={topic} className={styles.repoTopic}>{topic}</span>
                    ))}
                  </div>
                )}

                <div className={styles.repoFooter}>
                  <span className={styles.repoDate}>
                    {isZh ? '更新于' : 'Updated'} {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repoDemo}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {isZh ? '在线演示' : 'Live Demo'} →
                    </a>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* View all link */}
        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <a href="https://github.com/badhope?tab=repositories" target="_blank" rel="noopener noreferrer" className={styles.viewAllLink}>
            {isZh ? '在 GitHub 查看全部仓库 →' : 'View all repositories on GitHub →'}
          </a>
        </motion.div>
      </div>
    </div>
  );
}
