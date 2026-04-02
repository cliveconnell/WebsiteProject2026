// Function will read inputted data from session storage and display it on the page.

// ${} help from https://www.w3schools.com/js/js_string_templates.asp
function read() {

    // Get the number of inputted values
    let count = Number(sessionStorage.count);

    // When count is 0, show the message instead of null/undefined
    if (!count) {
        document.getElementById("budgetOutline").innerHTML = "No budget information added.";
        return;
    }

    let output = "";

    // Loop through all values
    for (let i = 1; i <= count; i++) {

        // Example desctiption 1, next loop stores as description 2 (Allows multiple cards to display)
        let description = sessionStorage["description" + i];
        let amount = sessionStorage["amount" + i];
        let type = sessionStorage["type" + i];

        // If the entry was deleted, skip to the next entry.
        if (description === undefined) {
            continue;
        }

        // Apply css depending on if the option is income or expense
        let colourClass;
        if (type === "Income"){
            colourClass = "income-card";
        } else if (type === "Expense") {
            colourClass = "expense-card";
        }

        // Use bootstrap cards and fill with the info from above
        output += `
                    <div class="card mt-3 ${colourClass}">
                <div class="card-body bg-success-subtle">
                    <h5>${description}</h5>
                    <p>Amount: €${amount}</p>
                    <p>Type: ${type}</p>
                    <button class="btn btn-sm btn-danger" onclick="deleteCard(${i})">Delete</button>
                </div>
            </div>
            `;
    }

    // If all the entries were deleted show the below message
    if (output == "") {
        document.getElementById("budgetOutline").innerHTML = "No budget information added.";
    } else {
        // Use the card from above and display it on index.html using the ID
        document.getElementById("budgetOutline").innerHTML = output;
    }
}

// Deletes a selected card using its index.
function deleteCard(index) {

    // Delete the card information for the index picked
    sessionStorage.removeItem("description" + index);
    sessionStorage.removeItem("amount" + index);
    sessionStorage.removeItem("type" + index);

    // Re-run the read function to update the list
    read();
}

// Call the function
read();