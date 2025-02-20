document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
});

const API_URL = "http://localhost:5000/api/products"; // Change this to your actual backend API URL

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function displayProducts(products) {
    const productContainer = document.querySelector(".product-list");
    productContainer.innerHTML = "";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product-item");

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>$${product.price}</strong></p>
            <button onclick="addToCart('${product._id}', '${product.name}', '${product.price}', '${product.image}')">Add to Cart</button>
        `;

        productContainer.appendChild(productElement);
    });
}

function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}
