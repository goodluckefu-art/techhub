// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Earbuds Pro",
        category: "gadgets",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1590658165737-15a047b8b5e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "High-quality wireless earbuds with active noise cancellation.",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Mechanical Keyboard RGB",
        category: "accessories",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "RGB mechanical keyboard with customizable keys and lighting.",
        badge: "New"
    },
    {
        id: 3,
        name: "Smart Watch Series X",
        category: "gadgets",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Feature-rich smartwatch with health monitoring and GPS.",
        badge: "Popular"
    },
    {
        id: 4,
        name: "Ergonomic Laptop Stand",
        category: "accessories",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Adjustable aluminum laptop stand for better ergonomics.",
        badge: null
    },
    {
        id: 5,
        name: "Wireless Gaming Mouse",
        category: "accessories",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Ergonomic wireless mouse with precision tracking for gaming.",
        badge: "Sale"
    },
    {
        id: 6,
        name: "Portable SSD 1TB",
        category: "gadgets",
        price: 169.99,
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "High-speed portable SSD with 1TB storage and USB-C.",
        badge: "New"
    },
    {
        id: 7,
        name: "USB-C Hub 7-in-1",
        category: "accessories",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1598940603846-a1edd0ef5274?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Multi-port USB-C hub for expanding connectivity options.",
        badge: null
    },
    {
        id: 8,
        name: "Bluetooth Speaker",
        category: "gadgets",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Portable Bluetooth speaker with rich sound quality.",
        badge: "Sale"
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('techhub_cart')) || [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const closeModal = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout-btn');
const cartIcon = document.getElementById('cart-icon');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletter-form');
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.querySelector('nav');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    displayProducts(products);
    updateCartCount();
    
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);
    
    // Filter products
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
    
    // Cart modal functionality
    cartIcon.addEventListener('click', openCartModal);
    closeModal.addEventListener('click', closeCartModal);
    window.addEventListener('click', handleOutsideClick);
    checkoutBtn.addEventListener('click', handleCheckout);
    
    // Form submissions
    contactForm.addEventListener('submit', handleContactSubmit);
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    
    // Service buttons
    const serviceButtons = document.querySelectorAll('.service-book-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', handleServiceBooking);
    });
    
    // Mobile menu
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
}

function handleScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function handleFilterClick() {
    const filter = this.getAttribute('data-filter');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    
    // Filter products
    if (filter === 'all') {
        displayProducts(products);
    } else if (filter === 'new') {
        const newProducts = products.filter(product => product.badge === 'New');
        displayProducts(newProducts);
    } else {
        const filteredProducts = products.filter(product => product.category === filter);
        displayProducts(filteredProducts);
    }
}

function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    alert(`Thank you for your message, ${name}! We will get back to you soon.`);
    this.reset();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    alert(`Thank you for subscribing with ${email}! You'll receive our latest updates.`);
    this.reset();
}

function handleServiceBooking() {
    alert('Service booking feature coming soon! Our team will contact you shortly.');
}

function toggleMobileMenu() {
    nav.classList.toggle('active');
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                }
            }
        });
    });
}

// Display products in the grid
function displayProducts(productsToDisplay) {
    productGrid.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found in this category.</p>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-actions">
                <button class="action-btn"><i class="far fa-heart"></i></button>
                <button class="action-btn"><i class="fas fa-search"></i></button>
            </div>
        </div>
        <div class="product-info">
            <p class="product-category">${product.category}</p>
            <h3 class="product-title">${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">
                <span class="price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
    return productCard;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
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
    showCartConfirmation(product.name);
}

function showCartConfirmation(productName) {
    const confirmation = document.createElement('div');
    confirmation.textContent = `${productName} added to cart!`;
    confirmation.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 25px;
        border-radius: var(--border-radius);
        z-index: 1002;
        box-shadow: var(--shadow-lg);
        font-weight: 600;
    `;
    document.body.appendChild(confirmation);
    
    setTimeout(() => {
        document.body.removeChild(confirmation);
    }, 3000);
}

// Update cart in localStorage and UI
function updateCart() {
    localStorage.setItem('techhub_cart', JSON.stringify(cart));
    updateCartCount();
    
    if (cartModal.style.display === 'block') {
        displayCartItems();
    }
}

// Update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Open cart modal and display items
function openCartModal(e) {
    e.preventDefault();
    displayCartItems();
    cartModal.style.display = 'block';
}

function closeCartModal() {
    cartModal.style.display = 'none';
}

function handleOutsideClick(e) {
    if (e.target === cartModal) {
        closeCartModal();
    }
}

function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Thank you for your purchase! Your order total is $${total.toFixed(2)} and has been placed.`);
    cart = [];
    updateCart();
    closeCartModal();
}

// Display cart items in modal
function displayCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to your cart</p>
            </div>
        `;
        cartTotalPrice.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = createCartItem(item);
        cartItems.appendChild(cartItem);
    });
    
    cartTotalPrice.textContent = total.toFixed(2);
    
    // Add event listeners to cart controls
    setupCartControls();
}

function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <div class="cart-item-info">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
        </div>
        <div class="cart-item-controls">
            <div class="quantity-controls">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        </div>
    `;
    return cartItem;
}

function setupCartControls() {
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            decreaseQuantity(productId);
        });
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            increaseQuantity(productId);
        });
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Decrease item quantity in cart
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCart();
    } else {
        removeFromCart(productId);
    }
}

// Increase item quantity in cart
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}