document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("add-product-form");
    const productList = document.getElementById("product-list");

    // Backend API URL
    const API_URL = "http://localhost:5000/api/products";

    // Fetch and display products
    async function fetchProducts() {
        try {
            const response = await fetch(API_URL);
            const products = await response.json();
            productList.innerHTML = "";
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product-item");
                productElement.innerHTML = `
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <p>Category: ${product.category}</p>
                    <p>Stock: ${product.stock}</p>
                    <p>Price: $${product.price}</p>
                    <img src="${product.image}" alt="${product.name}" width="100">
                    <button onclick="deleteProduct('${product._id}')">Delete</button>
                    <button onclick="editProduct('${product._id}', '${product.name}', '${product.description}', '${product.price}', '${product.category}', '${product.stock}', '${product.image}')">Edit</button>
                `;
                productList.appendChild(productElement);
            });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    // Handle form submission to add or update a product
    productForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const name = document.getElementById("product-name").value;
        const description = document.getElementById("product-description").value;
        const price = document.getElementById("product-price").value;
        const category = document.getElementById("product-category").value;
        const stock = document.getElementById("product-stock").value;
        const image = document.getElementById("product-image").value;
        const productId = document.getElementById("product-id")?.value;

        const productData = { name, description, price, category, stock, image };
        const method = productId ? "PUT" : "POST";
        const endpoint = productId ? `${API_URL}/${productId}` : `${API_URL}/add`;

        try {
            const response = await fetch(endpoint, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                fetchProducts(); // Refresh product list
                productForm.reset();
                if (document.getElementById("product-id")) {
                    document.getElementById("product-id").remove();
                }
            } else {
                console.error("Failed to add/update product");
            }
        } catch (error) {
            console.error("Error adding/updating product:", error);
        }
    });

    // Delete product function
    async function deleteProduct(productId) {
        try {
            const response = await fetch(`${API_URL}/${productId}`, { method: "DELETE" });
            if (response.ok) {
                fetchProducts(); // Refresh list after deletion
            } else {
                console.error("Failed to delete product");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }

    // Edit product function
    function editProduct(id, name, description, price, category, stock, image) {
        document.getElementById("product-name").value = name;
        document.getElementById("product-description").value = description;
        document.getElementById("product-price").value = price;
        document.getElementById("product-category").value = category;
        document.getElementById("product-stock").value = stock;
        document.getElementById("product-image").value = image;
        
        let productIdInput = document.getElementById("product-id");
        if (!productIdInput) {
            productIdInput = document.createElement("input");
            productIdInput.type = "hidden";
            productIdInput.id = "product-id";
            productForm.appendChild(productIdInput);
        }
        productIdInput.value = id;
    }
    // Make editProduct globally accessible
window.editProduct = function (id, name, description, price, category, stock, image) {
    document.getElementById("product-name").value = name;
    document.getElementById("product-description").value = description;
    document.getElementById("product-price").value = price;
    document.getElementById("product-category").value = category;
    document.getElementById("product-stock").value = stock;
    document.getElementById("product-image").value = image;

    let productIdInput = document.getElementById("product-id");
    if (!productIdInput) {
        productIdInput = document.createElement("input");
        productIdInput.type = "hidden";
        productIdInput.id = "product-id";
        productForm.appendChild(productIdInput);
    }
    productIdInput.value = id;
};


    // Fetch products on page load
    fetchProducts();
});