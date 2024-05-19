// Función para validar la contraseña
function validarContraseña(contraseña) {
    // Longitud mínima de la contraseña
    if (contraseña.length < 8) {
        return false;
    }

    // Expresión regular para verificar si la contraseña contiene al menos un número
    const contieneNumero = /\d/.test(contraseña);

    // Expresión regular para verificar si la contraseña contiene al menos una letra mayúscula
    const contieneMayuscula = /[A-Z]/.test(contraseña);

    // Expresión regular para verificar si la contraseña contiene al menos una letra minúscula
    const contieneMinuscula = /[a-z]/.test(contraseña);

    // Expresión regular para verificar si la contraseña contiene al menos un carácter especial
    const contieneEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(contraseña);

    // Verificar que la contraseña cumple con todos los requisitos
    return contieneNumero && contieneMayuscula && contieneMinuscula && contieneEspecial;
}

// Función para manejar el envío del formulario
function validarFormulario(evento) {
    evento.preventDefault();// evita el comportamiento de enviar y recargar el submit.

    // Obtener las contraseñas ingresadas
    const contraseña = document.getElementById('password').value;
    const nuevaContraseña = document.getElementById('new-password').value;

    // Validar que las contraseñas coincidan
    if (contraseña !== nuevaContraseña) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Validar que la contraseña cumpla con los estándares mínimos de seguridad
    if (!validarContraseña(contraseña)) {
        alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.');
        return;
    }

    // Si pasa todas las validaciones, enviar el formulario
    this.submit();
}

// Agregar el evento de submit al formulario
document.querySelector('.form').addEventListener('submit', validarFormulario);
