document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("You need to login first!");
        window.location.href = "index.html"; // Redirect to home if not logged in
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user profile");
        }

        const user = await response.json();

        // Display user details in profile.html
        document.getElementById("profile-name").textContent = user.name;
        document.getElementById("profile-email").textContent = user.email;
        document.getElementById("profile-phone").textContent = user.phone;
    } catch (error) {
        console.error(error);
        alert("Error loading profile. Please try again.");
    }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
});
