
$(document).ready(function(){

    //=========================================================================================
    // Login Logic
    //=========================================================================================

    /*$("#login-btn").submit((e) => {
        e.preventDefault();

        let username = $('#loginUsername').val();
        let password = $('#loginPassword').val();

        $.ajax({
            url: '/login',
            method: 'POST',
            data: {username: username, password: password}
        }).done((data) => {
            if (data) {
                window.location.replace('/')
            } else {
                $('#login-error').text('Incorrect username or password!');
            }
            
        }).fail((e) => {
            
        })
    }); */

    //=========================================================================================
    // Sign Up Logic
    //=========================================================================================

    try {
        $("#signup-forms")[0].reset();
    } catch (err) {}
    
    $('#signup-forms').submit((e) => {
        e.preventDefault();
        console.log('jkfld;sajfkldsajfkl;dsajfklsd;j')

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

    })

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

    $('#comment-form').submit(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation()
        let comment = $('#comment').val();
        let commentPostId = $('#commentPostId').val();
        $('#comment-submit-btn').prop('disabled', true);

        $.get('/addComment', {commentPostId: commentPostId, comment: comment, js: true}, (data, status) => {
            $('#comment').val('');
            $('#comments-container').append(data);
            $('#comment-submit-btn').prop('disabled', false);
        });

    })

    //=========================================================================================
    // Delete Comment Logic
    //=========================================================================================

    $('#comments-container').on('click', '#delete-comment-btn', function(e) {
        e.preventDefault();
        var $t = $(this);
        var commentId = $(this).parent().find('textarea:nth-child(2)').val();
        let postId = $('#postId').text();

        $(this).prop('disabled', true);
        $.ajax({
            url: "/deleteComment",
            type: "GET",
            data: {commentId: commentId, postId: postId, js: true}
        }).done((data) => {
            $t.parent().parent().parent().remove();
        }).fail((e) => {

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

        $('#edit-prompt').replaceWith(
            "<button type='button' class='btn btn-danger' name='edit-post-btn' id='edit-post-btn'>Edit Post</button>"
        );

        $.ajax({
            url: "/saveEdit",
            type: "PUT",
            data: {postId: postId, postTitle: postTitle, caption: caption}
          }).done((e) => {
            $('#postTitle').text(postTitle);
            $('#caption').text(caption);
            $('#date small').text('Last updated just then')
          }).fail((e) => {
            
          })

        

        
    })

    //=========================================================================================
    // Meowt Logic
    //=========================================================================================

    $('.card-body').on('click', '#like-btn',function(e) {
        e.preventDefault();
        let meowtPostId = $('#postId').text();

        $('#numberOfMeowts').text(parseInt($('#numberOfMeowts').text()) + 1)

        $('#likeForm').replaceWith(
            "<form id='unlikeForm' name='unlikeForm' method='GET' action='/unlikePost'>" +
                "<button id='unlike-btn' type='submit' class='btn btn-danger'> <i class='fas fa-heart-broken'></i> </button>" +
            "</form>"
        );

        $('#unlike-btn').prop('disabled', true);

        let numberOfMeowts = $('#numberOfMeowts').text();

        $('.card-body span').html('Meowted by <b>' + numberOfMeowts + '</b>');

        $.ajax({
            url: "/likePost",
            type: "GET",
            data: {meowtPostId: meowtPostId, js: true}
          }).done((e) => {
            $('#unlike-btn').prop('disabled', false);
          }).fail((e) => {
              
          })
        
    }) 

    $('.card-body').on('click', '#unlike-btn', function(e) {
        e.preventDefault();
        //not sure if sessions is on server or client side but i'll just put checkers on both sides just in case
        let username = 'default';
        let meowtPostId = $('#postId').text();

        $('#numberOfMeowts').text(parseInt($('#numberOfMeowts').text()) - 1)

        $('#unlikeForm').replaceWith(
            "<form id='likeForm' name='likeForm' method='GET' action='/likePost'>" +
                "<button id='like-btn' type='submit' class='btn btn-outline-danger'> <i class='fas fa-heart'></i> </button>" +
            "</form>"
        );
        $('#like-btn').prop('disabled', true);

        let numberOfMeowts = $('#numberOfMeowts').text();

        $('.card-body span').html('Meowted by <b>' + numberOfMeowts + '</b>');

        $.ajax({
            url: "/unlikePost",
            type: "GET",
            data: {meowtPostId: meowtPostId, js: true}
          }).done((e) => {
            $('#like-btn').prop('disabled', false);
          }).fail((e) => {
              
          }) 
    })

    //=========================================================================================
    // Delte Post Logic
    //=========================================================================================

    $('#delete-post-btn').click( function(e) {
        e.preventDefault();
        let deletePostId = $('#postId').text();

        $.ajax({
            url: '/deletePost',
            type: 'POST',
            data: {deletePostId: deletePostId, js: true}
          }).done((e) => {
            window.location.replace("/catFeed");
          }).fail((e) => {

          })
          
    }) 

    $('.col-md-8').on('click', "#edit-description", () => {
        let description = $('#your-desc').text();
        
        $.get('/editProfileDescription', {description: description}, (data) => {
            $('#edit-description').replaceWith(data);
        })
    })

    //=========================================================================================
    // Edit Profile Logic
    //=========================================================================================

    $('#edit-description-submit').click(() => {
        let description = $('#descriptionEditForm').val();

        //login simulation
        let username = 'default';

        $.ajax({
            url: '/submitEditProfileDescription',
            type: 'PUT',
            data: {description: description, username: username}
          }).done((a) => {
            $('#edit-description-forms').replaceWith(
                "<button type='button' class='btn btn-danger' name='edit-description' id='edit-description'>Edit Description</button>"
            );

            $('#your-desc').text(description);
          })

       

        
    })

    $('#change-avatar').click(() => {
        $('#change-avatar').replaceWith(
            "<div id='edit-avatar' class='col-md-4'>" +
                "<form id='edit-avatar-form' name='edit-avatar-form' enctype='multipart/form-data'>" +
                    "<input type='file' id='edit-avatar-file' name='edit-avatar-file' accept='image/*' required/>" +
                    "<button type='submit' class='btn btn-danger' id='submit-avatar-btn'>Submit</button>" +
                    "<p id='avatarError' name='avatarError'></p>" +
                    "<br>" + "<br>" +
                "</form>" +    
            "</div>"
        );
    });

    $('#divAvatar').on('submit', '#edit-avatar-form', function(e) {
        e.preventDefault();

        let username = 'default';

        var file = document.getElementById("edit-avatar-file");
        if (file.files[0].size >  (1048576 * 2)) {
            $('#avatarError').text("Image should not be bigger than 2MB")
            return false;
        }        
    
        $('#submit-avatar-btn').prop('disabled', true);

        var formData = new FormData(this);
        $.ajax({
            url: '/profile/' + username,
            type: 'PUT',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false
        }).done((data) => {
            location.reload();
        }).fail((error) => {

        })
    })

        


    


});




    























