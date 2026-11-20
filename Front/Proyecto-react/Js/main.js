const btnVerMas = document.querySelectorAll('.btn-primary');

btnVerMas.forEach((btn) => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.Card');

        console.log(card); // para verificar

        card.classList.add('opaco');
    });
});
const mensaje = encodeURIComponent(
  "Hola, me interesa saber más acerca de sus servicios."
);

const enlace = `https://wa.me/542227686688?text=${mensaje}`;

document.getElementsByClassName("btn-whatsapp")[0].href = enlace;

const btnWhatsapp = document.querySelector('.btn-whatsapp');

let agrandado= false;
setInterval(() => {
    agrandado = !agrandado;
    btnWhatsapp.style.transform = agrandado ? 'scale(1.2)' : 'scale(1)';
}, 500);

