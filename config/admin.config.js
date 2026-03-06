/**
 * 管理员账户配置
 * 版本：3.0
 * 安全级别：高
 * 
 * 重要提示：
 * 1. 请立即修改默认用户名和密码
 * 2. 使用 utils/password-generator.html 生成密码哈希
 * 3. 密码建议 12 位以上，包含大小写字母、数字、特殊字符
 */

const ADMIN_CONFIG = {
    // ==================== 账户信息 ====================
    
    /**
     * 管理员用户名
     * 建议：使用独特的用户名，不要使用 'admin'、'administrator' 等常见用户名
     * 示例：'xiong_admin_2026'、'secure_user_888'
     */
    username: 'admin',
    
    /**
     * 管理员邮箱（用于找回密码和安全通知）
     * 请修改为您的安全邮箱
     */
    email: 'admin@example.com',
    
    /**
     * 密码哈希（SHA-256 加密）
     * 默认密码：Admin@2026
     * 默认哈希：8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
     * 
     * 重要：请立即修改！
     * 修改方法：
     * 1. 打开 utils/password-generator.html
     * 2. 输入您的强密码
     * 3. 点击"生成哈希"
     * 4. 复制生成的哈希值替换下面的值
     */
    passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    
    // ==================== 安全配置 ====================
    
    /**
     * 最大登录尝试次数
     * 超过此次数后账户将被锁定
     * 建议：3-5 次
     */
    maxLoginAttempts: 5,
    
    /**
     * 账户锁定时间（分钟）
     * 登录失败次数过多后的锁定时间
     * 建议：30-60 分钟
     */
    lockoutDuration: 30,
    
    /**
     * 会话超时时间（分钟）
     * 用户无操作后自动登出的时间
     * 建议：60-120 分钟
     */
    sessionTimeout: 120,
    
    /**
     * 是否允许"记住我"功能
     * true: 允许 | false: 禁止
     */
    allowRememberMe: true,
    
    /**
     * "记住我"有效期（天）
     * 勾选"记住我"后的登录有效期
     * 建议：7-30 天
     */
    rememberMeDuration: 7,
    
    // ==================== 高级配置 ====================
    
    /**
     * 失败尝试重置时间（毫秒）
     * 超过此时间后失败计数重置
     * 默认：1 小时
     */
    attemptResetTime: 3600000,
    
    /**
     * 是否启用安全日志
     * true: 启用 | false: 禁用
     */
    enableSecurityLogs: true,
    
    /**
     * 日志保留条数
     * 只保留最近的 N 条日志
     * 建议：50-100 条
     */
    maxLogEntries: 100,
    
    /**
     * 是否启用 CSRF 保护
     * true: 启用 | false: 禁用
     */
    enableCSRFProtection: true,
    
    /**
     * 是否启用输入验证
     * true: 启用 | false: 禁用
     */
    enableInputValidation: true
};

// 导出配置（兼容不同模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ADMIN_CONFIG;
}
