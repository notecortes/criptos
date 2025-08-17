// Lista completa de criptomonedas disponibles
const AVAILABLE_CRYPTOS = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", imageId: "1" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", imageId: "279" },
  { id: "binancecoin", name: "Binance Coin", symbol: "BNB", imageId: "825" },
  { id: "cardano", name: "Cardano", symbol: "ADA", imageId: "975" },
  { id: "solana", name: "Solana", symbol: "SOL", imageId: "4128" },
  { id: "polkadot", name: "Polkadot", symbol: "DOT", imageId: "12171" },
  { id: "chainlink", name: "Chainlink", symbol: "LINK", imageId: "1597" },
  { id: "litecoin", name: "Litecoin", symbol: "LTC", imageId: "2" },
  { id: "polygon", name: "Polygon", symbol: "MATIC", imageId: "4713" },
  { id: "avalanche-2", name: "Avalanche", symbol: "AVAX", imageId: "12559" },
  { id: "uniswap", name: "Uniswap", symbol: "UNI", imageId: "12504" },
  { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", imageId: "5" },
  { id: "shiba-inu", name: "Shiba Inu", symbol: "SHIB", imageId: "18323" },
  { id: "pepe", name: "Pepe", symbol: "PEPE", imageId: "29850" },
  { id: "ripple", name: "XRP", symbol: "XRP", imageId: "44" },
  { id: "stellar", name: "Stellar", symbol: "XLM", imageId: "100" },
  { id: "cosmos", name: "Cosmos", symbol: "ATOM", imageId: "3794" },

  // Criptomonedas adicionales populares
  { id: "tron", name: "TRON", symbol: "TRX", imageId: "1094" },
  { id: "near", name: "NEAR Protocol", symbol: "NEAR", imageId: "10365" },
  { id: "algorand", name: "Algorand", symbol: "ALGO", imageId: "4030" },
  { id: "vechain", name: "VeChain", symbol: "VET", imageId: "1063" },
  { id: "filecoin", name: "Filecoin", symbol: "FIL", imageId: "5817" },
  {
    id: "internet-computer",
    name: "Internet Computer",
    symbol: "ICP",
    imageId: "14495",
  },
  { id: "hedera-hashgraph", name: "Hedera", symbol: "HBAR", imageId: "4642" },
  { id: "the-sandbox", name: "The Sandbox", symbol: "SAND", imageId: "12493" },
  { id: "decentraland", name: "Decentraland", symbol: "MANA", imageId: "878" },
  {
    id: "axie-infinity",
    name: "Axie Infinity",
    symbol: "AXS",
    imageId: "13029",
  },
  { id: "fantom", name: "Fantom", symbol: "FTM", imageId: "4001" },
  {
    id: "theta-token",
    name: "Theta Network",
    symbol: "THETA",
    imageId: "2416",
  },
  { id: "elrond-erd-2", name: "MultiversX", symbol: "EGLD", imageId: "12335" },
  { id: "flow", name: "Flow", symbol: "FLOW", imageId: "13446" },
  { id: "tezos", name: "Tezos", symbol: "XTZ", imageId: "2685" },
  { id: "aave", name: "Aave", symbol: "AAVE", imageId: "12645" },
  {
    id: "compound-governance-token",
    name: "Compound",
    symbol: "COMP",
    imageId: "10775",
  },
  { id: "maker", name: "Maker", symbol: "MKR", imageId: "1364" },
  { id: "sushi", name: "SushiSwap", symbol: "SUSHI", imageId: "12271" },
  { id: "1inch", name: "1inch Network", symbol: "1INCH", imageId: "13469" },
  {
    id: "pancakeswap-token",
    name: "PancakeSwap",
    symbol: "CAKE",
    imageId: "12632",
  },
  {
    id: "curve-dao-token",
    name: "Curve DAO Token",
    symbol: "CRV",
    imageId: "12124",
  },
  {
    id: "yearn-finance",
    name: "Yearn Finance",
    symbol: "YFI",
    imageId: "11849",
  },
  {
    id: "synthetix-network-token",
    name: "Synthetix",
    symbol: "SNX",
    imageId: "3406",
  },
  {
    id: "basic-attention-token",
    name: "Basic Attention Token",
    symbol: "BAT",
    imageId: "677",
  },
  { id: "enjincoin", name: "Enjin Coin", symbol: "ENJ", imageId: "1102" },
  { id: "chiliz", name: "Chiliz", symbol: "CHZ", imageId: "8834" },
  { id: "loopring", name: "Loopring", symbol: "LRC", imageId: "913" },
  { id: "gala", name: "Gala", symbol: "GALA", imageId: "12493" },
  { id: "immutable-x", name: "Immutable X", symbol: "IMX", imageId: "17233" },
  { id: "apecoin", name: "ApeCoin", symbol: "APE", imageId: "18876" },
  { id: "deepspace", name: "deepspace", symbol: "deepspace", imageId: "17953" },
];

// Configuración por defecto
const DEFAULT_CONFIG = {
  selectedCryptos: [
    "bitcoin",
    "ethereum",
    "dogecoin",
    "pepe"
  ],
  updateInterval: 30000, // 30 segundos
  chartUpdateInterval: 300000, // 5 minutos
  chartCrypto: "bitcoin",
  chartDays: 7,
};

// Configuración de la aplicación
let CONFIG = { ...DEFAULT_CONFIG };

// Estado global de la aplicación
const AppState = {
  cryptoData: {},
  portfolioAmounts: {},
  exchangeRates: { eur: 1 },
  priceChart: null,
  theme: localStorage.getItem("theme") || "light",
  updateIntervals: {
    price: null,
    chart: null,
  },
};

// Clase principal de la aplicación
class CryptoTracker {
  constructor() {
    this.initializeApp();
  }

