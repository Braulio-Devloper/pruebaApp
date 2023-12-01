// Abre una conexión con IndexedDB
var dbPromise = idb.open('posts-store', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('posts')) {
        upgradeDb.createObjectStore('posts', {keyPath: 'id'});
    }
});

// Guarda una publicación en IndexedDB
function savePost(post) {
    return dbPromise.then(function(db) {
        var tx = db.transaction('posts', 'readwrite');
        var store = tx.objectStore('posts');
        store.put(post);
        return tx.complete;
    });
}

// Recupera todas las publicaciones de IndexedDB
function getPosts() {
    return dbPromise.then(function(db) {
        var tx = db.transaction('posts', 'readonly');
        var store = tx.objectStore('posts');
        return store.getAll();
    });
}

// Elimina una publicación de IndexedDB
function deletePost(id) {
    return dbPromise.then(function(db) {
        var tx = db.transaction('posts', 'readwrite');
        var store = tx.objectStore('posts');
        store.delete(id);
        return tx.complete;
    });
}
