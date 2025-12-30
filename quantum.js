/**
 * Project Quantum Leap - Main JavaScript
 * Ather Energy Strategic Transformation Blueprint
 * Team: Excel-lent Minds
 */

// EMERGENCY LOADER DISMISSAL - Runs IMMEDIATELY, before any other code
// This guarantees the loading screen will hide even if other code fails
(function emergencyLoaderDismissal() {
    const hideLoader = () => {
        const loader = document.getElementById('loadingScreen');
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            console.log('EMERGENCY: Loading screen dismissed by fallback');
        }
    };

    // Hide after 4 seconds no matter what
    setTimeout(hideLoader, 4000);

    // Also try when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 2000));
    } else {
        setTimeout(hideLoader, 2000);
    }
})();

class QuantumLeap {
    constructor() {
        this.charts = {};
        this.moleScore = 0;
        this.moleGameActive = false;
        this.konamiCode = [];
        this.konamiTarget = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.typedText = '';

        this.init();
    }

    init() {
        // Hide loading screen with multiple fallback mechanisms
        let loadingHidden = false;

        const hideLoadingScreen = () => {
            if (loadingHidden) return;
            loadingHidden = true;
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            this.startAnimations();
        };

        // Primary: Hide after window fully loads
        window.addEventListener('load', () => {
            setTimeout(hideLoadingScreen, 1000);
        });

        // Fallback 1: If DOMContentLoaded fires but load doesn't, hide after 3 seconds
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(hideLoadingScreen, 3000);
            });
        } else {
            // DOM is already loaded
            setTimeout(hideLoadingScreen, 3000);
        }

        // Fallback 2: Absolute timeout - always hide after 5 seconds no matter what
        setTimeout(hideLoadingScreen, 5000);

        this.setupScrollEffects();
        this.setupKPIRibbon();
        this.initCharts();
        this.setupGalaxy();
        this.setupMoleGame();
        this.setupBubbleverse();
        this.setupPyramidSlider();
        this.setupRocketAnimation();
        this.setupGeographicMap();
        this.setupChessBoard();
        this.setupRiskMatrix();
        this.setupStargate();
        this.setupEasterEggs();
        this.setupFadeInAnimations();
        this.setupThemeToggle();
    }

    setupThemeToggle() {
        const themeBtn = document.getElementById('navThemeBtn');
        if (themeBtn) {
            // Check local storage
            if (localStorage.getItem('theme') === 'light') {
                document.body.classList.add('light-mode');
                themeBtn.textContent = '☀️';
            }

            themeBtn.addEventListener('click', () => {
                document.body.classList.toggle('light-mode');
                const isLight = document.body.classList.contains('light-mode');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                themeBtn.textContent = isLight ? '☀️' : '🌙';
            });
        }
    }

    // ===== SCROLL EFFECTS =====
    setupScrollEffects() {
        // Scroll progress bar
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            document.getElementById('scrollProgress').style.width = scrollPercent + '%';
        });

        // GSAP ScrollTrigger setup
        gsap.registerPlugin(ScrollTrigger);

        // Fade in sections
        gsap.utils.toArray('.section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Hero scooter parallax
        gsap.to('.scooter-3d', {
            rotationY: 360,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // Cost tags stagger animation
        gsap.from('.cost-tag', {
            opacity: 0,
            scale: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: 1.5
        });

        // Waterfall chart animation on scroll
        ScrollTrigger.create({
            trigger: '#waterfall',
            start: 'top 60%',
            onEnter: () => {
                document.getElementById('cashFlowBar').style.width = '100%';
            }
        });
    }

    // ===== KPI RIBBON =====
    setupKPIRibbon() {
        const ribbon = document.getElementById('kpiRibbon');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                ribbon.classList.add('visible');
            } else {
                ribbon.classList.remove('visible');
            }
        });

        // Update KPIs based on scroll position (simulating live updates)
        ScrollTrigger.create({
            trigger: '#pyramid',
            start: 'top center',
            onEnter: () => this.updateKPIs('mid'),
            onLeaveBack: () => this.updateKPIs('start')
        });

        ScrollTrigger.create({
            trigger: '#stargate',
            start: 'top center',
            onEnter: () => this.updateKPIs('end'),
            onLeaveBack: () => this.updateKPIs('mid')
        });
    }

    updateKPIs(stage) {
        const kpis = {
            start: { units: 65595, revenue: 1154, ebitda: -13.4, cash: 0 },
            mid: { units: 180000, revenue: 3200, ebitda: -5.2, cash: 450 },
            end: { units: 340000, revenue: 5880, ebitda: 2.5, cash: 1314 }
        };

        const data = kpis[stage];

        // Animate odometer values
        document.getElementById('kpiUnits').innerHTML = data.units.toLocaleString();
        document.getElementById('kpiRevenue').innerHTML = data.revenue.toLocaleString();
        document.getElementById('kpiEbitda').innerHTML = data.ebitda.toFixed(1);
        document.getElementById('kpiCash').innerHTML = data.cash.toLocaleString();
    }

    // ===== CHARTS =====
    initCharts() {
        this.initRevenueChart();
        this.initMarketShareChart();
        this.initCostWaterfallChart();
        this.initMainWaterfallChart();
    }

    initRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['FY22', 'FY23', 'FY24', 'FY25', 'FY26E', 'FY27E'],
                datasets: [
                    {
                        label: 'Revenue (₹ Cr)',
                        data: [409, 784, 1412, 1960, 3200, 5880],
                        borderColor: '#00E5FF',
                        backgroundColor: 'rgba(0, 229, 255, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Net Loss (₹ Cr)',
                        data: [-344, -648, -1060, -154, -80, 50],
                        borderColor: '#E17055',
                        backgroundColor: 'rgba(225, 112, 85, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#B2BEC3' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#B2BEC3' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: {
                        ticks: { color: '#B2BEC3' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        });
    }

    initMarketShareChart() {
        const ctx = document.getElementById('marketShareChart');
        if (!ctx) return;

        this.charts.marketShare = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ola', 'TVS', 'Ather', 'Bajaj', 'Hero'],
                datasets: [{
                    label: 'Market Share %',
                    data: [25, 22, 12, 18, 8],
                    backgroundColor: [
                        '#FBBF24',
                        '#3B82F6',
                        '#00E5FF',
                        '#8B5CF6',
                        '#EF4444'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        ticks: { color: '#B2BEC3' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    y: {
                        ticks: { color: '#B2BEC3' },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    initCostWaterfallChart() {
        const ctx = document.getElementById('costWaterfallChart');
        if (!ctx) return;

        this.charts.costWaterfall = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Battery', 'Motor', 'Controller', 'Chassis', 'Assembly', 'Overhead'],
                datasets: [{
                    label: 'Cost (₹)',
                    data: [45000, 18000, 12000, 22000, 8000, 15000],
                    backgroundColor: [
                        '#00E5FF',
                        '#6CC24A',
                        '#3B82F6',
                        '#8B5CF6',
                        '#FBBF24',
                        '#E17055'
                    ],
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `₹${context.raw.toLocaleString()}`
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#B2BEC3' },
                        grid: { display: false }
                    },
                    y: {
                        ticks: {
                            color: '#B2BEC3',
                            callback: (value) => '₹' + value / 1000 + 'K'
                        },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        });
    }

    initMainWaterfallChart() {
        const ctx = document.getElementById('waterfallChart');
        if (!ctx) return;

        this.charts.mainWaterfall = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Current EBITDA', 'Volume', 'Mix', 'Cost Savings', 'B2B', 'Data Revenue', 'Target EBITDA'],
                datasets: [{
                    label: 'EBITDA Impact',
                    data: [-13.4, 4.2, 2.8, 3.5, 2.9, 2.5, 2.5],
                    backgroundColor: [
                        '#E17055',
                        '#6CC24A',
                        '#6CC24A',
                        '#6CC24A',
                        '#6CC24A',
                        '#6CC24A',
                        '#00E5FF'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => `${context.raw > 0 ? '+' : ''}${context.raw}%`
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#B2BEC3' },
                        grid: { display: false }
                    },
                    y: {
                        ticks: {
                            color: '#B2BEC3',
                            callback: (value) => value + '%'
                        },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    }
                }
            }
        });
    }

    // ===== GALAXY VISUALIZATION =====
    setupGalaxy() {
        const canvas = document.getElementById('galaxyCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const container = document.getElementById('galaxyContainer');

        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        const stars = [
            { x: 0.2, y: 0.3, type: 'product', label: 'Rizta Lite', investment: '₹180 Cr', roi: '2.8x', timeline: 'Q2 FY26' },
            { x: 0.7, y: 0.25, type: 'profit', label: 'Supply Chain', investment: '₹252 Cr', roi: '3.2x', timeline: 'Q4 FY26' },
            { x: 0.5, y: 0.5, type: 'partnership', label: 'Fleet Partners', investment: '₹120 Cr', roi: '4.1x', timeline: 'Q3 FY26' },
            { x: 0.3, y: 0.7, type: 'product', label: 'Fleet Pro', investment: '₹95 Cr', roi: '2.5x', timeline: 'Q1 FY27' },
            { x: 0.8, y: 0.6, type: 'profit', label: 'Data Platform', investment: '₹52 Cr', roi: '4.5x', timeline: 'Q2 FY27' },
            { x: 0.15, y: 0.5, type: 'partnership', label: 'Franchise Model', investment: '₹45 Cr', roi: '3.8x', timeline: 'Q3 FY26' },
            { x: 0.6, y: 0.8, type: 'product', label: 'AtherStack Pro', investment: '₹68 Cr', roi: '3.0x', timeline: 'Q4 FY26' },
            { x: 0.85, y: 0.35, type: 'partnership', label: 'Insurance API', investment: '₹22 Cr', roi: '5.2x', timeline: 'Q1 FY27' }
        ];

        const colors = {
            product: '#3B82F6',
            profit: '#6CC24A',
            partnership: '#FBBF24'
        };

        let hoveredStar = null;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connection lines
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.lineWidth = 1;
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x * canvas.width, stars[i].y * canvas.height);
                    ctx.lineTo(stars[j].x * canvas.width, stars[j].y * canvas.height);
                    ctx.stroke();
                }
            }

            // Draw stars
            stars.forEach((star, index) => {
                const x = star.x * canvas.width;
                const y = star.y * canvas.height;
                const radius = hoveredStar === index ? 25 : 15;

                // Glow
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
                gradient.addColorStop(0, colors[star.type]);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
                ctx.fill();

                // Core
                ctx.fillStyle = colors[star.type];
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();

                // Label on hover
                if (hoveredStar === index) {
                    ctx.fillStyle = '#FFFFFF';
                    ctx.font = '14px Inter';
                    ctx.textAlign = 'center';
                    ctx.fillText(star.label, x, y + radius + 25);

                    // Popover
                    ctx.fillStyle = 'rgba(13, 27, 30, 0.95)';
                    ctx.strokeStyle = '#00E5FF';
                    ctx.lineWidth = 2;
                    const boxWidth = 180;
                    const boxHeight = 80;
                    const boxX = x - boxWidth / 2;
                    const boxY = y + radius + 35;

                    ctx.beginPath();
                    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 8);
                    ctx.fill();
                    ctx.stroke();

                    ctx.fillStyle = '#B2BEC3';
                    ctx.font = '12px Inter';
                    ctx.textAlign = 'left';
                    ctx.fillText(`Investment: ${star.investment}`, boxX + 12, boxY + 25);
                    ctx.fillText(`ROI: ${star.roi}`, boxX + 12, boxY + 45);
                    ctx.fillText(`Timeline: ${star.timeline}`, boxX + 12, boxY + 65);
                }
            });
        };

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            hoveredStar = null;
            stars.forEach((star, index) => {
                const x = star.x * canvas.width;
                const y = star.y * canvas.height;
                const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
                if (dist < 20) {
                    hoveredStar = index;
                }
            });
            draw();
        });

        draw();

        window.addEventListener('resize', () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
            draw();
        });
    }

    // ===== WHACK-A-MOLE GAME =====
    setupMoleGame() {
        const startBtn = document.getElementById('startMoleGame');
        const holes = document.querySelectorAll('.mole-hole');

        if (!startBtn) return;

        startBtn.addEventListener('click', () => {
            if (this.moleGameActive) return;
            this.startMoleGame();
        });

        holes.forEach(hole => {
            hole.addEventListener('click', () => {
                if (!this.moleGameActive) return;

                const mole = hole.querySelector('.mole');
                if (mole.classList.contains('active') && !mole.classList.contains('hit')) {
                    mole.classList.add('hit');
                    const savings = parseInt(hole.dataset.savings);
                    this.moleScore += savings;
                    document.getElementById('moleScore').textContent = this.moleScore;

                    // Sound effect placeholder
                    this.playSound('hit');
                }
            });
        });
    }

    startMoleGame() {
        this.moleGameActive = true;
        this.moleScore = 0;
        document.getElementById('moleScore').textContent = '0';

        const holes = document.querySelectorAll('.mole-hole');
        const moles = document.querySelectorAll('.mole');

        // Reset all moles
        moles.forEach(mole => {
            mole.classList.remove('active', 'hit');
        });

        let molesShown = 0;
        const maxMoles = 10;

        const showMole = () => {
            if (molesShown >= maxMoles) {
                this.moleGameActive = false;
                this.showGameResult();
                return;
            }

            const randomHole = holes[Math.floor(Math.random() * holes.length)];
            const mole = randomHole.querySelector('.mole');

            if (!mole.classList.contains('hit')) {
                mole.classList.add('active');
                molesShown++;

                setTimeout(() => {
                    mole.classList.remove('active');
                }, 1500);
            }

            setTimeout(showMole, 800 + Math.random() * 600);
        };

        showMole();
    }

    showGameResult() {
        const tooltip = document.createElement('div');
        tooltip.className = 'glass-card';
        tooltip.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 2rem; text-align: center; z-index: 1000;';
        tooltip.innerHTML = `
            <h3 style="color: var(--electric-cyan); margin-bottom: 1rem;">Game Over!</h3>
            <p style="margin-bottom: 1rem;">You identified savings of</p>
            <div class="mono" style="font-size: 2.5rem; color: var(--ather-green);">₹${this.moleScore} Cr</div>
            <p style="color: var(--text-secondary); margin-top: 1rem;">out of ₹616 Cr potential</p>
            <button onclick="this.parentElement.remove()" style="margin-top: 1.5rem; padding: 0.75rem 2rem; background: var(--electric-cyan); color: var(--bg-primary); border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600;">Close</button>
        `;
        document.body.appendChild(tooltip);
    }

    // ===== BUBBLEVERSE =====
    setupBubbleverse() {
        const canvas = document.getElementById('bubbleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;

        canvas.width = container.offsetWidth - 300;
        canvas.height = 500;

        const bubbles = [
            { x: 0.2, y: 0.3, size: 50, label: 'Supply Chain', fy25: '₹120 Cr', fy27: '₹252 Cr', roi: '3.2x', complexity: 'medium' },
            { x: 0.5, y: 0.5, size: 70, label: 'Fleet Business', fy25: '₹45 Cr', fy27: '₹280 Cr', roi: '4.1x', complexity: 'high' },
            { x: 0.7, y: 0.25, size: 40, label: 'Data Platform', fy25: '₹22 Cr', fy27: '₹150 Cr', roi: '4.5x', complexity: 'low' },
            { x: 0.3, y: 0.7, size: 55, label: 'Manufacturing', fy25: '₹180 Cr', fy27: '₹350 Cr', roi: '2.8x', complexity: 'high' },
            { x: 0.8, y: 0.6, size: 35, label: 'Franchise Rollout', fy25: '₹15 Cr', fy27: '₹85 Cr', roi: '3.8x', complexity: 'medium' }
        ];

        const colors = {
            low: '#6CC24A',
            medium: '#FBBF24',
            high: '#E17055'
        };

        let selectedBubble = null;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            bubbles.forEach((bubble, index) => {
                const x = bubble.x * canvas.width;
                const y = bubble.y * canvas.height;
                const radius = bubble.size;

                // 3D effect
                const gradient = ctx.createRadialGradient(x - radius / 3, y - radius / 3, 0, x, y, radius);
                gradient.addColorStop(0, 'rgba(255,255,255,0.3)');
                gradient.addColorStop(0.5, colors[bubble.complexity]);
                gradient.addColorStop(1, 'rgba(0,0,0,0.2)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();

                // Border
                if (selectedBubble === index) {
                    ctx.strokeStyle = '#00E5FF';
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }

                // Label
                ctx.fillStyle = '#FFFFFF';
                ctx.font = 'bold 12px Inter';
                ctx.textAlign = 'center';
                ctx.fillText(bubble.label, x, y + 4);
            });
        };

        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            bubbles.forEach((bubble, index) => {
                const x = bubble.x * canvas.width;
                const y = bubble.y * canvas.height;
                const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);

                if (dist < bubble.size) {
                    selectedBubble = index;
                    this.showBubbleDetails(bubble);
                    draw();
                }
            });
        });

        draw();
    }

    showBubbleDetails(bubble) {
        const panel = document.getElementById('bubbleSidePanel');
        document.getElementById('bubbleTitle').textContent = bubble.label;
        document.getElementById('bubbleFY25').textContent = bubble.fy25;
        document.getElementById('bubbleFY27').textContent = bubble.fy27;
        document.getElementById('bubbleROI').textContent = bubble.roi;
        panel.style.opacity = '1';
    }

    // ===== PYRAMID SLIDER =====
    setupPyramidSlider() {
        const slider = document.getElementById('timeSlider');
        if (!slider) return;

        const metrics = {
            0: { volume: '65,600', asp: '₹1,08,000', margin: '-13.4%', profit: '-₹154 Cr', apex: 30, core: 50, fleet: 20 },
            50: { volume: '180,000', asp: '₹98,000', margin: '-5.2%', profit: '-₹85 Cr', apex: 20, core: 55, fleet: 25 },
            100: { volume: '340,000', asp: '₹88,000', margin: '+2.5%', profit: '+₹628 Cr', apex: 15, core: 50, fleet: 35 }
        };

        slider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            let data;

            if (value <= 25) data = metrics[0];
            else if (value <= 75) data = metrics[50];
            else data = metrics[100];

            document.getElementById('metricVolume').textContent = data.volume;
            document.getElementById('metricASP').textContent = data.asp;
            document.getElementById('metricMargin').textContent = data.margin;
            document.getElementById('metricMargin').className = data.margin.includes('-') ? 'mono text-orange' : 'mono text-green';
            document.getElementById('metricProfit').textContent = data.profit;
            document.getElementById('metricProfit').className = data.profit.includes('-') ? 'mono text-orange' : 'mono text-green';

            // Animate pyramid layers
            document.getElementById('pyramidApex').style.width = data.apex + '%';
            document.getElementById('pyramidCore').style.width = data.core + '%';
            document.getElementById('pyramidFleet').style.width = (data.fleet + 55) + '%';

            // Update tooltip
            const tooltip = document.getElementById('pyramidTooltip');
            if (value >= 75) {
                tooltip.innerHTML = '<strong style="color: var(--ather-green);">✓ Volume up 420%, margin swing +15.9pp, absolute profit +₹782 Cr</strong>';
            } else if (value >= 25) {
                tooltip.innerHTML = 'Moving towards mass-market focus. Fleet segment expanding...';
            } else {
                tooltip.innerHTML = 'Current state: Premium-heavy mix with negative margins';
            }
        });
    }

    // ===== ROCKET ANIMATION =====
    setupRocketAnimation() {
        const rocket = document.getElementById('rocket');
        const stages = document.querySelectorAll('.stage-label');

        if (!rocket) return;

        ScrollTrigger.create({
            trigger: '#rocket',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const topPosition = 80 - (progress * 65);
                rocket.style.top = topPosition + '%';

                // Show stage labels
                stages.forEach((stage, index) => {
                    const threshold = (index + 1) * 0.33;
                    if (progress > threshold - 0.1) {
                        stage.classList.add('visible');
                    } else {
                        stage.classList.remove('visible');
                    }
                });
            }
        });
    }

    // ===== ENHANCED GEOGRAPHIC MAP =====
    setupGeographicMap() {
        const tabCurrent = document.getElementById('tabCurrent');
        const tabFuture = document.getElementById('tabFuture');
        const panelCurrent = document.getElementById('panelCurrent');
        const panelCulture = document.getElementById('panelCulture');
        const panelFuture = document.getElementById('panelFuture');
        const panelFacts = document.getElementById('panelFacts');
        const cityMarkers = document.querySelectorAll('.city-marker');
        const indiaMap = document.getElementById('indiaMapEnhanced');

        if (!tabCurrent || !tabFuture) return;

        // Current state data for cities
        const cityData = {
            'Bangalore': {
                units: '17,500',
                growth: '+24%',
                centers: 35,
                chargers: 420,
                future: { units: '52,000', growth: '+197%', centers: 85, chargers: 950 }
            },
            'Delhi': {
                units: '12,400',
                growth: '+18%',
                centers: 28,
                chargers: 310,
                future: { units: '45,000', growth: '+263%', centers: 70, chargers: 680 }
            },
            'Mumbai': {
                units: '9,850',
                growth: '+22%',
                centers: 22,
                chargers: 280,
                future: { units: '38,000', growth: '+286%', centers: 55, chargers: 520 }
            },
            'Chennai': {
                units: '8,200',
                growth: '+15%',
                centers: 18,
                chargers: 220,
                future: { units: '32,000', growth: '+290%', centers: 45, chargers: 380 }
            },
            'Hyderabad': {
                units: '7,100',
                growth: '+28%',
                centers: 16,
                chargers: 190,
                future: { units: '28,000', growth: '+294%', centers: 40, chargers: 320 }
            },
            'Pune': {
                units: '5,600',
                growth: '+19%',
                centers: 14,
                chargers: 150,
                future: { units: '22,000', growth: '+293%', centers: 35, chargers: 250 }
            },
            'Kolkata': {
                units: '4,200',
                growth: '+32%',
                centers: 10,
                chargers: 95,
                future: { units: '18,000', growth: '+329%', centers: 28, chargers: 180 }
            },
            'Ahmedabad': {
                units: '3,800',
                growth: '+25%',
                centers: 9,
                chargers: 85,
                future: { units: '15,000', growth: '+295%', centers: 24, chargers: 160 }
            },
            'Jaipur': {
                units: '2,100',
                growth: '+35%',
                centers: 6,
                chargers: 45,
                future: { units: '12,000', growth: '+471%', centers: 18, chargers: 120 }
            },
            'Kochi': {
                units: '1,850',
                growth: '+40%',
                centers: 5,
                chargers: 38,
                future: { units: '10,000', growth: '+440%', centers: 15, chargers: 95 }
            },
            'Coimbatore': {
                units: '1,650',
                growth: '+38%',
                centers: 4,
                chargers: 32,
                future: { units: '8,500', growth: '+415%', centers: 12, chargers: 78 }
            }
        };

        let currentView = 'current';

        // Tab switching
        tabCurrent.addEventListener('click', () => {
            if (currentView === 'current') return;
            currentView = 'current';

            // Update tab styles
            tabCurrent.style.background = 'var(--electric-cyan)';
            tabCurrent.style.color = 'var(--bg-primary)';
            tabCurrent.style.border = 'none';
            tabFuture.style.background = 'var(--bg-secondary)';
            tabFuture.style.color = 'var(--ather-green)';
            tabFuture.style.border = '1px solid var(--ather-green)';

            // Animate panels
            gsap.to(panelFuture, {
                opacity: 0, y: 20, duration: 0.3, onComplete: () => {
                    panelFuture.style.display = 'none';
                    panelCurrent.style.display = 'block';
                    panelCulture.style.display = 'block';
                    panelFacts.style.display = 'block';
                    gsap.fromTo([panelCurrent, panelCulture, panelFacts],
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }
                    );
                }
            });

            // Update city stats
            this.updateCityStats('current');
        });

        tabFuture.addEventListener('click', () => {
            if (currentView === 'future') return;
            currentView = 'future';

            // Update tab styles
            tabFuture.style.background = 'var(--ather-green)';
            tabFuture.style.color = 'var(--bg-primary)';
            tabFuture.style.border = 'none';
            tabCurrent.style.background = 'var(--bg-secondary)';
            tabCurrent.style.color = 'var(--electric-cyan)';
            tabCurrent.style.border = '1px solid var(--electric-cyan)';

            // Animate panels
            gsap.to([panelCurrent, panelCulture, panelFacts], {
                opacity: 0, y: 20, duration: 0.3, stagger: 0.05, onComplete: () => {
                    panelCurrent.style.display = 'none';
                    panelCulture.style.display = 'none';
                    panelFacts.style.display = 'none';
                    panelFuture.style.display = 'block';
                    gsap.fromTo(panelFuture,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.4 }
                    );
                }
            });

            // Update city stats
            this.updateCityStats('future');

            // Animate scooter across map
            const scooter = document.getElementById('routeScooter');
            if (scooter) {
                gsap.to(scooter, {
                    opacity: 1,
                    duration: 0.3,
                    onComplete: () => {
                        gsap.to(scooter, {
                            x: 150,
                            y: -100,
                            duration: 2,
                            ease: 'power2.inOut',
                            onComplete: () => {
                                gsap.to(scooter, { opacity: 0, duration: 0.3 });
                            }
                        });
                    }
                });
            }
        });

        // City marker hover tooltips
        cityMarkers.forEach(marker => {
            const cityName = marker.dataset.city;
            if (!cityName || !cityData[cityName]) return;

            marker.style.cursor = 'pointer';

            marker.addEventListener('mouseenter', (e) => {
                const data = cityData[cityName];
                const displayData = currentView === 'future' ? data.future : data;

                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'city-tooltip-enhanced';
                tooltip.id = 'cityTooltip';
                tooltip.style.cssText = `
                    position: fixed;
                    left: ${e.clientX + 15}px;
                    top: ${e.clientY - 10}px;
                    padding: 1rem;
                    background: rgba(13, 27, 30, 0.95);
                    border: 1px solid var(--electric-cyan);
                    border-radius: 0.5rem;
                    z-index: 1000;
                    min-width: 180px;
                    box-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
                    pointer-events: none;
                `;
                tooltip.innerHTML = `
                    <div style="font-weight: 700; color: var(--electric-cyan); margin-bottom: 0.5rem; font-size: 1rem;">${cityName}</div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.8rem;">
                        <div>
                            <div style="color: var(--text-secondary);">Units Sold</div>
                            <div class="mono" style="color: var(--ather-green);">${displayData.units}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-secondary);">Growth</div>
                            <div class="mono" style="color: var(--ather-green);">${displayData.growth}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-secondary);">Centers</div>
                            <div class="mono" style="color: #FBBF24;">${displayData.centers}</div>
                        </div>
                        <div>
                            <div style="color: var(--text-secondary);">Chargers</div>
                            <div class="mono" style="color: #8B5CF6;">${displayData.chargers}</div>
                        </div>
                    </div>
                    ${currentView === 'future' ? '<div style="margin-top: 0.5rem; font-size: 0.7rem; color: var(--electric-cyan); text-align: center;">🚀 FY27 Projection</div>' : ''}
                `;
                document.body.appendChild(tooltip);

                // Highlight marker
                const circle = marker.querySelector('circle');
                if (circle) {
                    gsap.to(circle, { attr: { r: parseFloat(circle.getAttribute('r')) * 1.5 }, duration: 0.2 });
                }
            });

            marker.addEventListener('mousemove', (e) => {
                const tooltip = document.getElementById('cityTooltip');
                if (tooltip) {
                    tooltip.style.left = (e.clientX + 15) + 'px';
                    tooltip.style.top = (e.clientY - 10) + 'px';
                }
            });

            marker.addEventListener('mouseleave', () => {
                const tooltip = document.getElementById('cityTooltip');
                if (tooltip) tooltip.remove();

                // Reset marker size
                const circle = marker.querySelector('circle');
                if (circle) {
                    const originalSize = marker.dataset.city === 'Bangalore' ? 12 :
                        ['Delhi', 'Mumbai', 'Chennai', 'Hyderabad'].includes(marker.dataset.city) ? 9 :
                            ['Pune', 'Kolkata', 'Ahmedabad'].includes(marker.dataset.city) ? 6 : 5;
                    gsap.to(circle, { attr: { r: originalSize }, duration: 0.2 });
                }
            });
        });

        // Store city data and update function for access
        this.cityData = cityData;
    }

    updateCityStats(view) {
        const cityStats = document.querySelectorAll('.city-stat');
        const futureMultipliers = {
            'Bangalore': 2.97,
            'Delhi': 3.63,
            'Mumbai': 3.86,
            'Chennai': 3.90,
            'Hyderabad': 3.94,
            'Pune': 3.93,
            'Kolkata': 4.29,
            'Ahmedabad': 3.95,
            'Jaipur': 5.71,
            'Kochi': 5.40,
            'Coimbatore': 5.15
        };

        cityStats.forEach(stat => {
            const marker = stat.closest('.city-marker');
            if (!marker) return;

            const cityName = marker.dataset.city;
            if (!cityName || !this.cityData || !this.cityData[cityName]) return;

            const data = view === 'future' ? this.cityData[cityName].future : this.cityData[cityName];

            gsap.to(stat, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    stat.textContent = data.units + ' units';
                    gsap.to(stat, { opacity: 1, duration: 0.2 });
                }
            });
        });
    }

    // ===== CHESS BOARD =====
    setupChessBoard() {
        const cells = document.querySelectorAll('.chess-cell');
        const card = document.getElementById('chessCard');
        let wins = 0, losses = 0;

        const strategies = {
            tvs: {
                title: 'vs TVS iQube',
                message: 'TVS has scale advantage. Counter with technology differentiation.',
                details: [
                    { label: 'Their Strength', value: 'Distribution network', class: 'text-orange' },
                    { label: 'Our Counter', value: 'Software superiority', class: 'text-green' },
                    { label: 'Investment', value: '₹85 Cr', class: 'text-cyan' }
                ],
                win: true
            },
            bajaj: {
                title: 'vs Bajaj Chetak',
                message: 'Bajaj targets value segment. Differentiate on premium experience.',
                details: [
                    { label: 'Their Strength', value: 'Brand legacy', class: 'text-orange' },
                    { label: 'Our Counter', value: 'Tech-forward positioning', class: 'text-green' },
                    { label: 'Investment', value: '₹45 Cr', class: 'text-cyan' }
                ],
                win: true
            },
            ola: {
                title: 'vs Ola S1',
                message: 'Ola leads volume. Avoid price war, compete on ecosystem depth.',
                details: [
                    { label: 'Their Strength', value: 'Aggressive pricing', class: 'text-orange' },
                    { label: 'Our Counter', value: 'Charging network intelligence', class: 'text-green' },
                    { label: 'Investment', value: '₹120 Cr', class: 'text-cyan' }
                ],
                win: false
            }
        };

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const player = cell.dataset.player;

                if (player === 'ather') {
                    // Cycle through strategies
                    const opponents = Object.keys(strategies);
                    const randomOpponent = opponents[Math.floor(Math.random() * opponents.length)];
                    const strategy = strategies[randomOpponent];

                    document.getElementById('chessTitle').textContent = strategy.title;
                    document.getElementById('chessMessage').textContent = strategy.message;

                    let detailsHtml = '';
                    strategy.details.forEach(d => {
                        detailsHtml += `<div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span style="color: var(--text-secondary);">${d.label}</span>
                            <span class="mono ${d.class}">${d.value}</span>
                        </div>`;
                    });
                    document.getElementById('chessDetails').innerHTML = detailsHtml;

                    card.style.opacity = '1';

                    if (strategy.win) wins++; else losses++;
                    document.getElementById('chessWins').textContent = wins;
                    document.getElementById('chessLosses').textContent = losses;
                }
            });
        });
    }

    // ===== RISK MATRIX =====
    setupRiskMatrix() {
        const cells = document.querySelectorAll('.risk-cell');
        const panel = document.getElementById('riskPanel');

        const riskData = {
            subsidy: {
                title: 'Subsidy Reduction',
                probability: '85%',
                impact: '₹240 Cr',
                mitigation: 'Multi-supplier strategy, modular cost base, dynamic pricing hedges',
                owner: 'CFO'
            },
            competition: {
                title: 'Competitive Fleet Entry',
                probability: '70%',
                impact: '₹150 Cr',
                mitigation: 'Lock-in contracts, service differentiation, early mover advantage',
                owner: 'COO'
            },
            battery: {
                title: 'Battery Price Volatility',
                probability: '40%',
                impact: '₹180 Cr',
                mitigation: 'Long-term supplier contracts, alternative chemistry R&D',
                owner: 'CTO'
            }
        };

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const riskId = cell.dataset.risk;
                const risk = riskData[riskId];

                if (risk) {
                    document.getElementById('riskTitle').textContent = risk.title;
                    document.getElementById('riskMitigation').innerHTML = `
                        <strong>Probability:</strong> ${risk.probability}<br>
                        <strong>Impact:</strong> ${risk.impact}<br><br>
                        <strong>Mitigation:</strong> ${risk.mitigation}
                    `;
                    document.getElementById('riskOwner').innerHTML = `
                        <div style="width: 32px; height: 32px; background: var(--electric-cyan); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700;">${risk.owner[0]}</div>
                        <span style="font-size: 0.875rem;">Owner: ${risk.owner}</span>
                    `;
                    panel.style.opacity = '1';
                }
            });
        });
    }

    // ===== STARGATE =====
    setupStargate() {
        const portal = document.getElementById('stargatePortal');
        const downloadOrb = document.getElementById('downloadOrb');
        const bookOrb = document.getElementById('bookOrb');

        if (!portal) return;

        // Mouse parallax effect
        portal.addEventListener('mousemove', (e) => {
            const rect = portal.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const mouseX = e.clientX - rect.left - centerX;
            const mouseY = e.clientY - rect.top - centerY;

            const rotateX = (mouseY / centerY) * 10;
            const rotateY = (mouseX / centerX) * -10;

            portal.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        portal.addEventListener('mouseleave', () => {
            portal.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });

        // CTA clicks
        downloadOrb.addEventListener('click', () => {
            alert('📄 Board Deck download would start here.\n\nIn production, this would fetch the 62-page PDF.');
        });

        bookOrb.addEventListener('click', () => {
            alert('📅 Calendly integration would open here.\n\nIn production, this would embed a Calendly booking widget.');
        });
    }

    // ===== EASTER EGGS =====
    setupEasterEggs() {
        // Konami Code
        document.addEventListener('keydown', (e) => {
            this.konamiCode.push(e.code);
            if (this.konamiCode.length > 10) {
                this.konamiCode.shift();
            }

            if (this.konamiCode.join(',') === this.konamiTarget.join(',')) {
                this.launchFireworks();
                this.konamiCode = [];
            }
        });

        // "Rizta" keyword detection
        document.addEventListener('keydown', (e) => {
            if (e.key.length === 1) {
                this.typedText += e.key.toLowerCase();
                if (this.typedText.length > 10) {
                    this.typedText = this.typedText.slice(-10);
                }

                if (this.typedText.includes('rizta')) {
                    this.showRiztaEasterEgg();
                    this.typedText = '';
                }
            }
        });
    }

    launchFireworks() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.style.left = Math.random() * window.innerWidth + 'px';
                firework.style.top = Math.random() * window.innerHeight + 'px';

                for (let j = 0; j < 12; j++) {
                    const particle = document.createElement('div');
                    particle.className = 'firework-particle';
                    particle.textContent = '₹';
                    particle.style.color = ['#00E5FF', '#6CC24A', '#FBBF24'][Math.floor(Math.random() * 3)];
                    particle.style.transform = `rotate(${j * 30}deg) translateX(${50 + Math.random() * 50}px)`;
                    firework.appendChild(particle);
                }

                document.body.appendChild(firework);

                setTimeout(() => firework.remove(), 2000);
            }, i * 100);
        }

        this.playSound('firework');
    }

    showRiztaEasterEgg() {
        const toast = document.createElement('div');
        toast.className = 'glass-card';
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            padding: 1.5rem;
            z-index: 9999;
            animation: slideIn 0.5s ease;
        `;
        toast.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🛵</div>
            <div style="color: var(--electric-cyan); font-weight: 700;">Rizta Lite Detected!</div>
            <div style="color: var(--text-secondary); font-size: 0.875rem;">The mass-market hero.</div>
        `;

        document.body.appendChild(toast);
        this.playSound('horn');

        setTimeout(() => toast.remove(), 3000);
    }

    playSound(type) {
        // Placeholder for sound effects
        console.log(`🔊 Playing sound: ${type}`);
    }

    // ===== FADE IN ANIMATIONS =====
    setupFadeInAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== START ANIMATIONS =====
    startAnimations() {
        // Initial hero animations
        gsap.from('.hero-stat-line', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5
        });

        gsap.from('.hero-tagline', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.8
        });
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.quantumLeap = new QuantumLeap();
});

