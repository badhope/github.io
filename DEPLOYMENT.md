# Netlify 部署指南

## 📋 目录
- [部署前置条件](#部署前置条件)
- [部署步骤](#部署步骤)
- [配置项说明](#配置项说明)
- [需要开通的服务](#需要开通的服务)
- [常见问题](#常见问题)

---

## 🎯 部署前置条件

### 1. GitHub 账号
- 确保您已注册 [GitHub](https://github.com/) 账号
- 本项目已托管在 GitHub 上

### 2. Netlify 账号
- 访问 [Netlify](https://www.netlify.com/) 注册免费账号
- 推荐使用 GitHub 账号直接登录（更便捷）

### 3. 项目准备
- 确保所有文件已提交到 GitHub 仓库
- 确认 `netlify.toml` 配置文件已在根目录

---

## 🚀 部署步骤

### 方法一：通过 Netlify 官网部署（推荐）

#### 步骤 1：登录 Netlify
1. 访问 https://app.netlify.com/
2. 点击 "Sign up" 或使用 GitHub 账号登录

#### 步骤 2：创建新站点
1. 登录后点击 "Add new site"
2. 选择 "Import an existing project"

#### 步骤 3：连接 GitHub
1. 点击 "Deploy with GitHub"
2. 授权 Netlify 访问您的 GitHub 账号
3. 选择要部署的仓库：`badhope/github.io`

#### 步骤 4：配置构建设置
Netlify 会自动检测 `netlify.toml` 配置文件，无需手动配置：
- **Build command**: `echo 'Building static site...'`
- **Publish directory**: `.` （当前目录）

#### 步骤 5：部署
1. 点击 "Deploy site"
2. 等待构建完成（通常 1-2 分钟）
3. 部署成功后会生成一个随机域名，如：`https://xxx-xxx-xxx.netlify.app`

#### 步骤 6：配置自定义域名（可选）
1. 进入站点设置 → "Domain settings"
2. 点击 "Add custom domain"
3. 输入您的域名（如：`yourdomain.com`）
4. 按照提示配置 DNS 解析

---

### 方法二：通过 Netlify CLI 部署

#### 安装 CLI
```bash
npm install -g netlify-cli
```

#### 登录 Netlify
```bash
netlify login
```

#### 初始化站点
```bash
netlify init
```
- 选择 "Create & configure a new site"
- 选择您的团队（如果有）
- 输入站点名称或使用随机名称

#### 部署站点
```bash
# 手动部署
netlify deploy

# 生产环境部署
netlify deploy --prod
```

---

## ⚙️ 配置项说明

### netlify.toml 配置

```toml
[build]
  publish = "."              # 发布目录
  command = "echo '...'"     # 构建命令

[[redirects]]
  from = "/*"                # 404 重定向规则
  to = "/404.html"
  status = 404

[[headers]]
  for = "/*"                 # 安全头配置
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### 环境变量（在 Netlify 控制台配置）

进入站点设置 → "Build & deploy" → "Environment"

推荐配置的环境变量：
- `NODE_VERSION`: `18` (Node.js 版本)
- `NPM_VERSION`: `9` (npm 版本)

---

## 🔧 需要开通的服务

### Netlify 免费套餐包含：
✅ **无限个人项目** - 免费部署无限数量的个人网站  
✅ **自动 HTTPS** - 自动配置 SSL 证书  
✅ **持续部署** - 连接 GitHub 后自动部署  
✅ **表单处理** - 每月 100 次表单提交（用于联系表单）  
✅ **100GB 带宽** - 每月 100GB 流量  
✅ **300 构建分钟** - 每月 300 分钟构建时间  

### 可选付费服务（按需开通）：
- **自定义域名** - 免费套餐支持自定义域名
- **密码保护** - 需要升级到 Pro 计划（$19/月）
- **更多构建时间** - 超出后 $0.25/分钟
- **更多带宽** - 超出后 $55/100GB

---

## 📝 后续优化建议

### 1. 启用自动部署
- 连接 GitHub 后，每次 push 到主分支都会自动部署
- 可在 "Build & deploy" → "Continuous Deployment" 中配置

### 2. 配置部署通知
- 进入 "Build & deploy" → "Deploy notifications"
- 配置邮件、Slack 等通知方式

### 3. 使用 Netlify Forms（可选）
在联系表单中添加 `netlify` 属性：
```html
<form name="contact" method="POST" data-netlify="true">
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
  <button type="submit">发送</button>
</form>
```

### 4. 配置分析统计
- 集成 Google Analytics 或其他统计工具
- 或使用 Netlify Analytics（付费功能）

---

## ❓ 常见问题

### Q1: 部署后页面空白或 404？
**A**: 检查以下几点：
- 确认 `index.html` 在根目录
- 检查资源路径是否使用相对路径
- 查看构建日志是否有错误

### Q2: 如何自定义域名？
**A**: 
1. 在 Netlify 控制台添加自定义域名
2. 在域名服务商处配置 DNS：
   - A 记录：`@` → `75.2.60.5`
   - CNAME 记录：`www` → `xxx-xxx-xxx.netlify.app`

### Q3: 如何回滚到之前的版本？
**A**: 
1. 进入 "Deploys" 页面
2. 找到要回滚的版本
3. 点击 "Publish deploy"

### Q4: 构建失败怎么办？
**A**: 
1. 查看构建日志定位错误
2. 检查 `netlify.toml` 配置是否正确
3. 确保所有文件路径正确

### Q5: 如何启用密码保护？
**A**: 
- 需要升级到 Pro 计划
- 在 "Site settings" → "Access control" → "Password protection" 中配置

---

## 📚 相关资源

- [Netlify 官方文档](https://docs.netlify.com/)
- [Netlify 博客](https://www.netlify.com/blog/)
- [netlify.toml 配置参考](https://docs.netlify.com/configure-builds/file-based-configuration/)
- [Netlify 表单处理](https://docs.netlify.com/forms/setup/)

---

## 🎉 部署完成检查清单

- [ ] 站点成功部署，可以访问
- [ ] 所有页面加载正常
- [ ] 响应式设计在移动端正常显示
- [ ] 主题切换功能正常
- [ ] 所有链接和导航正常工作
- [ ] 404 页面配置正确
- [ ] （可选）自定义域名配置完成
- [ ] （可选）表单提交功能测试通过

---

**祝您部署顺利！** 🚀

如有问题，请访问 [Netlify 支持中心](https://answers.netlify.com/) 或查看官方文档。
