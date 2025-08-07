/* =====================================================
   Archivo: principal.js
   Funcionalidades:
   1. Carrito de compras (agregar, vaciar, mostrar total)
   2. Guardado en localStorage para mantener datos
   3. Validación y envío simulado del formulario de contacto
===================================================== */

/* ------------------------------
   VARIABLES GLOBALES DEL CARRITO
-------------------------------- */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Referencias a elementos HTML
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');

/* ------------------------------
   FUNCIÓN PARA ACTUALIZAR EL CARRITO EN LA VISTA
-------------------------------- */
function updateCart() {
    cartItemsContainer.innerHTML = ''; // Limpia la lista de productos

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
    } else {
        cart.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})" class="btn-remove">X</button>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    // Actualiza contador y total
    cartCount.textContent = cart.length;
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total.toFixed(2);

    // Guarda en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

/* ------------------------------
   FUNCIÓN PARA AGREGAR UN PRODUCTO AL CARRITO
-------------------------------- */
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

/* ------------------------------
   FUNCIÓN PARA ELIMINAR UN PRODUCTO
-------------------------------- */
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

/* ------------------------------
   FUNCIÓN PARA VACIAR EL CARRITO
-------------------------------- */
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        cart = [];
        updateCart();
    });
}

/* ------------------------------
   FORMULARIO DE CONTACTO
-------------------------------- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita recargar la página

        // Obtiene valores del formulario
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Simula el envío
        alert(`Gracias ${name}, tu mensaje ha sido enviado correctamente.`);
        contactForm.reset();
    });
}

/* ------------------------------
   INICIALIZA EL CARRITO AL CARGAR LA PÁGINA
-------------------------------- */
updateCart();