// Export button handler
document.getElementById('exportGantt')?.addEventListener('click', () => {
    alert('📥 Timeline export would generate a PNG here.\n\nIn production, this would use html2canvas.');
});

// ===== ENHANCED LOADING SCREEN =====
(function initEnhancedLoader() {
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingText = document.getElementById('loadingText');
    const loadingMessages = [
        'Initializing...',
        'Loading charts...',
        'Preparing animations...',
        'Rendering India map...',
        'Almost ready...'
    ];

    let progress = 0;
    let messageIndex = 0;

    const updateProgress = () => {
        if (progress < 100) {
            progress += Math.random() * 15 + 5;
            if (progress > 100) progress = 100;

            if (loadingProgress) {
                loadingProgress.style.width = progress + '%';
            }

            if (loadingText && progress > (messageIndex + 1) * 20) {
                messageIndex = Math.min(messageIndex + 1, loadingMessages.length - 1);
                loadingText.textContent = loadingMessages[messageIndex];
            }

            if (progress < 100) {
                setTimeout(updateProgress, 200 + Math.random() * 200);
            }
        }
    };

    updateProgress();
})();

// ===== HORIZONTAL TOP NAVIGATION BAR =====
(function initNavigation() {
    const navTopbar = document.getElementById('navTopbar');
    const navHideBtn = document.getElementById('navHideBtn');
    const navShowBtn = document.getElementById('navShowBtn');
    const navSections = document.querySelectorAll('.nav-section');
    const navProgressFill = document.getElementById('navProgressFill');

    if (!navTopbar) return;

    // Hide navigation
    navHideBtn?.addEventListener('click', () => {
        navTopbar.classList.add('hidden');
        navShowBtn?.classList.add('visible');
    });

    // Show navigation
    navShowBtn?.addEventListener('click', () => {
        navTopbar.classList.remove('hidden');
        navShowBtn?.classList.remove('visible');
    });

    // Navigation section click handlers
    navSections.forEach(section => {
        section.addEventListener('click', () => {
            const sectionId = section.dataset.section;
            const targetElement = document.getElementById(sectionId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navTopbar.classList.remove('mobile-visible');
                    navShowBtn?.classList.add('visible');
                }
            }
        });
    });

    // Mobile Menu Toggle Logic
    navShowBtn?.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navTopbar.classList.add('mobile-visible');
            navShowBtn.classList.remove('visible');
        } else {
            navTopbar.classList.remove('hidden');
            navShowBtn.classList.remove('visible');
        }
    });

    navHideBtn?.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navTopbar.classList.remove('mobile-visible');
            navShowBtn?.classList.add('visible');
        } else {
            navTopbar.classList.add('hidden');
            navShowBtn?.classList.add('visible');
        }
    });

    // Color Picker Logic
    const colorBtns = document.querySelectorAll('.color-btn');
    const scooterImg = document.getElementById('scooter360Img');

    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            colorBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            // Apply filter
            const color = btn.dataset.color;
            scooterImg.className = 'scooter-360-img'; // Reset classes

            if (color === 'white') scooterImg.classList.add('filter-white');
            if (color === 'mint') scooterImg.classList.add('filter-mint');
        });
    });

    navHideBtn?.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navTopbar.classList.remove('mobile-visible');
            navShowBtn?.classList.add('visible');
        } else {
            navTopbar.classList.add('hidden');
            navShowBtn?.classList.add('visible');
        }
    });

    // ===== CALCULATOR LOGIC =====
    const calcModal = document.getElementById('calculatorModal');
    const fabCalculator = document.getElementById('fabCalculator');

    // Open Modal
    fabCalculator?.addEventListener('click', () => {
        calcModal?.classList.add('visible');
    });

    // Close Modal via function (for HTML onclick)
    window.closeCalculator = () => {
        calcModal?.classList.remove('visible');
    };

    // Calculator inputs
    const dailyKmInput = document.getElementById('dailyKm');
    const petrolPriceInput = document.getElementById('petrolPrice');
    const petrolMileageInput = document.getElementById('petrolMileage');

    const dailyKmValue = document.getElementById('dailyKmValue');
    const petrolPriceValue = document.getElementById('petrolPriceValue');
    const petrolMileageValue = document.getElementById('petrolMileageValue');

    const updateCalculator = () => {
        const dailyKm = parseInt(dailyKmInput?.value || 30);
        const petrolPrice = parseInt(petrolPriceInput?.value || 105);
        const petrolMileage = parseInt(petrolMileageInput?.value || 40);

        // Update value labels
        if (dailyKmValue) dailyKmValue.textContent = `${dailyKm} km`;
        if (petrolPriceValue) petrolPriceValue.textContent = `₹${petrolPrice}`;
        if (petrolMileageValue) petrolMileageValue.textContent = `${petrolMileage} km/L`;

        // Calculations (Monthly)
        const days = 30;
        const monthlyKm = dailyKm * days;

        // Petrol Cost
        const petrolLiters = monthlyKm / petrolMileage;
        const petrolCost = Math.round(petrolLiters * petrolPrice);

        // Ather Cost (approx ₹0.25 per km for electricity)
        const atherCost = Math.round(monthlyKm * 0.25);

        // Savings
        const savings = petrolCost - atherCost;
        const yearlySavings = savings * 12;

        // Update DOM
        document.getElementById('petrolCost').textContent = `₹${petrolCost.toLocaleString()}`;
        document.getElementById('atherCost').textContent = `₹${atherCost.toLocaleString()}`;
        document.getElementById('totalSavings').textContent = `₹${savings.toLocaleString()}`;
        document.getElementById('yearlySavings').textContent = `₹${yearlySavings.toLocaleString()}`;
    };

    // Attach listeners
    dailyKmInput?.addEventListener('input', updateCalculator);
    petrolPriceInput?.addEventListener('input', updateCalculator);
    petrolMileageInput?.addEventListener('input', updateCalculator);

    // Initial run
    updateCalculator();

    // ===== QUIZ LOGIC =====
    const quizModal = document.getElementById('quizModal');
    const quizQuestionContainer = document.getElementById('quizQuestionContainer');
    const quizResult = document.getElementById('quizResult');

    // Quiz State
    let currentQuestion = 0;
    let quizScore = { performance: 0, comfort: 0, budget: 0 };

    const questions = [
        {
            text: "What matters most to you?",
            options: [
                { text: "🚀 Speed & Performance", type: "performance" },
                { text: "🛋️ Comfort & Space", type: "comfort" },
                { text: "💰 Value for Money", type: "budget" }
            ]
        },
        {
            text: "How far do you travel daily?",
            options: [
                { text: "🏎️ Short, fast sprints (<20km)", type: "performance" },
                { text: "👨‍👩‍👧‍👦 Family trips (30-40km)", type: "comfort" },
                { text: "🏢 Just office commute (20-30km)", type: "budget" }
            ]
        },
        {
            text: "Pick a feature you can't live without:",
            options: [
                { text: "🗺️ Google Maps Navigation", type: "performance" },
                { text: "💺 Huge Seat & Storage", type: "comfort" },
                { text: "📱 Essential Bluetooth", type: "budget" }
            ]
        }
    ];

    window.openQuiz = () => {
        quizModal.classList.add('visible');
        currentQuestion = 0;
        quizScore = { performance: 0, comfort: 0, budget: 0 };
        showQuestion();
        quizResult.classList.add('hidden');
        quizQuestionContainer.style.display = 'block';
    };

    window.closeQuiz = () => {
        quizModal.classList.remove('visible');
    };

    const showQuestion = () => {
        const q = questions[currentQuestion];
        quizQuestionContainer.innerHTML = `
            <h4 style="margin-bottom: 1.5rem; color: var(--text-primary);">${q.text}</h4>
            <div class="quiz-options">
                ${q.options.map((opt, idx) => `
                    <button class="quiz-option" onclick="answerQuiz('${opt.type}')">
                        ${opt.text}
                    </button>
                `).join('')}
            </div>
            <div style="margin-top: 1rem; text-align: right; color: var(--text-secondary); font-size: 0.8rem;">
                Question ${currentQuestion + 1} of ${questions.length}
            </div>
        `;
    };

    window.answerQuiz = (type) => {
        quizScore[type]++;
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    };

    const showResult = () => {
        quizQuestionContainer.style.display = 'none';
        quizResult.classList.remove('hidden');

        // Determine winner
        let winner = 'performance';
        let maxScore = 0;
        for (const [key, value] of Object.entries(quizScore)) {
            if (value > maxScore) {
                maxScore = value;
                winner = key;
            }
        }

        const matchName = document.getElementById('quizMatchName');
        const matchDesc = document.getElementById('quizMatchDesc');
        const matchImg = document.getElementById('quizMatchImage');

        if (winner === 'performance') {
            matchName.textContent = "Ather 450X";
            matchDesc.textContent = "The performance beast. 0-40 in 3.3s. Warp mode on!";
            matchImg.textContent = "⚡";
        } else if (winner === 'comfort') {
            matchName.textContent = "Ather Rizta";
            matchDesc.textContent = "Your family's best friend. Biggest seat, biggest boot.";
            matchImg.textContent = "🛋️";
        } else {
            matchName.textContent = "Ather 450S";
            matchDesc.textContent = "The essential electric smart scooter. Performance on a budget.";
            matchImg.textContent = "💰";
        }
    };

    // Update active section on scroll
    let sections = [];
    navSections.forEach(navSection => {
        const sectionId = navSection.dataset.section;
        const element = document.getElementById(sectionId);
        if (element) {
            sections.push({ navSection, element, id: sectionId });
        }
    });

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Update progress bar (horizontal now)
        if (navProgressFill) {
            navProgressFill.style.width = scrollPercent + '%';
        }

        // Update active section
        sections.forEach(({ navSection, element }) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;

            if (isVisible) {
                navSections.forEach(ns => ns.classList.remove('active'));
                navSection.classList.add('active');
            }
        });
    });

    // H key to toggle navigation
    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
        if (e.key === 'h' || e.key === 'H') {
            e.preventDefault();
            if (navTopbar.classList.contains('hidden')) {
                navTopbar.classList.remove('hidden');
                navShowBtn?.classList.remove('visible');
            } else {
                navTopbar.classList.add('hidden');
                navShowBtn?.classList.add('visible');
            }
        }
    });
})();

