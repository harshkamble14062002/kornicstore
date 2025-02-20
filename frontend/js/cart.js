document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();
});

function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.querySelector("#cart-items");
    const totalPriceContainer = document.querySelector("#total-price");

    if (!cartItemsContainer || !totalPriceContainer) return;

    cartItemsContainer.innerHTML = ""; // Clear previous content

    let totalPrice = 0;
    
    cartItems.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.description || "No description available"}</p>
                <p><strong>$${item.price}</strong></p>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
        totalPrice += parseFloat(item.price);
    });

    totalPriceContainer.textContent = `$${totalPrice.toFixed(2)}`;
}

function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
    cartItems.splice(index, 1); // Remove item from array
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Update local storage
    
    displayCartItems(); // Refresh cart display
}
