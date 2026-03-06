/**
 * 单一管理员认证系统
 * 版本：3.0
 * 安全级别：高
 * 
 * 功能特性:
 * - SHA-256 密码加密
 * - 暴力破解防护
 * - 会话管理
 * - 安全日志
 * - CSRF 保护
 * - XSS 防护
 */

class SecureAuthService {
    constructor() {
        // 检查配置是否加载
        if (typeof ADMIN_CONFIG === 'undefined') {
            console.error('错误：请先加载 admin.config.js');
            throw new Error('配置未加载');
        }
        
        this.config = ADMIN_CONFIG;
        this.storagePrefix = 'secure_auth_';
        this.init();
    }
    
    /**
     * 初始化
     */
    init() {
        this.checkLockStatus();
        this.checkSessionTimeout();
        this.updateAttemptCounter();
        this.setupCSRFToken();
    }
    
    /**
     * 密码加密（SHA-256）
     * @param {string} password - 明文密码
     * @returns {Promise<string>} - SHA-256 哈希值
     */
    async hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    /**
     * 验证登录
     * @param {string} username - 用户名
     * @param {string} password - 密码
     * @returns {Promise<Object>} - 验证结果
     */
    async validateLogin(username, password) {
        // 检查是否被锁定
        if (this.isLocked()) {
            return {
                success: false,
                message: '账户已锁定，请稍后重试',
                locked: true,
                remainingTime: this.getLockRemainingTime()
            };
        }
        
        // 输入验证（XSS 防护）
        const safeUsername = this.sanitizeInput(username);
        
        // 验证用户名
        if (safeUsername !== this.config.username) {
            this.recordFailedAttempt();
            return {
                success: false,
                message: '用户名或密码错误',
                locked: this.isLocked()
            };
        }
        
        // 验证密码
        const passwordHash = await this.hashPassword(password);
        if (passwordHash !== this.config.passwordHash) {
            this.recordFailedAttempt();
            return {
                success: false,
                message: '用户名或密码错误',
                locked: this.isLocked()
            };
        }
        
        // 登录成功
        this.resetFailedAttempts();
        return this.createSession();
    }
    
    /**
     * 创建会话
     * @returns {Object} - 会话数据
     */
    createSession() {
        const sessionToken = this.generateSessionToken();
        const csrfToken = this.generateCSRFToken();
        
        const sessionData = {
            token: sessionToken,
            csrfToken: csrfToken,
            username: this.config.username,
            loginTime: new Date().getTime(),
            expiresAt: new Date().getTime() + (this.config.sessionTimeout * 60 * 1000),
            lastActivity: new Date().getTime()
        };
        
        // 存储会话到 SessionStorage
        sessionStorage.setItem(this.storagePrefix + 'session', JSON.stringify(sessionData));
        
        // 如果选择记住我
        if (document.getElementById('rememberMe')?.checked && this.config.allowRememberMe) {
            const rememberData = {
                token: sessionToken,
                expiresAt: new Date().getTime() + (this.config.rememberMeDuration * 24 * 60 * 60 * 1000)
            };
            localStorage.setItem(this.storagePrefix + 'remember', JSON.stringify(rememberData));
        }
        
        // 记录安全日志
        this.logSecurityEvent('LOGIN_SUCCESS', this.config.username);
        
        return {
            success: true,
            message: '登录成功',
            session: sessionData,
            redirectUrl: 'admin-dashboard.html'
        };
    }
    
