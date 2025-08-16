// Configuración de Firebase
// Reemplaza estos valores con tu configuración de Firebase
const firebaseConfig = {
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id"
};

// Inicializar Firebase solo si la configuración está completa
let db = null;
try {
    if (firebaseConfig.apiKey !== "tu-api-key") {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log("Firebase inicializado correctamente");
    } else {
        console.log("Firebase no configurado - usando solo almacenamiento local");
    }
} catch (error) {
    console.log("Error al inicializar Firebase:", error);
    console.log("Usando solo almacenamiento local");
}

// Funciones de Firebase
const FirebaseService = {
    // Guardar datos del portfolio
    async savePortfolio(portfolioData) {
        if (!db) return false;
        try {
            await db.collection('portfolios').doc('user-portfolio').set({
                data: portfolioData,
                lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error("Error guardando en Firebase:", error);
            return false;
        }
    },

    // Cargar datos del portfolio
    async loadPortfolio() {
        if (!db) return null;
        try {
            const doc = await db.collection('portfolios').doc('user-portfolio').get();
            if (doc.exists) {
                return doc.data().data;
            }
            return null;
        } catch (error) {
            console.error("Error cargando desde Firebase:", error);
            return null;
        }
    }
};