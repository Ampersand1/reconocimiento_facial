document.addEventListener("DOMContentLoaded", function() {
    const eliminarUsuarioForm = document.getElementById("eliminarUsuarioForm");
    const btnEliminarUsuario = document.getElementById("btnEliminarUsuario");
    const eliminarUsuarioResponse = document.getElementById("eliminarUsuarioResponse");
    if (eliminarUsuarioForm && btnEliminarUsuario && eliminarUsuarioResponse) {
        eliminarUsuarioForm.addEventListener("submit", function(e) {
            console.log("entra a primer metodo de eliminar usuario")
            e.preventDefault();
            const nombreEliminar = document.getElementById("nombreEliminar").value.trim();
            if (nombreEliminar === "") {
                eliminarUsuarioResponse.innerHTML = "Por favor ingresa un nombre.";
                return;
            }
            
            fetch(`http://localhost:8000/eliminar-usuario/${nombreEliminar}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                eliminarUsuarioResponse.innerHTML = "Usuario eliminado exitosamente.";
            })
            .catch(error => {
                console.error(error);
                eliminarUsuarioResponse.innerHTML = "Error al eliminar usuario.";
            });
        });
    } else {
        console.error("Uno o más elementos no fueron encontrados en el DOM.");
    }
});