// ===== KEYBOARD SHORTCUTS =====
(function initKeyboardShortcuts() {
    const keyboardModal = document.getElementById('keyboardModal');
    const sections = document.querySelectorAll('.section');
    let currentSectionIndex = 0;

    // Close keyboard modal function (global)
    window.closeKeyboardModal = function () {
        if (keyboardModal) {
            keyboardModal.classList.remove('visible');
        }
    };

    // Keyboard event handler
    document.addEventListener('keydown', (e) => {
        // Don't trigger if typing in an input
        if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

        switch (e.key) {
            case 'ArrowDown':
            case 'j':
                e.preventDefault();
                if (currentSectionIndex < sections.length - 1) {
                    currentSectionIndex++;
                    sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
                }
                break;

            case 'ArrowUp':
            case 'k':
                e.preventDefault();
                if (currentSectionIndex > 0) {
                    currentSectionIndex--;
                    sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
                }
                break;

            case 'f':
            case 'F':
                e.preventDefault();
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
                break;

            case 'm':
            case 'M':
                e.preventDefault();
                const navSidebar = document.getElementById('navSidebar');
                if (navSidebar) {
                    navSidebar.classList.toggle('collapsed');
                }
                break;

            case '?':
                e.preventDefault();
                if (keyboardModal) {
                    keyboardModal.classList.toggle('visible');
                }
                break;

            case 'Escape':
                if (keyboardModal) {
                    keyboardModal.classList.remove('visible');
                }
                break;

            case 'Home':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                currentSectionIndex = 0;
                break;

            case 'End':
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                currentSectionIndex = sections.length - 1;
                break;
        }
    });

    // Update current section index on scroll
    window.addEventListener('scroll', () => {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
                currentSectionIndex = index;
            }
        });
    });
})();

