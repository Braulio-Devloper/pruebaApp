// Obtiene una referencia al formulario y al contenedor de publicaciones
var form = document.getElementById('post-form');
var postsContainer = document.getElementById('posts-container');

// Maneja el evento de envío del formulario
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Crea una nueva publicación y añádela al contenedor de publicaciones
    var post = document.createElement('p');
    post.textContent = form.elements['post-text'].value;
    postsContainer.appendChild(post);

    // Limpia el formulario
    form.reset();
});

// Obtiene la ubicación del usuario
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var location = document.getElementById('post-location');
        location.textContent = 'Latitud: ' + position.coords.latitude + ', Longitud: ' + position.coords.longitude;
    });
}

// Accede a la cámara del dispositivo
if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    var photoInput = document.getElementById('post-photo');
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        // Aquí puedes manejar el stream de la cámara
    });
}

// Verifica el estado de la conexión a internet
function updateOnlineStatus() {
    var status = document.getElementById('connection-status');
    if (navigator.onLine) {
        status.textContent = 'Estás en línea';
    } else {
        status.textContent = 'Estás fuera de línea';
    }
}

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

updateOnlineStatus();
