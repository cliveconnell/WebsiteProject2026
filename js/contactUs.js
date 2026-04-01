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


    // If form fields are blank or not selected show the error message until resolved
    if (firstName === "") {
        firstNameWarning.innerHTML = "Enter your first name.";
        isValid = false;
    }
    if (surname === "") {
        surnameWarning.innerHTML = "Enter your surname.";
        isValid = false;
    }
    if (email === "") {
        emailWarning.innerHTML = "Enter your email.";
        isValid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
        emailWarning.innerHTML = "Email must contain an '@' symbol and a full stop '.'";
        isValid = false;
    }

    if (contactReason === "") {
        descWarning.innerHTML = "Enter a description.";
        isValid = false;
    }

    if (isValid) {
        successMessage.innerHTML = "Thanks for contacting us!";

        /* Help from https://www.w3schools.com/jsref/met_win_setTimeout.asp
        Resets the form and removes the success message after 3 seconds */
        setTimeout(function () {
            document.getElementById("contactForm").reset();
            successMessage.innerHTML = "";
        }, 3000);
    }
})