// ===== SHARE BUTTON =====
(function initShareFeature() {
    // Add share button click handler if it exists
    document.getElementById('shareBtn')?.addEventListener('click', async () => {
        const shareData = {
            title: 'Ather Energy - Project Quantum Leap',
            text: 'Check out Ather Energy\'s Strategic Transformation Blueprint',
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback: copy URL to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard! 📋');
        }
    });
})();

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== PRINT OPTIMIZATION =====
window.matchMedia('print').addEventListener('change', (e) => {
    if (e.matches) {
        // Hide non-essential elements for printing
        document.querySelectorAll('.nav-sidebar, .team-branding, .kpi-ribbon').forEach(el => {
            el.style.display = 'none';
        });
    } else {
        // Restore elements
        document.querySelectorAll('.nav-sidebar, .team-branding, .kpi-ribbon').forEach(el => {
            el.style.display = '';
        });
    }
});

console.log('🛵 Project Quantum Leap initialized successfully!');
console.log('💡 Press ? for keyboard shortcuts');

// ===== ANIMATED PARTICLE BACKGROUND =====
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#00E5FF' : '#6CC24A';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width ||
                this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Create particles
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = '#00E5FF';
                    ctx.globalAlpha = (1 - distance / 100) * 0.2;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
})();

// ===== CURSOR GLOW EFFECT =====
(function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.classList.add('visible');
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('visible');
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }

    animateGlow();
})();

