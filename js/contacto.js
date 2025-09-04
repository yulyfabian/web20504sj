// --- Inicialización de EmailJS ---
(function () {
  emailjs.init("YEtM6GZUT5Kwdk8n3");
})();

// --- FORMULARIO DE CONTACTO ---
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById('formularioContacto');

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    let valido = true;

    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const asunto = document.getElementById('asunto');
    const mensaje = document.getElementById('mensaje');

    // Validar nombre
    if (!/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/.test(nombre.value.trim())) {
      document.getElementById("mensaje1").style.display = "block";
      valido = false;
    } else {
      document.getElementById("mensaje1").style.display = "none";
    }

    // Validar correo
    const regexCorreo = /^[^\s@]+@[^\s@]+\.(com|net|org|edu)$/i;
    if (!regexCorreo.test(correo.value.trim())) {
      document.getElementById("mensaje2").style.display = "block";
      valido = false;
    } else {
      document.getElementById("mensaje2").style.display = "none";
    }

    // Validar asunto
    if (asunto.value.trim() === "") {
      document.getElementById("mensaje3").style.display = "block";
      valido = false;
    } else {
      document.getElementById("mensaje3").style.display = "none";
    }

    // Validar mensaje
    if (mensaje.value.trim() === "") {
      document.getElementById("mensaje4").style.display = "block";
      valido = false;
    } else {
      document.getElementById("mensaje4").style.display = "none";
    }

    // Si todo es válido
    if (valido) {
      emailjs.send("service_1a2b3c", "template_a9z6zj2", {
        user_name: nombre.value,
        user_email: correo.value,
        subject: asunto.value,
        message: mensaje.value
      })
        .then(() => {
          alert("✅ Tu mensaje ha sido enviado correctamente.");
          formulario.reset();
        }, (error) => {
          console.error("❌ Error:", error);
          alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
        });
    }
  });
});

// --- Función auxiliar ---
function PermitirSoloTexto(string) {
  let out = '';
  const filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ ';
  for (let i = 0; i < string.length; i++) {
    if (filtro.indexOf(string.charAt(i)) !== -1) {
      out += string.charAt(i);
    }
  }
  return out;
}
