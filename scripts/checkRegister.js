// Función para validar la contraseña
function validatePassword(password) {
    // Longitud mínima de la contraseña
    if (password.length < 8) {
        return false;
    }

    // Expresión regular para verificar si la contraseña contiene al menos un número
    const hasNumber = /\d/.test(password);

    // Expresión regular para verificar si la contraseña contiene al menos una letra mayúscula
    const hasUppercase = /[A-Z]/.test(password);

    // Expresión regular para verificar si la contraseña contiene al menos una letra minúscula
    const hasLowercase = /[a-z]/.test(password);

    // Expresión regular para verificar si la contraseña contiene al menos un carácter especial
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    // Verificar que la contraseña cumple con todos los requisitos
    return hasNumber && hasUppercase && hasLowercase && hasSpecialChar;
}

// Función para validar los otros campos del formulario
function validateField(regex, value) {
    return regex.test(value);
}

// Función para manejar el envío del formulario
function validateForm(event) {
    event.preventDefault(); // Evita el comportamiento de enviar y recargar el submit.

    // Obtener los valores de los campos
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const newPassword = document.getElementById('new-password').value;

    // Expresiones regulares para validación
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const addressRegex = /^[a-zA-Z0-9\s#\-áéíóúÁÉÍÓÚñÑ]+$/;

    // Validar nombre
    if (!validateField(nameRegex, firstName)) {
        alert('El nombre solo puede contener letras y espacios.');
        return;
    }

    // Validar apellidos
    if (!validateField(nameRegex, lastName)) {
        alert('Los apellidos solo pueden contener letras y espacios.');
        return;
    }

    // Validar correo electrónico
    if (!validateField(emailRegex, email)) {
        alert('Por favor, introduce un correo electrónico válido.');
        return;
    }

    // Validar dirección
    if (!validateField(addressRegex, address)) {
        alert('La dirección contiene caracteres no válidos.');
        return;
    }

    // Validar que las contraseñas coincidan
    if (password !== newPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Validar que la contraseña cumpla con los estándares mínimos de seguridad
    if (!validatePassword(password)) {
        alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.');
        return;
    }

    // Si pasa todas las validaciones, enviar el formulario
    alert('Formulario enviado correctamente.');
    this.submit();
}

// Agregar el evento de submit al formulario
document.querySelector('.form').addEventListener('submit', validateForm);