// ===== SCROLL TO TOP BUTTON =====
(function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!scrollTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ===== FLOATING ACTION BUTTON =====
(function initFAB() {
    const fabContainer = document.getElementById('fabContainer');
    const fabMain = document.getElementById('fabMain');
    const fabCalculator = document.getElementById('fabCalculator');
    const fabShare = document.getElementById('fabShare');
    const fabFullscreen = document.getElementById('fabFullscreen');
    const fabSound = document.getElementById('fabSound');

    if (!fabMain) return;

    // Toggle FAB menu
    fabMain.addEventListener('click', () => {
        fabContainer.classList.toggle('open');
    });

    // Calculator button
    fabCalculator?.addEventListener('click', () => {
        document.getElementById('calculatorModal')?.classList.add('visible');
        fabContainer.classList.remove('open');
    });

    // Share button
    fabShare?.addEventListener('click', async () => {
        const shareData = {
            title: 'Ather Energy - Project Quantum Leap',
            text: 'Check out Ather Energy\'s Strategic Transformation Blueprint',
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard! 📋');
        }
        fabContainer.classList.remove('open');
    });

    // Fullscreen button
    fabFullscreen?.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        fabContainer.classList.remove('open');
    });

    // Sound toggle
    let soundEnabled = false;
    fabSound?.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        fabSound.textContent = soundEnabled ? '🔊' : '🔇';
        fabContainer.classList.remove('open');
    });

    // Close FAB when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target)) {
            fabContainer.classList.remove('open');
        }
    });
})();

