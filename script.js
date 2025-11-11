document.addEventListener('DOMContentLoaded', () => {

    // Helper function for email validation using regex
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to handle form submission (clearing, feedback)
    function handleFormSubmit(formId, feedbackElementId, successMessage) {
        const form = document.getElementById(formId);
        const feedbackElement = document.getElementById(feedbackElementId);

        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form refresh

            // Clear previous feedback and reset input border styles
            feedbackElement.textContent = '';
            feedbackElement.style.color = '#007bff'; // Reset color

            const allInputs = form.querySelectorAll('input, textarea');
            allInputs.forEach(input => {
                input.style.borderColor = '#cceeff'; // Reset all input borders
            });

            let isValid = true; // Assume valid initially

            // Check all required fields in the current form
            const requiredInputs = form.querySelectorAll('[required]');
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc3545'; // Highlight empty required field
                }
            });

            // Specific email validation for inputs with type="email"
            const emailInputs = form.querySelectorAll('input[type="email"]');
            emailInputs.forEach(emailInput => {
                if (emailInput.value.trim() && !isValidEmail(emailInput.value.trim())) {
                    isValid = false;
                    emailInput.style.borderColor = '#dc3545'; // Highlight invalid email
                }
            });


            if (!isValid) {
                feedbackElement.textContent = "Please fill in all required fields and use a valid email format.";
                feedbackElement.style.color = '#dc3545'; // Red for error
                setTimeout(() => {
                    feedbackElement.textContent = '';
                    feedbackElement.style.color = '#007bff'; // Reset color
                }, 5000);
                // **IMPORTANT: Do NOT reset the form here if validation fails**
                return; // Stop if validation fails
            }

            // If all validation passes:
            feedbackElement.textContent = successMessage;
            feedbackElement.style.color = '#28a745'; // Green for success

            form.reset(); // **THIS IS WHERE form.reset() should be placed: only after successful validation**

            // Hide feedback message after 5 seconds
            setTimeout(() => {
                feedbackElement.textContent = '';
                feedbackElement.style.color = '#007bff'; // Reset color
            }, 5000);

            // In a real application, you would send this data to your server here
            console.log(`Form ${formId} submitted with data:`);
            const formData = new FormData(form);
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
        });
    }

    // Initialize the message form
    handleFormSubmit(
        'messageForm',
        'messageFeedback',
        'Thank you for your message, we will get back to you within 24 working hours.'
    );

    // Initialize the newsletter form
    handleFormSubmit(
        'newsletterForm',
        'newsletterFeedback',
        'You have successfully subscribed to our newsletter, forever updated!'
    );
});





document.addEventListener("DOMContentLoaded", () => {
    const messageForm = document.getElementById("messageForm");
    const newsletterForm = document.getElementById("newsletterForm");
    const messageStatus = document.getElementById("messageStatus");
    const newsletterStatus = document.getElementById("newsletterStatus");

    const showMessage = (element, text) => {
        element.textContent = text;
        element.className = "form-status mt-3 text-success show";
        
        setTimeout(() => {
            element.classList.remove("show");
            setTimeout(() => {
                element.textContent = "";
                element.className = "form-status mt-3";
            }, 500);
        }, 10000);
    };

    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showMessage(messageStatus, "Thank you, we will get back to you before 24 working hours");
        messageForm.reset();
    });

    newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showMessage(newsletterStatus, "Thank you, you have successfully subscribed to our newsletter, you will be receiving all our updates");
        newsletterForm.reset();
    });
});