/* Validate and process Login and Signup information*/

submitSignUp.addEventListener("click", function1);  // Complete and works so far
submitLogin.addEventListener("click", function2); // Checks that username exists and corresponding password matches. 
clearUserData.addEventListener("click", function3); //Clear user data from local storage
//submitBudget.addEventListener("click", function4); //Updates and maintains stored budget information for each logged in user - INCOMPLETE
submitLogout.addEventListener("click", function6);

let myIndex = -1;                                   // Stores users position in array after login
let loggedIn = localStorage.getItem("loggedIn") === "true" || false;   // Retrieve Boolean for loggedIn from localStorage or set to 'false' if it doesnt exist
function5();

// function1() for Signing Up
function function1(){
    // How to create Arrays in local storage - Help form "geeksforgeeks" https://www.geeksforgeeks.org/javascript/how-to-store-an-array-in-localstorage/
    const userNamesArray = JSON.parse(localStorage.getItem("userNamesArray")) || []; // userNamesArray initialised with data retrieved from local storage
    const passwordsArray = JSON.parse(localStorage.getItem("passwordsArray")) || []; // passwordsArray initialised with data retrieved from local storage
    const budgetsArray = JSON.parse(localStorage.getItem("passwordsArray")) || [];
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
    
            userNamesArray.push(userName);        // Pushes userName to userNamesArray
            passwordsArray.push(password);        // Pushes password to passwordsArray corresponding position
            localStorage.setItem("userNamesArray", JSON.stringify(userNamesArray)); //update userNamesArray in local storage, JSON.stringify converts array to a string
            localStorage.setItem("passwordsArray", JSON.stringify(passwordsArray)); //update passwordsArray in local storage
        
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
}
// function4() is EMPTY - for user budget details
function function4(){

}
// function5() is for changing some site elements if logged in
function function5(){
    loggedIn = localStorage.getItem("loggedIn") === "true";
    if (loggedIn === true){
        document.getElementById("userBudget").innerHTML = '<input type="text" id="nameInput" placeholder="Enter budget"><br><button type="submit" class="btn btn-primary m-3" id="submitBudget">Update Budget</button>';
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