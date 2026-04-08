/* Validate and process Login and Signup information*/

submitSignUp.addEventListener("click", function1);  // Complete and works so far
submitLogin.addEventListener("click", function2); // Checks that username exists and corresponding password matches. 
clearUserData.addEventListener("click", function3); //Clear user data from local storage
//submitBudget.addEventListener("click", function4); //Updates and maintains stored budget information for each logged in user - INCOMPLETE
submitLogout.addEventListener("click", function6);

let myIndex = -1;                                   // Stores users position in array after login
let loggedIn = localStorage.getItem("loggedIn") === "true" || false;   // Retrieve Boolean for loggedIn from localStorage or set to 'false' if it doesnt exist
let budgetExists = false;
function5();

// function1() for Signing Up
function function1(){
    // How to create Arrays in local storage - Help form "geeksforgeeks" https://www.geeksforgeeks.org/javascript/how-to-store-an-array-in-localstorage/
    const userNamesArray = JSON.parse(localStorage.getItem("userNamesArray")) || []; // userNamesArray initialised with data retrieved from local storage
    const passwordsArray = JSON.parse(localStorage.getItem("passwordsArray")) || []; // passwordsArray initialised with data retrieved from local storage
    const budgetsArray = JSON.parse(localStorage.getItem("budgetsArray")) || [];
    let userName = document.getElementById("username").value; //Retrieve userName from SignUp 
    let email = document.getElementById("email1").value;      //Retrieve email from SignUp
	let emailCheck = 0;
    let password = document.getElementById("password1").value; //Retrieve password from Signup
	let passwordConfirm = document.getElementById("passwordConfirm").value; // Retrieve Confirm Password from Signup
    let allChecksPassed = true;    // allChecksPassed will be set to False if any validation checks are failed
    
    // Username Validation - must be 6 characters long,
    // Must not exist already - INCOMPLETE
    if (userName.length < 6){
		alert("Username must be at least 6 characters long!");
        allChecksPassed = false;
	}
    for(let i = 0; i < userNamesArray.length; i++){
        let userNameExists = false;
        if (userNamesArray[i] == userName){        
            userNameExists = true;                // Change userNameExists Boolean if username already exists
            allChecksPassed = false;
        }
        if (userNameExists == true){
            alert("Username exists! Pick again"); // Alerts user if username exist
            return;
        }
    }
    // Email Validation - must contain @ and .com
    for(let i=0; i<email.length; i++){
			if(email[i] == "@"){
				emailCheck++;                     // Increments a counter if @ symbol
			}                                       // is found
			if(email[i] == "."){                    
				emailCheck++;                       // Same thing for .
			}
		}
		if(emailCheck === 0){
			alert("Email address invalid! Must contain '@' AND '.'");  // Alerts for invalid email
            allChecksPassed = false;
		}
	
    // Password Validation - must be at least 6 characters long
    if (password.length < 6){
		alert("Password must be at least 6 characters long!");
        allChecksPassed = false;
	}
    // Password Confirm Validation - must match Initial Password
    if (password != passwordConfirm){
		alert("Passwords do not match!");
        allChecksPassed = false;
	}
    if (allChecksPassed == true){                      // If allChecksPassed == true, push the userName and password to the array
            let budget = -1;                      // Budget default set to -1
            userNamesArray.push(userName);        // Pushes userName to userNamesArray
            passwordsArray.push(password);        // Pushes password to passwordsArray corresponding position
            budgetsArray.push(budget);
            localStorage.setItem("userNamesArray", JSON.stringify(userNamesArray)); //update userNamesArray in local storage, JSON.stringify converts array to a string
            localStorage.setItem("passwordsArray", JSON.stringify(passwordsArray)); //update passwordsArray in local storage
            localStorage.setItem("budgetsArray", JSON.stringify(budgetsArray));
        
    }
}
// function2() for logging in
function function2(){
    let userNameLogin = document.getElementById("usernameLogin").value; //Retrieve userName from Login
    let passwordLogin = document.getElementById("passwordLogin").value; //Retrieve password from Login

    const userNamesArray = JSON.parse(localStorage.getItem("userNamesArray")) || []; // Retrieve Usernames Array from Local Storage
    const passwordsArray = JSON.parse(localStorage.getItem("passwordsArray")) || []; // Retrieve Passwords Array from Local Storage

    let userNameExists = false;                         // userNameExists and passwordsMatch booleans
    let passwordsMatch = false;                         // for logging in

    for(let i = 0; i < userNamesArray.length; i++){
        if (userNameLogin === userNamesArray[i]){    // Search for username  
            userNameExists = true;                  // userNameExists boolean = true if username exists
            if (passwordLogin === passwordsArray[i]){
                passwordsMatch = true;              // Change passwordsMatch boolean if passwords match
                myIndex = i;                        // Store index value in myIndex for parallel array reference
                break;                              // Exit loop when login is complete
            }
        }
        }
    if (userNameExists === true && passwordsMatch === true){
        alert("Success! You are logged in");
        loggedIn = true;                               // Boolean for user logged in, used in other functions to keep user logged in and on refresh
        localStorage.setItem("loggedIn", loggedIn);    // Send loggedIn boolean to local Storage
    }
    else if (userNameExists == false || passwordsMatch == false){
        alert("Login Failed!");
    }
    
    function5();
}
// function3() for clearing local storage
function function3(){
    localStorage.removeItem("userNamesArray"); 
    localStorage.removeItem("passwordsArray");
    localStorage.removeItem("budgetsArray");  
}
// function4() is EMPTY - for user budget details

