// CrestFoods - Main Application JavaScript

// Cart State
let cart = JSON.parse(localStorage.getItem('crestfoods_cart')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    initMobileMenu();
    initPage();
});

// Initialize page-specific functionality
function initPage() {
    const page = document.body.dataset.page;

    switch(page) {
        case 'home':
            initHomePage();
            break;
        case 'food':
        case 'bread':
        case 'cake':
            initCategoryPage(page);
            break;
        case 'product':
            initProductPage();
            break;
        case 'cart':
            initCartPage();
            break;
        case 'checkout':
            initCheckoutPage();
            break;
        case 'confirmation':
            initConfirmationPage();
            break;
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
}

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'flex' : 'none';
    });
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('crestfoods_cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
function addToCart(productId, quantity = 1, options = {}) {
    const product = getItemById(productId);
    if (!product) return;

    // Check if item already exists in cart with same options
    const existingIndex = cart.findIndex(item => {
        if (item.id !== productId) return false;
        if (JSON.stringify(item.options) !== JSON.stringify(options)) return false;
        return true;
    });

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            options: options
        });
    }

    saveCart();
    showToast(`${product.name} added to cart!`, 'success');
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();

    // Re-render cart if on cart page
    if (document.body.dataset.page === 'cart') {
        renderCart();
    }
}

// Update item quantity in cart
function updateCartItemQuantity(index, quantity) {
    if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = quantity;
        saveCart();

        if (document.body.dataset.page === 'cart') {
            renderCart();
        }
    }
}

// Calculate cart totals
function calculateCartTotals(deliveryType = 'pickup') {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = deliveryType === 'delivery' ? DELIVERY_FEE : 0;
    const total = subtotal + deliveryFee;

    return { subtotal, deliveryFee, total };
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
}

// Show toast notification
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);

    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============ Home Page ============
function initHomePage() {
    // Any home page specific initialization
    console.log('Home page loaded');
}

// ============ Category Pages ============
function initCategoryPage(category) {
    const menuGrid = document.getElementById('menu-grid');
    if (!menuGrid) return;

    const items = getItemsByCategory(category);
    renderMenuItems(menuGrid, items, category);
}

