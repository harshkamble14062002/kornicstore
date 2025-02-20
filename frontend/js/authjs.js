document.addEventListener('DOMContentLoaded', () => {
    // Handle Login Form Submission    
    const loginForm = document.querySelector('#login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = document.querySelector('#email');
            const passwordInput = document.querySelector('#password');
            if (!emailInput || !passwordInput) {
                alert("Error: Email or password input not found!");
                return;
            }

            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            console.log("📤 Sending login request:", { email, password }); // Debugging

            

            fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            .then(response => response.json())
            .then(data => {
                console.log("📩 Response received:", data); // Debugging
                if (data.success) {
                    alert('Login Successful!');
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
    }

//     //this testing 
//     const email = emailInput.value;
// const password = passwordInput.value;

// console.log("Email:", email); // Debugging
// console.log("Password:", password); // Debugging


    // Handle Sign-Up Form Submission    
    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
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

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, phone }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Sign-Up Successful!');
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
    }
});
