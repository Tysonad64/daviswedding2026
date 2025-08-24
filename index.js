document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            // Get form values
            const firstName = document.getElementById('userFirst').value.trim();
            const lastName = document.getElementById('userLast').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            const message = document.getElementById('userMessage').value.trim();
            
            // Validation
            let isValid = true;
            
            if (!firstName) {
                document.getElementById('firstNameError').textContent = 'Please enter your first name';
                isValid = false;
            }
            
            if (!lastName) {
                document.getElementById('lastNameError').textContent = 'Please enter your last name';
                isValid = false;
            }
            
            if (!email) {
                document.getElementById('emailError').textContent = 'Please enter your email';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            if (!message) {
                document.getElementById('messageError').textContent = 'Please enter your message';
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitButton = document.getElementById('userSubmit');
                const originalButtonText = submitButton.textContent;
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Here you would typically send the form data to a server
                // For now, we'll simulate a successful submission
                setTimeout(() => {
                    // Show success message
                    const formStatus = document.getElementById('formStatus');
                    formStatus.innerHTML = `
                        <div class="success-message">
                            <h3>Thank you, ${firstName}!</h3>
                            <p>Your message has been received. We'll get back to you soon!</p>
                        </div>
                    `;
                    
                    // Reset form
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                    
                    // Scroll to success message
                    formStatus.scrollIntoView({ behavior: 'smooth' });
                    
                }, 1000);
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});