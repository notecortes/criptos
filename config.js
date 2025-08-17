// Configuración adicional para funcionalidades avanzadas
const ADVANCED_CONFIG = {
    // Configuración de alertas
    alerts: {
        maxAlerts: 50,
        defaultEnabled: true,
        notificationTimeout: 5000,
        soundEnabled: true
    },
    
    // Configuración de análisis técnico
    technicalAnalysis: {
        defaultIndicators: ['SMA', 'RSI'],
        periods: {
            SMA: [20, 50, 200],
            RSI: 14,
            MACD: [12, 26, 9],
            Bollinger: [20, 2]
        },
        chartColors: {
            price: '#3498db',
            sma20: '#e74c3c',
            sma50: '#f39c12',
            sma200: '#9b59b6',
            rsi: '#2ecc71',
            macd: '#e67e22',
            bollinger: '#34495e'
        }
    },
    
    // Configuración de PWA
    pwa: {
        updateCheckInterval: 300000, // 5 minutos
        cacheStrategy: 'networkFirst',
        offlineMessage: 'Modo Offline - Mostrando datos guardados',
        installPromptDelay: 30000 // 30 segundos
    },
    
    // Configuración de rendimiento
    performance: {
        maxCacheSize: 50, // MB
        dataRetentionDays: 30,
        compressionEnabled: true,
        lazyLoadImages: true
    },
    
    // URLs de APIs
    apis: {
        coingecko: {
            baseUrl: 'https://api.coingecko.com/api/v3',
            rateLimit: 50, // requests per minute
            timeout: 10000
        },
        exchangeRate: {
            baseUrl: 'https://api.exchangerate-api.com/v4/latest',
            timeout: 5000
        }
    },
    
    // Configuración de notificaciones
    notifications: {
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        requireInteraction: false,
        silent: false
    }
};

// Función para obtener configuración con valores por defecto
function getConfig(path, defaultValue = null) {
    const keys = path.split('.');
    let value = ADVANCED_CONFIG;
    
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return defaultValue;
        }
    }
    
    return value;
}

// Función para actualizar configuración
function updateConfig(path, newValue) {
    const keys = path.split('.');
    let current = ADVANCED_CONFIG;
    
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current) || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key];
    }
    
    current[keys[keys.length - 1]] = newValue;
    
    // Guardar en localStorage
    localStorage.setItem('cryptoTrackerAdvancedConfig', JSON.stringify(ADVANCED_CONFIG));
}

// Cargar configuración guardada al inicializar
function loadAdvancedConfig() {
    const saved = localStorage.getItem('cryptoTrackerAdvancedConfig');
    if (saved) {
        try {
            const parsedConfig = JSON.parse(saved);
            Object.assign(ADVANCED_CONFIG, parsedConfig);
        } catch (error) {
            console.error('Error loading advanced config:', error);
        }
    }
}

// Inicializar configuración
loadAdvancedConfig();