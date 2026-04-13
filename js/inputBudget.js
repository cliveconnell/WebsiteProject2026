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

    // Hides wanring using d-none class
    descWarning.classList.add("d-none");
    amountWarning.classList.add("d-none");
    typeWarning.classList.add("d-none");
    successMessage.classList.add("d-none");


    // If form fields are blank or not selected show the error message until resolved
    if (description === "") {
        descWarning.innerHTML = "Enter a description.";
        descWarning.classList.remove("d-none");
        isValid = false;
    }
    if (amount === "" || Number(amount) <= 0) {
        amountWarning.innerHTML = "Enter a valid positive amount.";
        amountWarning.classList.remove("d-none");
        isValid = false;
    }
    if (type === "") {
        typeWarning.innerHTML = "Select an option.";
        typeWarning.classList.remove("d-none");
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

        // Shows the success message as Transaction added
        successMessage.innerHTML = "Transaction added!";
        // Hides wanring using d-none class
        successMessage.classList.remove("d-none");


        /* Help from https://www.w3schools.com/jsref/met_win_setTimeout.asp
        Resets the form and removes the success message after 2 seconds */
        setTimeout(function () {
            document.getElementById("budgetForm").reset();
            successMessage.innerHTML = "";
            successMessage.classList.add("d-none");
        }, 2000);
    }
})


/* Validation for weekly budget input. If the value 
is incorrect, change the blank <p> to use the inner.html message */
document.getElementById("addWeeklyBudgetForm").addEventListener("submit", function (event) {
    event.preventDefault();


    // Get user input values and store warning messages
    let weeklyBudget = document.getElementById("enterBudget").value;
    let addBudgetSuccess = document.getElementById("addBudgetSuccess");
    let addBudgetWarning = document.getElementById("addBudgetWarning");


    // Clear all messages before validating
    addBudgetSuccess.innerHTML = "";
    addBudgetWarning.innerHTML = "";

    // Hides wanring using d-none class
    addBudgetSuccess.classList.add("d-none");
    addBudgetWarning.classList.add("d-none");


    // If form fields are blank or not selected show the error message until resolved
    if (weeklyBudget === "" || Number(weeklyBudget) <= 0) {
        addBudgetWarning.innerHTML = "Enter a positve weekly budget.";
        addBudgetWarning.classList.remove("d-none");
    } else {
        // Store weekly budget in session storage
        sessionStorage.weeklyBudget = weeklyBudget

        // change blank <p> to a success message.
        addBudgetSuccess.innerHTML = "Weekly budget added.";
        addBudgetSuccess.classList.remove("d-none");

        // Clear the form after 2 seconds.
        setTimeout(function () {
            document.getElementById("addWeeklyBudgetForm").reset();
            addBudgetSuccess.innerHTML = "";
            addBudgetSuccess.classList.add("d-none");
        }, 2000);

    }
})