// ===== EV SAVINGS CALCULATOR =====
(function initCalculator() {
    const calculatorModal = document.getElementById('calculatorModal');
    const dailyKmSlider = document.getElementById('dailyKm');
    const petrolPriceSlider = document.getElementById('petrolPrice');
    const petrolMileageSlider = document.getElementById('petrolMileage');

    if (!calculatorModal) return;

    // Close calculator function (global)
    window.closeCalculator = function () {
        calculatorModal.classList.remove('visible');
    };

    // Close on overlay click
    calculatorModal.addEventListener('click', (e) => {
        if (e.target === calculatorModal) {
            closeCalculator();
        }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCalculator();
        }
    });

    function calculateSavings() {
        const dailyKm = parseInt(dailyKmSlider?.value || 30);
        const petrolPrice = parseInt(petrolPriceSlider?.value || 105);
        const petrolMileage = parseInt(petrolMileageSlider?.value || 40);

        // Update display values
        document.getElementById('dailyKmValue').textContent = dailyKm + ' km';
        document.getElementById('petrolPriceValue').textContent = '₹' + petrolPrice;
        document.getElementById('petrolMileageValue').textContent = petrolMileage + ' km/L';

        // Calculate costs
        const monthlyKm = dailyKm * 30;
        const petrolCost = Math.round((monthlyKm / petrolMileage) * petrolPrice);

        // Ather: 3 km per unit, ₹7.5 per unit average
        const atherUnits = monthlyKm / 75; // ~75 km per unit
        const atherCost = Math.round(atherUnits * 7.5 * 3); // Approx electricity cost

        const savings = petrolCost - atherCost;
        const yearlySavings = savings * 12;

        // Update display
        document.getElementById('petrolCost').textContent = '₹' + petrolCost.toLocaleString();
        document.getElementById('atherCost').textContent = '₹' + atherCost.toLocaleString();
        document.getElementById('totalSavings').textContent = '₹' + savings.toLocaleString();
        document.getElementById('yearlySavings').textContent = '₹' + yearlySavings.toLocaleString();
    }

    // Add event listeners
    dailyKmSlider?.addEventListener('input', calculateSavings);
    petrolPriceSlider?.addEventListener('input', calculateSavings);
    petrolMileageSlider?.addEventListener('input', calculateSavings);

    // Initial calculation
    calculateSavings();
})();

