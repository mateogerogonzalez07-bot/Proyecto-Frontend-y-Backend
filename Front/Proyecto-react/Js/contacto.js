const formulario = document.getElementById('formulario-contacto');
formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Gracias por contactarnos, nos pondremos en contacto contigo pronto.');
});