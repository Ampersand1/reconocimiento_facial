var artyom = new Artyom();


artyom.initialize({
    lang: "es-ES", // Configura el idioma a español
    debug: true, // Habilita la depuración
    continuous: false, // No necesita estar en modo continuo para un solo saludo
    listen: false, // No es necesario escuchar para comandos
});

// Al oprimir el boton de la pantalla inicial, da la bienvenida y las instrucciones para el menu
$("#inicio").one('click', function () {
    artyom.say("Bienvenido a tu asistente de reconocimiento facial, despues de escuchar este mensaje da un clic en la pantalla y luego pasa el cursor de mouse por encima de la pantalla para saber las opciones de tu asistente.");
    setTimeout(function () {
        //un segundo despues, ir al menu
        window.location.href = 'menu.html'; 
           
    }, 14000);
});
//al estar en el menu, sale el documento en blanco
$("#mostrar").one('click', function () {
    console.log("DIO CLIC");
    setTimeout(function () {
        //un segundo despues, ir al menu
        document.getElementById("mostrar").style.display = "none";
        document.getElementById("btnDesactivar").style.display = "block";
        document.getElementById("btnActivar").style.display = "block";
        document.getElementById("btnAgregar").style.display = "block";
        document.getElementById("btnEliminar").style.display = "block";
    }, 1000);
});
//funciones del boton activar
$('#btnActivar').mouseover(function () {
    //al pasar el cursor encima:
        artyom.say("activar reconocimiento");
});
$("#btnActivar").one('click', function () {
    //ir a la seccion del boton:
    artyom.say("Usted acaba de activar el reconocimiento facial")
    setTimeout(function(){
        window.location.href = 'activar.html';
    }, 1000)
});
//funciones del boton desactivar
$('#btnDesactivar').mouseover(function () {
    //al pasar el cursor encima:
        artyom.say("Desactivar reconocimiento");
});
$("#btnDesactivar").one('click', function () {
    //ir a la seccion del boton:
    artyom.say("Usted acaba de desactivar el reconocimiento facial")
    setTimeout(function(){
        window.location.href = 'desactivar.html';
    }, 1000)
});
//funciones del boton agregar
$('#btnAgregar').mouseover(function () {
    //al pasar el cursor encima:
        artyom.say("Agregar usuario");
});
$("#btnAgregar").one('click', function () {
    //ir a la seccion del boton:
    artyom.say("Usted acaba de entrar a agregar usuario")
    setTimeout(function(){
        window.location.href = 'agregar.html';
    }, 1000)
});
//funciones del boton eliminar
$('#btnEliminar').mouseover(function () {
    //al pasar el cursor encima:
        artyom.say("Eliminar usuario");
});
$("#btnEliminar").one('click', function () {
    //ir a la seccion del boton:
    artyom.say("Usted acaba de entrar a eliminar usuario")
    setTimeout(function(){
        window.location.href = 'eliminar.html';
    }, 1000)
});

$('#btnSubirFoto').mouseover(function () {
    artyom.say("Subir foto");
});
$("#btnSubirFoto").one('click', function () {
    artyom.say("Usted acaba de seleccionar subir foto");
    // Acción correspondiente    
});
$('#btnsAgregar').mouseover(function () {
    artyom.say("Agregar Usuario");
});
$("#btnAgregar").one('click', function () {
    artyom.say("Usted acaba de seleccionar agregar usuario");
    // Acción correspondiente
}); 

$('#btnDecirNombre').mouseover(function () {
    artyom.say("Decir nombre");
});
$("#btnDecirNombre").one('click', function () {
    artyom.say("Usted acaba de seleccionar decir nombre");
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'es-ES';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = function(event) {
            const nombre = event.results[0][0].transcript;
            $('#nombre').val(nombre);
            artyom.say(`Usted ha dicho ${nombre}`);
        };

        recognition.onspeechend = function() {
            recognition.stop();
        };

        recognition.onerror = function(event) {
            artyom.say('Hubo un error al reconocer el nombre, por favor intente de nuevo');
            console.error('Error en el reconocimiento de voz: ', event.error);
        };
});