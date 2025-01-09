document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the email address
    const email = document.getElementById("email").value;
    
    // Show loading message
    document.getElementById("responseMessage").innerText = "Submitting email...";

    // Make an API request to the backend
    fetch("http://localhost:3000/submit-email", { // Replace with your backend URL
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }), // Send the email in the request body
    })
    .then(response => response.json())
    .then(data => {
        // Display success or failure message based on response
        if (data.success) {
            document.getElementById("responseMessage").innerText = "Thank you! Your email has been submitted.";
        } else {
            document.getElementById("responseMessage").innerText = "Error submitting email. Please try again later.";
        }
    })
    .catch(error => {
        // Handle error and show message
        document.getElementById("responseMessage").innerText = "Error submitting email. Please try again later.";
    });
});
