// Project Volt - Main JavaScript
// Comprehensive interactive functionality for data-heavy presentation

class ProjectVolt {
    constructor() {
        this.currentSection = 'hero';
        this.charts = {};
        this.animations = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeCharts();
        this.setupScrollEffects();
        this.setupNavigation();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Slide dots navigation
        document.querySelectorAll('.slide-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                const section = e.target.dataset.section;
                this.navigateToSection(section);
            });
        });

        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));

        // Scroll handler for progress bar and section detection
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    initializeAnimations() {
        // Initialize Splitting.js for text animations
        if (typeof Splitting !== 'undefined') {
            Splitting();
        }

        // Typewriter effect for hero subtitle
        if (document.getElementById('typed-subtitle')) {
            new Typed('#typed-subtitle', {
                strings: [
                    'Rewiring Ather\'s Growth Engine',
                    'A Data-Driven Strategic Blueprint',
                    'For Profitable Scale'
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }

        // Animate metric counters
        this.animateCounters();

        // Initialize scroll-triggered animations
        this.setupScrollAnimations();
    }

    animateCounters() {
        const counters = [
            { id: 'metric-1', target: 6500, suffix: ' Cr', prefix: '₹' },
            { id: 'metric-2', target: 2.6, suffix: 'x', decimals: 1 },
            { id: 'metric-3', target: 40, suffix: '%' },
            { id: 'metric-4', target: 140, suffix: ' Cr', prefix: '₹' }
        ];

        counters.forEach(counter => {
            const element = document.getElementById(counter.id);
            if (element) {
                this.countUp(element, counter.target, counter.suffix || '', counter.prefix || '', counter.decimals || 0);
            }
        });
    }

    countUp(element, target, suffix = '', prefix = '', decimals = 0) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            const value = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
            element.textContent = `${prefix}${value}${suffix}`;
        }, 20);
    }

    setupScrollAnimations() {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        document.querySelectorAll('[data-splitting], .metric-card, .chart-container').forEach(el => {
            observer.observe(el);
        });
    }

    animateElement(element) {
        if (element.hasAttribute('data-splitting')) {
            // Animate split text
            anime({
                targets: element.querySelectorAll('.char'),
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(50),
                duration: 600,
                easing: 'easeOutQuart'
            });
        } else if (element.classList.contains('metric-card')) {
            // Animate metric cards
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.9, 1],
                duration: 800,
                easing: 'easeOutQuart'
            });
        } else if (element.classList.contains('chart-container')) {
            // Animate chart containers
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [40, 0],
                duration: 1000,
                easing: 'easeOutQuart'
            });
        }
    }

    initializeCharts() {
        // Initialize profitability gap chart
        this.initProfitabilityChart();

        // Initialize other charts based on page
        const currentPage = this.getCurrentPage();
        switch (currentPage) {
            case 'analysis':
                this.initAnalysisCharts();
                break;
            case 'framework':
                this.initFrameworkCharts();
                break;
            case 'capital':
                this.initCapitalCharts();
                break;
            case 'financials':
                this.initFinancialCharts();
                break;
        }
    }

    initProfitabilityChart() {
        const chartElement = document.getElementById('profitabilityChart');
        if (!chartElement) return;

        // Ensure the element is visible before initializing
        chartElement.style.width = '100%';
        chartElement.style.height = '400px';

        const chart = echarts.init(chartElement);
        const option = {
            title: {
                text: 'Revenue to Profit Journey (₹ Crores)',
                left: 'center',
                textStyle: {
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#1A1A2E'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: function (params) {
                    let result = params[0].name + '<br/>';
                    params.forEach(param => {
                        result += param.marker + param.seriesName + ': ₹' +
                            Math.abs(param.value).toLocaleString() + ' Cr<br/>';
                    });
                    return result;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Revenue', 'COGS', 'Gross Profit', 'R&D', 'S&M', 'G&A', 'Other', 'Net Loss'],
                axisLabel: {
                    rotate: 45,
                    fontSize: 11
                }
            },
            yAxis: {
                type: 'value',
                name: '₹ Crores',
                axisLabel: {
                    formatter: '₹{value}'
                }
            },
            series: [
                {
                    name: 'Amount',
                    type: 'bar',
                    data: [
                        { value: 1960, itemStyle: { color: '#00D26A' } },
                        { value: -1607, itemStyle: { color: '#EF4444' } },
                        { value: 353, itemStyle: { color: '#10B981' } },
                        { value: -186, itemStyle: { color: '#F59E0B' } },
                        { value: -167, itemStyle: { color: '#F59E0B' } },
                        { value: -112, itemStyle: { color: '#F59E0B' } },
                        { value: -42, itemStyle: { color: '#6B7280' } },
                        { value: -154, itemStyle: { color: '#DC2626' } }
                    ],
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function (params) {
                            return '₹' + Math.abs(params.value).toLocaleString();
                        },
                        fontSize: 10
                    }
                }
            ]
        };

        chart.setOption(option);
        this.charts.profitability = chart;

        // Trigger resize after short delay to ensure proper rendering
        setTimeout(() => {
            chart.resize();
        }, 100);

        // Handle window resize
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }

    initAnalysisCharts() {
        // Market position radar chart
        const radarElement = document.getElementById('radarChart');
        if (radarElement) {
            const radarChart = echarts.init(radarElement);
            const radarOption = {
                title: {
                    text: 'Market Position Comparison',
                    left: 'center'
                },
                legend: {
                    data: ['Ather', 'TVS', 'Ola'],
                    bottom: 10
                },
                radar: {
                    indicator: [
                        { name: 'Brand Premium', max: 10 },
                        { name: 'Technology', max: 10 },
                        { name: 'Distribution', max: 10 },
                        { name: 'Price Comp.', max: 10 },
                        { name: 'Production Scale', max: 10 },
                        { name: 'Profitability', max: 10 }
                    ],
                    axisName: {
                        color: '#1A1A2E',
                        fontSize: 12
                    }
                },
                series: [{
                    type: 'radar',
                    data: [
                        {
                            value: [9, 10, 5, 4, 5, 3],
                            name: 'Ather',
                            itemStyle: { color: '#00D26A' },
                            areaStyle: { color: 'rgba(0, 210, 106, 0.2)' }
                        },
                        {
                            value: [7, 7, 9, 7, 9, 7],
                            name: 'TVS',
                            itemStyle: { color: '#3B82F6' },
                            areaStyle: { color: 'rgba(59, 130, 246, 0.2)' }
                        },
                        {
                            value: [6, 8, 7, 8, 8, 4],
                            name: 'Ola',
                            itemStyle: { color: '#F59E0B' },
                            areaStyle: { color: 'rgba(245, 158, 11, 0.2)' }
                        }
                    ]
                }]
            };
            radarChart.setOption(radarOption);
            this.charts.radar = radarChart;
        }
    }

    initCapitalCharts() {
        // ROI Frontier scatter plot
        const scatterElement = document.getElementById('roiChart');
        if (scatterElement) {
            const scatterChart = echarts.init(scatterElement);
            const scatterData = [
                [4, 3.2, 550, 'Supply Chain Integration'],
                [5, 2.9, 450, 'Capacity Expansion P1'],
                [6, 2.7, 350, 'Fleet Model R&D'],
                [5, 2.6, 550, 'Capacity Expansion P2'],
                [7, 2.3, 300, 'AtherStack Pro'],
                [6, 1.9, 150, 'AtherGrid Selective'],
                [8, 1.6, 150, 'Geographic Expansion']
            ];

            const scatterOption = {
                title: {
                    text: 'Capital ROI Frontier',
                    left: 'center'
                },
                tooltip: {
                    formatter: function (params) {
                        return params.data[3] + '<br/>' +
                            'Risk: ' + params.data[0] + '/10<br/>' +
                            'ROI: ' + params.data[1] + 'x<br/>' +
                            'Capital: ₹' + params.data[2] + ' Cr';
                    }
                },
                xAxis: {
                    name: 'Implementation Risk (1-10)',
                    nameLocation: 'middle',
                    nameGap: 30
                },
                yAxis: {
                    name: '5-Year ROI Multiple',
                    nameLocation: 'middle',
                    nameGap: 40
                },
                series: [{
                    type: 'scatter',
                    data: scatterData,
                    symbolSize: function (data) {
                        return Math.sqrt(data[2]) * 2;
                    },
                    itemStyle: {
                        color: '#00D26A',
                        opacity: 0.7
                    }
                }]
            };
            scatterChart.setOption(scatterOption);
            this.charts.scatter = scatterChart;
        }
    }

    initFinancialCharts() {
        // Financial trajectory chart
        const trajectoryElement = document.getElementById('trajectoryChart');
        if (trajectoryElement) {
            const trajectoryChart = echarts.init(trajectoryElement);
            const years = ['FY26', 'FY27', 'FY28', 'FY29', 'FY30'];
            const revenue = [2160, 3360, 4680, 5940, 7200];
            const ebitda = [-280, -95, 95, 356, 648];
            const margin = ebitda.map((ebit, i) => ((ebit / revenue[i]) * 100).toFixed(1));

            const trajectoryOption = {
                title: {
                    text: '5-Year Financial Trajectory',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Revenue (₹ Cr)', 'EBITDA (₹ Cr)', 'EBITDA Margin (%)'],
                    bottom: 10
                },
                xAxis: {
                    type: 'category',
                    data: years
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '₹ Crores',
                        position: 'left'
                    },
                    {
                        type: 'value',
                        name: 'Margin %',
                        position: 'right'
                    }
                ],
                series: [
                    {
                        name: 'Revenue (₹ Cr)',
                        type: 'line',
                        data: revenue,
                        itemStyle: { color: '#00D26A' },
                        lineStyle: { width: 3 }
                    },
                    {
                        name: 'EBITDA (₹ Cr)',
                        type: 'line',
                        data: ebitda,
                        itemStyle: { color: '#3B82F6' },
                        lineStyle: { width: 3 }
                    },
                    {
                        name: 'EBITDA Margin (%)',
                        type: 'line',
                        yAxisIndex: 1,
                        data: margin,
                        itemStyle: { color: '#F59E0B' },
                        lineStyle: { width: 3 }
                    }
                ]
            };
            trajectoryChart.setOption(trajectoryOption);
            this.charts.trajectory = trajectoryChart;
        }
    }

    setupScrollEffects() {
        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-bg');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    setupNavigation() {
        // Update active slide dot based on scroll position
        const sections = ['hero', 'overview', 'framework-preview', 'insights', 'team'];

        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;

            sections.forEach((section, index) => {
                const element = document.getElementById(section);
                if (element) {
                    const elementTop = element.offsetTop;
                    const elementBottom = elementTop + element.offsetHeight;

                    if (scrollPos >= elementTop && scrollPos < elementBottom) {
                        this.updateActiveDot(index);
                        this.updateProgressBar();
                    }
                }
            });
        });
    }

    updateActiveDot(index) {
        document.querySelectorAll('.slide-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    updateProgressBar() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }

    navigateToSection(sectionName) {
        const section = document.getElementById(sectionName);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('analysis')) return 'analysis';
        if (path.includes('framework')) return 'framework';
        if (path.includes('capital')) return 'capital';
        if (path.includes('financials')) return 'financials';
        return 'index';
    }

    handleResize() {
        // Resize all charts on window resize
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }

    // Utility function to create interactive tooltips
    createTooltip(content, x, y) {
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 text-sm';
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
        tooltip.innerHTML = content;

        document.body.appendChild(tooltip);

        // Remove tooltip after 3 seconds
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 3000);

        return tooltip;
    }

    // Data formatting utilities
    formatCurrency(amount, currency = '₹') {
        return `${currency}${amount.toLocaleString()}`;
    }

    formatPercentage(value, decimals = 1) {
        return `${value.toFixed(decimals)}%`;
    }

    formatNumber(num) {
        if (num >= 10000000) {
            return (num / 10000000).toFixed(1) + 'Cr';
        }
        if (num >= 100000) {
            return (num / 100000).toFixed(1) + 'L';
        }
        return num.toLocaleString();
    }
}

