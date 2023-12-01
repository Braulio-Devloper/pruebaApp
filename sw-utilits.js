// Función para cachear recursos
function cacheResources(resources) {
    caches.open('my-cache').then(function(cache) {
        return cache.addAll(resources);
    });
}

// Función para manejar solicitudes de red
function handleNetworkRequest(request) {
    return fetch(request).then(function(response) {
        return caches.open('my-cache').then(function(cache) {
            cache.put(request, response.clone());
            return response;
        });
    });
}

// Función para manejar solicitudes de red cuando estás fuera de línea
function handleOfflineRequest(request) {
    return caches.match(request).then(function(response) {
        return response || fetch(request);
    });
}
