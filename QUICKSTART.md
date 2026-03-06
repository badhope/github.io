# 🚀 快速入门指南

> 5 分钟快速部署您的个人网站

---

## ⚡ 超快速部署（3 分钟）

### 前提条件
- ✅ 已注册 GitHub 账号
- ✅ 项目已在 GitHub 上

### 步骤 1：访问 Netlify（30 秒）
```
打开浏览器 → https://app.netlify.com/
```

### 步骤 2：登录（30 秒）
```
点击 "Sign up" → 选择 "Sign up with GitHub" → 授权
```

### 步骤 3：创建站点（1 分钟）
```
点击 "Add new site" 
→ 选择 "Import an existing project"
→ 点击 "Deploy with GitHub"
→ 选择仓库 "badhope/github.io"
```

### 步骤 4：确认配置（30 秒）
```
确认 Build command: echo 'Building static site...'
确认 Publish directory: .
```

### 步骤 5：部署（1 分钟）
```
点击 "Deploy site"
→ 等待构建完成
→ 点击生成的域名访问网站
```

**🎉 完成！您的网站已上线！**

---

## 🌐 配置自定义域名（可选，5 分钟）

### 在 Netlify 配置
1. 进入站点 → "Domain settings"
2. 点击 "Add custom domain"
3. 输入您的域名（如：`xiongzecheng.com`）
4. 点击 "Verify" 和 "Add domain"

### 在域名服务商配置 DNS

#### 阿里云/万网
1. 登录阿里云控制台
2. 进入域名管理
3. 点击 "解析"
4. 添加记录：
   - A 记录：`@` → `75.2.60.5`
   - CNAME 记录：`www` → `xxx-xxx-xxx.netlify.app`

#### 腾讯云/DNSPod
1. 登录 DNSPod 控制台
2. 选择域名
3. 添加记录：
   - A 记录：`@` → `75.2.60.5`
   - CNAME 记录：`www` → `xxx-xxx-xxx.netlify.app`

#### GoDaddy
1. 登录 GoDaddy
2. 进入 DNS Management
3. 添加记录：
   - A 记录：`@` → `75.2.60.5`
   - CNAME 记录：`www` → `xxx-xxx-xxx.netlify.app`

### 启用 HTTPS
```
等待 DNS 生效（5 分钟 - 2 小时）
→ 返回 Netlify
→ 点击 "Verify DNS configuration"
→ 启用 HTTPS（自动证书）
```

**🎉 自定义域名配置完成！**

---

## 📝 更新网站内容

### 方法一：GitHub 在线编辑
1. 访问 https://github.com/badhope/github.io
2. 找到要修改的文件（如：`index.html`）
3. 点击文件右上角的铅笔图标
4. 修改内容
5. 滚动到页面底部
6. 填写 commit message
7. 点击 "Commit changes"
8. Netlify 会自动重新部署（等待 1-2 分钟）

### 方法二：本地修改后推送
```bash
# 1. 克隆仓库（如未克隆）
git clone https://github.com/badhope/github.io.git
cd github.io

# 2. 修改文件
# 使用编辑器修改需要的文件

# 3. 提交更改
git add .
git commit -m "更新网站内容"

# 4. 推送到 GitHub
git push origin main

# 5. Netlify 会自动重新部署
```

---

## 🎨 自定义网站外观

### 修改主题颜色
编辑 `css/style.css` 文件：

```css
:root {
    /* 浅色主题 */
    --accent-light: #0097a7;        /* 主色调 */
    --text-light-primary: #0d47a1;  /* 主要文字 */
    
    /* 深色主题 */
    --accent-dark: #58a6ff;         /* 主色调 */
    --text-dark-primary: #e6edf3;   /* 主要文字 */
}
```

### 修改个人信息
编辑对应页面文件：
- `index.html` - 首页信息
- `resume.html` - 简历信息
- `contact.html` - 联系方式

### 添加博客文章
编辑 `blog.html` 文件中的 `blogPosts` 数组：

```javascript
const blogPosts = [
    {
        id: 10,
        title: "您的文章标题",
        excerpt: "文章摘要简介",
        category: "frontend",
        categoryLabel: "前端开发",
        author: "您的名字",
        date: "2026-03-06",
        readTime: "10 分钟",
        views: 100,
        tags: ["标签 1", "标签 2"],
        emoji: "🚀"
    }
];
```

---

## 🔧 常用配置

### 修改网站标题
编辑各个 HTML 文件的 `<title>` 标签：
```html
<title>熊泽城 | AI 时代的探索者</title>
```

### 修改网站描述
编辑各个 HTML 文件的 `<meta name="description">` 标签：
```html
<meta name="description" content="您的个人网站描述">
```

### 添加统计代码
在 HTML 文件的 `<head>` 标签中添加：
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y"></script>
```

### 添加验证文件
将验证文件（如 Google 搜索控制台验证）放在根目录，直接 push 到 GitHub 即可。

---

## 📱 测试网站

### 本地测试
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx http-server -p 8000

# 访问 http://localhost:8000
```

### 移动端测试
1. 在手机浏览器访问网站
2. 测试导航功能
3. 测试主题切换
4. 检查显示效果

### 性能测试
1. 访问 https://pagespeed.web.dev/
2. 输入网站 URL
3. 运行测试
4. 查看评分和建议

---

## 🆘 遇到问题？

### 部署失败
查看构建日志 → 定位错误 → 修复后重新推送

### 页面显示异常
- 清除浏览器缓存
- 检查资源路径是否使用相对路径
- 查看浏览器控制台错误

### 域名不生效
- 等待 DNS 生效（最多 48 小时）
- 检查 DNS 配置是否正确
- 清除本地 DNS 缓存

### 获取帮助
- 查看 [DEPLOYMENT.md](DEPLOYMENT.md) 详细指南
- 查看 [CHECKLIST.md](CHECKLIST.md) 检查清单
- 访问 [Netlify 官方文档](https://docs.netlify.com/)

---

## 📚 下一步

网站部署完成后，建议：

1. ✅ 测试所有功能
2. ✅ 替换模拟数据为真实内容
3. ✅ 配置自定义域名
4. ✅ 添加统计代码
5. ✅ 提交到搜索引擎
6. ✅ 分享给朋友

---

## 🎉 恭喜！

您已经成功部署了自己的个人网站！

**网站地址**: https://your-site.netlify.app  
**（或您的自定义域名）**

开始享受您的技术博客之旅吧！🚀

---

**最后更新**: 2026-03-06  
**预计时间**: 3-10 分钟
