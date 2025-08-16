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
];

// Configuración por defecto
const DEFAULT_CONFIG = {
  selectedCryptos: [
    "bitcoin",
    "ethereum",
    "binancecoin",
    "cardano",
    "solana",
    "polkadot",
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
    await this.loadConfiguration();
    this.setupEventListeners();
    this.applyTheme();
    await this.loadPortfolioData();
    await this.fetchExchangeRates();
    await this.fetchCryptoData();
    this.renderCryptoCards();
    this.initializeChart();
    this.setupSettingsModal();
    this.startPeriodicUpdates();
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

  async fetchCryptoData() {
    try {
      const selectedCryptos = this.getSelectedCryptos();
      const ids = selectedCryptos.map((crypto) => crypto.id).join(",");
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await response.json();

      selectedCryptos.forEach((crypto) => {
        if (data[crypto.id]) {
          AppState.cryptoData[crypto.id] = {
            ...crypto,
            price: data[crypto.id].usd,
            change24h: data[crypto.id].usd_24h_change || 0,
          };
        }
      });

      this.updateCryptoCards();
      this.updatePortfolioSummary();
    } catch (error) {
      console.error("Error fetching crypto data:", error);
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

  createCryptoCard(crypto) {
    const card = document.createElement("div");
    card.className = "crypto-card";
    card.innerHTML = `
            <div class="crypto-header">
                <img src="https://assets.coingecko.com/coins/images/${
                  crypto.imageId
                }/small/${crypto.id}.png" 
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
                       onchange="cryptoTracker.updatePortfolioAmount('${
                         crypto.id
                       }', this.value)">
            </div>
            
            <div class="portfolio-value">
                <div class="portfolio-item">
                    <div class="portfolio-label">Valor USD</div>
                    <div class="portfolio-amount" id="portfolio-usd-${
                      crypto.id
                    }">$0.00</div>
                </div>
                <div class="portfolio-item">
                    <div class="portfolio-label">Valor EUR</div>
                    <div class="portfolio-amount" id="portfolio-eur-${
                      crypto.id
                    }">€0.00</div>
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

  updateCryptoCards() {
    Object.values(AppState.cryptoData).forEach((crypto) => {
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
        changeEl.textContent = `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
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
    const ctx = document.getElementById("priceChart").getContext("2d");

    // Obtener datos históricos para la criptomoneda configurada
    const cryptoData = AVAILABLE_CRYPTOS.find(
      (c) => c.id === CONFIG.chartCrypto
    );
    const historicalData = await this.fetchHistoricalData(
      CONFIG.chartCrypto,
      CONFIG.chartDays
    );

    const labels = historicalData.map((point) => {
      const date = new Date(point[0]);
      return CONFIG.chartDays === 1
        ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : date.toLocaleDateString();
    });

    const prices = historicalData.map((point) => point[1]);

    AppState.priceChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: `${cryptoData?.name || "Bitcoin"} (${
              cryptoData?.symbol || "BTC"
            })`,
            data: prices,
            borderColor: "#3498db",
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
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
      },
    });
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
      portfolioAmounts: AppState.portfolioAmounts,
      exportDate: new Date().toISOString(),
      version: "1.0",
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(dataBlob);
    link.download = `crypto-portfolio-${
      new Date().toISOString().split("T")[0]
    }.json`;
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
        Object.keys(AppState.portfolioAmounts).forEach((cryptoId) => {
          const input = document.getElementById(`amount-${cryptoId}`);
          if (input) {
            input.value = AppState.portfolioAmounts[cryptoId];
          }
        });

        this.updateCryptoCards();
        this.updatePortfolioSummary();
        await this.savePortfolioData();

        alert("Datos importados correctamente");
      } else {
        alert("Formato de archivo inválido");
      }
    } catch (error) {
      console.error("Error importing data:", error);
      alert("Error al importar el archivo");
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
    if (!AppState.priceChart) return;

    const cryptoData = AVAILABLE_CRYPTOS.find(
      (c) => c.id === CONFIG.chartCrypto
    );
    const historicalData = await this.fetchHistoricalData(
      CONFIG.chartCrypto,
      CONFIG.chartDays
    );

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
  }
}

// Inicializar la aplicación cuando el DOM esté listo
let cryptoTracker;
document.addEventListener("DOMContentLoaded", () => {
  cryptoTracker = new CryptoTracker();
});
