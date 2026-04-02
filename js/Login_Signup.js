/* Validate and process Login and Signup information*/
//localStorage.removeItem("userNamesArray");  // Remove Comment tags on Line 2 and 3 to clear 
//localStorage.removeItem("passwordsArray");  // local storage before test run

submitSignUp.addEventListener("click", function1);
//submitLogin.addEventListener("click", function1);

function function1(){
    // Username Validation - must be 6 characters long,
    // Must not exist already - INCOMPLETE
    // How to create Arrays in local storage - Help form "geeksforgeeks" https://www.geeksforgeeks.org/javascript/how-to-store-an-array-in-localstorage/
    const userNamesArray = JSON.parse(localStorage.getItem("userNamesArray")) || []; // Usernames Array
    const passwordsArray = JSON.parse(localStorage.getItem("passwordsArray")) || []; // Passwords Array
    
    let userName = document.getElementById("username").value; //Retrieve userName from SignUp
    let email = document.getElementById("email1").value;
	let emailCheck = 0;
    let password = document.getElementById("password1").value; //Retrieve userName from Signup
	let passwordConfirm = document.getElementById("passwordConfirm").value; // Retrieve Confirm Password from Signup
    let allChecksPassed = true;    // allChecksPassed will be set to False if any validation checks are failed
    if (userName.length < 6){
		alert("Username must be at least 6 characters long!");
        allChecksPassed = false;
	}
    for(let i=0; i<email.length; i++){
			if(email[i] == "@"){
				emailCheck++;                     // Increments a counter if @ symbol
			}                                       // is found
			if(email[i] == "."){                    
				emailCheck++;                       // Same thing for the . symbol
			}
		}
		if(emailCheck == 0){
			alert("Email address invalid! Must contain '@' AND '.'");
            allChecksPassed = false;
		}
		
    if (password.length < 6){
		alert("Password must be at least 6 characters long!");
        allChecksPassed = false;
	}
    if (password != passwordConfirm){
		alert("Passwords do not match!");
        allChecksPassed = false;
	}
    if (allChecksPassed == true){
        let userNameExists = false;
        for(let i = 0; i < userNamesArray.length; i++){
            if (userNamesArray[i] == userName){        // Increment userNameExists Var if username already exists
                userNameExists = true;
            }
        }
        
        if (userNameExists == true){
            alert("Username exists! Pick again"); // Alerts user if username exist
            return;
        }
        else if (userNameExists == false){
            userNamesArray.push(userName);        // Pushes userName to userNamesArray
            passwordsArray.push(password);        // Pushes password to passwordsArray corresponding position
            localStorage.setItem("userNamesArray", JSON.stringify(userNamesArray));
            localStorage.setItem("passwordsArray", JSON.stringify(passwordsArray));
        }
    }
}