// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // 搜索标签切换
    const searchTabs = document.querySelectorAll('.search-tab');
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有active类
            searchTabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的添加active类
            this.classList.add('active');
            
            // 这里可以添加搜索类型切换的逻辑
            const searchType = this.dataset.type;
            console.log('切换搜索类型:', searchType);
        });
    });
    
    // 搜索功能
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.querySelector('.search-section input');
    
    function performSearch() {
        const query = searchInput.value.trim();
        const activeTab = document.querySelector('.search-tab.active');
        const searchType = activeTab ? activeTab.dataset.type : 'all';
        
        if (query) {
            console.log(`搜索: ${query}, 类型: ${searchType}`);
            // 这里添加实际的搜索逻辑
            alert(`搜索"${query}"，类型：${searchType}`);
        } else {
            alert('请输入搜索关键词');
        }
    }
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 统计数字动画
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(number => {
            const target = parseInt(number.dataset.target);
            const increment = target / 100;
            let current = 0;
            
            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    
                    // 格式化数字显示
                    if (target >= 1000000) {
                        number.textContent = (current / 1000000).toFixed(1) + 'M+';
                    } else if (target >= 1000) {
                        number.textContent = (current / 1000).toFixed(0) + 'K+';
                    } else {
                        number.textContent = Math.floor(current);
                    }
                    
                    if (current < target) {
                        requestAnimationFrame(updateNumber);
                    }
                }
            };
            
            updateNumber();
        });
    }
    
    // 使用Intersection Observer API来触发数字动画
    const statsSection = document.querySelector('.stats-box');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 页面滚动时的导航栏效果
    let lastScrollTop = 0;
    const mainNav = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏导航栏
            mainNav.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            mainNav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 加载更多动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.content-section, .sidebar-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(section);
    });
    
    // 资源卡片悬停效果增强
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 模拟数据加载
    function loadRecommendations() {
        // 这里可以添加AJAX请求来获取推荐数据
        console.log('加载推荐数据...');
    }
    
    function loadNews() {
        // 这里可以添加AJAX请求来获取新闻数据
        console.log('加载新闻数据...');
    }
    
    // 页面加载完成后加载数据
    setTimeout(() => {
        loadRecommendations();
        loadNews();
    }, 1000);
    
    // 错误处理
    window.addEventListener('error', function(e) {
        console.error('页面错误:', e.error);
    });
    
    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭搜索焦点
        if (e.key === 'Escape') {
            searchInput.blur();
        }
        
        // Ctrl+K 快速聚焦搜索框
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
});

// 工具函数
const utils = {
    // 格式化日期
    formatDate: function(date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(date).toLocaleDateString('zh-CN', options);
    },
    
    // 防抖函数
    debounce: function(func, wait) {
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
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// 导出到全局作用域（如果需要）
window.LibraryApp = {
    utils: utils
};
