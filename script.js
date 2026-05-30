// SHOPPING CART STORAGE - Keeps track of what's in the cart
let cart = [];

// ADD TO CART FUNCTION - When you click "Add to Cart"
function addToCart(productName, price) {
    // Create an item object
    const item = {
        name: productName,
        price: price,
        id: Date.now() // Unique ID so we can remove specific items
    };

    // Add the item to the cart array
    cart.push(item);

    // Update the display
    updateCartDisplay();

    // Show a friendly message
    alert(`✅ ${productName} added to cart!`);
}

// UPDATE CART DISPLAY - Refresh what the user sees
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');

    // If cart is empty, show message
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-message">Your cart is empty. Add items above!</p>';
        cartCountSpan.textContent = '0';
        cartTotalSpan.textContent = '0.00';
        return;
    }

    // Build the HTML to display each item in cart
    let html = '';
    let total = 0;

    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">$${item.price.toFixed(2)}</div>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        total += item.price;
    });

    // Update the DOM (what user sees)
    cartItemsDiv.innerHTML = html;
    cartCountSpan.textContent = cart.length;
    cartTotalSpan.textContent = total.toFixed(2);
}

// REMOVE FROM CART - Delete specific item
function removeFromCart(itemId) {
    // Find item with matching ID and remove it
    cart = cart.filter(item => item.id !== itemId);

    // Refresh display
    updateCartDisplay();

    alert('✅ Item removed from cart');
}

// CLEAR CART - Empty everything
function clearCart() {
    // Ask for confirmation first
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = []; // Empty the array
        updateCartDisplay();
        alert('✅ Cart cleared');
    }
}

// CHECKOUT - Process the order
function checkout() {
    if (cart.length === 0) {
        alert('⚠️ Your cart is empty!');
        return;
    }

    // Calculate total
    let total = 0;
    let itemsList = '';

    cart.forEach(item => {
        total += item.price;
        itemsList += `\n• ${item.name} - $${item.price.toFixed(2)}`;
    });

    // Show order summary
    alert(`
📦 ORDER SUMMARY
================
Items:${itemsList}

Total: $${total.toFixed(2)}

✅ Ready to checkout!

(In a real store, this would process payment)
    `);

    // Clear cart after checkout
    cart = [];
    updateCartDisplay();
}
