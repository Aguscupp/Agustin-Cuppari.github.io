// Base de datos simulada con JSON
let database = {
    users: [],
    orders: [],
    products: [
        // Medicamentos //
        {
            id: 1,
            name: "Paracetamol 500mg",
            category: "medicamentos",
            price: 25,
            originalPrice: null,
            description: "Analgésico y antipirético para dolor y fiebre",
            image: './img/paracetamol.jpg',
            isOffer: false
        },
        {
            id: 2,
            name: "Ibuprofeno 600mg",
            category: "medicamentos",
            price: 45,
            originalPrice: 60,
            description: "Antiinflamatorio",
            image: "./img/ibuprofeno600.jpg",
            isOffer: true,
            discount: "25%"
        },
        {
            id: 3,
            name: "Amoxicilina 5ml",
            category: "medicamentos",
            price: 120,
            originalPrice: null,
            description: "Antibiótico de amplio espectro",
            image: "./img/amoxicilina.jpg",
            isOffer: false
        },
        {
            id: 4,
            name: "Migral Compuesto 1mg",
            category: "medicamentos",
            price: 35,
            originalPrice: 50,
            description: "Antihistamínico para alergias",
            image: "./img/migral.jpg",
            isOffer: true,
            discount: "30%"
        },
        
        // Cuidado Personal
        {
            id: 5,
            name: "Shampoo Anticaspa",
            category: "cuidado-personal",
            price: 80,
            originalPrice: null,
            description: "Shampoo especializado para cabello con caspa",
            image: "./img/shampoo.jpg",
            isOffer: false
        },
        {
            id: 6,
            name: "Crema Hidratante Facial",
            category: "cuidado-personal",
            price: 150,
            originalPrice: 200,
            description: "Crema hidratante para todo tipo de piel",
            image: "./img/cremahidratante.jpg",
            isOffer: true,
            discount: "25%"
        },
        {
            id: 7,
            name: "Protector Solar FPS 50",
            category: "cuidado-personal",
            price: 180,
            originalPrice: null,
            description: "Protección solar para todo el cuerpo",
            image: "./img/protector.jpg",
            isOffer: false
        },
        {
            id: 8,
            name: "Desodorante Antitranspirante",
            category: "cuidado-personal",
            price: 65,
            originalPrice: null,
            description: "Protección de mas de 24 horas contra el sudor",
            image: "./img/desodorante.jpg",
            isOffer: false
        },

        // Para Bebes
        {
            id: 9,
            name: "Pañales Talla M",
            category: "Bebes",
            price: 280,
            originalPrice: 350,
            description: "Pañales ultra absorbentes talla M",
            image: "./img/pañales.jpg",
            isOffer: true,
            discount: "20%"
        },
        {
            id: 10,
            name: "Leche de Fórmula",
            category: "Bebes",
            price: 450,
            originalPrice: null,
            description: "Fórmula infantil enriquecida con calcio y vitaminas",
            image: "./img/leche.jpg",
            isOffer: false
        },
        {
            id: 11,
            name: "Toallitas Húmedas",
            category: "Bebes",
            price: 45,
            originalPrice: null,
            description: "Toallitas húmedas suaves para bebes",
            image: "./img/toallas.jpg",
            isOffer: false
        },

        // Naturales
        {
            id: 12,
            name: "Vitamina C 1000mg",
            category: "naturales",
            price: 95,
            originalPrice: 120,
            description: "Suplemento de vitamina C natural",
            image: "./img/vitamina.jpg",
            isOffer: true,
            discount: "21%"
        },
        {
            id: 13,
            name: "Omega 3",
            category: "naturales",
            price: 220,
            originalPrice: null,
            description: "Cápsulas de aceite de pescado",
            image: "./img/omega3.jpg",
            isOffer: false
        },
        {
            id: 14,
            name: "Té Verde Orgánico",
            category: "naturales",
            price: 65,
            originalPrice: null,
            description: "Té verde 100% orgánico",
            image: "./img/te.jpg",
            isOffer: false
        },
        {
            id: 15,
            name: "Suplemento deportivo natural",
            category: "naturales",
            price: 180,
            originalPrice: 240,
            description: "Suplemento deportivo natural con hierbas medicinales",
            image: "./img/suplemento.jpg",
            isOffer: true,
            discount: "25%"
        }
    ]
};

// Variables globales
let cart = [];
let currentPage = 'home';
let filteredProducts = [...database.products];

