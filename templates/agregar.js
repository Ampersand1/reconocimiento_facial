const agregar = document.getElementById('agregar');
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