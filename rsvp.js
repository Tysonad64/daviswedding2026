document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');
    const formContent = document.getElementById('rsvpFormContent');
    const formStatus = document.getElementById('formStatus');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get the form element
    const form = e.target;
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('rsvpSubmit');
    
    // Reset error messages and remove error classes
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.classList.remove('error');
    });
    
    // Get form elements
    const name = document.getElementById('rsvpName').value.trim();
    const email = document.getElementById('rsvpEmail').value.trim();
    const guestCount = document.getElementById('guestCount').value;
    const eventChoice = document.querySelector('input[name="eventChoice"]:checked');
    const dietRestrict = document.getElementById('dietRestrict').value.trim();
    const message = document.getElementById('rsvpMessage').value.trim();
    
    // Validation
    let isValid = true;
    
    if (!name) {
        showError('nameError', 'Please enter your name');
        isValid = false;
    }
    
    if (!email) {
        showError('emailError', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!guestCount) {
        showError('guestCountError', 'Please select number of guests');
        isValid = false;
    }
    
    if (!eventChoice) {
        showError('eventChoiceError', 'Please select an event to attend');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Disable submit button to prevent multiple submissions
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Prepare form data
    const formData = {
        name,
        email,
        guestCount,
        eventChoice: eventChoice ? eventChoice.value : '',
        dietRestrict,
        message,
        submittedAt: new Date().toISOString()
    };
    
    // In a real app, you would send this data to your server here
    // For now, we'll simulate a successful submission
    setTimeout(() => {
        // Show success message
        formStatus.innerHTML = `
            <div class="success-message">
                <h3>Thank you, ${name}!</h3>
                <p>Your RSVP has been received. We look forward to celebrating with you!</p>
                <p><strong>Attending:</strong> ${getEventName(eventChoice.value)}</p>
                <p><strong>Number of guests:</strong> ${guestCount}</p>
            </div>
        `;
        formStatus.style.display = 'block';
        formStatus.scrollIntoView({ behavior: 'smooth' });
        
        // Reset form
        form.reset();
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit RSVP';
        
        // Log the form data (in a real app, this would be sent to a server)
        console.log('Form submitted:', formData);
    }, 1000);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        const input = errorElement.previousElementSibling;
        if (input && input.classList) {
            input.classList.add('error');
        }
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function getEventName(eventValue) {
    switch(eventValue) {
        case 'both': return 'Both Ceremony & Reception';
        case 'ceremony': return 'Ceremony';
        case 'reception': return 'Reception';
        default: return 'Not specified';
    }
}