// Función para mostrar páginas
function showPage(pageName) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Mostrar la página solicitada
    document.getElementById(pageName + '-page').classList.add('active');
    
    // Actualizar navegación activa
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Encontrar el enlace correspondiente y marcarlo como activo
    const activeLink = document.querySelector(`nav a[onclick="showPage('${pageName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    currentPage = pageName;
    
    // Cargar contenido específico de la página
    if (pageName === 'home') {
        loadOffers();
    } else if (pageName === 'products') {
        loadProducts();
    }
}

// Función para mostrar el carrito
function showCart() {
    showPage('cart');
    loadCart();
    
    // Actualizar navegación para el carrito
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector('.cart-link').classList.add('active');
}

// Función para cargar ofertas en la página principal
function loadOffers() {
    const offersGrid = document.getElementById('offers-grid');
    if (!offersGrid) return;
    
    const offers = database.products.filter(product => product.isOffer);
    
    offersGrid.innerHTML = offers.map(product => `
        <div class="product-card">
            ${product.discount ? `<div class="discount-badge">${product.discount} OFF</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" class="product-img-size">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price offer">
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                    ${product.price}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
}

// Función para cargar todos los productos
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            ${product.discount ? `<div class="discount-badge">${product.discount} OFF</div>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" class="product-img-size">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price ${product.isOffer ? 'offer' : ''}">
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
                    ${product.price}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Agregar al Carrito
                </button>
            </div>
        </div>
    `).join('');
}

// Función para filtrar productos
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter');
    if (!categoryFilter) return;
    
    const selectedCategory = categoryFilter.value;
    
    filteredProducts = database.products.filter(product => {
        return !selectedCategory || product.category === selectedCategory;
    });
    
    loadProducts();
}

// Función para agregar productos al carrito
function addToCart(productId) {
    const product = database.products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    
    // Mostrar feedback visual
    const button = event.target.closest('.add-to-cart');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Agregado';
    button.style.background = '#10b981';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 1500);
}

// Función para actualizar contador del carrito
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Función para cargar el carrito
function loadCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega algunos productos para comenzar</p>
                <button class="btn-primary" onclick="hideCart(); window.location.href='productos.html'">Ver Productos</button>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" class="product-img-size">
                </div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${item.price}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <input type="number" class="quantity" value="${item.quantity}" min="1" onchange="setQuantity(${item.id}, this.value)">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="item-total">Subtotal: ${item.price * item.quantity}</div>
                </div>
                <div class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `).join('');
    }
    
    updateCartSummary();
}

// Función para actualizar cantidad
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            loadCart();
            updateCartCount();
        }
    }
}

// Función para establecer cantidad específica
function setQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(quantity) || 1;
        loadCart();
        updateCartCount();
    }
}

// Función para remover del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    loadCart();
    updateCartCount();
}

// Función para vaciar carrito
function clearCart() {
    cart = [];
    loadCart();
    updateCartCount();
}

// Función para actualizar resumen del carrito
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 15 : 0;
    const total = subtotal + shipping;
    
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const totalElement = document.getElementById('cart-total');
    
    if (subtotalElement) subtotalElement.textContent = `${subtotal}`;
    if (shippingElement) shippingElement.textContent = `${shipping}`;
    if (totalElement) totalElement.textContent = `${total}`;
}

// Función para mostrar checkout
function showCheckout() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    document.getElementById('checkout-modal').style.display = 'block';
}

// Función para ocultar checkout
function hideCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// Función para mostrar confirmación
function showConfirmation() {
    document.getElementById('confirmation-modal').style.display = 'block';
}

// Función para ocultar confirmación
function hideConfirmation() {
    document.getElementById('confirmation-modal').style.display = 'none';
    window.location.href = 'index.html';
}

// Manejar envío del formulario de checkout
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Recopilar datos del formulario
            const formData = new FormData(this);
            const userData = {
                nombre: formData.get('nombre'),
                apellido: formData.get('apellido'),
                fechaNacimiento: formData.get('fecha-nacimiento'),
                email: formData.get('email'),
                metodoPago: formData.get('metodo-pago')
            };
            
            // Crear orden
            const order = {
                id: Date.now(),
                user: userData,
                items: [...cart],
                total: cart.reduce((total, item) => total + (item.price * item.quantity), 0) + 15,
                date: new Date().toISOString(),
                status: 'procesando'
            };
            
            // Guardar en base de datos simulada
            database.users.push(userData);
            database.orders.push(order);
            
            // Limpiar carrito
            cart = [];
            updateCartCount();
            
            // Ocultar checkout y mostrar confirmación
            hideCheckout();
            showConfirmation();
            
            // Reset form
            this.reset();
        });
    }

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', function(e) {
        const checkoutModal = document.getElementById('checkout-modal');
        const confirmationModal = document.getElementById('confirmation-modal');
        const cartModal = document.getElementById('cart-modal');
        
        if (e.target === checkoutModal) {
            hideCheckout();
        }
        if (e.target === confirmationModal) {
            hideConfirmation();
        }
        if (e.target === cartModal && typeof hideCart === 'function') {
            hideCart();
        }
    });

    // Inicializar la aplicación
    updateCartCount();
    
    // Si estamos en index, cargar ofertas
    if (document.getElementById('offers-grid')) {
        loadOffers();
    }
    
    // Si estamos en productos, cargar productos
    if (document.getElementById('products-grid')) {
        loadProducts();
    }
});