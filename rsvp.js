document.addEventListener('DOMContentLoaded', function() {
    const formContent = `
        <form id="rsvpForm" class="rsvp-form">
            <div class="form-group">
                <label for="rsvpName">Full Name *</label>
                <input type="text" id="rsvpName" name="name" autocomplete="name" placeholder="Enter your full name" required>
                <div class="error-message" id="nameError"></div>
            </div>
            
            <div class="form-group">
                <label for="rsvpEmail">Email *</label>
                <input type="email" id="rsvpEmail" name="email" autocomplete="email" placeholder="Enter your email address" required>
                <div class="error-message" id="emailError"></div>
            </div>
            
            <div class="form-group">
                <label for="guestCount">Number of Guests *</label>
                <select id="guestCount" name="guestCount" autocomplete="off" required>
                    <option value="" disabled selected>Select number of guests</option>
                    <option value="1">1 (Just Me)</option>
                    <option value="2">2 (Me +1)</option>
                    <option value="3">3 (Me +2)</option>
                    <option value="4">4 (Me +3)</option>
                    <option value="5">5+ (Me +4 or more)</option>
                </select>
                <div class="error-message" id="guestCountError"></div>
            </div>
            
            <fieldset class="form-group">
                <legend>Which event will you attend? *</legend>
                <div class="radio-group">
                    <div class="radio-option">
                        <input type="radio" id="eventBoth" name="eventChoice" value="both" required>
                        <label for="eventBoth">Both Ceremony & Reception</label>
                    </div>
                    <div class="radio-option">
                        <input type="radio" id="eventCeremony" name="eventChoice" value="ceremony">
                        <label for="eventCeremony">Ceremony Only</label>
                    </div>
                    <div class="radio-option">
                        <input type="radio" id="eventReception" name="eventChoice" value="reception">
                        <label for="eventReception">Reception Only</label>
                    </div>
                </div>
                <div class="error-message" id="eventChoiceError"></div>
            </fieldset>
            
            <div class="form-group">
                <label for="dietRestrict">Dietary Restrictions</label>
                <textarea id="dietRestrict" name="dietRestrict" autocomplete="off" placeholder="Please list any dietary restrictions or allergies"></textarea>
            </div>
            
            <div class="form-group">
                <label for="rsvpMessage">Message (Optional)</label>
                <textarea id="rsvpMessage" name="message" autocomplete="off" placeholder="Leave us a message!"></textarea>
            </div>
            
            <div class="form-actions">
                <button type="submit" id="rsvpSubmit" class="btn btn-primary">Submit RSVP</button>
            </div>
            
            <div id="formStatus" class="form-status" role="status" aria-live="polite"></div>
        </form>
    `;
    
    // Insert the form into the RSVP section
    const rsvpSection = document.querySelector('#rsvp .content');
    if (rsvpSection) {
        rsvpSection.insertAdjacentHTML('beforeend', formContent);
        
        // Add event listener to the form
        const rsvpForm = document.getElementById('rsvpForm');
        if (rsvpForm) {
            rsvpForm.addEventListener('submit', handleFormSubmit);
        }
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get the form element
    const form = e.target;
    
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('emailError', 'Please enter your email');
        document.getElementById('rsvpEmail').classList.add('error');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        document.getElementById('rsvpEmail').classList.add('error');
        isValid = false;
    }
    
    // Guest count validation
    if (!guestCount) {
        showError('guestCountError', 'Please select number of guests');
        document.getElementById('guestCount').classList.add('error');
        isValid = false;
    }
    
    // Event choice validation
    if (!eventChoice) {
        showError('eventChoiceError', 'Please select which event you\'ll attend');
        isValid = false;
    }
    
    // If form is not valid, stop submission
    if (!isValid) {
        // Scroll to the first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
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
            <div class="success-message" role="alert">
                <h3>Thank you for your RSVP, ${name}!</h3>
                <p>We've received your response for ${guestCount} ${guestCount === '1' ? 'guest' : 'guests'}.</p>
                ${eventChoice ? `<p>We look forward to seeing you at the ${getEventName(eventChoice.value)}!</p>` : ''}
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