  async initializeApp() {
    try {
      console.log('Starting app initialization...');
      
      await this.loadConfiguration();
      console.log('Configuration loaded');
      
      this.setupEventListeners();
      console.log('Event listeners setup');
      
      this.applyTheme();
      console.log('Theme applied');
      
      await this.loadPortfolioData();
      console.log('Portfolio data loaded');
      
      await this.fetchExchangeRates();
      console.log('Exchange rates fetched');
      
      await this.fetchCryptoData();
      console.log('Crypto data fetched');
      
      this.renderCryptoCards();
      console.log('Crypto cards rendered');
      
      // Verificar que Chart.js está disponible antes de inicializar
      if (typeof Chart !== 'undefined') {
        await this.initializeChart();
        console.log('Chart initialized');
      } else {
        console.warn('Chart.js not available, skipping chart initialization');
      }
      
      this.setupSettingsModal();
      console.log('Settings modal setup');
      
      this.startPeriodicUpdates();
      console.log('Periodic updates started');
      
      console.log('App initialization completed successfully');
      
    } catch (error) {
      console.error('Error initializing app:', error);
      // Mostrar mensaje de error al usuario
      document.body.innerHTML = `
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif; background: #f8f9fa;">
          <h2 style="color: #e74c3c;">Error al cargar la aplicación</h2>
          <p style="color: #7f8c8d;">Detalles del error: ${error.message}</p>
          <button onclick="location.reload()" style="padding: 10px 20px; font-size: 16px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">Recargar Página</button>
        </div>
      `;
    }
  }

