// Service Worker para PWA y modo offline
const CACHE_NAME = 'cryptotracker-v1';
const STATIC_CACHE = 'cryptotracker-static-v1';
const DATA_CACHE = 'cryptotracker-data-v1';

// Archivos a cachear para modo offline
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/firebase-config.js',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// URLs de APIs para cachear datos
const API_URLS = [
    'https://api.coingecko.com/api/v3/simple/price',
    'https://api.exchangerate-api.com/v4/latest/USD'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== STATIC_CACHE && key !== DATA_CACHE) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
    // Manejar requests de API
    if (event.request.url.includes('api.coingecko.com') || 
        event.request.url.includes('api.exchangerate-api.com')) {
        
        event.respondWith(
            caches.open(DATA_CACHE).then((cache) => {
                return fetch(event.request)
                    .then((response) => {
                        // Si la respuesta es válida, guardarla en cache
                        if (response.status === 200) {
                            cache.put(event.request.url, response.clone());
                        }
                        return response;
                    })
                    .catch(() => {
                        // Si no hay conexión, usar datos del cache
                        return cache.match(event.request);
                    });
            })
        );
        return;
    }

    // Manejar otros requests (archivos estáticos)
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Notificaciones push para alertas de precio
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Ver Detalles',
                    icon: '/icons/checkmark.png'
                },
                {
                    action: 'close',
                    title: 'Cerrar',
                    icon: '/icons/xmark.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});