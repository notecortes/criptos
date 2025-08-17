# CryptoTracker - Monitor de Criptomonedas en Tiempo Real

Una aplicación web moderna y responsive para monitorear el precio de criptomonedas en tiempo real, con gráficos interactivos y gestión de portfolio.

## 🚀 Características

### 📊 **Monitoreo Avanzado**
- **Monitoreo en tiempo real** de precios de criptomonedas
- **Conversión automática** a USD y EUR
- **47+ criptomonedas** disponibles para elegir
- **Intervalos personalizables** de actualización

### 💼 **Gestión de Portfolio**
- **Gestión completa de portfolio** con cálculo de valores
- **Almacenamiento dual**: Local Storage + Firebase opcional
- **Exportar/Importar** configuración completa en JSON
- **Respaldo automático** de datos y preferencias

### 📈 **Análisis Técnico Avanzado**
- **Gráficos interactivos** con múltiples vistas
- **Indicadores técnicos**: SMA, RSI, MACD, Bandas de Bollinger
- **Análisis de tendencias** automático
- **Gráficos de volumen** de trading

### 🔔 **Sistema de Alertas**
- **Alertas de precio** personalizables
- **Notificaciones push** en tiempo real
- **Múltiples tipos**: precio objetivo, cambio porcentual
- **Gestión completa** de alertas activas

### 📱 **PWA (Progressive Web App)**
- **Instalable** como app nativa
- **Modo offline completo** con datos guardados
- **Notificaciones push** del sistema
- **Acceso rápido** desde pantalla de inicio

### 🎨 **Experiencia de Usuario**
- **Modo día/noche** con transiciones suaves
- **Diseño responsive** optimizado para móviles
- **Interfaz moderna** con animaciones fluidas
- **Accesibilidad completa**

## 🛠️ Tecnologías Utilizadas

- HTML5 semántico
- CSS3 con variables personalizadas y Flexbox
- JavaScript ES6+ (Clases, Async/Await, Modules)
- Chart.js para gráficos
- Firebase Firestore para almacenamiento en la nube
- CoinGecko API para datos de criptomonedas
- ExchangeRate API para conversión de divisas

## 📱 Criptomonedas Incluidas

### 🏆 Top Cryptos

- Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB)
- Cardano (ADA), Solana (SOL), Polkadot (DOT)
- Chainlink (LINK), Litecoin (LTC), Polygon (MATIC)

### 🎮 Gaming & NFT

- The Sandbox (SAND), Decentraland (MANA), Axie Infinity (AXS)
- Enjin Coin (ENJ), Gala (GALA), ApeCoin (APE), Immutable X (IMX)

### 🐕 Meme Coins

- Dogecoin (DOGE), Shiba Inu (SHIB), **Pepe (PEPE)**

### 🏦 DeFi

- Aave (AAVE), Compound (COMP), Maker (MKR), Uniswap (UNI)
- SushiSwap (SUSHI), PancakeSwap (CAKE), Curve (CRV), Yearn Finance (YFI)

### 🌐 Layer 1 & Infrastructure

- TRON (TRX), NEAR Protocol (NEAR), Algorand (ALGO)
- VeChain (VET), Filecoin (FIL), Internet Computer (ICP)
- Hedera (HBAR), Fantom (FTM), Tezos (XTZ), Flow (FLOW)

**Total: 47+ criptomonedas disponibles** 🚀

## 🔧 Instalación y Configuración

### **Instalación Básica**
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/cryptotracker.git

# Navegar al directorio
cd cryptotracker

# Abrir en navegador
open index.html
```

### **Configuración de Firebase (Opcional)**
Para habilitar sincronización en la nube:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilita Firestore Database
3. Edita `firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id",
};
```

### **Configuración de PWA**
Para habilitar notificaciones push:

1. La app solicitará permisos automáticamente
2. Acepta las notificaciones en tu navegador
3. Las alertas llegarán como notificaciones del sistema

### **Servidor Local (Recomendado)**
Para mejor funcionamiento de PWA:

```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

Luego visita: `http://localhost:8000`

## 📊 Funcionalidades

### Portfolio Management

- Ingresa la cantidad de cada criptomoneda que posees
- Ve el valor total en USD y EUR en tiempo real
- Los datos se guardan automáticamente

### Temas

- Alterna entre modo día y noche
- Las preferencias se guardan automáticamente

