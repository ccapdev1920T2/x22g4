
$(document).ready(function(){

    //=========================================================================================
    // Login Logic
    //=========================================================================================

    $("#login-btn").click(function() {
        var loginEntryForms = document.getElementById("login-forms");

        if (!loginFormsAreComplete()) {
            alert("Required fields!");
            return;
        }

        loginEntryForms.submit();
    });

    function loginFormsAreComplete() {
        var isComplete = true;
    
        var loginUserNameForm = document.getElementById("login-username");
        var loginPasswordForm = document.getElementById("login-password");
        
        loginUserNameForm.style.backgroundColor = "white";
        loginPasswordForm.style.backgroundColor = "white";
    
        if (loginUserNameForm.value == "") {
            isComplete = false;
            loginUserNameForm.style.backgroundColor = "pink";
        }
    
        if(loginPasswordForm.value == "") {
            isComplete = false;
            loginPasswordForm.style.backgroundColor = "pink";
        }
    
        return isComplete;
    }

    //=========================================================================================
    // Sign Up Logic
    //=========================================================================================

    $("#sign-up-btn").click(function () {
        var entryForms = document.getElementById("signup-forms");

        if (!formsAreComplete()) {
            alert("Required fields!");
            return;
        }

        if (!usernameIsValid()) {
            alert("Invalid username!");
            return;
        }
        
        if (!passwordIsValid()) {
            alert("Invalid password!");
            return;
        }

        if (!passwordsMatch()) {
            alert("Passwords do not match!");
            return;
        }

        if(!emailIsCorrect()) {
            alert("Invalid email!");
            return;
        }
        
        
        entryForms.submit();
    });

    function usernameIsValid() {
        var regExp = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,16}$/;
        var usernameForm = document.getElementById("username");

        if (!regExp.test(usernameForm.value)) {
            usernameForm.style.backgroundColor = "pink";
            return false;
        }

        return true;
    }
    function emailIsCorrect(){
        var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emailForm = document.getElementById("email");
    
        if (!regExp.test(emailForm.value)) {
            emailForm.style.backgroundColor = "pink";
            return false;
        }
    
        return true;
    }
    
    function passwordIsValid() {
        var regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        var passwordForm = document.getElementById("password");
    
        if (!regExp.test(passwordForm.value)) {
            passwordForm.style.backgroundColor = "pink";
            return false;
        }
    
        return true;
    
    }
    
    function passwordsMatch() {
        var passwordForm = document.getElementById("password");
        var confirmPasswordForm = document.getElementById("confirmPassword");
    
        if (passwordForm.value != confirmPasswordForm.value) {
            passwordForm.style.backgroundColor = "pink";
            confirmPasswordForm.style.backgroundColor = "pink";
            return false;
        }
    
        return true;
    }
    
    function formsAreComplete() {
        var isComplete = true;
    
        var userNameForm = document.getElementById("username");
        var emailAddressForm = document.getElementById("email");
        var passwordForm = document.getElementById("password");
        var confirmPasswordForm = document.getElementById("confirmPassword");
    
        userNameForm.style.backgroundColor = "white";
        emailAddressForm.style.backgroundColor = "white";
        passwordForm.style.backgroundColor = "white";
        confirmPasswordForm.style.backgroundColor = "white";
    
        if (userNameForm.value == "") {
            isComplete = false;
            userNameForm.style.backgroundColor = "pink";
        }
    
        if(emailAddressForm.value == "") {
            isComplete = false;
            emailAddressForm.style.backgroundColor = "pink";
        }
    
        if(passwordForm.value == "") {
            isComplete = false;
            passwordForm.style.backgroundColor = "pink";
        }
    
        if(confirmPasswordForm.value == "") {
            isComplete = false;
            confirmPasswordForm.style.backgroundColor = "pink";
        }
    
        return isComplete;
    }

    //=========================================================================================
    // Submit Post Logic
    //=========================================================================================

    $("#upload-image-btn").click(function() {
        $("#file").click();
    });

    $("#submit-submission-btn").click(function() {
    
        var createPostField = document.getElementById("submission");
        var captionField = document.getElementById("caption");
        var message = document.getElementById("message");

        message.innerText = "";
        createPostField.style.backgroundColor = "#fafafa";

        if (createPostField.value == "") {
            message.innerText = "Please enter a post title and select an image to upload.";
            createPostField.style.backgroundColor = "pink";
            return;
        }

        if ($('#file').get(0).files.length === 0) {
            message.innerText = "Please enter a post title and select an image to upload.";
            return;
        }

        createPostField.value = "";
        captionField.value = "";
        $("#file")[0].reset();
    });
});
