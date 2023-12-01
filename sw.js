// Instala el Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('my-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/main.js',
                '/db.js',
                '/sw-db.js',
                '/sw-utilits.js',
                '/app.js',
                '/idb.js'
            ]);
        })
    );
});

// Maneja las solicitudes de red
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

// Maneja el evento de sincronización
self.addEventListener('sync', function(event) {
    if (event.tag == 'sync-posts') {
        event.waitUntil(
            // Aquí es donde enviarías las publicaciones en la cola al servidor
        );
    }
});