// ===== CONFETTI CELEBRATION =====
(function initConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let confetti = [];
    let isActive = false;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 10 + 5;
            this.speedY = Math.random() * 3 + 2;
            this.speedX = (Math.random() - 0.5) * 4;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 10;
            this.color = ['#00E5FF', '#6CC24A', '#FBBF24', '#F472B6', '#A78BFA'][Math.floor(Math.random() * 5)];
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            this.rotation += this.rotationSpeed;
            return this.y < canvas.height;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size / 2);
            ctx.restore();
        }
    }

    function animateConfetti() {
        if (!isActive && confetti.length === 0) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti = confetti.filter(piece => {
            piece.draw();
            return piece.update();
        });

        if (confetti.length > 0 || isActive) {
            requestAnimationFrame(animateConfetti);
        }
    }

    // Expose global confetti trigger
    window.triggerConfetti = function () {
        isActive = true;
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                confetti.push(new ConfettiPiece());
            }, i * 20);
        }

        setTimeout(() => {
            isActive = false;
        }, 3000);

        animateConfetti();
    };

    // Trigger confetti when reaching CTA section
    const ctaSection = document.getElementById('stargate');
    if (ctaSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    triggerConfetti();
                    observer.unobserve(ctaSection);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(ctaSection);
    }
})();

