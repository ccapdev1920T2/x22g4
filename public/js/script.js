
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

    try {
        $("#signup-forms")[0].reset();
    } catch (err) {}
    

    $("#sign-up-btn").click(function () {
        var entryForms = document.getElementById("signup-forms");

        if (!formsAreComplete()) {
            $('#signup-error').text('Please fill out required fields')
            return;
        }

        if (!usernameIsValid()) {
            return;
        }
        
        if (!passwordIsValid()) {
            return;
        }

        if (!passwordsMatch()) {
            return;
        }

        if(!emailIsCorrect()) {
            return;
        }
        
        entryForms.submit();
    });

    function usernameIsValid() {
        var username = $('#username').val();
        var regExp = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,16}$/;
       

        if (!regExp.test(username)) {
            $('#signup-error').text('Invalid username')
            return false;

        }

        $.get('/getCheckUsername', {username: username}, function(result) {
            if (result.username == username) {
                $('#signup-error').text('Username is already taken!')
                return false;
            }

            
        })

        $('#signup-error').text('')
        return true;
    }

    function emailIsCorrect(){
        var regExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emailForm = document.getElementById("email");
    
        if (!regExp.test(emailForm.value)) {
            $('#signup-error').text('Invalid email')
            return false;
        }
        
        $('#signup-error').text('')
        return true;
    }
    
    function passwordIsValid() {
        var regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
        var passwordForm = document.getElementById("password");
    
        if (!regExp.test(passwordForm.value)) {
            $('#signup-error').text('Invalid password')
            return false;
        }
        
        $('#signup-error').text('')
        return true;
    }
    
    function passwordsMatch() {
        var passwordForm = document.getElementById("password");
        var confirmPasswordForm = document.getElementById("confirmPassword");
    
        if (passwordForm.value != confirmPasswordForm.value) {
            $('#signup-error').text('Passwords do not match!')
            return false;
        }
        
        $('#signup-error').text('')
        return true;
    }
    
    function formsAreComplete() {

        var isComplete = true;
    
        var userNameForm = document.getElementById("username");
        var emailAddressForm = document.getElementById("email");
        var passwordForm = document.getElementById("password");
        var confirmPasswordForm = document.getElementById("confirmPassword");
    
        if (userNameForm.value == "") {
            isComplete = false;
        }
    
        if(emailAddressForm.value == "") {
            isComplete = false;
        }
    
        if(passwordForm.value == "") {
            isComplete = false;
        }
    
        if(confirmPasswordForm.value == "") {
            isComplete = false;
        }
    
        return isComplete;
    }

    //=========================================================================================
    // Submit Post Logic
    //=========================================================================================

    try {
        $('#postTitle').val("");
        $('#caption').val("")
        $("#file").val("");
        $('#submit-submission-btn').prop('disabled', false);
    } catch(err) {
        //only executes when not in cat feed page
    }

    $('#post-forms').submit(function(e) {
        var file = document.getElementById("file");
        if (file.files[0].size >  (1048576 * 4)) {
            message.innerText = "Image should not be bigger than 4MB";
            return false;
        }        

        $('#submit-submission-btn').prop('disabled', true);
    })

    //=========================================================================================
    // Comment Post Logic
    //=========================================================================================

    try{
        $('#comment').val("");
        $('#comment').css('background-color', 'white');
    } catch (error) {
        //only executes when not in post page
    }

    $('#comment-submit-btn').click(function() {
        //TODO: check if logged in

        let text = $('#comment').val();
        let postId = $('#postId').text();

        if(text.trim() == '') {
            $('#comment').css('background-color', 'pink');
            return;
        }

        $('#comment').css('background-color', 'white');
        $('#comment').val("");

       

        
        $.get('/addComment', {postId: postId, text: text}, function(data) {
            $('#comments-container').append(data);
        })
    })

    //=========================================================================================
    // Edit Post Logic
    //=========================================================================================

    $('.card-body').on('click', '#edit-post-btn', function() {
        let postTitle = $('#postTitle').text();
        let caption = $('#caption').text();
        $.get('/openEdit', {postTitle: postTitle, caption: caption}, (data) => {
            $(this).replaceWith(data)
        })
    })

    $('#edit-post-submit').click(function() {
        let postId = $('#postId').text();
        let postTitle = $('#postTitleEditForm').val();
        let caption = $('#captionEditForm').val();

        if (postTitle.trim() == '') {
            return;
        }

        console.log('update database post here.'); 

        $.get('/saveEdit', {postId: postId, postTitle: postTitle, caption: caption}, (data) => {
            
        })

        $('#edit-prompt').replaceWith(
            "<button type='button' class='btn btn-danger' name='edit-post-btn' id='edit-post-btn'>Edit Post</button>"
        );

        $('#postTitle').text(postTitle);
        $('#caption').text(caption);
        $('#date small').text('Last updated just then')
    })

    //=========================================================================================
    // Meowt Logic
    //=========================================================================================

    $('.card-body').on('click', '#like-btn', function() {

        $('#like-btn').replaceWith(
            "<button id='unlike-btn' type='button' class='btn btn-danger'> <i class='fas fa-heart-broken'></i> </button>"
        )
    })

    $('.card-body').on('click', '#unlike-btn', function() {

        $('#unlike-btn').replaceWith(
            "<button id='like-btn' type='button' class='btn btn-outline-danger'> <i class='fas fa-heart'></i> </button>"
        )
    })
});

