### Exportar/Importar

- Exporta tu portfolio en formato JSON
- Importa datos desde archivos JSON
- Mantén respaldos de tu información

### Gráficos

- Visualiza tendencias de precios de Bitcoin
- Datos históricos de los últimos 7 días
- Actualización automática cada 5 minutos

## 🎨 Diseño Responsive

La aplicación está optimizada para:

- **Desktop**: Grid de 3-4 columnas
- **Tablet**: Grid de 2 columnas
- **Mobile**: Columna única con navegación optimizada

## 🔄 Actualizaciones Automáticas

- **Precios**: Cada 30 segundos
- **Gráficos**: Cada 5 minutos
- **Tipos de cambio**: Al cargar la página

## 🛡️ Almacenamiento de Datos

### Local Storage

- Almacenamiento automático en el navegador
- Funciona sin conexión a internet
- Datos persistentes entre sesiones

### Firebase (Opcional)

- Sincronización en la nube
- Acceso desde múltiples dispositivos
- Respaldo automático

## 📱 Compatibilidad

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Dispositivos móviles iOS y Android

## � Crómo Añadir Nuevas Criptomonedas

¿Quieres añadir una criptomoneda que no está en la lista? ¡Es muy fácil!

### Paso 1: Encontrar la información

Necesitas obtener estos datos de [CoinGecko](https://coingecko.com):

1. **ID**: Ve a la página de la crypto en CoinGecko, el ID está en la URL
   - Ejemplo: `coingecko.com/en/coins/bitcoin` → ID es `bitcoin`
2. **Nombre**: El nombre completo de la criptomoneda
3. **Símbolo**: El ticker/símbolo (BTC, ETH, etc.)
4. **ImageId**: Inspecciona la imagen del logo, busca el número en la URL

### Paso 2: Añadir al código

Edita el archivo `script.js` y añade la nueva crypto al array `AVAILABLE_CRYPTOS`:

```javascript
// Añade esta línea en la lista AVAILABLE_CRYPTOS:
{ id: "nombre-crypto", name: "Nombre Completo", symbol: "SYMBOL", imageId: "12345" }
```

### Ejemplo Real - Añadiendo PEPE:

```javascript
{ id: "pepe", name: "Pepe", symbol: "PEPE", imageId: "29850" }
```

### Paso 3: Usar la nueva crypto

1. Guarda el archivo
2. Recarga la página
3. Ve a Configuración (⚙️)
4. ¡Tu nueva crypto aparecerá en la lista!

### 💡 Consejos:

- Usa la API de CoinGecko para verificar IDs: `https://api.coingecko.com/api/v3/coins/list`
- Si no encuentras el imageId, usa cualquier número - aparecerá un icono genérico
- Las cryptos se ordenan por popularidad en la lista

### 🎯 Cryptos Recientemente Añadidas:

- **Pepe (PEPE)** - La meme coin más popular
- **ApeCoin (APE)** - Token del ecosistema Bored Ape
- **Immutable X (IMX)** - Layer 2 para NFTs
- **Gala (GALA)** - Gaming y entretenimiento

## 🎯 **Guía de Uso Rápida**

### **Configurar Alertas de Precio**
1. Haz clic en el botón de campana (🔔) en el header
2. Selecciona la criptomoneda y tipo de alerta
3. Define el valor objetivo
4. ¡Recibe notificaciones automáticas!

### **Análisis Técnico**
1. Haz clic en el botón de gráfico (📊) en el header
2. Selecciona la criptomoneda a analizar
3. Activa los indicadores que quieras ver
4. Obtén análisis automático de tendencias

### **Instalar como PWA**
1. Abre la app en tu navegador móvil
2. Aparecerá un prompt de instalación
3. Haz clic en "Instalar"
4. ¡Úsala como app nativa!

### **Modo Offline**
- La app funciona sin conexión
- Muestra los últimos datos guardados
- Sincroniza automáticamente al reconectar

## 🚀 Próximas Características

- [ ] Integración con más exchanges
- [ ] Alertas por email y SMS
- [ ] Análisis de sentimiento del mercado
- [ ] Comparador de exchanges
- [ ] API propia para desarrolladores

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales y comerciales.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias, no dudes en crear un issue en el repositorio.

---

**¡Disfruta monitoreando tus criptomonedas con CryptoTracker!** 🚀
