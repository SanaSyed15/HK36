document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    // Add your form validation or AJAX call here
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Example validation (you can add more complex logic as needed)
    if (username && password) {
        // Simulate successful signup
        alert("Signup successful! Redirecting to Profile Creation page...");

        // Redirect to the profile creation page
        window.location.href = "profile.html";
    } else {
        alert("Please fill in all required fields.");
    }
});