console.log('✨ Enhanced interactive features loaded!');

// ===== PROFESSIONAL 360° PRODUCT VIEWER =====
(function init360ProductViewer() {
    // Elements
    const viewer = document.getElementById('productViewer360');
    const scooterContainer = document.getElementById('scooterContainer');
    const scooterLayer = document.getElementById('scooterLayer');
    const scooterReflection = document.getElementById('scooterReflection');
    const dialPointer = document.getElementById('dialPointer');
    const hint = document.getElementById('viewerHint');
    const hotspots = document.getElementById('viewerHotspots');

    // Buttons
    const btnRotateLeft = document.getElementById('btnRotateLeft');
    const btnRotateRight = document.getElementById('btnRotateRight');
    const btnReset = document.getElementById('btnReset');
    const btnFullscreen = document.getElementById('btnFullscreen');
    const btnHotspots = document.getElementById('btnHotspots');
    const toggleAutoRotate = document.getElementById('toggleAutoRotate');
    const zoomSlider = document.getElementById('zoomSlider');
    const zoomValue = document.getElementById('zoomValue');

    if (!scooterContainer || !scooterLayer) return;

    // State
    let rotation = 0;
    let velocity = 0;
    let isDragging = false;
    let startX = 0;
    let lastX = 0;
    let lastTime = 0;
    let zoom = 100;
    let autoRotate = true;
    let hotspotsVisible = true;
    let animationFrame;

    // Constants
    const FRICTION = 0.95;
    const SENSITIVITY = 0.4;
    const AUTO_ROTATE_SPEED = 0.15;
    const MIN_VELOCITY = 0.01;

    // Update scooter rotation - ONLY scooter rotates, not background
    function updateView() {
        // Apply rotation ONLY to scooter container
        scooterContainer.style.transform = `rotateY(${rotation}deg) scale(${zoom / 100})`;

        // Update reflection (also rotates with scooter)
        if (scooterReflection) {
            scooterReflection.style.transform = `translateX(-50%) scaleY(-0.35) rotateY(${rotation}deg) scale(${zoom / 100})`;
        }

        // Update dial pointer
        if (dialPointer) {
            const pointerRotation = (rotation % 360);
            dialPointer.style.transform = `translateX(-50%) rotate(${pointerRotation}deg) translateY(-21px)`;
        }
    }

    // Animation loop with momentum physics
    function animate() {
        if (!isDragging) {
            // Apply momentum
            if (Math.abs(velocity) > MIN_VELOCITY) {
                rotation += velocity;
                velocity *= FRICTION;
                updateView();
            }

            // Auto-rotate when enabled and no momentum
            if (autoRotate && Math.abs(velocity) < MIN_VELOCITY) {
                rotation += AUTO_ROTATE_SPEED;
                updateView();
            }
        }
        animationFrame = requestAnimationFrame(animate);
    }

    // Hide hint
    function hideHint() {
        if (hint) {
            hint.style.opacity = '0';
            setTimeout(() => hint.style.display = 'none', 500);
        }
    }

    // === MOUSE EVENTS (on scooter layer only) ===
    scooterLayer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        lastX = e.clientX;
        lastTime = Date.now();
        velocity = 0;
        hideHint();
        scooterLayer.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - lastX;
        const deltaTime = Date.now() - lastTime;

        rotation += deltaX * SENSITIVITY;
        velocity = deltaX * SENSITIVITY;

        lastX = e.clientX;
        lastTime = Date.now();
        updateView();
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            scooterLayer.style.cursor = 'grab';
        }
    });

    // === TOUCH EVENTS ===
    scooterLayer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            startX = e.touches[0].clientX;
            lastX = e.touches[0].clientX;
            lastTime = Date.now();
            velocity = 0;
            hideHint();
        } else if (e.touches.length === 2) {
            // Pincht to Zoom Start
            isDragging = false; // Disable rotation drag
            initialPinchDist = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            initialZoom = zoom;
        }
    });

    scooterLayer.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && isDragging) {
            e.preventDefault(); // Prevent scroll
            const deltaX = e.touches[0].clientX - lastX;
            rotation += deltaX * SENSITIVITY;
            velocity = deltaX * SENSITIVITY;
            lastX = e.touches[0].clientX;
            lastTime = Date.now();
            updateView();
        } else if (e.touches.length === 2 && initialPinchDist > 0) {
            // Pinch to Zoom Move
            e.preventDefault();
            const dist = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            const scale = dist / initialPinchDist;
            zoom = Math.min(Math.max(50, initialZoom * scale), 200); // 50% to 200% zoom
            updateView();

            // Update slider UI if exists
            if (zoomSlider) zoomSlider.value = zoom;
            if (zoomValue) zoomValue.textContent = Math.round(zoom) + '%';
        }
    });

    scooterLayer.addEventListener('touchend', () => {
        isDragging = false;
    });

    // ===== PINCH VARS =====
    let initialPinchDist = 0;
    let initialZoom = 100;

    // ===== HOTSPOT LOGIC =====
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();

            // Zoom to 1.5x
            zoom = 150;
            updateView();

            // Rotate to show feature (simplified)
            // In a real 360 sequence, we'd jump to specific frame
            // Here we just ensure we aren't spinning fast
            velocity = 0;
            autoRotate = false;

            // Update UI
            if (zoomSlider) zoomSlider.value = zoom;
            if (zoomValue) zoomValue.textContent = zoom + '%';

            // Hide hotspots temporarily
            if (hotspots) {
                hotspots.style.opacity = '0';
                setTimeout(() => {
                    hotspots.style.opacity = '1';
                }, 2000);
            }
        });
    });

    // Start animation
    animate();


    // === BUTTON CONTROLS ===
    if (btnRotateLeft) {
        btnRotateLeft.addEventListener('click', () => {
            velocity = -5;
            hideHint();
        });
    }

    if (btnRotateRight) {
        btnRotateRight.addEventListener('click', () => {
            velocity = 5;
            hideHint();
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            rotation = 0;
            velocity = 0;
            zoom = 100;
            if (zoomSlider) zoomSlider.value = 100;
            if (zoomValue) zoomValue.textContent = '100%';
            updateView();
        });
    }

    // === FULLSCREEN ===
    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', () => {
            if (viewer) {
                viewer.classList.toggle('fullscreen');
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                } else if (viewer.requestFullscreen) {
                    viewer.requestFullscreen();
                }
            }
        });
    }

    // === HOTSPOTS TOGGLE ===
    if (btnHotspots) {
        btnHotspots.addEventListener('click', () => {
            hotspotsVisible = !hotspotsVisible;
            if (hotspots) {
                hotspots.style.display = hotspotsVisible ? 'block' : 'none';
            }
        });
    }

    // === AUTO-ROTATE TOGGLE ===
    if (toggleAutoRotate) {
        toggleAutoRotate.addEventListener('change', (e) => {
            autoRotate = e.target.checked;
        });
    }

    // === ZOOM CONTROL ===
    if (zoomSlider) {
        zoomSlider.addEventListener('input', (e) => {
            zoom = parseInt(e.target.value);
            if (zoomValue) zoomValue.textContent = zoom + '%';
            updateView();
        });
    }

    // === SCROLL TO ZOOM ===
    viewer?.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -5 : 5;
        zoom = Math.max(50, Math.min(200, zoom + delta));
        if (zoomSlider) zoomSlider.value = zoom;
        if (zoomValue) zoomValue.textContent = zoom + '%';
        updateView();
        hideHint();
    }, { passive: false });

    // Start animation loop
    animate();

    console.log('🛵 Professional 360° Product Viewer initialized!');
})();

