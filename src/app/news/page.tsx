'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import styles from './page.module.css';

interface NewsItem {
  title: string;
  desc: string;
  url: string;
  source: string;
  time?: string;
  icon?: string;
}

interface AIModel {
  name: string;
  score: number;
  org: string;
  category: string;
}

export default function NewsPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [activeTab, setActiveTab] = useState<'ai' | 'tech' | 'github' | 'calendar'>('ai');
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [techNews, setTechNews] = useState<NewsItem[]>([]);
  const [githubTrending, setGithubTrending] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch AI model rankings
  useEffect(() => {
    const fetchAIRankings = async () => {
      try {
        const res = await fetch('https://raw.githubusercontent.com/lm-sys/FastChat/main/arena_leaderboard.json', {
          signal: AbortSignal.timeout(8000),
        });
        if (res.ok) {
          const data = await res.json();
          const models = data
            .filter((m: { arena_score?: number }) => m.arena_score)
            .sort((a: { arena_score: number }, b: { arena_score: number }) => b.arena_score - a.arena_score)
            .slice(0, 15)
            .map((m: { model?: string; arena_score?: number; organization?: string; license?: string }, i: number) => ({
              name: m.model || `Model ${i + 1}`,
              score: Math.round((m.arena_score || 0) * 10) / 10,
              org: m.organization || 'Unknown',
              category: m.license || 'Proprietary',
            }));
          setAiModels(models);
        }
      } catch {
        // Use fallback data
        setAiModels([
          { name: 'GPT-4o', score: 1287, org: 'OpenAI', category: 'Proprietary' },
          { name: 'Claude 3.5 Sonnet', score: 1271, org: 'Anthropic', category: 'Proprietary' },
          { name: 'Gemini 1.5 Pro', score: 1261, org: 'Google', category: 'Proprietary' },
          { name: 'GPT-4 Turbo', score: 1254, org: 'OpenAI', category: 'Proprietary' },
          { name: 'Llama 3.1 405B', score: 1234, org: 'Meta', category: 'Open Source' },
          { name: 'DeepSeek V2.5', score: 1228, org: 'DeepSeek', category: 'Open Source' },
          { name: 'Qwen2.5 72B', score: 1220, org: 'Alibaba', category: 'Open Source' },
          { name: 'GLM-4', score: 1215, org: 'Zhipu AI', category: 'Proprietary' },
          { name: 'Yi-Large', score: 1208, org: '01.AI', category: 'Proprietary' },
          { name: 'Mistral Large 2', score: 1200, org: 'Mistral', category: 'Open Source' },
        ]);
      }
    };
    fetchAIRankings();
  }, []);

  // Fetch GitHub trending
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('https://api.github.com/search/repositories?q=stars:>1000+pushed:>2024-01-01&sort=stars&order=desc&per_page=10', {
          signal: AbortSignal.timeout(8000),
        });
        if (res.ok) {
          const data = await res.json();
          const items = data.items.map((item: { full_name: string; description: string | null; html_url: string; stargazers_count: number; updated_at: string }) => ({
            title: item.full_name,
            desc: item.description || 'No description',
            url: item.html_url,
            source: `⭐ ${item.stargazers_count}`,
            time: new Date(item.updated_at).toLocaleDateString(),
            icon: '📦',
          }));
          setGithubTrending(items);
        }
      } catch {
        setGithubTrending([
          { title: 'Loading...', desc: 'Unable to fetch trending repos', url: 'https://github.com/trending', source: 'GitHub', icon: '📦' },
        ]);
      }
      setLoading(false);
    };
    fetchTrending();
  }, []);

  const tabs = [
    { id: 'ai' as const, labelZh: '🤖 AI 排行榜', labelEn: '🤖 AI Rankings' },
    { id: 'tech' as const, labelZh: '📰 技术热文', labelEn: '📰 Tech News' },
    { id: 'github' as const, labelZh: '🔥 GitHub Trending', labelEn: '🔥 GitHub Trending' },
    { id: 'calendar' as const, labelZh: '📅 科技日历', labelEn: '📅 Tech Calendar' },
  ];

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
            {'// ' + (isZh ? '资讯中心' : 'News Hub')}
          </span>
          <h1 className={styles.headerTitle}>
            {isZh ? 'Tech Pulse' : 'Tech Pulse'}
          </h1>
          <p className={styles.headerDesc}>
            {isZh ? '实时追踪技术世界的脉搏' : 'Track the pulse of the tech world in real-time'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {isZh ? tab.labelZh : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          className={styles.content}
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* AI Rankings */}
          {activeTab === 'ai' && (
            <div className={styles.rankings}>
              <div className={styles.rankHeader}>
                <span className={styles.rankCol1}>#</span>
                <span className={styles.rankCol2}>{isZh ? '模型' : 'Model'}</span>
                <span className={styles.rankCol3}>{isZh ? '组织' : 'Org'}</span>
                <span className={styles.rankCol4}>{isZh ? '评分' : 'Score'}</span>
              </div>
              {aiModels.map((model, index) => (
                <motion.div
                  key={model.name}
                  className={styles.rankRow}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.06)' }}
                >
                  <span className={styles.rankCol1}>
                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : index + 1}
                  </span>
                  <span className={styles.rankCol2}>{model.name}</span>
                  <span className={styles.rankCol3}>{model.org}</span>
                  <span className={styles.rankCol4}>
                    <span className={styles.score}>{model.score}</span>
                  </span>
                </motion.div>
              ))}
              <div className={styles.dataSource}>
                {isZh ? '数据来源：LMSYS Chatbot Arena' : 'Source: LMSYS Chatbot Arena'}
              </div>
            </div>
          )}

          {/* Tech News */}
          {activeTab === 'tech' && (
            <div className={styles.newsList}>
              <div className={styles.newsSection}>
                <h3 className={styles.newsSectionTitle}>CSDN {isZh ? '热门文章' : 'Hot'}</h3>
                <a
                  href="https://blog.csdn.net/rank/list"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.newsLink}
                >
                  {isZh ? '查看 CSDN 热门排行 →' : 'View CSDN Rankings →'}
                </a>
              </div>
              <div className={styles.newsSection}>
                <h3 className={styles.newsSectionTitle}>掘金 {isZh ? '热门文章' : 'Hot'}</h3>
                <a
                  href="https://juejin.cn/hot/articles"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.newsLink}
                >
                  {isZh ? '查看掘金热门排行 →' : 'View Juejin Rankings →'}
                </a>
              </div>
              <div className={styles.newsSection}>
                <h3 className={styles.newsSectionTitle}>Hacker News</h3>
                <a
                  href="https://news.ycombinator.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.newsLink}
                >
                  {isZh ? '查看 Hacker News →' : 'View Hacker News →'}
                </a>
              </div>
              <div className={styles.newsSection}>
                <h3 className={styles.newsSectionTitle}>Product Hunt</h3>
                <a
                  href="https://www.producthunt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.newsLink}
                >
                  {isZh ? '查看 Product Hunt →' : 'View Product Hunt →'}
                </a>
              </div>
              <div className={styles.dataSource}>
                {isZh ? '💡 提示：点击链接跳转到对应平台查看最新内容' : '💡 Tip: Click links to view latest content on each platform'}
              </div>
            </div>
          )}

          {/* GitHub Trending */}
          {activeTab === 'github' && (
            <div className={styles.trendingList}>
              {loading ? (
                <div className={styles.loading}>
                  <span className={styles.loadingText}>
                    {isZh ? '正在加载...' : 'Loading...'}
                  </span>
                </div>
              ) : (
                githubTrending.map((repo, index) => (
                  <motion.a
                    key={repo.title}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.trendingItem}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5, borderColor: 'rgba(212, 175, 55, 0.3)' }}
                  >
                    <div className={styles.trendingHeader}>
                      <span className={styles.trendingIcon}>{repo.icon}</span>
                      <span className={styles.trendingName}>{repo.title}</span>
                      <span className={styles.trendingStars}>{repo.source}</span>
                    </div>
                    <p className={styles.trendingDesc}>{repo.desc}</p>
                  </motion.a>
                ))
              )}
              <a
                href="https://github.com/trending"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewAll}
              >
                {isZh ? '查看 GitHub Trending →' : 'View GitHub Trending →'}
              </a>
            </div>
          )}

          {/* Tech Calendar */}
          {activeTab === 'calendar' && (
            <div className={styles.calendar}>
              <div className={styles.calendarCard}>
                <h3 className={styles.calendarTitle}>
                  {isZh ? '📅 历史上的今天' : '📅 Today in Tech History'}
                </h3>
                <div className={styles.calendarContent}>
                  <p className={styles.calendarDate}>
                    {new Date().toLocaleDateString(isZh ? 'zh-CN' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <div className={styles.calendarEvents}>
                    <div className={styles.event}>
                      <span className={styles.eventYear}>1989</span>
                      <span className={styles.eventText}>
                        {isZh ? '万维网（WWW）在CERN被发明' : 'World Wide Web invented at CERN'}
                      </span>
                    </div>
                    <div className={styles.event}>
                      <span className={styles.eventYear}>2007</span>
                      <span className={styles.eventText}>
                        {isZh ? 'iPhone 发布，开启智能手机时代' : 'iPhone released, starting the smartphone era'}
                      </span>
                    </div>
                    <div className={styles.event}>
                      <span className={styles.eventYear}>2015</span>
                      <span className={styles.eventText}>
                        {isZh ? 'TensorFlow 开源发布' : 'TensorFlow open-sourced'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.calendarCard}>
                <h3 className={styles.calendarTitle}>
                  {isZh ? '🎯 即将到来' : '🎯 Upcoming'}
                </h3>
                <div className={styles.calendarContent}>
                  <p className={styles.calendarNote}>
                    {isZh
                      ? '更多科技日历功能正在开发中...'
                      : 'More tech calendar features coming soon...'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