    /**
     * 生成会话 Token
     * @returns {string} - 随机 Token
     */
    generateSessionToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    /**
     * 生成 CSRF Token
     * @returns {string} - CSRF Token
     */
    generateCSRFToken() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        const token = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
        sessionStorage.setItem(this.storagePrefix + 'csrf_token', token);
        return token;
    }
    
    /**
     * 设置 CSRF Token
     */
    setupCSRFToken() {
        if (!sessionStorage.getItem(this.storagePrefix + 'csrf_token')) {
            this.generateCSRFToken();
        }
    }
    
    /**
     * 验证 CSRF Token
     * @param {string} token - 要验证的 Token
     * @returns {boolean} - 验证结果
     */
    validateCSRFToken(token) {
        const storedToken = sessionStorage.getItem(this.storagePrefix + 'csrf_token');
        return token === storedToken;
    }
    
    /**
     * 记录失败尝试
     */
    recordFailedAttempt() {
        const attempts = this.getFailedAttempts();
        const newAttempts = attempts + 1;
        
        localStorage.setItem(
            this.storagePrefix + 'failed_attempts',
            JSON.stringify({
                count: newAttempts,
                timestamp: new Date().getTime(),
                userAgent: navigator.userAgent
            })
        );
        
        // 记录安全日志
        this.logSecurityEvent('LOGIN_FAILED', null, newAttempts);
        
        // 如果超过最大尝试次数，锁定账户
        if (newAttempts >= this.config.maxLoginAttempts) {
            this.lockAccount();
        }
        
        this.updateAttemptCounter();
    }
    
    /**
     * 锁定账户
     */
    lockAccount() {
        const lockData = {
            locked: true,
            lockTime: new Date().getTime(),
            unlockTime: new Date().getTime() + (this.config.lockoutDuration * 60 * 1000),
            reason: 'max_login_attempts'
        };
        
        localStorage.setItem(this.storagePrefix + 'locked', JSON.stringify(lockData));
        this.logSecurityEvent('ACCOUNT_LOCKED', null);
    }
    
    /**
     * 检查锁定状态
     */
    checkLockStatus() {
        const lockData = JSON.parse(localStorage.getItem(this.storagePrefix + 'locked'));
        
        if (lockData && lockData.locked) {
            const now = new Date().getTime();
            
            if (now < lockData.unlockTime) {
                // 仍然锁定
                this.showLockScreen(this.getLockRemainingTime());
            } else {
                // 锁定已过期
                this.resetFailedAttempts();
            }
        }
    }
    
    /**
     * 获取锁定剩余时间
     * @returns {number} - 剩余分钟数
     */
    getLockRemainingTime() {
        const lockData = JSON.parse(localStorage.getItem(this.storagePrefix + 'locked'));
        if (!lockData) return 0;
        
        const now = new Date().getTime();
        const remaining = lockData.unlockTime - now;
        return Math.ceil(remaining / 60000);
    }
    
    /**
     * 显示锁定屏幕
     * @param {number} remainingMinutes - 剩余分钟数
     */
    showLockScreen(remainingMinutes) {
        const form = document.getElementById('loginForm');
        const lockedMsg = document.getElementById('lockedMessage');
        const timer = document.getElementById('lockdownTimer');
        const counter = document.getElementById('attemptCounter');
        
        if (form) form.style.display = 'none';
        if (counter) counter.style.display = 'none';
        
        if (lockedMsg) {
            lockedMsg.style.display = 'block';
            if (timer) timer.textContent = remainingMinutes;
        }
    }
    
    /**
     * 更新尝试次数显示
     */
    updateAttemptCounter() {
        const counter = document.getElementById('attemptCounter');
        const attemptsLeft = document.getElementById('attemptsLeft');
        
        if (counter && attemptsLeft) {
            const attempts = this.getFailedAttempts();
            const left = this.config.maxLoginAttempts - attempts;
            attemptsLeft.textContent = Math.max(0, left);
            
            if (left <= 2 && left > 0) {
                counter.style.color = '#dc3545';
                counter.innerHTML = `⚠️ 剩余尝试次数：<strong>${left}</strong>（账户将被锁定）`;
            } else if (left === 0) {
                counter.style.color = '#dc3545';
                counter.innerHTML = `🔒 账户已锁定`;
            } else {
                counter.style.color = 'inherit';
                counter.innerHTML = `剩余尝试次数：<strong id="attemptsLeft">${left}</strong>`;
            }
        }
    }
    
    /**
     * 获取失败尝试次数
     * @returns {number} - 失败次数
     */
    getFailedAttempts() {
        const data = localStorage.getItem(this.storagePrefix + 'failed_attempts');
        if (!data) return 0;
        
        const parsed = JSON.parse(data);
        const now = new Date().getTime();
        
        // 如果超过重置时间，重置计数
        if (now - parsed.timestamp > this.config.attemptResetTime) {
            return 0;
        }
        
        return parsed.count || 0;
    }
    
    /**
     * 重置失败尝试
     */
    resetFailedAttempts() {
        localStorage.removeItem(this.storagePrefix + 'failed_attempts');
        localStorage.removeItem(this.storagePrefix + 'locked');
        this.updateAttemptCounter();
    }
    
    /**
     * 检查是否锁定
     * @returns {boolean} - 锁定状态
     */
    isLocked() {
        const lockData = JSON.parse(localStorage.getItem(this.storagePrefix + 'locked'));
        
        if (!lockData || !lockData.locked) {
            return false;
        }
        
        // 检查锁定是否已过期
        const now = new Date().getTime();
        if (now >= lockData.unlockTime) {
            this.resetFailedAttempts();
            return false;
        }
        
        return true;
    }
    
    /**
     * 验证会话
     * @returns {Object} - 验证结果
     */
    validateSession() {
        let sessionData = sessionStorage.getItem(this.storagePrefix + 'session');
        
        if (!sessionData) {
            // 检查记住我
            const rememberData = localStorage.getItem(this.storagePrefix + 'remember');
            if (rememberData && this.config.allowRememberMe) {
                const remember = JSON.parse(rememberData);
                const now = new Date().getTime();
                
                if (now < remember.expiresAt) {
                    // 自动登录
                    return this.createSession();
                } else {
                    localStorage.removeItem(this.storagePrefix + 'remember');
                }
            }
            return { valid: false };
        }
        
        const session = JSON.parse(sessionData);
        const now = new Date().getTime();
        
        if (now > session.expiresAt) {
            // 会话过期
            this.logout();
            return { valid: false, expired: true };
        }
        
        // 更新最后活动时间
        session.lastActivity = now;
        sessionStorage.setItem(this.storagePrefix + 'session', JSON.stringify(session));
        
        return {
            valid: true,
            session: session,
            username: session.username,
            csrfToken: session.csrfToken
        };
    }
    
    /**
     * 检查会话超时
     */
    checkSessionTimeout() {
        setInterval(() => {
            const sessionData = sessionStorage.getItem(this.storagePrefix + 'session');
            if (!sessionData) return;
            
            const session = JSON.parse(sessionData);
            const now = new Date().getTime();
            
            if (now > session.expiresAt) {
                this.logout();
                alert('会话已过期，请重新登录');
                window.location.href = 'login-secure.html';
            }
        }, 60000); // 每分钟检查一次
    }
    
    /**
     * 登出
     */
    logout() {
        const username = this.getCurrentUser();
        sessionStorage.removeItem(this.storagePrefix + 'session');
        sessionStorage.removeItem(this.storagePrefix + 'csrf_token');
        localStorage.removeItem(this.storagePrefix + 'remember');
        localStorage.removeItem(this.storagePrefix + 'remember_token');
        
        if (username) {
            this.logSecurityEvent('LOGOUT', username);
        }
    }
    
    /**
     * 记录安全事件
     * @param {string} eventType - 事件类型
     * @param {string} username - 用户名
     * @param {number} attempts - 尝试次数
     */
    logSecurityEvent(eventType, username, attempts = 0) {
        if (!this.config.enableSecurityLogs) return;
        
        const logs = JSON.parse(localStorage.getItem(this.storagePrefix + 'security_logs') || '[]');
        
        const log = {
            id: this.generateEventId(),
            timestamp: new Date().getTime(),
            datetime: new Date().toISOString(),
            eventType: eventType,
            username: username || 'unknown',
            attempts: attempts,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
        };
        
        logs.unshift(log);
        
        // 只保留最近的 N 条记录
        if (logs.length > this.config.maxLogEntries) {
            logs = logs.slice(0, this.config.maxLogEntries);
        }
        
        localStorage.setItem(this.storagePrefix + 'security_logs', JSON.stringify(logs));
        
        console.log(`[安全日志] ${eventType}`, log);
    }
    
    /**
     * 生成事件 ID
     * @returns {string} - 事件 ID
     */
    generateEventId() {
        return 'evt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    /**
     * 获取安全日志
     * @param {number} limit - 限制条数
     * @returns {Array} - 日志数组
     */
    getSecurityLogs(limit = 50) {
        const logs = JSON.parse(localStorage.getItem(this.storagePrefix + 'security_logs') || '[]');
        return logs.slice(0, limit);
    }
    
    /**
     * 获取当前用户
     * @returns {string|null} - 用户名
     */
    getCurrentUser() {
        const validation = this.validateSession();
        return validation.valid ? validation.username : null;
    }
    
    /**
     * 是否需要登录
     * @returns {boolean} - 是否需要登录
     */
    requiresLogin() {
        const validation = this.validateSession();
        return !validation.valid;
    }
    
    /**
     * 输入验证（XSS 防护）
     * @param {string} input - 输入字符串
     * @returns {string} - 净化后的字符串
     */
    sanitizeInput(input) {
        if (!this.config.enableInputValidation) return input;
        
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML.trim();
    }
    
    /**
     * HTML 实体编码
     * @param {string} str - 原始字符串
     * @returns {string} - 编码后的字符串
     */
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
    
    /**
     * 获取登录统计
     * @returns {Object} - 统计数据
     */
    getLoginStats() {
        const logs = this.getSecurityLogs(1000);
        const now = new Date().getTime();
        const dayAgo = now - (24 * 60 * 60 * 1000);
        
        const stats = {
            totalLogins: 0,
            failedLogins: 0,
            lockouts: 0,
            lastLogin: null,
            last24Hours: {
                logins: 0,
                failed: 0
            }
        };
        
        logs.forEach(log => {
            if (log.eventType === 'LOGIN_SUCCESS') {
                stats.totalLogins++;
                if (log.timestamp > dayAgo) {
                    stats.last24Hours.logins++;
                }
                if (!stats.lastLogin) {
                    stats.lastLogin = log.datetime;
                }
            } else if (log.eventType === 'LOGIN_FAILED') {
                stats.failedLogins++;
                if (log.timestamp > dayAgo) {
                    stats.last24Hours.failed++;
                }
            } else if (log.eventType === 'ACCOUNT_LOCKED') {
                stats.lockouts++;
            }
        });
        
        return stats;
    }
}

