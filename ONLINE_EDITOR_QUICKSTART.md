# ⚡ 在线编辑器 - 5 分钟快速配置

## 前提条件

✅ 已经部署网站到 GitHub
✅ 拥有 GitHub 账号
✅ 已实现登录系统（admin.config.js）

---

## 第一步：生成 GitHub Token（2 分钟）

### 访问 Token 设置页面
打开：https://github.com/settings/tokens

### 创建新 Token
1. 点击 **"Generate new token (classic)"**
2. 填写信息：
   - **Note**: `Website Editor`
   - **Expiration**: `30 days`（或更长）
   - **Select scopes**: 勾选 **repo** ✅

3. 点击 **"Generate token"**
4. **立即复制 Token**（格式：`ghp_xxxxxxxxxxxx`）
   - ⚠️ Token 只显示一次，关闭页面后无法再查看！

---

## 第二步：配置 Token（1 分钟）

### 访问配置页面
1. 登录您的网站：`your-site.com/login-secure.html`
2. 进入管理后台：`your-site.com/admin-dashboard.html`
3. 点击 **"⚙️ GitHub 配置"**

### 填写配置
```
GitHub Token:      [粘贴刚才复制的 Token]
仓库所有者：       [您的 GitHub 用户名]
仓库名称：         github.io
分支名称：         main
```

### 保存并测试
1. 点击 **"💾 保存配置"**
2. 点击 **"🔗 测试连接"**
3. 显示 "✓ 连接成功！" 即可

---

## 第三步：开始编辑（2 分钟）

### 进入编辑器
1. 点击 **"📝 在线编辑器"** 或访问 `editor.html`
2. 左侧选择要编辑的文件（如 `index.html`）
3. 右侧开始编辑

### 预览效果
点击 **"👁 预览"** 查看实时效果

### 提交修改
1. 点击 **"☁️ 提交到 GitHub"**
2. 输入提交信息：`更新首页内容`
3. 确认提交
4. 完成！✅

---

## 完成！🎉

现在您可以：
- ✅ 编辑任何 HTML、CSS、JS 文件
- ✅ 实时预览修改效果
- ✅ 一键提交到 GitHub
- ✅ 自动部署到 Netlify（如已配置）

---

## 常用操作

### 修改首页文字
```
1. 选择 index.html
2. 搜索要修改的文字
3. 直接编辑
4. 预览 → 提交
```

### 修改样式
```
1. 选择 css/style.css
2. 添加或修改 CSS
3. 预览 → 提交
```

### 添加新页面
```
1. 在 GitHub 上创建新文件
2. 在编辑器中打开编辑
3. 提交保存
```

---

## 安全提示

⚠️ **Token 安全**
- Token 只保存在您的浏览器
- 不要分享给他人
- 定期更新（每 30-90 天）

⚠️ **权限控制**
- 只有登录的管理员能访问编辑器
- 游客无法看到编辑功能
- 会话过期自动退出

---

## 遇到问题？

### 无法提交？
→ 检查 Token 是否有效
→ 重新配置 Token

### 找不到文件？
→ 刷新页面重新加载
→ 检查仓库名称是否正确

### 预览不显示？
→ 检查 HTML 语法是否正确
→ 查看浏览器控制台错误

---

**更多详细文档请查看：[EDITOR_GUIDE.md](EDITOR_GUIDE.md)**
