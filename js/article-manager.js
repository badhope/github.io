/**
 * 文章管理模块 - Article Manager
 * 版本：3.0.0
 * 功能：文章数据管理、缓存、渲染、搜索、筛选
 */

const ArticleManager = {
    version: '3.0.0',
    data: null,
    cache: new Map(),
    cacheTimeout: 5 * 60 * 1000,
    
    async init() {
        try {
            await this.loadData();
            this.bindEvents();
            console.log(`%c📚 文章管理模块 v${this.version} 初始化完成`, 'color: #0097a7; font-size: 12px;');
            return true;
        } catch (error) {
            console.error('文章管理模块初始化失败:', error);
            return false;
        }
    },
    
    async loadData() {
        const cacheKey = 'articles_data';
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            this.data = cached.data;
            return this.data;
        }
        
        try {
            const response = await fetch('data/articles.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            this.data = await response.json();
            this.cache.set(cacheKey, {
                data: this.data,
                timestamp: Date.now()
            });
            
            return this.data;
        } catch (error) {
            console.warn('加载文章数据失败，使用本地缓存:', error);
            const localCache = Utils.storage.get('articles_cache');
            if (localCache) {
                this.data = localCache;
                return localCache;
            }
            throw error;
        }
    },
    
    getArticles(options = {}) {
        if (!this.data) return [];
        
        let articles = [...this.data.articles];
        
        if (options.category) {
            articles = articles.filter(a => a.category === options.category);
        }
        
        if (options.tag) {
            articles = articles.filter(a => a.tags.includes(options.tag));
        }
        
        if (options.featured) {
            articles = articles.filter(a => a.featured);
        }
        
        if (options.difficulty) {
            articles = articles.filter(a => a.difficulty === options.difficulty);
        }
        
        if (options.search) {
            const query = options.search.toLowerCase();
            articles = articles.filter(a => 
                a.title.toLowerCase().includes(query) ||
                a.summary.toLowerCase().includes(query) ||
                a.tags.some(t => t.toLowerCase().includes(query))
            );
        }
        
        if (options.sortBy) {
            const sortField = options.sortBy;
            const order = options.sortOrder === 'asc' ? 1 : -1;
            articles.sort((a, b) => {
                if (sortField === 'views') return (a.stats.views - b.stats.views) * order;
                if (sortField === 'date') return (new Date(a.publishDate) - new Date(b.publishDate)) * order;
                if (sortField === 'likes') return (a.stats.likes - b.stats.likes) * order;
                return 0;
            });
        }
        
        if (options.limit) {
            articles = articles.slice(0, options.limit);
        }
        
        return articles;
    },
    
    getArticleById(id) {
        return this.data?.articles.find(a => a.id === id);
    },
    
    getProjects(options = {}) {
        if (!this.data) return [];
        
        let projects = [...this.data.projects];
        
        if (options.featured) {
            projects = projects.filter(p => p.featured);
        }
        
        if (options.category) {
            projects = projects.filter(p => p.category === options.category);
        }
        
        return projects;
    },
    
    getCategories() {
        return this.data?.categories || [];
    },
    
    getStats() {
        return this.data?.stats || {};
    },
    
    getProfile() {
        return this.data?.profile || {};
    },
    
    formatNumber(num) {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + 'w';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k';
        }
        return num.toString();
    },
    
    renderArticleCard(article, container) {
        const card = document.createElement('a');
        card.href = article.url;
        card.target = '_blank';
        card.className = 'article-card slide-right';
        card.setAttribute('data-article-id', article.id);
        
        card.innerHTML = `
            <div class="article-info">
                <div class="article-platform">
                    <span class="platform-icon">${this.getPlatformIcon(article.platform)}</span>
                    <span class="platform-name">${this.getPlatformName(article.platform)}</span>
                </div>
                <div class="article-date">${article.publishDate}</div>
            </div>
            <h3 class="article-title">${Utils.escapeHtml(article.title)}</h3>
            <p class="article-desc">${Utils.escapeHtml(article.summary.slice(0, 80))}...</p>
            <div class="article-tags">
                ${article.tags.slice(0, 3).map(tag => `<span class="article-tag">${tag}</span>`).join('')}
            </div>
            <div class="article-stats">
                <span class="stat-item" title="阅读量">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    ${this.formatNumber(article.stats.views)}
                </span>
                <span class="stat-item" title="点赞数">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    ${this.formatNumber(article.stats.likes)}
                </span>
                <span class="stat-item" title="评论数">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    ${article.stats.comments}
                </span>
                <span class="stat-item" title="收藏数">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    ${this.formatNumber(article.stats.collections)}
                </span>
            </div>
            <div class="article-meta">
                <span class="read-time">📖 ${article.readTime}分钟</span>
                <span class="difficulty difficulty-${article.difficulty}">${article.difficulty}</span>
            </div>
        `;
        
        container.appendChild(card);
        return card;
    },
    
    renderProjectCard(project, container) {
        const card = document.createElement('a');
        card.href = project.url || project.github;
        card.target = '_blank';
        card.className = 'project-card scale-in';
        card.setAttribute('data-project-id', project.id);
        
        card.innerHTML = `
            <div class="project-header">
                <div class="project-icon">${this.getCategoryIcon(project.category)}</div>
                <div class="project-links">
                    ${project.url ? `
                        <div class="project-link" title="在线演示" onclick="event.stopPropagation(); window.open('${project.url}', '_blank')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                        </div>
                    ` : ''}
                    ${project.github ? `
                        <div class="project-link" title="GitHub 源码" onclick="event.stopPropagation(); window.open('${project.github}', '_blank')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </div>
                    ` : ''}
                </div>
            </div>
            <h3 class="project-title">${Utils.escapeHtml(project.name)}</h3>
            <p class="project-desc">${Utils.escapeHtml(project.description)}</p>
            <div class="project-tags">
                ${project.tech.map(t => `<span class="project-tag">${t}</span>`).join('')}
            </div>
            <div class="project-stats">
                <span class="project-stat">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    ${project.stars}
                </span>
                <span class="project-stat">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="18" r="3"></circle>
                        <circle cx="6" cy="6" r="3"></circle>
                        <circle cx="18" cy="6" r="3"></circle>
                        <line x1="18" y1="9" x2="18" y2="12"></line>
                        <line x1="6" y1="9" x2="6" y2="12"></line>
                        <line x1="12" y1="15" x2="12" y2="12"></line>
                    </svg>
                    ${project.forks}
                </span>
                <span class="project-status status-${project.status === '已完成' ? 'done' : project.status === '开发中' ? 'dev' : 'update'}">${project.status}</span>
            </div>
        `;
        
        container.appendChild(card);
        return card;
    },
    
    renderStatsWidget(container) {
        const stats = this.getStats();
        const profile = this.getProfile();
        
        const widget = document.createElement('div');
        widget.className = 'stats-widget';
        
        widget.innerHTML = `
            <div class="stats-header">
                <h3>📊 数据统计</h3>
                <span class="stats-update">更新于 ${this.data?.lastUpdated || '未知'}</span>
            </div>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value">${this.formatNumber(stats.totalViews || 0)}</div>
                    <div class="stat-label">总阅读量</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${stats.totalArticles || 0}</div>
                    <div class="stat-label">文章数</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${this.formatNumber(stats.totalLikes || 0)}</div>
                    <div class="stat-label">点赞数</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${this.formatNumber(stats.totalCollections || 0)}</div>
                    <div class="stat-label">收藏数</div>
                </div>
            </div>
            ${profile.csdn ? `
                <div class="platform-stats">
                    <div class="platform-header">
                        <span class="platform-icon">${this.getPlatformIcon('csdn')}</span>
                        <span>CSDN 博客</span>
                    </div>
                    <div class="platform-metrics">
                        <span>粉丝 <strong>${this.formatNumber(profile.csdn.stats.fans)}</strong></span>
                        <span>文章 <strong>${profile.csdn.stats.articles}</strong></span>
                        <span>获赞 <strong>${this.formatNumber(profile.csdn.stats.likes)}</strong></span>
                    </div>
                </div>
            ` : ''}
        `;
        
        container.appendChild(widget);
        return widget;
    },
    
    renderCategoryFilter(container, onSelect) {
        const categories = this.getCategories();
        
        const filter = document.createElement('div');
        filter.className = 'category-filter';
        
        filter.innerHTML = `
            <button class="filter-btn active" data-category="all">全部</button>
            ${categories.map(cat => `
                <button class="filter-btn" data-category="${cat.name}">
                    ${cat.icon} ${cat.name}
                </button>
            `).join('')}
        `;
        
        filter.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filter.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                const category = e.target.dataset.category;
                onSelect(category === 'all' ? null : category);
            }
        });
        
        container.appendChild(filter);
        return filter;
    },
    
    renderSearchBox(container, onSearch) {
        const searchBox = document.createElement('div');
        searchBox.className = 'search-box';
        
        searchBox.innerHTML = `
            <input type="text" class="search-input" placeholder="搜索文章标题、标签..." aria-label="搜索文章">
            <button class="search-btn" aria-label="搜索">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
        `;
        
        const input = searchBox.querySelector('.search-input');
        const searchDebounced = Utils.debounce((value) => onSearch(value), 300);
        
        input.addEventListener('input', (e) => searchDebounced(e.target.value));
        searchBox.querySelector('.search-btn').addEventListener('click', () => onSearch(input.value));
        
        container.appendChild(searchBox);
        return searchBox;
    },
    
    getPlatformIcon(platform) {
        const icons = {
            csdn: '📘',
            github: '🐙',
            juejin: '💎',
            zhihu: '🔵',
            wechat: '💚'
        };
        return icons[platform] || '📄';
    },
    
    getPlatformName(platform) {
        const names = {
            csdn: 'CSDN',
            github: 'GitHub',
            juejin: '掘金',
            zhihu: '知乎',
            wechat: '微信公众号'
        };
        return names[platform] || platform;
    },
    
    getCategoryIcon(category) {
        const icons = {
            'Web应用': '🌐',
            '个人网站': '🏠',
            '数据分析': '📊',
            '工具库': '🔧',
            '移动应用': '📱',
            'API服务': '🔌'
        };
        return icons[category] || '📦';
    },
    
    bindEvents() {
        Utils.eventBus.on('articleSearch', (query) => {
            const articles = this.getArticles({ search: query });
            Utils.eventBus.emit('articleSearchResult', articles);
        });
        
        Utils.eventBus.on('articleFilter', (category) => {
            const articles = this.getArticles({ category });
            Utils.eventBus.emit('articleFilterResult', articles);
        });
    },
    
    async syncFromCSDN() {
        console.log('CSDN数据同步功能需要后端API支持');
        return false;
    },
    
    exportData(format = 'json') {
        if (format === 'json') {
            return JSON.stringify(this.data, null, 2);
        }
        return null;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArticleManager;
}
