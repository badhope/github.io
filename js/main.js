/**
 * 熊泽城个人网站 - 主 JavaScript 文件
 * 版本：2.0
 * 最后更新：2026-03-06
 */

// ========== 工具函数 ==========
const Utils = {
    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 随机数生成
    random(min, max) {
        return Math.random() * (max - min) + min;
    }
};

// ========== 页面加载器 ==========
const PageLoader = {
    init() {
        this.loader = document.querySelector('.page-loader');
        if (this.loader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.loader.classList.add('hidden');
                }, 300);
            });
        }
    }
};

// ========== 滚动进度条 ==========
const ScrollProgress = {
    init() {
        this.progressBar = document.querySelector('.scroll-progress');
        if (this.progressBar) {
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                this.progressBar.style.width = scrolled + '%';
            });
        }
    }
};

// ========== 返回顶部按钮 ==========
const BackToTop = {
    init() {
        this.btn = document.querySelector('.back-to-top');
        if (this.btn) {
            window.addEventListener('scroll', Utils.throttle(() => {
                if (window.pageYOffset > 300) {
                    this.btn.classList.add('visible');
                } else {
                    this.btn.classList.remove('visible');
                }
            }, 100));
            
            this.btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
};

// ========== 导航栏效果 ==========
const Navbar = {
    init() {
        this.nav = document.querySelector('nav');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinks = document.querySelector('.nav-links');
        
        if (this.nav) {
            // 滚动效果
            window.addEventListener('scroll', Utils.throttle(() => {
                if (window.scrollY > 50) {
                    this.nav.classList.add('scrolled');
                } else {
                    this.nav.classList.remove('scrolled');
                }
            }, 100));
            
            // 移动端菜单
            if (this.menuToggle) {
                this.menuToggle.addEventListener('click', () => {
                    this.menuToggle.classList.toggle('active');
                    this.navLinks.classList.toggle('active');
                });
                
                // 点击链接后关闭菜单
                const links = this.navLinks.querySelectorAll('a');
                links.forEach(link => {
                    link.addEventListener('click', () => {
                        this.menuToggle.classList.remove('active');
                        this.navLinks.classList.remove('active');
                    });
                });
            }
        }
    }
};

// ========== 主题切换 ==========
const ThemeSwitcher = {
    init() {
        this.toggle = document.querySelector('.theme-toggle');
        this.body = document.body;
        
        // 检查本地存储的主题
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.body.classList.add('dark-mode');
        }
        
        if (this.toggle) {
            this.toggle.addEventListener('click', () => {
                this.body.classList.toggle('dark-mode');
                const isDark = this.body.classList.contains('dark-mode');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }
    }
};

// ========== 滚动动画 ==========
const ScrollAnimations = {
    init() {
        this.animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .scale-in');
        
        if (this.animatedElements.length > 0) {
            this.setupObserver();
        }
    },
    
    setupObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.animatedElements.forEach(el => observer.observe(el));
    }
};

// ========== 打字效果 ==========
const Typewriter = {
    init() {
        this.element = document.getElementById('typed-text');
        if (!this.element) return;
        
        this.phrases = [
            "AI 时代的探索者",
            "熊泽城",
            "积极的开源贡献者",
            "活跃的技术开发者",
            "大数据专业本科生",
            "全栈开发爱好者",
            "机器学习实践者",
            "数据分析师",
            "Python 开发者",
            "JavaScript 爱好者",
            "技术创新推动者",
            "未来科技追梦人"
        ];
        
        this.currentPhraseIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.type();
    },
    
    type() {
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
        if (this.isPaused) {
            setTimeout(() => {
                this.isPaused = false;
                this.isDeleting = true;
                this.type();
            }, 2000);
            return;
        }
        
        if (this.isDeleting) {
            this.element.textContent = currentPhrase.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentPhrase.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let typeSpeed = this.isDeleting ? 50 : 100;
        
        if (!this.isDeleting && this.currentCharIndex === currentPhrase.length) {
            this.isPaused = true;
            typeSpeed = 100;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
};

// ========== 引言获取 ==========
const QuoteFetcher = {
    init() {
        this.quoteText = document.getElementById('quoteText');
        this.quoteAuthor = document.getElementById('quoteAuthor');
        
        if (this.quoteText && this.quoteAuthor) {
            this.fetchQuote();
        }
    },
    
    fetchQuote() {
        const quotes = [
            { text: "未来的技术定会愈发先进，让我们一起见证这个时代。", author: "熊泽城" },
            { text: "Stay hungry, stay foolish. 求知若饥，虚心若愚。", author: "Steve Jobs" },
            { text: "任何足够先进的技术，初看都与魔法无异。", author: "Arthur C. Clarke" },
            { text: "代码是写给人看的，顺便给机器执行。", author: "Donald Knuth" },
            { text: "简单是可靠的先决条件。", author: "Dijkstra" },
            { text: "先让它工作，再让它快，再让它简单。", author: "Kent Beck" },
            { text: "最好的代码是没有代码。", author: "Jeff Atwood" },
            { text: "程序必须是为了给人看而写，给机器执行只是附带任务。", author: "Donald Knuth" },
            { text: "人工智能不是要取代人类，而是要增强人类的能力。", author: "李开复" },
            { text: "数据是新的石油，而 AI 是引擎。", author: "吴恩达" },
            { text: "预测未来的最好方式，就是创造它。", author: "Peter Drucker" },
            { text: "技术本身没有价值，有价值的是技术能做什么。", author: "Steve Jobs" }
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        this.quoteText.textContent = `"${randomQuote.text}"`;
        this.quoteAuthor.textContent = `— ${randomQuote.author}`;
    }
};

// ========== 粒子背景效果 ==========
const ParticleBackground = {
    init() {
        this.container = document.getElementById('particle-container');
        if (!this.container) return;
        
        this.createParticles(50);
    },
    
    createParticles(count) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Utils.random(0, 100)}%`;
            particle.style.top = `${Utils.random(0, 100)}%`;
            particle.style.animationDelay = `${Utils.random(0, 5)}s`;
            particle.style.animationDuration = `${Utils.random(10, 20)}s`;
            this.container.appendChild(particle);
        }
    }
};

// ========== 流星效果 ==========
const MeteorEffect = {
    init() {
        this.container = document.getElementById('meteor-container');
        if (!this.container) return;
        
        this.createMeteor();
        setInterval(() => this.createMeteor(), 3000);
    },
    
    createMeteor() {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.left = `${Utils.random(50, 100)}%`;
        meteor.style.top = '-60px';
        meteor.style.animationDuration = `${Utils.random(1.5, 2.5)}s`;
        this.container.appendChild(meteor);
        
        setTimeout(() => {
            meteor.remove();
        }, 2500);
    }
};

// ========== 星空背景 ==========
const StarBackground = {
    init() {
        this.container = document.getElementById('star-container');
        if (!this.container) return;
        
        this.createStars(150);
    },
    
    createStars(count) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Utils.random(0, 100)}%`;
            star.style.top = `${Utils.random(0, 100)}%`;
            const size = Utils.random(1, 3);
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.animationDelay = `${Utils.random(0, 3)}s`;
            this.container.appendChild(star);
        }
    }
};

// ========== 技能卡片动画 ==========
const SkillCards = {
    init() {
        this.cards = document.querySelectorAll('.skill-preview-card');
        if (this.cards.length === 0) return;
        
        this.cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });
    }
};

// ========== 项目卡片悬停效果 ==========
const ProjectCards = {
    init() {
        this.cards = document.querySelectorAll('.project-card');
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleHover(e));
            card.addEventListener('mouseleave', (e) => this.handleLeave(e));
        });
    },
    
    handleHover(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    },
    
    handleLeave(e) {
        const card = e.currentTarget;
        card.style.setProperty('--mouse-x', '0px');
        card.style.setProperty('--mouse-y', '0px');
    }
};

// ========== 页面初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有模块
    PageLoader.init();
    ScrollProgress.init();
    BackToTop.init();
    Navbar.init();
    ThemeSwitcher.init();
    ScrollAnimations.init();
    Typewriter.init();
    QuoteFetcher.init();
    ParticleBackground.init();
    MeteorEffect.init();
    StarBackground.init();
    SkillCards.init();
    ProjectCards.init();
    
    console.log('%c🚀 熊泽城个人网站 v2.0', 'color: #0097a7; font-size: 16px; font-weight: bold;');
    console.log('%c探索技术的无限可能', 'color: #888; font-size: 12px;');
});
