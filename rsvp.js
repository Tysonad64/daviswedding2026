document.addEventListener('DOMContentLoaded', function() {
    const formContent = `
        <div class="form-group">
            <label for="rsvpName">Full Name *</label>
            <input type="text" id="rsvpName" name="name" placeholder="Enter your full name" required>
            <div class="error-message" id="nameError"></div>
        </div>
        
        <div class="form-group">
            <label for="rsvpEmail">Email *</label>
            <input type="email" id="rsvpEmail" name="email" placeholder="Enter your email address" required>
            <div class="error-message" id="emailError"></div>
        </div>
        
        <div class="form-group">
            <label for="guestCount">Number of Guests *</label>
            <select id="guestCount" name="guestCount" required>
                <option value="" disabled selected>Select number of guests</option>
                <option value="1">1 (Just Me)</option>
                <option value="2">2 (Me +1)</option>
            </select>
            <div class="error-message" id="guestError"></div>
        </div>
        
        <div class="form-group">
            <label>Which event(s) will you attend? *</label>
            <div class="radio-group">
                <div class="radio-option">
                    <input type="radio" id="option1" name="eventChoice" value="reception" required>
                    <label for="option1">Reception</label>
                </div>
                <div class="radio-option">
                    <input type="radio" id="option2" name="eventChoice" value="ceremony">
                    <label for="option2">Ceremony</label>
                </div>
                <div class="radio-option">
                    <input type="radio" id="option3" name="eventChoice" value="both">
                    <label for="option3">Both</label>
                </div>
            </div>
            <div class="error-message" id="eventError"></div>
        </div>
        
        <div class="form-group">
            <label for="dietRestrict">Dietary or Allergy Restrictions</label>
            <textarea id="dietRestrict" name="dietRestrict" rows="3" placeholder="Please list any dietary restrictions or allergies"></textarea>
        </div>
        
        <div class="form-group">
            <label for="rsvpMessage">Message (Optional)</label>
            <textarea id="rsvpMessage" name="message" rows="4" placeholder="Send us a note!"></textarea>
        </div>
        
        <div class="form-actions">
            <button type="submit" id="rsvpSubmit" class="btn-primary">Submit RSVP</button>
            <div id="formStatus"></div>
        </div>
    `;

    // Insert the form content
    document.getElementById('rsvpFormContent').innerHTML = formContent;
    
    const form = document.getElementById('rsvpForm');
    const formStatus = document.getElementById('formStatus');
    
    // Form submission handler
    form.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(e) {
    e.preventDefault();
    
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
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('rsvpSubmit');
    
    // Validate form
    let isValid = true;
    
    // Name validation
    if (!name) {
        showError('nameError', 'Please enter your name');
        document.getElementById('rsvpName').classList.add('error');
        isValid = false;
    }
    
    // Email validation
    if (!email) {
        showError('emailError', 'Please enter your email');
        document.getElementById('rsvpEmail').classList.add('error');
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        document.getElementById('rsvpEmail').classList.add('error');
        isValid = false;
    }
    
    // Guest count validation
    if (!guestCount) {
        showError('guestError', 'Please select number of guests');
        document.getElementById('guestCount').classList.add('error');
        isValid = false;
    }
    
    // Event choice validation
    if (!eventChoice) {
        showError('eventError', 'Please select an event');
        isValid = false;
    }
    
    if (isValid) {
        // Disable submit button to prevent multiple submissions
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Prepare form data
        const formData = {
            name,
            email,
            guestCount,
            eventChoice: eventChoice ? eventChoice.value : null,
            dietRestrict,
            message,
            timestamp: new Date().toISOString()
        };
        
        // In a real application, you would send the form data to a server here
        // For now, we'll simulate a successful submission
        setTimeout(() => {
            // Show success message
            formStatus.innerHTML = `
                <div class="success-message">
                    <h3>Thank you for your RSVP, ${name}!</h3>
                    <p>We've received your response for ${guestCount} guest(s) for the ${getEventName(eventChoice.value)}.</p>
                    <p>We look forward to celebrating with you on our special day!</p>
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
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function getEventName(eventValue) {
    switch(eventValue) {
        case 'reception': return 'Reception';
        case 'ceremony': return 'Ceremony';
        case 'both': return 'both Ceremony and Reception';
        default: return 'event';
    }
}
