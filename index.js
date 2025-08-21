
let firstname;
let lastname;
let email;
let message;


document.getElementById("userSubmit").onclick = function(){
    firstname = document.getElementById("userFirst").value;
    console.log(firstname);

    lastname = document.getElementById("userLast").value;
    console.log(lastname);
    
    email = document.getElementById("userEmail").value;
    console.log(email);

    message = document.getElementById("userMessage").value;
    console.log(message);


}

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById("userSubmit");
    
    if (submitButton) {
        submitButton.onclick = function() {
            const firstname = document.getElementById("userFirst").value;
            const lastname = document.getElementById("userLast").value;
            const email = document.getElementById("userEmail").value;
            const message = document.getElementById("userMessage").value;
            
            // Log to console 
            console.log("First Name:", firstname);
            console.log("Last Name:", lastname);
            console.log("Email:", email);
            console.log("Message:", message);
            
            // Basic validation
            if (!firstname || !lastname || !email || !message) {
                alert("Please fill out all fields!");
                return;
            }

            // Hide the form inputs but keep the container
            const formElements = document.querySelectorAll('#divContact input, #divContact textarea, #divContact label, #divContact button');
            formElements.forEach(element => {
                element.style.display = 'none';
            });
            
            // Show and animate the success message
            const successDiv = document.getElementById("successMessage");
            successDiv.style.display = "block";
            successDiv.classList.add("show");
            
            // Reset after 3 seconds
            setTimeout(function() {
                // Hide success message
                successDiv.classList.remove("show");
                setTimeout(function() {
                    successDiv.style.display = "none";
                    
                    // Show form elements again
                    formElements.forEach(element => {
                        element.style.display = element.tagName === 'LABEL' ? 'flex' : 'block' 
                                              element.tagName === 'BUTTON' ? 'flex' : 'block';
                    });
                    
                    // Clear the form
                    document.getElementById("userFirst").value = "";
                    document.getElementById("userLast").value = "";
                    document.getElementById("userEmail").value = "";
                    document.getElementById("userMessage").value = "";
                }, 300);
            }, 3000);
        }
    }
});

// End of contact page