  setupEventListeners() {
    // Toggle de tema
    document.getElementById("themeToggle").addEventListener("click", () => {
      this.toggleTheme();
    });

    // Exportar datos
    document.getElementById("exportBtn").addEventListener("click", () => {
      this.exportData();
    });

    // Importar datos
    document.getElementById("importBtn").addEventListener("click", () => {
      document.getElementById("importFile").click();
    });

    document.getElementById("importFile").addEventListener("change", (e) => {
      this.importData(e.target.files[0]);
    });

    // Configuración
    document.getElementById("settingsBtn").addEventListener("click", () => {
      this.openSettingsModal();
    });

    document.getElementById("closeSettings").addEventListener("click", () => {
      this.closeSettingsModal();
    });

    document.getElementById("saveSettings").addEventListener("click", () => {
      this.saveConfiguration();
    });

    document.getElementById("resetSettings").addEventListener("click", () => {
      this.resetConfiguration();
    });

    // Cerrar modal al hacer clic fuera
    document.getElementById("settingsModal").addEventListener("click", (e) => {
      if (e.target.id === "settingsModal") {
        this.closeSettingsModal();
      }
    });

    // Controles del gráfico
    document.querySelectorAll('.btn-chart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remover clase active de todos los botones
        document.querySelectorAll('.btn-chart').forEach(b => b.classList.remove('active'));
        // Añadir clase active al botón clickeado
        e.target.classList.add('active');
        
        const chartType = e.target.dataset.type;
        this.updateChartType(chartType);
      });
    });

    // Mostrar modales
    document.getElementById('alertsBtn').addEventListener('click', () => {
      document.getElementById('alertsModal').style.display = 'block';
    });
    document.getElementById('analysisBtn').addEventListener('click', () => {
      document.getElementById('analysisModal').style.display = 'block';
    });

    // Cerrar modales
    document.getElementById('closeAlerts').addEventListener('click', () => {
      document.getElementById('alertsModal').style.display = 'none';
    });
    document.getElementById('closeAnalysis').addEventListener('click', () => {
      document.getElementById('analysisModal').style.display = 'none';
    });

    // Opcional: cerrar modal al hacer click fuera del contenido
    window.addEventListener('click', function(event) {
      if (event.target === document.getElementById('alertsModal')) {
        document.getElementById('alertsModal').style.display = 'none';
      }
      if (event.target === document.getElementById('analysisModal')) {
        document.getElementById('analysisModal').style.display = 'none';
      }
    });
  }

  toggleTheme() {
    AppState.theme = AppState.theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", AppState.theme);
    this.applyTheme();
  }

  applyTheme() {
    document.documentElement.setAttribute("data-theme", AppState.theme);
    const themeIcon = document.querySelector("#themeToggle i");
    themeIcon.className =
      AppState.theme === "light" ? "fas fa-moon" : "fas fa-sun";
  }

  async fetchExchangeRates() {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      AppState.exchangeRates.eur = data.rates.EUR;
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      AppState.exchangeRates.eur = 0.85; // Fallback rate
    }
  }

  // Cambia fetchCryptoData para guardar la URL de imagen de la API:
  async fetchCryptoData() {
    try {
      const selectedCryptos = this.getSelectedCryptos();
      const ids = selectedCryptos.map((crypto) => crypto.id).join(",");
      // Usamos el endpoint markets para obtener la imagen correcta
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      selectedCryptos.forEach((crypto) => {
        const coin = data.find((c) => c.id === crypto.id);
        if (coin) {
          AppState.cryptoData[crypto.id] = {
            ...crypto,
            price: coin.current_price || 0,
            change24h: coin.price_change_percentage_24h || 0,
            image: coin.image, // URL de imagen correcta
          };
        } else {
          AppState.cryptoData[crypto.id] = {
            ...crypto,
            price: 0,
            change24h: 0,
            image: "", // fallback vacío
          };
        }
      });

      this.updateCryptoCards();
      this.updatePortfolioSummary();

      if (typeof alertsManager !== "undefined") {
        alertsManager.checkAlerts(AppState.cryptoData);
      }
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  }

  async fetchHistoricalData(cryptoId, days = 7) {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=${days}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.prices && Array.isArray(data.prices) && data.prices.length > 0) {
        return data.prices;
      } else {
        console.warn(`No valid historical data for ${cryptoId}`);
        return [];
      }
    } catch (error) {
      console.error("Error fetching historical data:", error);
      return [];
    }
  }

  renderCryptoCards() {
    const grid = document.getElementById("cryptoGrid");
    grid.innerHTML = "";

    const selectedCryptos = this.getSelectedCryptos();
    selectedCryptos.forEach((crypto) => {
      const card = this.createCryptoCard(crypto);
      grid.appendChild(card);
    });
  }

  // Modifica createCryptoCard para usar la imagen de la API y el formateo correcto:
  createCryptoCard(crypto) {
    const card = document.createElement("div");
    card.className = "crypto-card";
    // Usa la imagen de la API si está disponible, si no, intenta la antigua, y si tampoco, muestra SVG fallback
    const imgSrc =
      AppState.cryptoData[crypto.id]?.image ||
      `https://assets.coingecko.com/coins/images/${crypto.imageId}/small/${crypto.id}.png`;
    card.innerHTML = `
    <div class="crypto-header">
      <img src="${imgSrc}" 
           alt="${crypto.name}" class="crypto-icon" 
           onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMzNDk4ZGIiLz4KPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj4ke crypto.symbol}</dGV4dD4KPC9zdmc+'">
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
             value="${AppState.portfolioAmounts[crypto.id] || ""}"
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

  getSelectedCryptos() {
    return AVAILABLE_CRYPTOS.filter((crypto) =>
      CONFIG.selectedCryptos.includes(crypto.id)
    );
  }

  formatPrice(price) {
    if (!price || price === 0) return '$0.00';
    
    // Para precios muy pequeños (menos de $0.01), mostrar más decimales
    if (price < 0.01) {
      // Encontrar el primer dígito significativo
      const str = price.toString();
      const scientificMatch = str.match(/e-(\d+)/);
      
      if (scientificMatch) {
        const decimals = parseInt(scientificMatch[1]) + 2;
        return `$${price.toFixed(Math.min(decimals, 10))}`;
      } else {
        // Para números muy pequeños sin notación científica
        if (price < 0.000001) {
          return `$${price.toFixed(8)}`;
        } else if (price < 0.0001) {
          return `$${price.toFixed(6)}`;
        } else {
          return `$${price.toFixed(4)}`;
        }
      }
    }
    
    // Para precios normales
    return `$${price.toFixed(2)}`;
  }

  formatPercentage(percentage) {
    if (!percentage && percentage !== 0) return '0.00%';
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  }

  async verifyAndFixCryptoIds() {
    // Simplificar para evitar problemas de memoria
    console.log('Verifying crypto IDs...');
    // Solo verificar si hay problemas específicos reportados
  }

  // Funciones simplificadas para evitar problemas de memoria

  updateCryptoCards() {
    Object.values(AppState.cryptoData).forEach((crypto) => {
      const priceUsdEl = document.getElementById(`price-usd-${crypto.id}`);
      const priceEurEl = document.getElementById(`price-eur-${crypto.id}`);
      const changeEl = document.getElementById(`change-${crypto.id}`);

      if (priceUsdEl) {
        priceUsdEl.textContent = formatPrice(crypto.symbol, crypto.price);
      }

      if (priceEurEl) {
        const eurPrice = crypto.price * AppState.exchangeRates.eur;
        priceEurEl.textContent =
          "€" + (eurPrice < 0.01 ? eurPrice.toFixed(6) : eurPrice.toFixed(2));
      }

      if (changeEl) {
        const change = crypto.change24h;
        changeEl.textContent = this.formatPercentage(change);
        changeEl.className = `price-change ${
          change >= 0 ? "positive" : "negative"
        }`;
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

      if (usdEl) usdEl.textContent = "$0.00";
      if (eurEl) eurEl.textContent = "€0.00";
    }
  }

  updatePortfolioSummary() {
    let totalUsd = 0;

    Object.keys(AppState.portfolioAmounts).forEach((cryptoId) => {
      const crypto = AppState.cryptoData[cryptoId];
      const amount = AppState.portfolioAmounts[cryptoId] || 0;

      if (crypto && amount > 0) {
        totalUsd += crypto.price * amount;
      }
    });

    const totalEur = totalUsd * AppState.exchangeRates.eur;

    document.getElementById("totalUSD").textContent = `$${totalUsd.toFixed(2)}`;
    document.getElementById("totalEUR").textContent = `€${totalEur.toFixed(2)}`;
  }

  async initializeChart() {
    try {
      const ctx = document.getElementById("priceChart");
      if (!ctx) {
        console.warn('Chart canvas not found');
        return;
      }

      const chartCtx = ctx.getContext("2d");
      
      // Crear gráfico básico con datos estáticos seguros
      AppState.priceChart = new Chart(chartCtx, {
        type: "line",
        data: {
          labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5'],
          datasets: [{
            label: 'Cargando datos...',
            data: [50000, 51000, 49000, 52000, 53000],
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          }]
        },
        options: this.getChartOptions()
      });

      console.log('Chart initialized successfully');

      // Cargar datos reales después, pero solo si la app está completamente inicializada
      setTimeout(() => {
        if (AppState.cryptoData && Object.keys(AppState.cryptoData).length > 0) {
          console.log('Updating chart with real data...');
          this.updateChart();
        } else {
          console.log('Crypto data not ready yet, keeping placeholder chart');
        }
      }, 5000);

    } catch (error) {
      console.error('Error initializing chart:', error);
    }
  }

  getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--text-primary"),
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--text-secondary"),
          },
          grid: {
            color: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--border-color"),
          },
        },
        y: {
          ticks: {
            color: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--text-secondary"),
            callback: function (value) {
              return "$" + value.toLocaleString();
            },
          },
          grid: {
            color: getComputedStyle(
              document.documentElement
            ).getPropertyValue("--border-color"),
            },
          },
        },
      };
  }

  async loadPortfolioData() {
    // Intentar cargar desde Firebase primero
    const firebaseData = await FirebaseService.loadPortfolio();
    if (firebaseData) {
      AppState.portfolioAmounts = firebaseData;
      console.log("Datos cargados desde Firebase");
      return;
    }

    // Fallback a localStorage
    const localData = localStorage.getItem("cryptoPortfolio");
    if (localData) {
      try {
        AppState.portfolioAmounts = JSON.parse(localData);
        console.log("Datos cargados desde localStorage");
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        AppState.portfolioAmounts = {};
      }
    }
  }

  async savePortfolioData() {
    // Guardar en localStorage
    localStorage.setItem(
      "cryptoPortfolio",
      JSON.stringify(AppState.portfolioAmounts)
    );

    // Intentar guardar en Firebase
    const saved = await FirebaseService.savePortfolio(
      AppState.portfolioAmounts
    );
    if (saved) {
      console.log("Datos guardados en Firebase");
    } else {
      console.log("Datos guardados solo en localStorage");
    }
  }

  exportData() {
    const exportData = {
      // Datos del portfolio
      portfolioAmounts: AppState.portfolioAmounts,

      // Configuración y preferencias
      configuration: {
        selectedCryptos: CONFIG.selectedCryptos,
        updateInterval: CONFIG.updateInterval,
        chartUpdateInterval: CONFIG.chartUpdateInterval,
        chartCrypto: CONFIG.chartCrypto,
        chartDays: CONFIG.chartDays,
      },

      // Preferencias de tema
      theme: AppState.theme,

      // Metadatos
      exportDate: new Date().toISOString(),
      version: "2.0",
      appName: "CryptoTracker",
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(dataBlob);
    link.download = `cryptotracker-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    link.click();

    // Mostrar mensaje de confirmación
    alert(
      `✅ Backup exportado correctamente!\n\n📊 Portfolio: ${
        Object.keys(AppState.portfolioAmounts).length
      } criptomonedas\n⚙️ Configuración: ${
        CONFIG.selectedCryptos.length
      } cryptos seleccionadas\n🎨 Tema: ${AppState.theme}`
    );
  }

  async importData(file) {
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Verificar que es un archivo válido
      if (!data.portfolioAmounts && !data.configuration) {
        alert(
          "❌ Formato de archivo inválido\n\nEl archivo debe contener datos de CryptoTracker."
        );
        return;
      }

      let importedItems = [];

      // Importar datos del portfolio
      if (data.portfolioAmounts) {
        AppState.portfolioAmounts = data.portfolioAmounts;
        importedItems.push(
          `📊 Portfolio: ${
            Object.keys(data.portfolioAmounts).length
          } criptomonedas`
        );
      }

      // Importar configuración
      if (data.configuration) {
        // Validar que las criptomonedas seleccionadas existen
        const validCryptos =
          data.configuration.selectedCryptos?.filter((cryptoId) =>
            AVAILABLE_CRYPTOS.some((crypto) => crypto.id === cryptoId)
          ) || CONFIG.selectedCryptos;

        CONFIG.selectedCryptos = validCryptos;
        CONFIG.updateInterval =
          data.configuration.updateInterval || CONFIG.updateInterval;
        CONFIG.chartUpdateInterval =
          data.configuration.chartUpdateInterval || CONFIG.chartUpdateInterval;
        CONFIG.chartCrypto =
          data.configuration.chartCrypto || CONFIG.chartCrypto;
        CONFIG.chartDays = data.configuration.chartDays || CONFIG.chartDays;

        // Guardar configuración
        localStorage.setItem("cryptoTrackerConfig", JSON.stringify(CONFIG));

        importedItems.push(
          `⚙️ Configuración: ${validCryptos.length} cryptos seleccionadas`
        );
        importedItems.push(
          `⏱️ Intervalos: ${CONFIG.updateInterval / 1000}s precios, ${
            CONFIG.chartUpdateInterval / 60000
          }min gráficos`
        );
      }

      // Importar tema
      if (data.theme) {
        AppState.theme = data.theme;
        localStorage.setItem("theme", AppState.theme);
        this.applyTheme();
        importedItems.push(`🎨 Tema: ${data.theme}`);
      }

      // Aplicar todos los cambios
      this.clearIntervals();
      await this.fetchCryptoData();
      this.renderCryptoCards();

      // Actualizar los inputs del portfolio
      Object.keys(AppState.portfolioAmounts).forEach((cryptoId) => {
        const input = document.getElementById(`amount-${cryptoId}`);
        if (input) {
          input.value = AppState.portfolioAmounts[cryptoId];
        }
      });

      this.updateCryptoCards();
      this.updatePortfolioSummary();
      await this.updateChart();
      this.startPeriodicUpdates();
      await this.savePortfolioData();

      // Mostrar mensaje de confirmación detallado
      const versionInfo = data.version ? `\n📦 Versión: ${data.version}` : "";
      const dateInfo = data.exportDate
        ? `\n📅 Exportado: ${new Date(data.exportDate).toLocaleString()}`
        : "";

      alert(
        `✅ Backup importado correctamente!\n\n${importedItems.join(
          "\n"
        )}${versionInfo}${dateInfo}`
      );
    } catch (error) {
      console.error("Error importing data:", error);
      alert(
        "❌ Error al importar el archivo\n\nVerifica que el archivo sea un backup válido de CryptoTracker."
      );
    }
  }

  startPeriodicUpdates() {
    // Limpiar intervalos existentes
    this.clearIntervals();

    // Actualizar precios
    AppState.updateIntervals.price = setInterval(() => {
      this.fetchCryptoData();
    }, CONFIG.updateInterval);

    // Actualizar gráfico
    AppState.updateIntervals.chart = setInterval(() => {
      this.updateChart();
    }, CONFIG.chartUpdateInterval);
  }

  clearIntervals() {
    if (AppState.updateIntervals.price) {
      clearInterval(AppState.updateIntervals.price);
    }
    if (AppState.updateIntervals.chart) {
      clearInterval(AppState.updateIntervals.chart);
    }
  }

  // Funciones del Modal de Configuración
  openSettingsModal() {
    const modal = document.getElementById("settingsModal");
    modal.classList.add("show");
    this.populateSettingsModal();
  }

  closeSettingsModal() {
    const modal = document.getElementById("settingsModal");
    modal.classList.remove("show");
  }

  setupSettingsModal() {
    this.populateSettingsModal();
  }

  populateSettingsModal() {
    // Poblar selección de criptomonedas
    const cryptoSelection = document.getElementById("cryptoSelection");
    cryptoSelection.innerHTML = "";

    AVAILABLE_CRYPTOS.forEach((crypto) => {
      const isSelected = CONFIG.selectedCryptos.includes(crypto.id);
      const checkboxDiv = document.createElement("div");
      checkboxDiv.className = `crypto-checkbox ${isSelected ? "selected" : ""}`;

      checkboxDiv.innerHTML = `
                <input type="checkbox" id="crypto-${crypto.id}" ${
        isSelected ? "checked" : ""
      }>
                <div class="crypto-checkbox-info">
                    <img src="https://assets.coingecko.com/coins/images/${
                      crypto.imageId
                    }/small/${crypto.id}.png" 
                         alt="${crypto.name}" class="crypto-checkbox-icon"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiMzNDk4ZGIiLz4KPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPiR7crypto.symbol}</dGV4dD4KPC9zdmc+'">
                    <div class="crypto-checkbox-text">
                        <span class="crypto-checkbox-name">${crypto.name}</span>
                        <span class="crypto-checkbox-symbol">${
                          crypto.symbol
                        }</span>
                    </div>
                </div>
            `;

      // Event listener para el checkbox
      const checkbox = checkboxDiv.querySelector('input[type="checkbox"]');
      checkbox.addEventListener("change", () => {
        checkboxDiv.classList.toggle("selected", checkbox.checked);
      });

      // Event listener para el div completo
      checkboxDiv.addEventListener("click", (e) => {
        if (e.target.type !== "checkbox") {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event("change"));
        }
      });

      cryptoSelection.appendChild(checkboxDiv);
    });

    // Poblar intervalos
    document.getElementById("priceInterval").value = CONFIG.updateInterval;
    document.getElementById("chartInterval").value = CONFIG.chartUpdateInterval;

    // Poblar configuración del gráfico
    const chartCryptoSelect = document.getElementById("chartCrypto");
    chartCryptoSelect.innerHTML = "";
    this.getSelectedCryptos().forEach((crypto) => {
      const option = document.createElement("option");
      option.value = crypto.id;
      option.textContent = `${crypto.name} (${crypto.symbol})`;
      if (crypto.id === CONFIG.chartCrypto) {
        option.selected = true;
      }
      chartCryptoSelect.appendChild(option);
    });

    document.getElementById("chartDays").value = CONFIG.chartDays;
  }

  async saveConfiguration() {
    // Obtener criptomonedas seleccionadas
    const selectedCryptos = [];
    AVAILABLE_CRYPTOS.forEach((crypto) => {
      const checkbox = document.getElementById(`crypto-${crypto.id}`);
      if (checkbox && checkbox.checked) {
        selectedCryptos.push(crypto.id);
      }
    });

    if (selectedCryptos.length === 0) {
      alert("Debes seleccionar al menos una criptomoneda");
      return;
    }

    // Actualizar configuración
    CONFIG.selectedCryptos = selectedCryptos;
    CONFIG.updateInterval = parseInt(
      document.getElementById("priceInterval").value
    );
    CONFIG.chartUpdateInterval = parseInt(
      document.getElementById("chartInterval").value
    );
    CONFIG.chartCrypto = document.getElementById("chartCrypto").value;
    CONFIG.chartDays = parseInt(document.getElementById("chartDays").value);

    // Guardar en localStorage
    localStorage.setItem("cryptoTrackerConfig", JSON.stringify(CONFIG));

    // Aplicar cambios
    this.clearIntervals();
    await this.fetchCryptoData();
    this.renderCryptoCards();
    await this.updateChart();
    this.startPeriodicUpdates();

    this.closeSettingsModal();
    alert("Configuración guardada correctamente");
  }

  resetConfiguration() {
    if (
      confirm(
        "¿Estás seguro de que quieres restablecer la configuración por defecto?"
      )
    ) {
      CONFIG = { ...DEFAULT_CONFIG };
      localStorage.removeItem("cryptoTrackerConfig");
      this.populateSettingsModal();
    }
  }

  async loadConfiguration() {
    const savedConfig = localStorage.getItem("cryptoTrackerConfig");
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        CONFIG = { ...DEFAULT_CONFIG, ...parsedConfig };
      } catch (error) {
        console.error("Error loading configuration:", error);
        CONFIG = { ...DEFAULT_CONFIG };
      }
    }
  }

  async updateChart() {
    try {
      if (!AppState.priceChart) {
        console.warn('Chart not initialized');
        return;
      }

      const cryptoData = AVAILABLE_CRYPTOS.find(
        (c) => c.id === CONFIG.chartCrypto
      );
      
      const historicalData = await this.fetchHistoricalData(
        CONFIG.chartCrypto,
        CONFIG.chartDays
      );

      // Validar que tenemos datos históricos válidos
      if (!historicalData || !Array.isArray(historicalData) || historicalData.length === 0) {
        console.warn('No valid historical data available for chart update');
        // Actualizar con datos por defecto
        AppState.priceChart.data.labels = ['Sin datos'];
        AppState.priceChart.data.datasets[0].data = [0];
        AppState.priceChart.data.datasets[0].label = `${
          cryptoData?.name || "Bitcoin"
        } (${cryptoData?.symbol || "BTC"}) - Sin datos`;
        AppState.priceChart.update();
        return;
      }

      const labels = historicalData.map((point) => {
        const date = new Date(point[0]);
        return CONFIG.chartDays === 1
          ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : date.toLocaleDateString();
      });

      const prices = historicalData.map((point) => point[1]);

      AppState.priceChart.data.labels = labels;
      AppState.priceChart.data.datasets[0].data = prices;
      AppState.priceChart.data.datasets[0].label = `${
        cryptoData?.name || "Bitcoin"
      } (${cryptoData?.symbol || "BTC"})`;
      AppState.priceChart.update();
      
    } catch (error) {
      console.error('Error updating chart:', error);
    }
  }

  async updateChartType(type) {
    const cryptoData = AVAILABLE_CRYPTOS.find(c => c.id === CONFIG.chartCrypto);
    const chartTitle = document.getElementById('chartTitle');
    
    switch (type) {
        case 'price':
            chartTitle.textContent = `Gráfico de Precios - ${cryptoData?.name || 'Bitcoin'}`;
            document.getElementById('technicalIndicators').style.display = 'none';
            await this.updateChart();
            break;
        case 'volume':
            chartTitle.textContent = `Volumen de Trading - ${cryptoData?.name || 'Bitcoin'}`;
            document.getElementById('technicalIndicators').style.display = 'none';
            await this.updateVolumeChart();
            break;
        case 'analysis':
            chartTitle.textContent = `Análisis Técnico - ${cryptoData?.name || 'Bitcoin'}`;
            document.getElementById('technicalIndicators').style.display = 'block';
            await this.updateAnalysisChart();
            break;
    }
  }

  async updateVolumeChart() {
    if (!AppState.priceChart) return;
    
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${CONFIG.chartCrypto}/market_chart?vs_currency=usd&days=${CONFIG.chartDays}`
        );
        const data = await response.json();
        
        if (data.total_volumes) {
            const labels = data.total_volumes.map(point => {
                const date = new Date(point[0]);
                return CONFIG.chartDays === 1 ? 
                    date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) :
                    date.toLocaleDateString();
            });
            
            const volumes = data.total_volumes.map(point => point[1]);
            
            AppState.priceChart.data.labels = labels;
            AppState.priceChart.data.datasets = [{
                label: 'Volumen',
                data: volumes,
                backgroundColor: 'rgba(52, 152, 219, 0.6)',
                borderColor: '#3498db',
                borderWidth: 1,
                type: 'bar'
            }];
            AppState.priceChart.update();
        }
    } catch (error) {
        console.error('Error fetching volume data:', error);
    }
  }

  async updateAnalysisChart() {
    if (!AppState.priceChart) return;
    
    const historicalData = await this.fetchHistoricalData(CONFIG.chartCrypto, CONFIG.chartDays);
    const labels = historicalData.map(point => {
        const date = new Date(point[0]);
        return CONFIG.chartDays === 1 ? 
            date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) :
            date.toLocaleDateString();
    });
    
    const prices = historicalData.map(point => point[1]);
    
    // Calcular indicadores técnicos básicos
    const sma20 = this.calculateSMAArray(prices, 20);
    const sma50 = this.calculateSMAArray(prices, 50);
    
    const datasets = [
        {
            label: 'Precio',
            data: prices,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 2,
            fill: false
        },
        {
            label: 'SMA 20',
            data: sma20,
            borderColor: '#e74c3c',
            borderWidth: 1,
            fill: false
        },
        {
            label: 'SMA 50',
            data: sma50,
            borderColor: '#f39c12',
            borderWidth: 1,
            fill: false
        }
    ];
    
    AppState.priceChart.data.labels = labels;
    AppState.priceChart.data.datasets = datasets;
    AppState.priceChart.update();
    
    // Mostrar indicadores técnicos
    this.showTechnicalIndicators(prices);
  }

  calculateSMAArray(prices, period) {
    const smaArray = [];
    for (let i = 0; i < prices.length; i++) {
        if (i < period - 1) {
            smaArray.push(null);
        } else {
            const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
            smaArray.push(sum / period);
        }
    }
    return smaArray;
  }

  showTechnicalIndicators(prices) {
    const container = document.getElementById('technicalIndicators');
    const currentPrice = prices[prices.length - 1];
    const sma20 = this.calculateSMA(prices, 20);
    const sma50 = this.calculateSMA(prices, 50);
    const rsi = this.calculateRSI(prices, 14);
    
    container.innerHTML = `
        <h4>Indicadores Técnicos</h4>
        <div class="indicators-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 15px;">
            <div class="indicator-item" style="background: var(--bg-card); padding: 15px; border-radius: 8px;">
                <strong>Precio Actual:</strong> $${currentPrice.toFixed(2)}
            </div>
            <div class="indicator-item" style="background: var(--bg-card); padding: 15px; border-radius: 8px;">
                <strong>SMA 20:</strong> $${sma20.toFixed(2)}
            </div>
            <div class="indicator-item" style="background: var(--bg-card); padding: 15px; border-radius: 8px;">
                <strong>SMA 50:</strong> $${sma50.toFixed(2)}
            </div>
            <div class="indicator-item" style="background: var(--bg-card); padding: 15px; border-radius: 8px;">
                <strong>RSI (14):</strong> ${rsi.toFixed(2)}
            </div>
        </div>
    `;
  }

  calculateSMA(prices, period) {
    if (prices.length < period) return 0;
    const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
    return sum / period;
  }

  calculateRSI(prices, period = 14) {
    if (prices.length < period + 1) return 50;
    
    let gains = 0;
    let losses = 0;
    
    for (let i = prices.length - period; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        if (change > 0) {
            gains += change;
        } else {
            losses -= change;
        }
    }
    
    const avgGain = gains / period;
    const avgLoss = losses / period;
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }
}

// Clase para manejo de alertas
class AlertsManager {
    constructor() {
        this.alerts = JSON.parse(localStorage.getItem('cryptoAlerts')) || [];
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('alertsBtn').addEventListener('click', () => {
            this.openAlertsModal();
        });

        document.getElementById('closeAlerts').addEventListener('click', () => {
            this.closeAlertsModal();
        });

        document.getElementById('createAlert').addEventListener('click', () => {
            this.createAlert();
        });
    }

    openAlertsModal() {
        const modal = document.getElementById('alertsModal');
        modal.classList.add('show');
        this.populateAlertsModal();
    }

    closeAlertsModal() {
        const modal = document.getElementById('alertsModal');
        modal.classList.remove('show');
    }

    populateAlertsModal() {
        // Poblar selector de criptomonedas
        const cryptoSelect = document.getElementById('alertCrypto');
        cryptoSelect.innerHTML = '';
        cryptoTracker.getSelectedCryptos().forEach(crypto => {
            const option = document.createElement('option');
            option.value = crypto.id;
            option.textContent = `${crypto.name} (${crypto.symbol})`;
            cryptoSelect.appendChild(option);
        });

        this.renderActiveAlerts();
    }

    createAlert() {
        const cryptoId = document.getElementById('alertCrypto').value;
        const type = document.getElementById('alertType').value;
        const value = parseFloat(document.getElementById('alertValue').value);
        const enabled = document.getElementById('alertEnabled').checked;

        if (!cryptoId || !value) {
            alert('Por favor completa todos los campos');
            return;
        }

        const crypto = AVAILABLE_CRYPTOS.find(c => c.id === cryptoId);
        const alert = {
            id: Date.now(),
            cryptoId,
            cryptoName: crypto.name,
            cryptoSymbol: crypto.symbol,
            type,
            value,
            enabled,
            created: new Date().toISOString()
        };

        this.alerts.push(alert);
        this.saveAlerts();
        this.renderActiveAlerts();

        // Limpiar formulario
        document.getElementById('alertValue').value = '';
        
        alert(`✅ Alerta creada para ${crypto.name}`);
    }

    renderActiveAlerts() {
        const container = document.getElementById('activeAlerts');
        container.innerHTML = '';

        if (this.alerts.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No hay alertas activas</p>';
            return;
        }

        this.alerts.forEach(alert => {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert-item';
            
            const conditionText = this.getConditionText(alert);
            
            alertDiv.innerHTML = `
                <div class="alert-info">
                    <div class="alert-crypto">${alert.cryptoName} (${alert.cryptoSymbol})</div>
                    <div class="alert-condition">${conditionText}</div>
                </div>
                <div class="alert-actions">
                    <button class="btn-alert edit" onclick="alertsManager.editAlert(${alert.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-alert delete" onclick="alertsManager.deleteAlert(${alert.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            container.appendChild(alertDiv);
        });
    }

    getConditionText(alert) {
        const typeTexts = {
            'above': `Precio por encima de $${alert.value}`,
            'below': `Precio por debajo de $${alert.value}`,
            'change': `Cambio del ${alert.value}%`
        };
        return typeTexts[alert.type] || 'Condición desconocida';
    }

    deleteAlert(alertId) {
        if (confirm('¿Estás seguro de que quieres eliminar esta alerta?')) {
            this.alerts = this.alerts.filter(alert => alert.id !== alertId);
            this.saveAlerts();
            this.renderActiveAlerts();
        }
    }

    checkAlerts(cryptoData) {
        this.alerts.forEach(alert => {
            if (!alert.enabled) return;
            
            const crypto = cryptoData[alert.cryptoId];
            if (!crypto) return;

            let triggered = false;
            let message = '';

            switch (alert.type) {
                case 'above':
                    if (crypto.price >= alert.value) {
                        triggered = true;
                        message = `${crypto.name} ha superado $${alert.value}. Precio actual: $${crypto.price.toFixed(2)}`;
                    }
                    break;
                case 'below':
                    if (crypto.price <= alert.value) {
                        triggered = true;
                        message = `${crypto.name} ha bajado de $${alert.value}. Precio actual: $${crypto.price.toFixed(2)}`;
                    }
                    break;
                case 'change':
                    if (Math.abs(crypto.change24h) >= alert.value) {
                        triggered = true;
                        message = `${crypto.name} ha cambiado ${crypto.change24h.toFixed(2)}% en 24h`;
                    }
                    break;
            }

            if (triggered) {
                this.showNotification(alert.cryptoName, message);
                // Desactivar alerta después de dispararse
                alert.enabled = false;
                this.saveAlerts();
            }
        });
    }

    showNotification(title, message) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(`🚨 ${title}`, {
                body: message,
                icon: '/manifest.json'
            });
        } else {
            // Fallback: mostrar alerta en la página
            const alertDiv = document.createElement('div');
            alertDiv.className = 'price-alert-notification';
            alertDiv.innerHTML = `
                <strong>${title}</strong><br>
                ${message}
            `;
            alertDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--accent-color);
                color: white;
                padding: 15px;
                border-radius: 10px;
                box-shadow: var(--shadow-hover);
                z-index: 1000;
                max-width: 300px;
            `;
            
            document.body.appendChild(alertDiv);
            
            setTimeout(() => {
                alertDiv.remove();
            }, 5000);
        }
    }

    saveAlerts() {
        localStorage.setItem('cryptoAlerts', JSON.stringify(this.alerts));
    }
}

// Clase para análisis técnico
class TechnicalAnalysis {
    constructor() {
        this.setupEventListeners();
        this.analysisChart = null;
    }

    setupEventListeners() {
        document.getElementById('analysisBtn').addEventListener('click', () => {
            this.openAnalysisModal();
        });

        document.getElementById('closeAnalysis').addEventListener('click', () => {
            this.closeAnalysisModal();
        });

        document.getElementById('analysisCrypto').addEventListener('change', () => {
            this.updateAnalysis();
        });

        // Event listeners para indicadores
        ['showMA', 'showRSI', 'showMACD', 'showBollinger'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                this.updateAnalysis();
            });
        });
    }

    openAnalysisModal() {
        const modal = document.getElementById('analysisModal');
        modal.classList.add('show');
        this.populateAnalysisModal();
    }

    closeAnalysisModal() {
        const modal = document.getElementById('analysisModal');
        modal.classList.remove('show');
    }

    populateAnalysisModal() {
        // Poblar selector de criptomonedas
        const cryptoSelect = document.getElementById('analysisCrypto');
        cryptoSelect.innerHTML = '';
        cryptoTracker.getSelectedCryptos().forEach(crypto => {
            const option = document.createElement('option');
            option.value = crypto.id;
            option.textContent = `${crypto.name} (${crypto.symbol})`;
            cryptoSelect.appendChild(option);
        });

        this.updateAnalysis();
    }

    async updateAnalysis() {
        const cryptoId = document.getElementById('analysisCrypto').value;
        if (!cryptoId) return;

        const crypto = AVAILABLE_CRYPTOS.find(c => c.id === cryptoId);
        const historicalData = await cryptoTracker.fetchHistoricalData(cryptoId, 30);
        
        this.renderAnalysisSummary(crypto, historicalData);
        this.renderTechnicalChart(crypto, historicalData);
        this.renderIndicators(historicalData);
    }

    renderAnalysisSummary(crypto, data) {
        const container = document.getElementById('analysisSummary');
        
        if (!data || data.length === 0) {
            container.innerHTML = '<p>No hay datos suficientes para el análisis</p>';
            return;
        }

        const prices = data.map(point => point[1]);
        const currentPrice = prices[prices.length - 1];
        const previousPrice = prices[prices.length - 2];
        const change = ((currentPrice - previousPrice) / previousPrice) * 100;
        
        const sma20 = this.calculateSMA(prices, 20);
        const rsi = this.calculateRSI(prices, 14);
        
        let trend = 'Neutral';
        let trendClass = '';
        
        if (currentPrice > sma20) {
            trend = 'Alcista';
            trendClass = 'bullish';
        } else if (currentPrice < sma20) {
            trend = 'Bajista';
            trendClass = 'bearish';
        }

        container.innerHTML = `
            <div class="summary-item">
                <span class="summary-label">Precio Actual</span>
                <span class="summary-value">$${currentPrice.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Cambio 24h</span>
                <span class="summary-value ${change >= 0 ? 'bullish' : 'bearish'}">${change.toFixed(2)}%</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Tendencia</span>
                <span class="summary-value ${trendClass}">${trend}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">RSI (14)</span>
                <span class="summary-value ${rsi > 70 ? 'bearish' : rsi < 30 ? 'bullish' : ''}">${rsi.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">SMA (20)</span>
                <span class="summary-value">$${sma20.toFixed(2)}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Soporte</span>
                <span class="summary-value">$${Math.min(...prices.slice(-20)).toFixed(2)}</span>
            </div>
        `;
    }

    renderTechnicalChart(crypto, data) {
        const ctx = document.getElementById('technicalChart').getContext('2d');
        
        if (this.analysisChart) {
            this.analysisChart.destroy();
        }

        const labels = data.map(point => new Date(point[0]).toLocaleDateString());
        const prices = data.map(point => point[1]);
        
        const datasets = [{
            label: `${crypto.name} Precio`,
            data: prices,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 2,
            fill: false
        }];

        // Añadir media móvil si está activada
        if (document.getElementById('showMA').checked) {
            const smaData = this.calculateSMAArray(prices, 20);
            datasets.push({
                label: 'SMA (20)',
                data: smaData,
                borderColor: '#e74c3c',
                borderWidth: 1,
                fill: false
            });
        }

        // Añadir Bandas de Bollinger si están activadas
        if (document.getElementById('showBollinger').checked) {
            const bollinger = this.calculateBollingerBands(prices, 20);
            datasets.push(
                {
                    label: 'Bollinger Superior',
                    data: bollinger.upper,
                    borderColor: '#f39c12',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Bollinger Inferior',
                    data: bollinger.lower,
                    borderColor: '#f39c12',
                    borderWidth: 1,
                    fill: false
                }
            );
        }

        this.analysisChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
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
                        }
                    },
                    y: {
                        ticks: {
                            color: getComputedStyle(document.documentElement)
                                .getPropertyValue('--text-secondary'),
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    renderIndicators(data) {
        const container = document.getElementById('indicatorsData');
        container.innerHTML = '';

        const prices = data.map(point => point[1]);
        
        if (document.getElementById('showRSI').checked) {
            const rsi = this.calculateRSI(prices, 14);
            const rsiCard = this.createIndicatorCard('RSI (14)', rsi.toFixed(2), 
                rsi > 70 ? 'Sobrecomprado' : rsi < 30 ? 'Sobrevendido' : 'Neutral');
            container.appendChild(rsiCard);
        }

        if (document.getElementById('showMACD').checked) {
            const macd = this.calculateMACD(prices);
            const macdCard = this.createIndicatorCard('MACD', macd.toFixed(4), 
                macd > 0 ? 'Alcista' : 'Bajista');
            container.appendChild(macdCard);
        }
    }

    createIndicatorCard(title, value, signal) {
        const card = document.createElement('div');
        card.className = 'indicator-card';
        card.innerHTML = `
            <div class="indicator-title">${title}</div>
            <div class="indicator-value">${value}</div>
            <div class="indicator-signal" style="color: var(--text-secondary); font-size: 0.9rem;">${signal}</div>
        `;
        return card;
    }

    // Funciones de cálculo de indicadores técnicos
    calculateSMA(prices, period) {
        if (prices.length < period) return 0;
        const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
        return sum / period;
    }

    calculateSMAArray(prices, period) {
        const smaArray = [];
        for (let i = 0; i < prices.length; i++) {
            if (i < period - 1) {
                smaArray.push(null);
            } else {
                const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
                smaArray.push(sum / period);
            }
        }
        return smaArray;
    }

    calculateRSI(prices, period = 14) {
        if (prices.length < period + 1) return 50;
        
        let gains = 0;
        let losses = 0;
        
        for (let i = prices.length - period; i < prices.length; i++) {
            const change = prices[i] - prices[i - 1];
            if (change > 0) {
                gains += change;
            } else {
                losses -= change;
            }
        }
        
        const avgGain = gains / period;
        const avgLoss = losses / period;
        
        if (avgLoss === 0) return 100;
        
        const rs = avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }

    calculateMACD(prices) {
        const ema12 = this.calculateEMA(prices, 12);
        const ema26 = this.calculateEMA(prices, 26);
        return ema12 - ema26;
    }

    calculateEMA(prices, period) {
        if (prices.length === 0) return 0;
        
        const multiplier = 2 / (period + 1);
        let ema = prices[0];
        
        for (let i = 1; i < prices.length; i++) {
            ema = (prices[i] * multiplier) + (ema * (1 - multiplier));
        }
        
        return ema;
    }

    calculateBollingerBands(prices, period = 20, stdDev = 2) {
        const smaArray = this.calculateSMAArray(prices, period);
        const upper = [];
        const lower = [];
        
        for (let i = 0; i < prices.length; i++) {
            if (i < period - 1) {
                upper.push(null);
                lower.push(null);
            } else {
                const slice = prices.slice(i - period + 1, i + 1);
                const sma = smaArray[i];
                const variance = slice.reduce((sum, price) => sum + Math.pow(price - sma, 2), 0) / period;
                const standardDeviation = Math.sqrt(variance);
                
                upper.push(sma + (standardDeviation * stdDev));
                lower.push(sma - (standardDeviation * stdDev));
            }
        }
        
        return { upper, lower };
    }
}

// Clase para PWA y funcionalidades offline
class PWAManager {
    constructor() {
        this.deferredPrompt = null;
        this.setupEventListeners();
        this.checkOnlineStatus();
    }

    setupEventListeners() {
        // PWA Install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        document.getElementById('installApp').addEventListener('click', () => {
            this.installApp();
        });

        document.getElementById('dismissInstall').addEventListener('click', () => {
            this.hideInstallPrompt();
        });

        // Online/Offline status
        window.addEventListener('online', () => {
            this.updateOnlineStatus(true);
        });

        window.addEventListener('offline', () => {
            this.updateOnlineStatus(false);
        });

        // Solicitar permisos de notificación
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    showInstallPrompt() {
        const prompt = document.getElementById('installPrompt');
        prompt.style.display = 'block';
    }

    hideInstallPrompt() {
        const prompt = document.getElementById('installPrompt');
        prompt.style.display = 'none';
    }

    async installApp() {
        if (!this.deferredPrompt) return;

        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            console.log('PWA instalada');
        }
        
        this.deferredPrompt = null;
        this.hideInstallPrompt();
    }

    checkOnlineStatus() {
        this.updateOnlineStatus(navigator.onLine);
    }

    updateOnlineStatus(isOnline) {
        const offlineStatus = document.getElementById('offlineStatus');
        
        if (isOnline) {
            offlineStatus.style.display = 'none';
        } else {
            offlineStatus.style.display = 'flex';
        }
    }
}

// Instancias globales
let alertsManager;
let technicalAnalysis;
let pwaManager;

// Inicializar la aplicación cuando el DOM esté listo
let cryptoTracker;
document.addEventListener("DOMContentLoaded", () => {
  cryptoTracker = new CryptoTracker();
  alertsManager = new AlertsManager();
  technicalAnalysis = new TechnicalAnalysis();
  pwaManager = new PWAManager();
});

function formatPrice(symbol, price) {
  if (symbol.toLowerCase() === 'pepe' && price < 0.01) {
    return '$' + price.toFixed(8);
  }
  if (price < 1) {
    return '$' + price.toFixed(6);
  }
  return '$' + price.toFixed(2);
}

// Cuando generes la tarjeta de PEPE (y otras), usa:
// const pepePrice = formatPrice('pepe', precioDePepe);
// y así para las demás monedas