// Financial Calculator Class for interactive elements
class FinancialCalculator {
    constructor() {
        this.variables = {
            asp: 108000, // Average Selling Price
            volume: 600000, // Annual volume
            supplyChainSavings: 4200, // Per unit savings
            b2bMix: 40, // B2B revenue percentage
            dataRevenue: 180 // Data revenue in Cr
        };
    }

    calculateEBITDA() {
        const baseRevenue = this.variables.asp * this.variables.volume / 10000000; // Convert to Cr
        const b2bRevenue = baseRevenue * (this.variables.b2bMix / 100);
        const b2cRevenue = baseRevenue * (1 - this.variables.b2bMix / 100);

        const totalRevenue = baseRevenue + this.variables.dataRevenue;
        const costSavings = this.variables.supplyChainSavings * this.variables.volume / 10000000;

        // Simplified EBITDA calculation
        const grossProfit = totalRevenue * 0.22; // 22% gross margin
        const ebitda = grossProfit - 1200 + costSavings; // Subtract fixed costs, add savings

        return {
            revenue: totalRevenue,
            ebitda: ebitda,
            margin: (ebitda / totalRevenue * 100)
        };
    }

    updateVariable(name, value) {
        this.variables[name] = parseFloat(value);
        return this.calculateEBITDA();
    }
}

