// EXPLORE-Bench项目页面JavaScript交互

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initializeNavigation();
    initializeAnimations();
    initializeDataVisualization();
    initializeLeaderboard();
    initializeImageModal();
    initializeCopyButtons();
    initializeCarousel();

    // 模拟数据加载（实际项目中替换为真实数据）
    loadBenchmarkData();
});

/**
 * 初始化导航功能
 */
function initializeNavigation() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'var(--card-background)';
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });
}

/**
 * 初始化动画效果
 */
function initializeAnimations() {
    // 使用Intersection Observer实现滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.section, .stat-card, .task-card, .finding-card').forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
    
    // 添加CSS动画类
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

/**
 * 初始化数据可视化
 */
function initializeDataVisualization() {
    // 实际项目中，这里应该使用Chart.js或其他图表库创建真实图表
    // 以下为示例代码
    
    // 临时图表：Temporal Distribution
    const temporalChart = document.getElementById('temporalChart');
    if (temporalChart) {
        temporalChart.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="background: linear-gradient(135deg, #3498db, #2ecc71); height: 200px; border-radius: 10px; display: flex; align-items: flex-end; justify: center; gap: 1rem; padding: 1rem;">
                    <div style="background: #e74c3c; width: 60px; height: 120px; border-radius: 5px;"></div>
                    <div style="background: #f39c12; width: 60px; height: 160px; border-radius: 5px;"></div>
                    <div style="background: #9b59b6; width: 60px; height: 90px; border-radius: 5px;"></div>
                </div>
                <p style="margin-top: 1rem;">Temporal Distribution Chart (Placeholder)</p>
            </div>
        `;
    }
    
    // 临时图表：Category Distribution
    const categoryChart = document.getElementById('categoryChart');
    if (categoryChart) {
        categoryChart.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="background: linear-gradient(135deg, #9b59b6, #3498db); height: 200px; border-radius: 10px; display: flex; align-items: center; justify-content: space-around; padding: 1rem;">
                    <div style="width: 80px; height: 80px; background: #e74c3c; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">OSR</div>
                    <div style="width: 80px; height: 80px; background: #f39c12; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">OLR</div>
                    <div style="width: 80px; height: 80px; background: #2ecc71; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">ORE</div>
                </div>
                <p style="margin-top: 1rem;">Category Distribution Chart (Placeholder)</p>
            </div>
        `;
    }
    
    // 性能图表
    const performanceChart = document.getElementById('performanceChart');
    if (performanceChart) {
        performanceChart.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="background: linear-gradient(135deg, #2c3e50, #4a6741); height: 300px; border-radius: 10px; display: flex; align-items: flex-end; justify: space-around; padding: 2rem;">
                    <div style="background: #3498db; width: 100px; height: 200px; border-radius: 5px; position: relative;">
                        <div style="position: absolute; bottom: -30px; width: 100%; text-align: center; font-size: 0.8rem;">GPT-4o</div>
                    </div>
                    <div style="background: #2ecc71; width: 100px; height: 160px; border-radius: 5px; position: relative;">
                        <div style="position: absolute; bottom: -30px; width: 100%; text-align: center; font-size: 0.8rem;">Gemini-2.0</div>
                    </div>
                    <div style="background: #e74c3c; width: 100px; height: 140px; border-radius: 5px; position: relative;">
                        <div style="position: absolute; bottom: -30px; width: 100%; text-align: center; font-size: 0.8rem;">InternVL</div>
                    </div>
                </div>
                <p style="margin-top: 1rem;">Performance Comparison Chart (Placeholder)</p>
            </div>
        `;
    }
}

/**
 * 初始化排行榜
 */
function initializeLeaderboard() {
    // 示例数据（实际项目中从JSON文件或API加载）
    const leaderboardData = [
        {
            rank: 1,
            method: "GPT-4o 🥇",
            input: "32f",
            mean: 61.83,
            past: { osr: 71.93, olr: 46.56, ore: 34.46, atp: 54.91, mean: 66.04 },
            present: { isr: 71.46, or: 52.85, pfi: 78.18, ap: 62.75, mean: 67.32 },
            future: { tmp: 69.61, scp: 68.69, drp: 68.97, mean: 69.11 }
        },
        {
            rank: 2,
            method: "Gemini-2.0-flash 🥈",
            input: "32f",
            mean: 57.38,
            past: { osr: 65.10, olr: 32.56, ore: 28.60, atp: 47.87, mean: 63.46 },
            present: { isr: 68.84, or: 57.52, pfi: 69.68, ap: 65.69, mean: 65.95 },
            future: { tmp: 58.54, scp: 64.02, drp: 57.95, mean: 60.75 }
        },
        {
            rank: 3,
            method: "InternVL2.5-78B 🥉",
            input: "32f",
            mean: 52.33,
            past: { osr: 63.96, olr: 33.15, ore: 12.01, atp: 41.35, mean: 53.46 },
            present: { isr: 66.67, or: 50.74, pfi: 67.10, ap: 52.94, mean: 61.72 },
            future: { tmp: 67.80, scp: 50.47, drp: 54.55, mean: 58.19 }
        }
    ];
    
    // 填充排行榜表格
    populateLeaderboardTable(leaderboardData);
    
    // 排序功能
    const sortButton = document.getElementById('sortTableBtn');
    if (sortButton) {
        sortButton.addEventListener('click', function() {
            const sortedData = [...leaderboardData].sort((a, b) => b.mean - a.mean);
            populateLeaderboardTable(sortedData);
        });
    }
}

/**
 * 填充排行榜表格
 */
function populateLeaderboardTable(data) {
    const tableBody = document.getElementById('leaderboardBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        // 根据排名设置背景色
        if (item.rank === 1) row.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
        else if (item.rank === 2) row.style.backgroundColor = 'rgba(192, 192, 192, 0.1)';
        else if (item.rank === 3) row.style.backgroundColor = 'rgba(205, 127, 50, 0.1)';
        
        row.innerHTML = `
            <td><strong>${item.rank}</strong></td>
            <td><strong>${item.method}</strong></td>
            <td>${item.input}</td>
            <td><strong>${item.mean.toFixed(2)}</strong></td>
            <td>${item.past.osr.toFixed(2)}</td>
            <td>${item.past.olr.toFixed(2)}</td>
            <td>${item.past.ore.toFixed(2)}</td>
            <td>${item.past.atp.toFixed(2)}</td>
            <td>${item.past.mean.toFixed(2)}</td>
            <td>${item.present.isr.toFixed(2)}</td>
            <td>${item.present.or.toFixed(2)}</td>
            <td>${item.present.pfi.toFixed(2)}</td>
            <td>${item.present.ap.toFixed(2)}</td>
            <td>${item.present.mean.toFixed(2)}</td>
            <td>${item.future.tmp.toFixed(2)}</td>
            <td>${item.future.scp.toFixed(2)}</td>
            <td>${item.future.drp.toFixed(2)}</td>
            <td>${item.future.mean.toFixed(2)}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

/**
 * 初始化图片模态框
 */
function initializeImageModal() {
    // 获取所有可点击的图片
    const images = document.querySelectorAll('.teaser-image img, .annotation-diagram img, .evaluation-diagram img, .experiment-figure img');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeBtn = document.querySelector('.close');
    
    if (!modal) return;
    
    // 点击图片打开模态框
    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            
            // 获取图片标题
            const caption = this.parentElement.querySelector('.figure-caption');
            if (caption) {
                modalCaption.innerHTML = caption.textContent;
            } else {
                modalCaption.innerHTML = this.alt || 'Image preview';
            }
        });
    });
    
    // 关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击模态框背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // 键盘关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

