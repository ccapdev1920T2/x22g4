
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

    var usernameIsValid = true;
    var emailIsValid = true;
    var passwordIsValid = true;
    var confirmPasswordIsValid = true;

    try {
        $("#signup-forms")[0].reset();
    } catch(err) {
        //only executes when not in sign up page
    }
    

    function checkIfFormsAreValid() {
        if (!usernameIsValid || !emailIsValid || !passwordIsValid || !confirmPasswordIsValid) {
            $('#sign-up-btn').prop('disabled', true);
            return;
        }

        $('#sign-up-btn').prop('disabled', false);
    }

    $('#username').keyup(function() {
        var username = $('#username').val();
        var regExp = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,16}$/;
       

        if (!regExp.test(username)) {
            $('#username').css('background-color', 'pink');
            $('#usernameHelp').text('Username be within 3-16 characters. No special characters. Periods should not be in a series or at the beginning.');
            usernameIsValid = false;
            checkIfFormsAreValid();
            return;

        }

        $.get('/getCheckUsername', {username: username}, function(result) {
            if (result.username == username) {
                $('#username').css('background-color', 'pink');
                $('#usernameHelp').text('Username is already taken!');
                usernameIsValid = false;
                checkIfFormsAreValid();
                return;
            }

            
        })

        $('#username').css('background-color', 'white');
        $('#usernameHelp').text('Username be within 3-16 characters. No special characters. Periods should not be in a series or at the beginning.');
        usernameIsValid = true;
        checkIfFormsAreValid();

    })

    $('#email').keyup(function () {
        var email = $('#email').val();

        var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        if (!regExp.test(email)) {
            $('#email').css('background-color', 'pink');
            $('#emailHelp').text('Invalid email!');
            emailIsValid = false;
            checkIfFormsAreValid();
            return;
        }
    
        $('#email').css('background-color', 'white');
        $('#emailHelp').text('Your email will be kept private.');
        emailIsValid = true;
        checkIfFormsAreValid();
    });

    $('#password').keyup(function () {
        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();

        var regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    
        if (!regExp.test(password)) {
            $('#password').css('background-color', 'pink');
            $('#passwordHelp').text('Password should be at least 8 characters long with 1 number, 1 lowercase and uppercase letter.')
            passwordIsValid = false;
            checkIfFormsAreValid();
            return;
        }

        $('#password').css('background-color', 'white');
        passwordIsValid = true;
        checkIfFormsAreValid();

        if (password != confirmPassword) {
            $('#password').css('background-color', 'pink');
            $('#confirmPassword').css('background-color', 'pink');
            $('#passwordHelp').text('Password is valid but does not match with confrim password!');
            confirmPassword = false;
            checkIfFormsAreValid();
            return;
        }

        $('#password').css('background-color', 'white');
        $('#confirmPassword').css('background-color', 'white');
        $('#passwordHelp').text('Password should be at least 8 characters long with 1 number, 1 lowercase and uppercase letter.');
        confirmPassword = true;
        checkIfFormsAreValid();
    })

    $('#confirmPassword').keyup(function() {
        var password = $('#password').val();
        var confirmPassword = $('#confirmPassword').val();

        if (password != confirmPassword) {
            $('#password').css('background-color', 'pink');
            $('#confirmPassword').css('background-color', 'pink');
            $('#passwordHelp').text('Passwords do not match!');
            confirmPassword = false;
            checkIfFormsAreValid();
            return;
        }

        $('#password').css('background-color', 'white');
        $('#confirmPassword').css('background-color', 'white');
        $('#passwordHelp').text('Password should be at least 8 characters long with 1 number, 1 lowercase and uppercase letter.');
        confirmPassword = true;
        checkIfFormsAreValid();
    }) 

    //=========================================================================================
    // Submit Post Logic
    //=========================================================================================

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


        var file = document.getElementById("file");
        if (file.files[0].size >  (1048576 * 5)) {
            message.innerText = "Image should not be bigger than 5MB";
            return;
        }

        createPostField.value = "";
        captionField.value = "";
        $("#file").val("");
        $('#post-forms').submit();
    });
});
