/**
 * Project Quantum Leap - Main JavaScript
 * Ather Energy Strategic Transformation Blueprint
 * Team: Excel-lent Minds
 */

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
        // Hide loading screen after content loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
                this.startAnimations();
            }, 1000);
        });

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