/**
 * 初始化复制按钮
 */
function initializeCopyButtons() {
    const copyButton = document.getElementById('copyBibtex');

    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const bibtexCode = document.querySelector('.citation-box pre code').textContent;

            navigator.clipboard.writeText(bibtexCode).then(() => {
                // 显示复制成功提示
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyButton.style.backgroundColor = '#2ecc71';

                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                    copyButton.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }
}

/**
 * 初始化轮播图
 */
function initializeCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');

    let currentIndex = 0;
    const slideCount = slides.length;

    // 更新轮播位置
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // 更新指示器状态
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }

    // 跳转到指定幻灯片
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // 绑定按钮事件
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // 绑定指示器事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // 触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // 键盘支持
    document.addEventListener('keydown', (e) => {
        // 检查轮播是否在视口中
        const rect = carousel.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });

    // 自动播放（可选，默认关闭）
    // setInterval(nextSlide, 5000);
}

/**
 * 加载基准数据
 */
function loadBenchmarkData() {
    // 模拟数据加载动画
    const stats = [
        { id: 'instances', value: 1157, suffix: '' },
        { id: 'actions', value: 113, suffix: '' },
        { id: 'objects', value: 20, suffix: '' },
        { id: 'scenarios', value: 12, suffix: '' }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (element) {
            animateValue(element, 0, stat.value, 2000, stat.suffix);
        }
    });
}

/**
 * 数字动画效果
 */
function animateValue(element, start, end, duration, suffix = '') {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current + suffix;
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

/**
 * 额外的实用功能
 */
// 滚动到顶部功能
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 创建回到顶部按钮
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        font-size: 1.2rem;
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    // 显示/隐藏逻辑
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', scrollToTop);
}

// 初始化回到顶部按钮
document.addEventListener('DOMContentLoaded', createBackToTopButton);
