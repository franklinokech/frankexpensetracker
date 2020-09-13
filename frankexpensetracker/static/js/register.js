console.log("register working correctly");

// Get element usernameField by ID or classnames
const usernameField = document.querySelector("#usernameField");
const usernameFeedBackArea = document.querySelector(".usernameFeedbackArea");
const emailField = document.querySelector("#emailField");
const emailFeedBackArea = document.querySelector(".emailFeedbackArea");
const usernameSuccesOutput = document.querySelector(".usernameSuccesOutput");
const emailSuccesOutput = document.querySelector(".emailSuccesOutput");
const passwordField = document.querySelector("#passwordField");
const showPasswordToggle = document.querySelector(".showPasswordToggle");



const handleToggleInput=(e)=>{
    // change toggle to HIDE or Show depending on context
    if(showPasswordToggle.textContent === "Show"){
        showPasswordToggle.textContent = "Hide";

        // update password field property to text
        passwordField.setAttribute("type", "password");
    }
    else{
        showPasswordToggle.textContent = "Show";

        // update password field property to text
        passwordField.setAttribute("type", "text");
    }

}

showPasswordToggle.addEventListener("click", handleToggleInput);


// Add Event listerner Key Up on emailField
emailField.addEventListener("keyup", (e) => {
    console.log("typing", "typing...");
    emailSuccesOutput.style.display = "block";

    // capture user entered value
    const emailVal = e.target.value;

    emailSuccesOutput.textContent = `Checking...${emailVal}`;

    console.log("emailVal", emailVal);


// By defaul, the field are set to none
     emailField.classList.remove("is-invalid");
     emailFeedBackArea.style.display = "none";




    // Check if email field has some value
    if (emailVal.length > 0){
        // set up a feth API to server
        fetch("/authentication/validate-email", {
            body: JSON.stringify({ email: emailVal }),
            method: "POST",

        }).then(res => res.json()).then(data => {
            emailSuccesOutput.style.display = "none";
            console.log("data", data);
            
            // if data has error, highlight the html field
            if(data.email_error){
                emailField.classList.add("is-invalid");
                emailFeedBackArea.style.display = "block";
                emailFeedBackArea.innerHTML = `<p>${data.email_error}</p>`
            }
        });        
    }
});


// Add Event listerner Key Up on UsernameField
usernameField.addEventListener("keyup", (e) => {
    // console.log("typing", "typing...");

    usernameSuccesOutput.style.display = "block";
    

    // capture user entered value
    const usernameVal = e.target.value;

    // console.log("usernameVal", usernameVal);
    usernameSuccesOutput.textContent = `Checking...${usernameVal}`;


// By defaul, the field are set to none
     usernameField.classList.remove("is-invalid");
     usernameFeedBackArea.style.display = "none";




    // Check if username field has some value
    if (usernameVal.length > 0){
        // set up a feth API to server
        fetch("/authentication/validate-username", {
            body: JSON.stringify({ username: usernameVal }),
            method: "POST",

        }).then(res => res.json()).then(data => {
            usernameSuccesOutput.style.display = "none";
            console.log("data", data);
            // if data has error, highlight the html field
            if(data.username_error){
                usernameField.classList.add("is-invalid");
                usernameFeedBackArea.style.display = "block";
                usernameFeedBackArea.innerHTML = `<p>${data.username_error}</p>`
            }
        });        
    }
});