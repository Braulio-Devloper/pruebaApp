// Abre una conexión con IndexedDB
var dbPromise = idb.open('posts-store', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('posts')) {
        upgradeDb.createObjectStore('posts', {keyPath: 'id'});
    }
});

// Guarda una publicación en IndexedDB
self.addEventListener('sync', function(event) {
    if (event.tag == 'sync-posts') {
        event.waitUntil(
            getPostsFromQueue().then(function(posts) {
                return Promise.all(posts.map(function(post) {
                    // Aquí es donde enviarías la publicación al servidor
                    // y luego la eliminarías de la cola
                }));
            })
        );
    }
});

// Recupera todas las publicaciones de la cola en IndexedDB
function getPostsFromQueue() {
    return dbPromise.then(function(db) {
        var tx = db.transaction('posts', 'readonly');
        var store = tx.objectStore('posts');
        return store.getAll();
    });
}
