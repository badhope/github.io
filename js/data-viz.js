/**
 * 数据可视化模块 - Data Visualization
 * 版本：1.0.0
 * 功能：图表渲染、数据统计可视化
 */

const DataViz = {
    version: '1.0.0',
    
    colors: {
        primary: '#0097a7',
        secondary: '#64ffda',
        accent: '#00bcd4',
        success: '#4caf50',
        warning: '#ff9800',
        danger: '#f44336',
        text: '#e0e0e0',
        textSec: '#9e9e9e',
        cardBg: 'rgba(255, 255, 255, 0.05)',
        gridLine: 'rgba(100, 255, 218, 0.1)'
    },
    
    renderBarChart(container, data, options = {}) {
        const {
            width = container.clientWidth || 400,
            height = 200,
            padding = { top: 20, right: 20, bottom: 40, left: 50 },
            animate = true
        } = options;
        
        const canvas = document.createElement('canvas');
        canvas.width = width * 2;
        canvas.height = height * 2;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;
        
        const maxValue = Math.max(...data.map(d => d.value));
        const barWidth = chartWidth / data.length - 10;
        
        ctx.strokeStyle = this.colors.gridLine;
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
            
            ctx.fillStyle = this.colors.textSec;
            ctx.font = '10px Orbitron';
            ctx.textAlign = 'right';
            const labelValue = Math.round(maxValue - (maxValue / 5) * i);
            ctx.fillText(this.formatNumber(labelValue), padding.left - 10, y + 4);
        }
        
        data.forEach((item, index) => {
            const x = padding.left + (chartWidth / data.length) * index + 5;
            const barHeight = (item.value / maxValue) * chartHeight;
            const y = padding.top + chartHeight - barHeight;
            
            const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
            gradient.addColorStop(0, this.colors.primary);
            gradient.addColorStop(1, this.colors.secondary);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
            ctx.fill();
            
            ctx.fillStyle = this.colors.textSec;
            ctx.font = '10px Noto Sans SC';
            ctx.textAlign = 'center';
            const label = item.label.length > 4 ? item.label.slice(0, 4) + '..' : item.label;
            ctx.fillText(label, x + barWidth / 2, height - padding.bottom + 15);
        });
        
        container.appendChild(canvas);
        return canvas;
    },
    
    renderLineChart(container, data, options = {}) {
        const {
            width = container.clientWidth || 400,
            height = 200,
            padding = { top: 20, right: 20, bottom: 40, left: 50 },
            showArea = true,
            animate = true
        } = options;
        
        const canvas = document.createElement('canvas');
        canvas.width = width * 2;
        canvas.height = height * 2;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;
        
        const maxValue = Math.max(...data.map(d => d.value));
        const minValue = Math.min(...data.map(d => d.value));
        const valueRange = maxValue - minValue || 1;
        
        ctx.strokeStyle = this.colors.gridLine;
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 5; i++) {
            const y = padding.top + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
        }
        
        const points = data.map((item, index) => ({
            x: padding.left + (chartWidth / (data.length - 1)) * index,
            y: padding.top + chartHeight - ((item.value - minValue) / valueRange) * chartHeight
        }));
        
        if (showArea) {
            const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
            gradient.addColorStop(0, 'rgba(0, 151, 167, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 151, 167, 0)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(points[0].x, height - padding.bottom);
            points.forEach(p => ctx.lineTo(p.x, p.y));
            ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
            ctx.closePath();
            ctx.fill();
        }
        
        ctx.strokeStyle = this.colors.primary;
        ctx.lineWidth = 2;
        ctx.beginPath();
        points.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        
        points.forEach(p => {
            ctx.fillStyle = this.colors.secondary;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#0a0e27';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
        
        container.appendChild(canvas);
        return canvas;
    },
    
    renderPieChart(container, data, options = {}) {
        const {
            size = Math.min(container.clientWidth || 200, 200),
            showLegend = true
        } = options;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'pie-chart-wrapper';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '20px';
        
        const canvas = document.createElement('canvas');
        canvas.width = size * 2;
        canvas.height = size * 2;
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
        
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);
        
        const total = data.reduce((sum, d) => sum + d.value, 0);
        const colors = [
            this.colors.primary,
            this.colors.secondary,
            this.colors.accent,
            this.colors.success,
            this.colors.warning,
            this.colors.danger
        ];
        
        let startAngle = -Math.PI / 2;
        
        data.forEach((item, index) => {
            const sliceAngle = (item.value / total) * Math.PI * 2;
            
            ctx.fillStyle = colors[index % colors.length];
            ctx.beginPath();
            ctx.moveTo(size / 2, size / 2);
            ctx.arc(size / 2, size / 2, size / 2 - 10, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            
            startAngle += sliceAngle;
        });
        
        ctx.fillStyle = '#0a0e27';
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = this.colors.text;
        ctx.font = 'bold 16px Orbitron';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.formatNumber(total), size / 2, size / 2);
        
        wrapper.appendChild(canvas);
        
        if (showLegend) {
            const legend = document.createElement('div');
            legend.className = 'pie-legend';
            legend.style.display = 'flex';
            legend.style.flexDirection = 'column';
            legend.style.gap = '8px';
            
            data.forEach((item, index) => {
                const itemEl = document.createElement('div');
                itemEl.style.display = 'flex';
                itemEl.style.alignItems = 'center';
                itemEl.style.gap = '8px';
                itemEl.style.fontSize = '12px';
                itemEl.style.color = this.colors.textSec;
                
                const dot = document.createElement('span');
                dot.style.width = '10px';
                dot.style.height = '10px';
                dot.style.borderRadius = '50%';
                dot.style.background = colors[index % colors.length];
                
                const label = document.createElement('span');
                label.textContent = `${item.label}: ${this.formatNumber(item.value)} (${((item.value / total) * 100).toFixed(1)}%)`;
                
                itemEl.appendChild(dot);
                itemEl.appendChild(label);
                legend.appendChild(itemEl);
            });
            
            wrapper.appendChild(legend);
        }
        
        container.appendChild(wrapper);
        return wrapper;
    },
    
    renderStatsDashboard(container, articleData) {
        const dashboard = document.createElement('div');
        dashboard.className = 'stats-dashboard';
        dashboard.innerHTML = `
            <div class="dashboard-header">
                <h3>📈 数据分析仪表盘</h3>
                <span class="dashboard-time">最后更新: ${new Date().toLocaleDateString('zh-CN')}</span>
            </div>
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="card-title">📊 文章分类分布</div>
                    <div class="card-content" id="categoryChart"></div>
                </div>
                <div class="dashboard-card">
                    <div class="card-title">📈 阅读量趋势</div>
                    <div class="card-content" id="trendChart"></div>
                </div>
                <div class="dashboard-card">
                    <div class="card-title">🏆 热门文章TOP5</div>
                    <div class="card-content" id="topArticles"></div>
                </div>
                <div class="dashboard-card">
                    <div class="card-title">⏱️ 难度分布</div>
                    <div class="card-content" id="difficultyChart"></div>
                </div>
            </div>
        `;
        
        container.appendChild(dashboard);
        
        this.renderCategoryChart(dashboard.querySelector('#categoryChart'), articleData);
        this.renderTrendChart(dashboard.querySelector('#trendChart'), articleData);
        this.renderTopArticles(dashboard.querySelector('#topArticles'), articleData);
        this.renderDifficultyChart(dashboard.querySelector('#difficultyChart'), articleData);
        
        return dashboard;
    },
    
    renderCategoryChart(container, articleData) {
        const categories = {};
        articleData.articles.forEach(article => {
            categories[article.category] = (categories[article.category] || 0) + 1;
        });
        
        const data = Object.entries(categories).map(([label, value]) => ({ label, value }));
        this.renderPieChart(container, data, { size: 150 });
    },
    
    renderTrendChart(container, articleData) {
        const sortedArticles = [...articleData.articles]
            .sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate))
            .slice(-6);
        
        const data = sortedArticles.map(article => ({
            label: article.publishDate.slice(5),
            value: article.stats.views
        }));
        
        this.renderLineChart(container, data, { height: 150 });
    },
    
    renderTopArticles(container, articleData) {
        const topArticles = [...articleData.articles]
            .sort((a, b) => b.stats.views - a.stats.views)
            .slice(0, 5);
        
        const list = document.createElement('div');
        list.className = 'top-articles-list';
        list.style.display = 'flex';
        list.style.flexDirection = 'column';
        list.style.gap = '10px';
        
        topArticles.forEach((article, index) => {
            const item = document.createElement('div');
            item.className = 'top-article-item';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.gap = '10px';
            item.style.padding = '8px 12px';
            item.style.background = 'rgba(100, 255, 218, 0.05)';
            item.style.borderRadius = '8px';
            item.style.fontSize = '12px';
            
            const rank = document.createElement('span');
            rank.style.width = '20px';
            rank.style.height = '20px';
            rank.style.borderRadius = '50%';
            rank.style.display = 'flex';
            rank.style.alignItems = 'center';
            rank.style.justifyContent = 'center';
            rank.style.fontWeight = 'bold';
            rank.style.background = index < 3 ? this.colors.warning : this.colors.textSec;
            rank.style.color = '#0a0e27';
            rank.textContent = index + 1;
            
            const title = document.createElement('span');
            title.style.flex = '1';
            title.style.color = this.colors.text;
            title.style.overflow = 'hidden';
            title.style.textOverflow = 'ellipsis';
            title.style.whiteSpace = 'nowrap';
            title.textContent = article.title;
            
            const views = document.createElement('span');
            views.style.color = this.colors.secondary;
            views.style.fontFamily = 'Orbitron';
            views.textContent = this.formatNumber(article.stats.views);
            
            item.appendChild(rank);
            item.appendChild(title);
            item.appendChild(views);
            list.appendChild(item);
        });
        
        container.appendChild(list);
    },
    
    renderDifficultyChart(container, articleData) {
        const difficulties = { '初级': 0, '中级': 0, '高级': 0 };
        articleData.articles.forEach(article => {
            difficulties[article.difficulty] = (difficulties[article.difficulty] || 0) + 1;
        });
        
        const data = Object.entries(difficulties)
            .filter(([_, value]) => value > 0)
            .map(([label, value]) => ({ label, value }));
        
        this.renderBarChart(container, data, { height: 150 });
    },
    
    formatNumber(num) {
        if (num >= 10000) return (num / 10000).toFixed(1) + 'w';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataViz;
}