function renderMenuItems(container, items, category) {
    container.innerHTML = items.map(item => `
        <div class="product-card fade-in">
            <div class="product-image">
                <a href="product.html?id=${item.id}">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </a>
                ${item.customizable ? '<span class="product-badge">Customizable</span>' : ''}
            </div>
            <div class="product-info">
                <h4>${item.name}</h4>
                <div class="price">${formatPrice(item.price)}</div>
                <p class="description">${item.shortDesc}</p>
                <div class="product-actions">
                    <a href="product.html?id=${item.id}" class="btn btn-secondary">View Details</a>
                    <button class="btn btn-${category}" onclick="addToCart('${item.id}')">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============ Product Detail Page ============
function initProductPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = 'index.html';
        return;
    }

    const product = getItemById(productId);
    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    renderProductDetail(product);
}

function renderProductDetail(product) {
    const container = document.getElementById('product-detail-container');
    if (!container) return;

    const categoryClass = product.category;

    let customizationHTML = '';
    if (product.customizable) {
        customizationHTML = `
            <div class="customization-options">
                ${product.sizes ? `
                    <div class="option-group">
                        <label for="size">Select Size</label>
                        <select id="size" name="size">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                ` : ''}
                ${product.flavors ? `
                    <div class="option-group">
                        <label for="flavor">Select Flavor</label>
                        <select id="flavor" name="flavor">
                            ${product.flavors.map(flavor => `<option value="${flavor}">${flavor}</option>`).join('')}
                        </select>
                    </div>
                ` : ''}
                <div class="option-group">
                    <label for="custom-message">Custom Message (Optional)</label>
                    <input type="text" id="custom-message" name="custom-message" placeholder="e.g., Happy Birthday John!">
                </div>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="product-detail-grid">
            <div class="product-gallery">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h1>${product.name}</h1>
                <div class="price">${formatPrice(product.price)}</div>
                <p class="product-description">${product.fullDesc}</p>

                <div class="product-meta">
                    <h4>Ingredients</h4>
                    <ul>
                        ${product.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>

                <div class="product-meta">
                    <h4>Allergen Information</h4>
                    <ul class="allergen-warning">
                        ${product.allergens.map(allergen => `<li>${allergen}</li>`).join('')}
                    </ul>
                </div>

                ${customizationHTML}

                <div class="quantity-selector">
                    <label>Quantity:</label>
                    <div class="quantity-controls">
                        <button type="button" onclick="decrementQuantity()">-</button>
                        <input type="number" id="quantity" value="1" min="1" max="50" readonly>
                        <button type="button" onclick="incrementQuantity()">+</button>
                    </div>
                </div>

                <button class="btn btn-${categoryClass} add-to-cart-btn" onclick="handleAddToCart('${product.id}')">
                    Add to Cart
                </button>

                <a href="${product.category}.html" class="btn btn-secondary" style="margin-top: 15px; display: block;">
                    Back to ${product.category.charAt(0).toUpperCase() + product.category.slice(1)} Menu
                </a>
            </div>
        </div>
    `;
}

function incrementQuantity() {
    const input = document.getElementById('quantity');
    if (input.value < 50) {
        input.value = parseInt(input.value) + 1;
    }
}

function decrementQuantity() {
    const input = document.getElementById('quantity');
    if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function handleAddToCart(productId) {
    const quantity = parseInt(document.getElementById('quantity').value);
    const options = {};

    const sizeSelect = document.getElementById('size');
    const flavorSelect = document.getElementById('flavor');
    const customMessage = document.getElementById('custom-message');

    if (sizeSelect) options.size = sizeSelect.value;
    if (flavorSelect) options.flavor = flavorSelect.value;
    if (customMessage && customMessage.value) options.customMessage = customMessage.value;

    addToCart(productId, quantity, options);
}

// ============ Cart Page ============
function initCartPage() {
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="index.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        return;
    }

    const totals = calculateCartTotals('pickup');

    cartContainer.innerHTML = `
        <div class="cart-items">
            <h2>Shopping Cart (${cart.length} items)</h2>
            ${cart.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <div class="price">${formatPrice(item.price)}</div>
                        ${Object.keys(item.options).length > 0 ? `
                            <div class="customization">
                                ${item.options.size ? `Size: ${item.options.size}` : ''}
                                ${item.options.flavor ? ` | Flavor: ${item.options.flavor}` : ''}
                                ${item.options.customMessage ? `<br>Message: "${item.options.customMessage}"` : ''}
                            </div>
                        ` : ''}
                    </div>
                    <div class="cart-item-actions">
                        <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
                        <div class="quantity-controls">
                            <button onclick="updateCartItemQuantity(${index}, ${item.quantity - 1})">-</button>
                            <input type="number" value="${item.quantity}" readonly>
                            <button onclick="updateCartItemQuantity(${index}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>${formatPrice(totals.subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Delivery Fee</span>
                <span>Calculated at checkout</span>
            </div>
            <div class="summary-row total">
                <span>Estimated Total</span>
                <span>${formatPrice(totals.subtotal)}</span>
            </div>
            <div class="promo-code">
                <input type="text" placeholder="Enter promo code">
                <button class="btn btn-secondary" style="width: 100%;">Apply</button>
            </div>
            <a href="checkout.html" class="btn btn-primary checkout-btn">Proceed to Checkout</a>
        </div>
    `;
}

// ============ Checkout Page ============
function initCheckoutPage() {
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    renderCheckoutPage();
    initDeliveryOptions();
    initPaymentOptions();
}

function renderCheckoutPage() {
    const orderSummary = document.getElementById('order-summary');
    if (!orderSummary) return;

    updateOrderSummary('pickup');
}

function updateOrderSummary(deliveryType) {
    const orderSummary = document.getElementById('order-summary');
    if (!orderSummary) return;

    const totals = calculateCartTotals(deliveryType);

    orderSummary.innerHTML = `
        <h3>Order Summary</h3>
        <div class="order-items">
            ${cart.map(item => `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="order-item-info">
                        <h5>${item.name}</h5>
                        <span class="qty">Qty: ${item.quantity}</span>
                    </div>
                    <span class="item-price">${formatPrice(item.price * item.quantity)}</span>
                </div>
            `).join('')}
        </div>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>${formatPrice(totals.subtotal)}</span>
        </div>
        <div class="summary-row">
            <span>Delivery Fee</span>
            <span>${deliveryType === 'delivery' ? formatPrice(totals.deliveryFee) : 'Free (Pickup)'}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>${formatPrice(totals.total)}</span>
        </div>
        <button class="btn btn-primary place-order-btn" onclick="placeOrder()">
            Place Order
        </button>
    `;
}

function initDeliveryOptions() {
    const deliveryOptions = document.querySelectorAll('.delivery-option');

    deliveryOptions.forEach(option => {
        option.addEventListener('click', () => {
            deliveryOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');

            const radio = option.querySelector('input[type="radio"]');
            radio.checked = true;

            updateOrderSummary(radio.value);
        });
    });
}

function initPaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');

    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');

            const radio = option.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
}

function placeOrder() {
    // Validate form
    const form = document.getElementById('checkout-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Get form data
    const formData = new FormData(form);
    const deliveryType = formData.get('delivery');
    const paymentMethod = formData.get('payment');

    // Generate order number
    const orderNumber = 'CC' + Date.now().toString(36).toUpperCase();

    // Store order details for confirmation page
    const orderDetails = {
        orderNumber: orderNumber,
        items: cart,
        totals: calculateCartTotals(deliveryType),
        delivery: deliveryType,
        payment: paymentMethod,
        customerInfo: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: deliveryType === 'delivery' ? formData.get('address') : 'Pickup at store'
        },
        date: new Date().toISOString()
    };

    localStorage.setItem('crestfoods_lastOrder', JSON.stringify(orderDetails));

    // Clear cart
    clearCart();

    // Redirect to confirmation
    window.location.href = 'confirmation.html';
}

// ============ Confirmation Page ============
function initConfirmationPage() {
    const orderDetails = JSON.parse(localStorage.getItem('crestfoods_lastOrder'));

    if (!orderDetails) {
        window.location.href = 'index.html';
        return;
    }

    renderConfirmation(orderDetails);
}

function renderConfirmation(order) {
    const container = document.getElementById('confirmation-container');
    if (!container) return;

    const orderDate = new Date(order.date);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setHours(deliveryDate.getHours() + 2);

    container.innerHTML = `
        <div class="confirmation-icon">✓</div>
        <h1>Thank You for Your Order!</h1>
        <p class="order-number">Order Number: <strong>${order.orderNumber}</strong></p>

        <div class="confirmation-details">
            <h3>Order Details</h3>

            <div class="detail-row">
                <span>Order Date:</span>
                <strong>${orderDate.toLocaleDateString()} ${orderDate.toLocaleTimeString()}</strong>
            </div>

            <div class="detail-row">
                <span>${order.delivery === 'delivery' ? 'Estimated Delivery' : 'Pickup Time'}:</span>
                <strong>${deliveryDate.toLocaleTimeString()}</strong>
            </div>

            <div class="detail-row">
                <span>Delivery Method:</span>
                <strong>${order.delivery === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</strong>
            </div>

            ${order.delivery === 'delivery' ? `
                <div class="detail-row">
                    <span>Delivery Address:</span>
                    <strong>${order.customerInfo.address}</strong>
                </div>
            ` : ''}

            <div class="detail-row">
                <span>Payment Method:</span>
                <strong>${order.payment === 'card' ? 'Credit/Debit Card' : order.payment === 'paypal' ? 'PayPal' : 'Pay on Pickup'}</strong>
            </div>

            <h4 style="margin-top: 20px; margin-bottom: 10px;">Items Ordered:</h4>
            ${order.items.map(item => `
                <div class="detail-row">
                    <span>${item.name} x ${item.quantity}</span>
                    <strong>${formatPrice(item.price * item.quantity)}</strong>
                </div>
            `).join('')}

            <div class="detail-row" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #eee;">
                <span>Subtotal:</span>
                <strong>${formatPrice(order.totals.subtotal)}</strong>
            </div>

            <div class="detail-row">
                <span>Delivery Fee:</span>
                <strong>${order.delivery === 'delivery' ? formatPrice(order.totals.deliveryFee) : 'Free'}</strong>
            </div>

            <div class="detail-row total" style="font-size: 1.2rem; color: var(--primary-color);">
                <span>Total Paid:</span>
                <strong>${formatPrice(order.totals.total)}</strong>
            </div>
        </div>

        <div class="confirmation-actions">
            <a href="index.html" class="btn btn-primary">Continue Shopping</a>
            <button class="btn btn-secondary" onclick="window.print()">Print Receipt</button>
        </div>
    `;
}
