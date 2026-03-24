'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import StarNavigation from '@/components/ui/StarNavigation';
import { TOOL_CATEGORIES, searchTools } from '@/config/tools';
import styles from './page.module.css';

export default function ToolsPage() {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    if (searchQuery) {
      return searchTools(searchQuery);
    }
    if (activeCategory) {
      const cat = TOOL_CATEGORIES.find((c) => c.id === activeCategory);
      return cat ? cat.tools.map((t) => ({ ...t, categoryId: cat.id, categoryName: cat.nameEn })) : [];
    }
    return null;
  }, [searchQuery, activeCategory]);

  const totalTools = TOOL_CATEGORIES.reduce((sum, cat) => sum + cat.tools.length, 0);

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
            {'// ' + (isZh ? '工具集' : 'Tools')}
          </span>
          <h1 className={styles.headerTitle}>
            {isZh ? '开发者工具箱' : 'Developer Toolbox'}
          </h1>
          <p className={styles.headerDesc}>
            {isZh
              ? `精选 ${totalTools}+ 专业开发工具，覆盖 ${TOOL_CATEGORIES.length} 个分类`
              : `${totalTools}+ curated developer tools across ${TOOL_CATEGORIES.length} categories`}
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className={styles.searchContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder={isZh ? '搜索工具...' : 'Search tools...'}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveCategory(null);
            }}
          />
          {searchQuery && (
            <button className={styles.searchClear} onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </motion.div>

        {/* Category tabs */}
        <div className={styles.categories}>
          <button
            className={`${styles.catBtn} ${!activeCategory && !searchQuery ? styles.catActive : ''}`}
            onClick={() => { setActiveCategory(null); setSearchQuery(''); }}
          >
            {isZh ? '🌟 全部' : '🌟 All'}
          </button>
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.catBtn} ${activeCategory === cat.id ? styles.catActive : ''}`}
              onClick={() => { setActiveCategory(cat.id); setSearchQuery(''); }}
            >
              {cat.icon} {isZh ? cat.nameZh : cat.nameEn}
            </button>
          ))}
        </div>

        {/* Tools grid */}
        <AnimatePresence mode="wait">
          <motion.div
            className={styles.toolsGrid}
            key={activeCategory || searchQuery || 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {(filteredTools
              ? filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.name}
                    tool={tool}
                    isZh={isZh}
                    isExpanded={expandedTool === tool.name}
                    onToggle={() => setExpandedTool(expandedTool === tool.name ? null : tool.name)}
                  />
                ))
              : TOOL_CATEGORIES.flatMap((cat) =>
                  cat.tools.map((tool) => (
                    <ToolCard
                      key={tool.name}
                      tool={{ ...tool, categoryId: cat.id, categoryName: cat.nameEn }}
                      isZh={isZh}
                      isExpanded={expandedTool === tool.name}
                      onToggle={() => setExpandedTool(expandedTool === tool.name ? null : tool.name)}
                    />
                  ))
                )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ToolCard({
  tool,
  isZh,
  isExpanded,
  onToggle,
}: {
  tool: { name: string; descriptionZh: string; descriptionEn: string; url: string; icon: string; tags: string[] };
  isZh: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      className={styles.toolCard}
      whileHover={{ y: -4, borderColor: 'rgba(212, 175, 55, 0.3)' }}
      layout
    >
      <div className={styles.toolHeader} onClick={onToggle}>
        <span className={styles.toolIcon}>{tool.icon}</span>
        <div className={styles.toolInfo}>
          <h3 className={styles.toolName}>{tool.name}</h3>
          <p className={styles.toolDesc}>
            {isZh ? tool.descriptionZh : tool.descriptionEn}
          </p>
        </div>
        <motion.span
          className={styles.expandIcon}
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          ▼
        </motion.span>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles.toolExpanded}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.toolTags}>
              {tool.tags.map((tag) => (
                <span key={tag} className={styles.toolTag}>{tag}</span>
              ))}
            </div>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.toolLink}
              onClick={(e) => e.stopPropagation()}
            >
              {isZh ? '访问工具' : 'Visit Tool'} →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