// 创建全局实例
let authService;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    try {
        authService = new SecureAuthService();
        console.log('[认证系统] 初始化成功');
    } catch (error) {
        console.error('[认证系统] 初始化失败:', error);
    }
});

// 登录表单处理（如果存在）
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupLoginForm);
} else {
    setupLoginForm();
}

function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm && typeof authService !== 'undefined') {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('.submit-btn');
            
            // 禁用按钮防止重复提交
            submitBtn.disabled = true;
            submitBtn.textContent = '验证中...';
            
            try {
                const result = await authService.validateLogin(username, password);
                
                if (result.success) {
                    submitBtn.textContent = '登录成功！';
                    setTimeout(() => {
                        window.location.href = result.redirectUrl || 'admin-dashboard.html';
                    }, 1000);
                } else {
                    submitBtn.disabled = false;
                    submitBtn.textContent = '安全登录';
                    
                    if (result.locked) {
                        authService.checkLockStatus();
                    } else {
                        alert(result.message);
                    }
                }
            } catch (error) {
                console.error('登录错误:', error);
                alert('登录失败，请稍后重试');
                submitBtn.disabled = false;
                submitBtn.textContent = '安全登录';
            }
        });
    }
}

// 密码显示/隐藏切换
function togglePassword() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
}

// 页面离开前检查
window.addEventListener('beforeunload', (e) => {
    if (typeof authService !== 'undefined') {
        // 可以在这里添加会话保存逻辑
    }
});
