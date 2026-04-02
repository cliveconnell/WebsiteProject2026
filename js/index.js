// Function will read inputted data from session storage and display it on the page.
function read() {

    // Get values from session storage, if none display the || text
    let description = sessionStorage.description || "None";
    let amount = sessionStorage.amount || "0";
    let type = sessionStorage.type || "None";

    // Update the html to show the inputted data depending on the ID
    document.getElementById("cardDesc").innerHTML = description;
    document.getElementById("cardAmounts").innerHTML = "Amount: €" + amount;
    document.getElementById("cardType").innerHTML = "Type:" + type;
}
// Call the function
read();