# CryptoTracker - Monitor de Criptomonedas en Tiempo Real

Una aplicación web moderna y responsive para monitorear el precio de criptomonedas en tiempo real, con gráficos interactivos y gestión de portfolio.

## 🚀 Características

- **Monitoreo en tiempo real** de precios de criptomonedas
- **Conversión automática** a USD y EUR
- **Gestión de portfolio** con cálculo de valores
- **Gráficos interactivos** de precios históricos
- **Modo día/noche** con transiciones suaves
- **Almacenamiento local y en Firebase**
- **Exportar/Importar** datos en formato JSON
- **Diseño responsive** con Flexbox
- **Interfaz moderna y atractiva**

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

## 🔧 Configuración

### 1. Configuración de Firebase (Opcional)

Para habilitar el almacenamiento en la nube, edita el archivo `firebase-config.js`:

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

### 2. Ejecutar la aplicación

1. Clona o descarga los archivos
2. Abre `index.html` en tu navegador
3. ¡Disfruta monitoreando tus criptomonedas!

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

## 🚀 Próximas Características

- [ ] Alertas de precio personalizables
- [ ] Análisis técnico avanzado
- [ ] Modo offline completo
- [ ] PWA (Progressive Web App)
- [ ] Integración con más exchanges

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
