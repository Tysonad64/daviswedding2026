
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