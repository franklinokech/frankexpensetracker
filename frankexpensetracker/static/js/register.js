console.log("register working correctly");

// Get element usernameField by ID or classnames
const usernameField = document.querySelector("#usernameField");
const feedBackArea = document.querySelector(".invalid-feedback");

// Add Event listerner Key Up
usernameField.addEventListener("keyup", (e) => {
    console.log("typing", "typing...");

    // capture user entered value
    const usernameVal = e.target.value;

    console.log("usernameVal", usernameVal);


// By defaul, the field are set to none
     usernameField.classList.remove("is-invalid");
     feedBackArea.style.display = "none";




    // Check if username field has some value
    if (usernameVal.length > 0){
        // set up a feth API to server
        fetch("/authentication/validate-username", {
            body: JSON.stringify({ username: usernameVal }),
            method: "POST",

        }).then(res => res.json()).then(data => {
            console.log("data", data);
            // if data has error, highlight the html field
            if(data.username_error){
                usernameField.classList.add("is-invalid");
                feedBackArea.style.display = "block";
                feedBackArea.innerHTML = `<p>${data.username_error}</p>`
            }
        });        
    }
});