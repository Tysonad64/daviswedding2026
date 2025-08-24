document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.createElement('form');
    rsvpForm.id = 'rsvpForm';
    
    // Get the form container and replace it with our enhanced form
    const formContainer = document.querySelector('#rsvpBox1');
    formContainer.innerHTML = '';
    formContainer.appendChild(rsvpForm);
    
    // Add the form content back into the new form
    rsvpForm.innerHTML = `
        <div class="notice-box">
            <h2 id="importantHead">**IMPORTANT!**</h2>
            <p class="important-para">Please fill out the entire form before clicking submit. You should have received an invitation that states the event/events you were invited for. <span id="instrucEmph">Please only select the option that is present on your invitation as the ceremony location is fairly small and there are limited seats and you will not be allowed in to the event that was not listed on your invitation.</span> If you were invited to both, please select the option that you plan on attending. We understand if you can not make it to both events and will miss you, but this will help us get an accurate head count and plan out spacing.</p> 
            <h2 id="noticeHeader">*Notice*</h2>
            <p class="important-para">We will do our best to accommodate all of the dietary restrictions that we can. We will have vegan and vegetarian options for the reception. We will of course find accommodations for all allergy restrictions.</p>
        </div>
        
        <div class="form-group">
            <label for="rsvpName">Full Name *</label>
            <input type="text" id="rsvpName" name="name" required>
            <div class="error-message" id="nameError"></div>
        </div>
        
        <div class="form-group">
            <label for="rsvpEmail">Email *</label>
            <input type="email" id="rsvpEmail" name="email" required>
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
            <div class="error-message" id="eventError"></div>
        </div>
        
        <div class="form-group">
            <label for="dietRestrict">Dietary or Allergy Restrictions</label>
            <textarea id="dietRestrict" name="dietRestrict" rows="2" placeholder="Please list any dietary restrictions or allergies"></textarea>
        </div>
        
        <div class="form-group">
            <label for="rsvpMessage">Message (Optional)</label>
            <textarea id="rsvpMessage" name="message" rows="3" placeholder="Send us a note!"></textarea>
        </div>
        
        <div class="form-actions">
            <button type="submit" id="rsvpSubmit" class="btn-primary">Submit RSVP</button>
            <div id="formStatus"></div>
        </div>
    `;

    // Form submission handler
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        
        // Get form values
        const name = document.getElementById('rsvpName').value.trim();
        const email = document.getElementById('rsvpEmail').value.trim();
        const guestCount = document.getElementById('guestCount').value;
        const eventChoice = document.querySelector('input[name="eventChoice"]:checked');
        const dietRestrict = document.getElementById('dietRestrict').value.trim();
        const message = document.getElementById('rsvpMessage').value.trim();
        
        // Validation
        let isValid = true;
        
        if (!name) {
            document.getElementById('nameError').textContent = 'Please enter your name';
            isValid = false;
        }
        
        if (!email) {
            document.getElementById('emailError').textContent = 'Please enter your email';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            isValid = false;
        }
        
        if (!guestCount) {
            document.getElementById('guestError').textContent = 'Please select number of guests';
            isValid = false;
        }
        
        if (!eventChoice) {
            document.getElementById('eventError').textContent = 'Please select an event';
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Show loading state
        const submitBtn = document.getElementById('rsvpSubmit');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // In a real app, you would send this data to your server
            console.log('Form submitted:', {
                name,
                email,
                guestCount,
                eventChoice: eventChoice ? eventChoice.value : null,
                dietRestrict,
                message
            });
            
            // Show success message
            const formStatus = document.getElementById('formStatus');
            formStatus.innerHTML = `
                <div class="success-message">
                    <h3>Thank you, ${name}!</h3>
                    <p>Your RSVP has been received. We look forward to celebrating with you!</p>
                    <p>A confirmation has been sent to ${email}.</p>
                </div>
            `;
            
            // Reset form
            rsvpForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            
            // Scroll to success message
            formStatus.scrollIntoView({ behavior: 'smooth' });
            
        }, 1500);
    });
});
