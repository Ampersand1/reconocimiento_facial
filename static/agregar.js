document.addEventListener('DOMContentLoaded', () => {
    const agregar = document.getElementById('btnAgregar');
    const btnSubirFoto = document.getElementById("btnSubirFoto");
    const fileInput = document.getElementById("files");

    if (btnSubirFoto && fileInput) {
        btnSubirFoto.addEventListener("click", function() {
            fileInput.click();
        });

        fileInput.addEventListener("change", function() {
            // Aquí puedes agregar lógica adicional para manejar la selección de archivos si es necesario
        });
    } else {
        console.error("Uno o más elementos no fueron encontrados en el DOM.");
    }
    agregar.addEventListener('click', async (event) => {
        event.preventDefault();  // Previene que el formulario se envíe de la forma tradicional

        const name = document.getElementById('nombre').value;
        const photos = document.getElementById('files').files;

        const formData = new FormData();
        formData.append('nombre', name);
        for (const photo of photos) {
            formData.append('files', photo);
        }

        try {
            const response = await fetch('http://localhost:8000/agregar-usuario/', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            // Manejar la respuesta exitosa
            showMessage('Usuario agregado exitosamente', 'success');
        } catch (error) {
            showMessage(`Error: ${error.message}`, 'error');
        }
    });
    function showMessage(message, type) {
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = message;
        messageParagraph.classList.add(type);
        document.body.appendChild(messageParagraph);
    }
});

