// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.",
        badge: "New"
    },
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        category: "clothing",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
        badge: "Eco"
    },
    {
        id: 4,
        name: "Stainless Steel Water Bottle",
        category: "home",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Keep your drinks hot or cold for hours with this durable stainless steel water bottle.",
        badge: "Popular"
    },
    {
        id: 5,
        name: "Vitamin C Serum",
        category: "beauty",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Brighten and rejuvenate your skin with our potent Vitamin C serum.",
        badge: "Bestseller"
    },
    {
        id: 6,
        name: "Wireless Charging Pad",
        category: "electronics",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Charge your compatible devices quickly and conveniently with this wireless charging pad.",
        badge: null
    },
    {
        id: 7,
        name: "Linen Button-Down Shirt",
        category: "clothing",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        description: "Stay cool and stylish with this breathable linen shirt perfect for warm weather.",
        badge: "New"
    },
    {
        id: 8,
        name: "Ceramic Coffee Mug Set",
        category: "home",
        price: 32.99,
        image: "https://images.unsplash.com/photo-1542546156-3e5cbb15757b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "A set of four beautifully crafted ceramic mugs for your morning coffee or tea.",
        badge: null
    }
];

// Cart state
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.querySelector('.cart-count');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryBtns = document.querySelectorAll('.category-btn');
const clearCartBtn = document.getElementById('clearCart');
const productModal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Initialize the app
function init() {
    renderProducts(products);
    setupEventListeners();
    updateCart();
}

// Render products to the grid
function renderProducts(productsToRender) {
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--gray);">No products found matching your criteria.</p>';
        return;
    }
    
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="view-details" data-id="${product.id}">Details</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Category filters
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts();
        });
    });

    // Search functionality
    searchBtn.addEventListener('click', filterProducts);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') filterProducts();
    });

    // Add to cart buttons (delegated)
    productsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        } else if (e.target.classList.contains('view-details')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            showProductDetails(productId);
        }
    });

    // Cart management
    clearCartBtn.addEventListener('click', clearCart);
    
    // Modal
    closeModal.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.style.display = 'none';
        }
    });
}

// Filter products based on category and search
function filterProducts() {
    const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
    const searchTerm = searchInput.value.toLowerCase();
    
    let filteredProducts = products;
    
    // Filter by category
    if (activeCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) || 
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderProducts(filteredProducts);
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
    showToast(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update item quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Clear the entire cart
function clearCart() {
    cart = [];
    updateCart();
    showToast('Cart cleared!');
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners for cart item controls
        cartItems.addEventListener('click', (e) => {
            if (e.target.classList.contains('decrease') || e.target.parentElement.classList.contains('decrease')) {
                const productId = parseInt(e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id'));
                updateQuantity(productId, -1);
            } else if (e.target.classList.contains('increase') || e.target.parentElement.classList.contains('increase')) {
                const productId = parseInt(e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id'));
                updateQuantity(productId, 1);
            } else if (e.target.classList.contains('remove-item') || e.target.parentElement.classList.contains('remove-item')) {
                const productId = parseInt(e.target.getAttribute('data-id') || e.target.parentElement.getAttribute('data-id'));
                removeFromCart(productId);
                showToast('Item removed from cart!');
            }
        });
    }
    
    // Update cart summary
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5.00 : 0;
    const total = subtotal + shipping;
    
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
}

// Show product details in modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    modalBody.innerHTML = `
        <div class="modal-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="modal-details">
            <div class="product-category">${product.category}</div>
            <h2>${product.name}</h2>
            <div class="modal-price">$${product.price.toFixed(2)}</div>
            <div class="modal-description">
                <p>${product.description}</p>
            </div>
            <div class="modal-actions">
                <button class="add-to-cart" data-id="${product.id}" style="flex: 1;">Add to Cart</button>
                <button class="view-details" style="background-color: var(--secondary);">Buy Now</button>
            </div>
        </div>
    `;
    
    // Add event listener for add to cart button in modal
    const addToCartBtn = modalBody.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        addToCart(productId);
        productModal.style.display = 'none';
    });
    
    productModal.style.display = 'flex';
}

// Show toast notification
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);