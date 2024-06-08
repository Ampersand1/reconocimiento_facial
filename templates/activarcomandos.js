var artyom = new Artyom();


artyom.initialize({
    lang: "es-ES", // Configura el idioma a español
    debug: true, // Habilita la depuración
    continuous: false, // No necesita estar en modo continuo para un solo saludo
    listen: false, // No es necesario escuchar para comandos
});

$('#btnActivarButton').mouseover(function () {
    artyom.say("Activar Cámara");
});
$("#btnActivarButton").one('click', function () {
    artyom.say("Usted acaba de seleccionar Activar Cámara");
});

$('#btnDetenerButton').mouseover(function () {
    artyom.say("Detener Transmisión");
});
$("#btnDetenerButton").one('click', function () {
    artyom.say("Usted acaba de seleccionar Detner Transmisión");
});
