document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const profileLink = document.getElementById("profile-link");
    const logoutBtn = document.getElementById("logout-btn");

    // Show/hide profile & logout button based on login status
    if (token) {
        profileLink.style.display = "inline";
        logoutBtn.style.display = "inline";
    } else {
        profileLink.style.display = "none";
        logoutBtn.style.display = "none";
    }

    // Logout functionality
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    // Fetch and display products
    fetchProducts();
});

const API_URL = "http://localhost:5000/api/products"; // Update with your backend API

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        
        const productContainer = document.querySelector(".products-container");
        productContainer.innerHTML = ""; // Clear existing products

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
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ id, name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
}
