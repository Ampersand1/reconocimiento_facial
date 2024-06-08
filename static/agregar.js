document.addEventListener("DOMContentLoaded", function() {
    const mostrarAgregarBtn = document.getElementById("mostrarAgregar");
    const formContainer = document.getElementById("formContainer");
    const userForm = document.getElementById("userForm");
    const btnAgregarUsuario = document.getElementById("btnAgregarUsuario");

    mostrarAgregarBtn.addEventListener("click", function() {
        mostrarAgregarBtn.style.display = "none";
        formContainer.style.display = "flex";
    });

    btnAgregarUsuario.addEventListener("click", function() {
        userForm.style.display = "block";
        btnAgregarUsuario.style.display = "none";
    });

    userForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const formData = new FormData(userForm);
        
        fetch("http://localhost:8000/agregar-usuario/", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Usuario agregado exitosamente");
            userForm.reset();
            userForm.style.display = "none";
            btnAgregarUsuario.style.display = "block";
        })
        .catch(error => {
            console.error(error);
            alert("Error al agregar usuario");
        });
    });
});

