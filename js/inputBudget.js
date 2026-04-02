/* Validation for Input Budget page field. If the value 
is incorrect, change the blank <p> to use the inner.html message */
document.getElementById("budgetForm").addEventListener("submit", function (event) {
    event.preventDefault();


    // Get user input values and store warning messages
    let isValid = true;
    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value;

    let descWarning = document.getElementById("descWarning");
    let amountWarning = document.getElementById("amountWarning");
    let typeWarning = document.getElementById("typeWarning");
    let successMessage = document.getElementById("successMessage");

    // Clear all messages before validating
    descWarning.innerHTML = "";
    amountWarning.innerHTML = "";
    typeWarning.innerHTML = "";
    successMessage.innerHTML = "";


    // If form fields are blank or not selected show the error message until resolved
    if (description === "") {
        descWarning.innerHTML = "Enter a description.";
        isValid = false;
    }
    if (amount === "") {
        amountWarning.innerHTML = "Enter a valid amount.";
        isValid = false;
    }
    if (type === "") {
        typeWarning.innerHTML = "Select an option";
        isValid = false;
    }

    if (isValid) {
        // Help from https://www.geeksforgeeks.org/javascript/localstorage-and-sessionstorage-web-storage-apis/

        // Get the count from session storage
        let count = Number(sessionStorage.count);

        // If no session storage set count as 0
        if (!count) {
            count = 0;
        }

        // Increment count
        count++;

        //Store inputted values into session storage
        sessionStorage["description" + count] = description;
        sessionStorage["amount" + count] = amount;
        sessionStorage["type" + count] = type;

        // Save count
        sessionStorage.count = count;


        successMessage.innerHTML = "Transaction added!";

        /* Help from https://www.w3schools.com/jsref/met_win_setTimeout.asp
        Resets the form and removes the success message after 2 seconds */
        setTimeout(function () {
            document.getElementById("budgetForm").reset();
            successMessage.innerHTML = "";
        }, 2000);
    }
})