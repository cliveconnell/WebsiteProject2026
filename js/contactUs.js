// Author: Clive
// Description: Created to validate input fields and show validation alerts

/* Validation for Contact Us form fields. If the value 
is incorrect, change the blank <p> to use the inner.html message */
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();


    // Get user input values and store warning messages
    let isValid = true;
    let firstName = document.getElementById("firstName").value;
    let surname = document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    let contactReason = document.getElementById("contactReason").value;

    let firstNameWarning = document.getElementById("firstNameWarning");
    let surnameWarning = document.getElementById("surnameWarning");
    let emailWarning = document.getElementById("emailWarning");
    let descWarning = document.getElementById("descWarning");
    let successMessage = document.getElementById("successMessage");

    // Clear all messages before validating
    firstNameWarning.innerHTML = "";
    surnameWarning.innerHTML = "";
    emailWarning.innerHTML = "";
    descWarning.innerHTML = "";
    successMessage.innerHTML = "";
    
    // Hides wanring using d-none class
    firstNameWarning.classList.add("d-none");
    surnameWarning.classList.add("d-none");
    emailWarning.classList.add("d-none");
    descWarning.classList.add("d-none");
    successMessage.classList.add("d-none");


    // If form fields are blank or not selected show the error message until resolved
    if (firstName === "") {
        firstNameWarning.innerHTML = "Enter your first name.";
        firstNameWarning.classList.remove("d-none");
        isValid = false;
    }
    if (surname === "") {
        surnameWarning.innerHTML = "Enter your surname.";
        surnameWarning.classList.remove("d-none");
        isValid = false;
    }
    if (email === "") {
        emailWarning.innerHTML = "Enter your email.";
        emailWarning.classList.remove("d-none");
        isValid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
        emailWarning.innerHTML = "Email must contain an '@' symbol and a full stop '.'";
        emailWarning.classList.remove("d-none");
        isValid = false;
    }

    if (contactReason === "") {
        descWarning.innerHTML = "Enter a description.";
        descWarning.classList.remove("d-none");
        isValid = false;
    }

    if (isValid) {
        successMessage.innerHTML = "Thanks for contacting us!";
        successMessage.classList.remove("d-none");

        /* Help from https://www.w3schools.com/jsref/met_win_setTimeout.asp
        Resets the form and removes the success message after 3 seconds */
        setTimeout(function () {
            document.getElementById("contactForm").reset();
            successMessage.innerHTML = "";
            successMessage.classList.add("d-none");
        }, 3000);
    }
})