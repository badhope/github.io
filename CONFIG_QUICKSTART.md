# ⚡ 单一管理员登录系统 - 快速配置指南

> 5 分钟完成系统配置

---

## 🎯 配置步骤总览

1. 修改用户名（1 分钟）
2. 生成密码哈希（2 分钟）
3. 更新配置（1 分钟）
4. 测试登录（1 分钟）

---

## 📝 步骤 1：修改用户名

打开文件：`config/admin.config.js`

找到这一行：
```javascript
username: 'admin',
```

修改为独特的用户名，例如：
```javascript
username: 'xiong_admin_2026',
```

**⚠️ 重要提示**:
- ❌ 不要使用：`admin`、`administrator`、`root`、`123456`
- ✅ 建议使用：包含字母、数字、下划线的组合
- ✅ 长度建议：10-20 个字符

---

## 🔐 步骤 2：生成密码哈希

### 2.1 打开密码生成工具

在浏览器中打开：
```
utils/password-generator.html
```

### 2.2 输入强密码

**密码要求**:
- ✅ 至少 12 个字符
- ✅ 包含大写字母（A-Z）
- ✅ 包含小写字母（a-z）
- ✅ 包含数字（0-9）
- ✅ 包含特殊字符（!@#$%^&*）

**密码示例**:
```
✅ Xiong@2026Secure!Pass
✅ MySecure#Admin2026
✅ Strong_Pass_2026_Admin
```

### 2.3 生成哈希

1. 输入密码
2. 观察密码强度指示器（确保显示"非常强"）
3. 点击"🔑 生成哈希"按钮
4. 等待生成 64 位哈希值

### 2.4 复制哈希

生成的哈希值类似：
```
8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918
```

点击"📋 复制到剪贴板"按钮

---

## ⚙️ 步骤 3：更新配置

### 3.1 打开配置文件

编辑：`config/admin.config.js`

### 3.2 粘贴哈希值

找到这一行：
```javascript
passwordHash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
```

替换为你刚才复制的哈希值：
```javascript
passwordHash: '你的 64 位哈希值',
```

### 3.3 （可选）修改其他配置

```javascript
// 最大登录尝试次数（建议 3-5 次）
maxLoginAttempts: 5,

// 账户锁定时间（建议 30-60 分钟）
lockoutDuration: 30,

// 会话超时时间（建议 60-120 分钟）
sessionTimeout: 120,

// 记住我有效期（建议 7-30 天）
rememberMeDuration: 7,
```

### 3.4 保存文件

保存 `admin.config.js` 文件

---

## 🧪 步骤 4：测试登录

### 4.1 打开登录页面

在浏览器中打开：
```
login-secure.html
```

### 4.2 输入凭据

- **用户名**: 步骤 1 设置的用户名
- **密码**: 步骤 2 输入的密码

### 4.3 测试登录

1. 点击"安全登录"按钮
2. 验证是否显示"登录成功"
3. 验证是否自动跳转到 `admin-dashboard.html`

### 4.4 验证后台

登录成功后，检查：
- ✅ 用户名显示正确
- ✅ 统计信息显示正常
- ✅ 可以查看安全日志
- ✅ 可以导出日志

---

## ✅ 配置完成检查清单

- [ ] 用户名已修改（不使用 'admin'）
- [ ] 密码强度为"非常强"
- [ ] 密码哈希已更新到配置文件
- [ ] 登录测试成功
- [ ] 后台管理页面可访问
- [ ] 安全日志有登录记录

---

## 🚀 部署到 Netlify

### 方法一：官网部署（推荐）

1. 访问 https://app.netlify.com/
2. 使用 GitHub 账号登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择仓库：`badhope/github.io`
5. 点击 "Deploy site"
6. 等待 1-2 分钟

### 方法二：自动部署

如果已连接 Netlify：
```bash
git add .
git commit -m "配置管理员账户"
git push origin main
```

Netlify 会自动重新部署。

---

## 🔧 常见问题

### Q: 忘记配置的用户名怎么办？

**A**: 查看 `config/admin.config.js` 文件中的 `username` 字段。

---

### Q: 忘记密码怎么办？

**A**: 
1. 重新打开 `utils/password-generator.html`
2. 生成新的密码哈希
3. 更新 `config/admin.config.js` 中的 `passwordHash`
4. 使用新密码登录

---

### Q: 测试时账户被锁定了怎么办？

**A**: 
打开浏览器控制台（F12），执行：
```javascript
localStorage.removeItem('secure_auth_locked');
localStorage.removeItem('secure_auth_failed_attempts');
location.reload();
```

---

### Q: 如何修改会话超时时间？

**A**: 
编辑 `config/admin.config.js`：
```javascript
sessionTimeout: 60  // 修改为 60 分钟
```

---

## 📚 相关文档

- **详细实现方案**: [`SECURITY_IMPLEMENTATION.md`](SECURITY_IMPLEMENTATION.md)
- **完整测试指南**: [`TESTING.md`](TESTING.md)
- **部署教程**: [`DEPLOYMENT.md`](DEPLOYMENT.md)
- **项目总结**: [`SINGLE_USER_LOGIN_SUMMARY.md`](SINGLE_USER_LOGIN_SUMMARY.md)

---

## 🎉 配置完成！

现在您可以：

1. 访问登录页面：`login-secure.html`
2. 使用配置的用户名和密码登录
3. 进入管理后台：`admin-dashboard.html`
4. 查看安全日志和统计信息

**系统已准备就绪！** 🚀

---

**预计时间**: 5 分钟  
**难度**: ⭐⭐☆☆☆  
**最后更新**: 2026-03-06
