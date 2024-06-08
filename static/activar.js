// Seleccionar el elemento de video
const video = document.getElementById('video');

// Seleccionar el botón de inicio y el botón de detener
const ActivarButton = document.getElementById('btnActivarButton');
const DetenerButton = document.getElementById('btnDetenerButton');

// Agregar un evento de clic al botón de inicio
ActivarButton.addEventListener('click', function() {
    // Solicitar acceso a la cámara
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            // Asignar el stream de la cámara al elemento de video
            video.srcObject = stream;
            // Habilitar el botón de detener
            DetenerButton.disabled = false;
            // Deshabilitar el botón de inicio
            ActivarButton.disabled = true;
        })
        .catch(function(error) {
            console.error("Error al acceder a la cámara: ", error);
        });
    } else {
        alert("La API de MediaDevices no es compatible con este navegador.");
    }
});

// Agregar un evento de clic al botón de detener
DetenerButton.addEventListener('click', function() {
    // Obtener el stream de la cámara del elemento de video
    const stream = video.srcObject;
    // Si hay un stream, detenerlo
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(function(track) {
            track.stop();
        });
        // Limpiar el srcObject del video para detener la reproducción
        video.srcObject = null;
        // Habilitar el botón de inicio
        ActivarButton.disabled = false;
        // Deshabilitar el botón de detener
       DetenerButton.disabled = true;
    }
});