function function4(){
    
    let budgetsArray = JSON.parse(localStorage.getItem("budgetsArray")) || [];
    let myBudget = budgetsArray[myIndex];
    let myNewBudget = Number(document.getElementById("budgetInput").value);
    if (budgetExists === false){
        myBudget = myNewBudget;                                          // If budget is inactive, set new budget
        }
    else if (budgetExists === true){
        myBudget += myNewBudget;                                         // If budget is active, add to existing budget value
        }
    budgetsArray[myIndex] = myBudget;
    localStorage.setItem("budgetsArray", JSON.stringify(budgetsArray));
}
// function5() is for changing some site elements if logged in
function function5(){
    
    let myUserBudgetOutput = ``;
    loggedIn = localStorage.getItem("loggedIn") === "true";
    if (loggedIn === true){                                // If a user is logged in, retrieve budgetsArray
        const budgetsArray = JSON.parse(localStorage.getItem("budgetsArray")) || []; // Get array only after user login to ensure it exists and maintain parallel array integrity
        let myBudget = budgetsArray[myIndex];

        // IF/ELSE determines if user has an active budget or is starting a new one
        if (myBudget == -1){
            budgetExists = false;
            myUserBudgetOutput += `<h3>You have no active budget. Would you like to add one?</h3>`;
        }
        else if (myBudget > -1){
            budgetExists = true;
            myUserBudgetOutput += `<h3>You have an active budget. Would you like to update it?</h3>`
        }
        
        myUserBudgetOutput += `<input type="text" id="budgetInput" placeholder="Add/Update Budget">
            <br>
            <button type="submit" class="btn btn-primary m-3" id="submitNewBudget">
            Add/Update Budget
            </button>
            <table class="table table-bordered" id="tableAddTransaction">
                <form class="forms fs-1 bg-light text-secondary-emphasis text-center">
                    <tr class="bg-light text-secondary-emphasis text-center">
                        <td class="m-3"><b>Transaction: </b></td>
                        <td class="m-3">
                            <label for="expense/income"><b>Expense(-)/Income(+)</b></label>
                            <br>
                            <select name="Expense/Income" id="expenseIncome">
                                <option value="expense">-</option>
                                <option value="income">+</option>
                            </select>
                        </td>                                 
                        <td class="m-3">
                            <label for="category"><b>Select Category</b></label>
                            <br>
                            <select name="Category" id="category">
                                <option value="essential">Essential</option>
                                <option value="nonEssential">Non-Essential</option>
                                <option value="luxury">Luxury</option>
                            </select>
                            </td>
                        <td class="m-3">
                            <label for="value" class="form-label"><b>Value</b></label>
                            <input type="text" placeholder="value" class="form-control" id="value">    
                        </td>
                    </tr>
                
                </form>
            </table>`;

        document.getElementById("userBudget").innerHTML = myUserBudgetOutput;
        document.getElementById("submitNewBudget").onclick = function4;       // Use .onclick so as not to add another event listener each time function5() runs
        
        // Generate Budget Table of transactions dynamically with JS
        document.getElementById("userBudget").innerHTML += `<table class="table table-bordered" id="tableBudgetTracker">
        
            </table>`;
            // Table Header, column names, table content
            let tableContent = ``;
            let tableGenerator = 
            `<thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">+/-</th>                                 
                    <th scope="col">Category</th>
                    <th scope="col">Value</th>
                </tr>
            </thead>
            <tbody>` + tableContent + `
            </tbody>`;
        
        document.getElementById("tableBudgetTracker").innerHTML = tableGenerator;
            

    }
    else { // This is where continue as guest feature can go
        document.getElementById("userBudget").innerHTML = '';
    }
}
function function6(){
    loggedIn = false;
    localStorage.setItem("loggedIn", loggedIn);    // Send loggedIn boolean to local Storage
    function5();
}