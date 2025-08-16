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

- Bitcoin (BTC)
- Ethereum (ETH)
- Binance Coin (BNB)
- Cardano (ADA)
- Solana (SOL)
- Polkadot (DOT)

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
    appId: "tu-app-id"
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

## 🚀 Próximas Características

- [ ] Más criptomonedas
- [ ] Alertas de precio
- [ ] Análisis técnico
- [ ] Modo offline completo
- [ ] PWA (Progressive Web App)

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