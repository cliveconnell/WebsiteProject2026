/* Validate and process Login and Signup information*/

submitSignUp.addEventListener("click", function1);  // Complete and works so far
submitLogin.addEventListener("click", function2); // Checks that username exists and corresponding password matches. 
clearUserData.addEventListener("click", function3); //Clear user data from local storage
//submitBudget.addEventListener("click", function4); //Updates and maintains stored budget information for each logged in user - INCOMPLETE

let myIndex = -1;                                   // Stores users position in array after login
let loggedIn = false;                               // Nobody is logged in

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
function function2(){
    let userNameLogin = document.getElementById("usernameLogin").value; //Retrieve userName from Login
    let passwordLogin = document.getElementById("passwordLogin").value; //Retrieve password from Login

    const userNamesArray = JSON.parse(localStorage.getItem("userNamesArray")) || []; // Retrieve Usernames Array from Local Storage
    const passwordsArray = JSON.parse(localStorage.getItem("passwordsArray")) || []; // Retrieve Passwords Array from Local Storage

    let userNameExists = false;                         // userNameExists and passwordsMatch are not currently used - MAY NEED TO DELETE LATER
    let passwordsMatch = false;

    for(let i = 0; i < userNamesArray.length; i++){
        if (userNameLogin === userNamesArray[i]){    // Search for username  
            userNameExists = true;                  // Increment userNameExists boolean if username exists
            if (passwordLogin === passwordsArray[i]){
                passwordsMatch = true;              // Change passwordsMatch boolean if passwords match
                myIndex = i;
                break;
            }
        }
        }
    if (userNameExists === true && passwordsMatch === true){
        alert("Success! You are logged in");
        loggedIn = true;
    }
    else if (userNameExists == false || passwordsMatch == false){
        alert("Login Failed!");
    }
    function5();
}

function function3(){
    localStorage.removeItem("userNamesArray"); 
    localStorage.removeItem("passwordsArray");  
}
function function4(){

}
function function5(){
    if (loggedIn === true){
        document.getElementById("userBudget").innerHTML = '<input type="text" id="nameInput" placeholder="Enter budget"><br><button type="submit" class="btn btn-primary mb-3" id="submitBudget">Update Budget</button>';
    }
}