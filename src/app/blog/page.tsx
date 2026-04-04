'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import CosmicParticleBackground from '@/components/effects/CosmicParticleBackground';
import PageTransition from '@/components/animations/PageTransition';
import styles from './page.module.css';

interface BlogPost {
  title: string;
  desc: string;
  url: string;
  source: string;
  date?: string;
  author?: string;
}

export default function BlogPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [activeTab, setActiveTab] = useState<'csdn' | 'juejin' | 'analytics'>('analytics');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      if (activeTab === 'analytics') {
        setPosts([]);
        setLoading(false);
        return;
      }

      try {
        const rssUrls: Record<string, string> = {
          csdn: 'https://blog.csdn.net/rss/weixin_56622231',
          juejin: 'https://rsshub.app/juejin/user/235011154247',
        };

        const rssUrl = rssUrls[activeTab];
        if (!rssUrl) return;

        const proxies = [
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`,
          `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`,
        ];

        let data = null;
        for (const proxyUrl of proxies) {
          try {
            const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
            if (res.ok) {
              const json = await res.json();
              if (json.items && json.items.length > 0) {
                data = json.items.map((item: { title: string; link: string; description: string; pubDate: string }) => ({
                  title: item.title,
                  desc: item.description?.replace(/<[^>]*>/g, '').slice(0, 150) || '',
                  url: item.link,
                  source: activeTab === 'csdn' ? 'CSDN' : '掘金',
                  date: item.pubDate,
                }));
                break;
              }
            }
          } catch {
            continue;
          }
        }

        if (data) {
          setPosts(data.slice(0, 20));
        } else {
          setPosts([]);
        }
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab]);

  const tabs = [
    { id: 'analytics' as const, labelZh: '📊 数据分析', labelEn: '📊 Analytics' },
    { id: 'csdn' as const, labelZh: '📚 CSDN', labelEn: '📚 CSDN' },
    { id: 'juejin' as const, labelZh: '💎 掘金', labelEn: '💎 Juejin' },
  ];

  return (
    <PageTransition>
      <div className={styles.page}>
        <CosmicParticleBackground preset="starfield" intensity="medium" />
        <StarNavigation />
        <div className={styles.container}>
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className={styles.headerTag}>
              {'// ' + (isZh ? '博客' : 'Blog')}
            </span>
            <h1 className={styles.headerTitle}>
              {isZh ? '技术博客' : 'Tech Blog'}
            </h1>
            <p className={styles.headerDesc}>
              {isZh
                ? '记录学习历程，分享技术心得'
                : 'Documenting the learning journey, sharing tech insights'}
            </p>
          </motion.div>

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

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'analytics' && (
              <div className={styles.analytics}>
                <div className={styles.analyticsGrid}>
                  <div className={styles.analyticsCard}>
                    <span className={styles.analyticsIcon}>📝</span>
                    <span className={styles.analyticsValue}>—</span>
                    <span className={styles.analyticsLabel}>{isZh ? '总文章数' : 'Total Posts'}</span>
                  </div>
                  <div className={styles.analyticsCard}>
                    <span className={styles.analyticsIcon}>👁️</span>
                    <span className={styles.analyticsValue}>—</span>
                    <span className={styles.analyticsLabel}>{isZh ? '总阅读量' : 'Total Views'}</span>
                  </div>
                  <div className={styles.analyticsCard}>
                    <span className={styles.analyticsIcon}>👍</span>
                    <span className={styles.analyticsValue}>—</span>
                    <span className={styles.analyticsLabel}>{isZh ? '总点赞数' : 'Total Likes'}</span>
                  </div>
                  <div className={styles.analyticsCard}>
                    <span className={styles.analyticsIcon}>🏆</span>
                    <span className={styles.analyticsValue}>—</span>
                    <span className={styles.analyticsLabel}>{isZh ? '粉丝数' : 'Followers'}</span>
                  </div>
                </div>
                <div className={styles.analyticsNote}>
                  <p>
                    {isZh
                      ? '💡 数据分析功能正在开发中。目前请切换到 CSDN 或掘金标签查看文章列表。'
                      : '💡 Analytics feature is under development. Switch to CSDN or Juejin tab to view articles.'}
                  </p>
                </div>
              </div>
            )}

            {activeTab !== 'analytics' && (
              <div className={styles.posts}>
                {loading ? (
                  <div className={styles.loading}>
                    <div className={styles.loadingSpinner} />
                    <span>{isZh ? '正在加载文章...' : 'Loading articles...'}</span>
                  </div>
                ) : posts.length === 0 ? (
                  <div className={styles.empty}>
                    <span className={styles.emptyIcon}>📭</span>
                    <p>{isZh ? '暂无文章或无法加载' : 'No articles or unable to load'}</p>
                    <a
                      href={activeTab === 'csdn' ? 'https://blog.csdn.net/weixin_56622231' : 'https://juejin.cn/user/235011154247'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.emptyLink}
                    >
                      {isZh ? '在平台查看 →' : 'View on platform →'}
                    </a>
                  </div>
                ) : (
                  posts.map((post, index) => (
                    <motion.a
                      key={post.url}
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.postCard}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ x: 5, borderColor: 'rgba(212, 175, 55, 0.3)' }}
                    >
                      <div className={styles.postHeader}>
                        <span className={styles.postSource}>{post.source}</span>
                        {post.date && (
                          <span className={styles.postDate}>
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <h3 className={styles.postTitle}>{post.title}</h3>
                      {post.desc && <p className={styles.postDesc}>{post.desc}</p>}
                    </motion.a>
                  ))
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
