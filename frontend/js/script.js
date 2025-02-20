// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Admin Page: Handle adding products
    const addProductForm = document.querySelector('#add-product-form');
    addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.querySelector('#product-name').value;
        const productDescription = document.querySelector('#product-description').value;
        const productPrice = document.querySelector('#product-price').value;
        const productImage = document.querySelector('#product-image').value;
        
        const product = { name: productName, description: productDescription, price: productPrice, image: productImage };
        
        // Save the product (This would be a POST request to backend in a real-world scenario)
        displayProduct(product);
    });

    // Display product on the admin page
    function displayProduct(product) {
        const productList = document.querySelector('#product-list');
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>$${product.price}</strong></p>
        `;
        productList.appendChild(productItem);
    }

    // Contact Form Submission
    const contactForm = document.querySelector('#contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;

        // Send the contact form data (This would be a POST request to backend in a real-world scenario)
        alert('Message Sent!');
        contactForm.reset();
    });

    // Cart Page: Display items added to the cart
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('#cart-items');
    const totalPriceContainer = document.querySelector('#total-price');
    
    let totalPrice = 0;
    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>$${item.price}</strong></p>
        `;
        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price;
    });
    
    totalPriceContainer.textContent = totalPrice.toFixed(2);

});


// Handle Login Form Submission    
const loginForm = document.querySelector('#login-form');

document.addEventListener('DOMContentLoaded', () => {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        // Send login data to backend (example POST request)
        fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Login Successful!');
                // Redirect to home page or dashboard
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials, please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});


// Handle Sign-Up Form Submission    
const signupForm = document.querySelector('#signup-form');

document.addEventListener('DOMContentLoaded', () => {
    if (!signupForm) {
        console.error("Error: #signup-form not found!");
        return; // Stop execution if form is missing
    }

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirm-password').value;
        const phone = document.querySelector('#phone').value;

        if (!name || !email || !password || !confirmPassword || !phone) {
            alert("Please fill in all fields!");
            return;
        }

        // Basic password confirmation check
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Send sign-up data to backend (example POST request)
        fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, phone }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Sign-Up Successful!');
                // Redirect to login page
                window.location.href = 'login.html';
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    });
});
 