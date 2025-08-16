// Configuración de la aplicación
const CONFIG = {
    cryptos: [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
        { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB' },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
        { id: 'solana', name: 'Solana', symbol: 'SOL' },
        { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' }
    ],
    updateInterval: 30000, // 30 segundos
    chartUpdateInterval: 300000 // 5 minutos
};

// Estado global de la aplicación
const AppState = {
    cryptoData: {},
    portfolioAmounts: {},
    exchangeRates: { eur: 1 },
    priceChart: null,
    theme: localStorage.getItem('theme') || 'light'
};

// Clase principal de la aplicación
class CryptoTracker {
    constructor() {
        this.initializeApp();
    }

    async initializeApp() {
        this.setupEventListeners();
        this.applyTheme();
        await this.loadPortfolioData();
        await this.fetchExchangeRates();
        await this.fetchCryptoData();
        this.renderCryptoCards();
        this.initializeChart();
        this.startPeriodicUpdates();
    }

    setupEventListeners() {
        // Toggle de tema
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Exportar datos
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        // Importar datos
        document.getElementById('importBtn').addEventListener('click', () => {
            document.getElementById('importFile').click();
        });

        document.getElementById('importFile').addEventListener('change', (e) => {
            this.importData(e.target.files[0]);
        });
    }

    toggleTheme() {
        AppState.theme = AppState.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', AppState.theme);
        this.applyTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', AppState.theme);
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = AppState.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    async fetchExchangeRates() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            AppState.exchangeRates.eur = data.rates.EUR;
        } catch (error) {
            console.error('Error fetching exchange rates:', error);
            AppState.exchangeRates.eur = 0.85; // Fallback rate
        }
    }

    async fetchCryptoData() {
        try {
            const ids = CONFIG.cryptos.map(crypto => crypto.id).join(',');
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
            );
            const data = await response.json();
            
            CONFIG.cryptos.forEach(crypto => {
                if (data[crypto.id]) {
                    AppState.cryptoData[crypto.id] = {
                        ...crypto,
                        price: data[crypto.id].usd,
                        change24h: data[crypto.id].usd_24h_change || 0
                    };
                }
            });
            
            this.updateCryptoCards();
            this.updatePortfolioSummary();
        } catch (error) {
            console.error('Error fetching crypto data:', error);
        }
    }

    async fetchHistoricalData(cryptoId, days = 7) {
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`
            );
            const data = await response.json();
            return data.prices;
        } catch (error) {
            console.error('Error fetching historical data:', error);
            return [];
        }
    }

    renderCryptoCards() {
        const grid = document.getElementById('cryptoGrid');
        grid.innerHTML = '';

        CONFIG.cryptos.forEach(crypto => {
            const card = this.createCryptoCard(crypto);
            grid.appendChild(card);
        });
    }

    createCryptoCard(crypto) {
        const card = document.createElement('div');
        card.className = 'crypto-card';
        card.innerHTML = `
            <div class="crypto-header">
                <img src="https://assets.coingecko.com/coins/images/${this.getCoinImageId(crypto.id)}/small/${crypto.id}.png" 
                     alt="${crypto.name}" class="crypto-icon" 
                     onerror="this.src='https://via.placeholder.com/40/3498db/ffffff?text=${crypto.symbol}'">
                <div class="crypto-info">
                    <h3>${crypto.name}</h3>
                    <span class="crypto-symbol">${crypto.symbol}</span>
                </div>
            </div>
            
            <div class="crypto-prices">
                <div class="price-item">
                    <div class="price-label">Precio USD</div>
                    <div class="price-value" id="price-usd-${crypto.id}">
                        <div class="loading"></div>
                    </div>
                    <div class="price-change" id="change-${crypto.id}"></div>
                </div>
                <div class="price-item">
                    <div class="price-label">Precio EUR</div>
                    <div class="price-value" id="price-eur-${crypto.id}">
                        <div class="loading"></div>
                    </div>
                </div>
            </div>
            
            <div class="amount-input-group">
                <label for="amount-${crypto.id}">Cantidad que posees:</label>
                <input type="number" 
                       id="amount-${crypto.id}" 
                       class="amount-input" 
                       placeholder="0.00" 
                       step="0.00000001"
                       value="${AppState.portfolioAmounts[crypto.id] || ''}"
                       onchange="cryptoTracker.updatePortfolioAmount('${crypto.id}', this.value)">
            </div>
            
            <div class="portfolio-value">
                <div class="portfolio-item">
                    <div class="portfolio-label">Valor USD</div>
                    <div class="portfolio-amount" id="portfolio-usd-${crypto.id}">$0.00</div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-label">Valor EUR</div>
                    <div class="portfolio-amount" id="portfolio-eur-${crypto.id}">€0.00</div>
                </div>
            </div>
        `;
        return card;
    }

    getCoinImageId(coinId) {
        const imageIds = {
            'bitcoin': '1',
            'ethereum': '279',
            'binancecoin': '825',
            'cardano': '975',
            'solana': '4128',
            'polkadot': '12171'
        };
        return imageIds[coinId] || '1';
    }

    updateCryptoCards() {
        Object.values(AppState.cryptoData).forEach(crypto => {
            const priceUsdEl = document.getElementById(`price-usd-${crypto.id}`);
            const priceEurEl = document.getElementById(`price-eur-${crypto.id}`);
            const changeEl = document.getElementById(`change-${crypto.id}`);

            if (priceUsdEl) {
                priceUsdEl.textContent = `$${crypto.price.toFixed(2)}`;
            }
            
            if (priceEurEl) {
                const eurPrice = crypto.price * AppState.exchangeRates.eur;
                priceEurEl.textContent = `€${eurPrice.toFixed(2)}`;
            }
            
            if (changeEl) {
                const change = crypto.change24h;
                changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
                changeEl.className = `price-change ${change >= 0 ? 'positive' : 'negative'}`;
            }

            this.updatePortfolioValues(crypto.id);
        });
    }

    updatePortfolioAmount(cryptoId, amount) {
        AppState.portfolioAmounts[cryptoId] = parseFloat(amount) || 0;
        this.updatePortfolioValues(cryptoId);
        this.updatePortfolioSummary();
        this.savePortfolioData();
    }

    updatePortfolioValues(cryptoId) {
        const crypto = AppState.cryptoData[cryptoId];
        const amount = AppState.portfolioAmounts[cryptoId] || 0;
        
        if (crypto && amount > 0) {
            const usdValue = crypto.price * amount;
            const eurValue = usdValue * AppState.exchangeRates.eur;
            
            const usdEl = document.getElementById(`portfolio-usd-${cryptoId}`);
            const eurEl = document.getElementById(`portfolio-eur-${cryptoId}`);
            
            if (usdEl) usdEl.textContent = `$${usdValue.toFixed(2)}`;
            if (eurEl) eurEl.textContent = `€${eurValue.toFixed(2)}`;
        } else {
            const usdEl = document.getElementById(`portfolio-usd-${cryptoId}`);
            const eurEl = document.getElementById(`portfolio-eur-${cryptoId}`);
            
            if (usdEl) usdEl.textContent = '$0.00';
            if (eurEl) eurEl.textContent = '€0.00';
        }
    }

    updatePortfolioSummary() {
        let totalUsd = 0;
        
        Object.keys(AppState.portfolioAmounts).forEach(cryptoId => {
            const crypto = AppState.cryptoData[cryptoId];
            const amount = AppState.portfolioAmounts[cryptoId] || 0;
            
            if (crypto && amount > 0) {
                totalUsd += crypto.price * amount;
            }
        });
        
        const totalEur = totalUsd * AppState.exchangeRates.eur;
        
        document.getElementById('totalUSD').textContent = `$${totalUsd.toFixed(2)}`;
        document.getElementById('totalEUR').textContent = `€${totalEur.toFixed(2)}`;
    }

    async initializeChart() {
        const ctx = document.getElementById('priceChart').getContext('2d');
        
        // Obtener datos históricos para Bitcoin por defecto
        const historicalData = await this.fetchHistoricalData('bitcoin', 7);
        
        const labels = historicalData.map(point => {
            const date = new Date(point[0]);
            return date.toLocaleDateString();
        });
        
        const prices = historicalData.map(point => point[1]);
        
        AppState.priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Bitcoin (BTC)',
                    data: prices,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--text-primary')
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--text-secondary')
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--border-color')
                        }
                    },
                    y: {
                        ticks: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--text-secondary'),
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--border-color')
                        }
                    }
                }
            }
        });
    }

    async loadPortfolioData() {
        // Intentar cargar desde Firebase primero
        const firebaseData = await FirebaseService.loadPortfolio();
        if (firebaseData) {
            AppState.portfolioAmounts = firebaseData;
            console.log('Datos cargados desde Firebase');
            return;
        }
        
        // Fallback a localStorage
        const localData = localStorage.getItem('cryptoPortfolio');
        if (localData) {
            try {
                AppState.portfolioAmounts = JSON.parse(localData);
                console.log('Datos cargados desde localStorage');
            } catch (error) {
                console.error('Error parsing localStorage data:', error);
                AppState.portfolioAmounts = {};
            }
        }
    }

    async savePortfolioData() {
        // Guardar en localStorage
        localStorage.setItem('cryptoPortfolio', JSON.stringify(AppState.portfolioAmounts));
        
        // Intentar guardar en Firebase
        const saved = await FirebaseService.savePortfolio(AppState.portfolioAmounts);
        if (saved) {
            console.log('Datos guardados en Firebase');
        } else {
            console.log('Datos guardados solo en localStorage');
        }
    }

    exportData() {
        const exportData = {
            portfolioAmounts: AppState.portfolioAmounts,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `crypto-portfolio-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }

    async importData(file) {
        if (!file) return;
        
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            if (data.portfolioAmounts) {
                AppState.portfolioAmounts = data.portfolioAmounts;
                
                // Actualizar los inputs
                Object.keys(AppState.portfolioAmounts).forEach(cryptoId => {
                    const input = document.getElementById(`amount-${cryptoId}`);
                    if (input) {
                        input.value = AppState.portfolioAmounts[cryptoId];
                    }
                });
                
                this.updateCryptoCards();
                this.updatePortfolioSummary();
                await this.savePortfolioData();
                
                alert('Datos importados correctamente');
            } else {
                alert('Formato de archivo inválido');
            }
        } catch (error) {
            console.error('Error importing data:', error);
            alert('Error al importar el archivo');
        }
    }

    startPeriodicUpdates() {
        // Actualizar precios cada 30 segundos
        setInterval(() => {
            this.fetchCryptoData();
        }, CONFIG.updateInterval);
        
        // Actualizar gráfico cada 5 minutos
        setInterval(() => {
            this.updateChart();
        }, CONFIG.chartUpdateInterval);
    }

    async updateChart() {
        if (!AppState.priceChart) return;
        
        const historicalData = await this.fetchHistoricalData('bitcoin', 7);
        
        const labels = historicalData.map(point => {
            const date = new Date(point[0]);
            return date.toLocaleDateString();
        });
        
        const prices = historicalData.map(point => point[1]);
        
        AppState.priceChart.data.labels = labels;
        AppState.priceChart.data.datasets[0].data = prices;
        AppState.priceChart.update();
    }
}

// Inicializar la aplicación cuando el DOM esté listo
let cryptoTracker;
document.addEventListener('DOMContentLoaded', () => {
    cryptoTracker = new CryptoTracker();
});