// Risk Assessment Matrix
class RiskMatrix {
    constructor() {
        this.risks = [
            {
                id: 'subsidy',
                name: 'Subsidy Reduction',
                probability: 85,
                impact: 240,
                category: 'regulatory'
            },
            {
                id: 'competition',
                name: 'Competitive Fleet Entry',
                probability: 70,
                impact: 150,
                category: 'market'
            },
            {
                id: 'battery',
                name: 'Battery Price Volatility',
                probability: 40,
                impact: 180,
                category: 'supply'
            }
        ];
    }

    calculateRiskScore(risk) {
        return (risk.probability / 100) * risk.impact;
    }

    getRiskRanking() {
        return this.risks
            .map(risk => ({
                ...risk,
                score: this.calculateRiskScore(risk)
            }))
            .sort((a, b) => b.score - a.score);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add loading animation first
    document.body.style.opacity = '0';
    anime({
        targets: document.body,
        opacity: 1,
        duration: 1000,
        easing: 'easeOutQuart'
    });

    // Initialize after short delay to ensure DOM is fully rendered
    setTimeout(() => {
        window.projectVolt = new ProjectVolt();
        window.financialCalculator = new FinancialCalculator();
        window.riskMatrix = new RiskMatrix();
    }, 200);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectVolt, FinancialCalculator, RiskMatrix };
}