$(document).ready(function () {
    // Getting references to our form and input
    var emailForm = $("form.emailForm");
    var passwordForm = $("form.passwordForm");
    var emailInput = $("input#email-input");
    var passwordInput = $("input#password-input");
    var confirmInput = $("input#confirm-input");

    $(".passwordForm").on("submit", function (event) {
        event.preventDefault();
        var password1 = passwordInput.val().trim()
        var password2 = confirmInput.val().trim()


        //Make sure the passwords match.
        if (password1 !== password2) {

            /*function checkPassword(form) { */


            if (password1 == '')
                alert("Please enter Password");

            else if (password2 == '')
                alert("Please enter confirm password");


            else if (password1 != password2) {
                alert("\nPassword did not match: Please try again...")
                return false;
            }

            else {
                alert("Password Match: Welcome to GeeksforGeeks!")
                return true;
            }


            return;
        }
    })

    // When the signup button is clicked, we validate the email and password are not blank
    emailForm.on("submit", function (event) {
        event.preventDefault();
        $(".email-message").empty();

        var emailData =
        {
            email: emailInput.val().trim()
        };

        //Make sure there are no blank fields.
        if (!emailData.email) {
            $(".email-message").empty();
            $(".email-message").append

                (
                    "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">" +
                    "<strong>Blank Fields!</strong> Please fill out all the fields." +
                    "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
                    "<span aria-hidden=\"true\">&times;</span></button></div>"
                );
            return;
        }



        //Crazy RegEx magic for validating email string.
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.val().trim())) {
            $(".email-message").empty();


            $(".email-message").append
                (
                    "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">" +
                    "<strong>Bad Email!</strong> Please verify your email address." +
                    "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
                    "<span aria-hidden=\"true\">&times;</span></button></div>"
                );
            return;
        }

        // If we have a user name, email and password, run the signUpUser function
        /*  signUpUser(userData.username, userData.email, userData.password);
  
          usernameInput.val("");
          emailInput.val("");
          passwordInput.val("");
          confirmInput.val("");
      });*/


        //Does a post to the signup route. If successful, we are redirected to the members page
        //Otherwise we log any errors
        /* function signUpUser(username, email, password) {
             $.post("/api/signup",
                 {
                     username: username,
                     email: email,
                     password: password
                 })
                 .then(function (data) {
                     window.location.replace("/home");
                 })
                 .catch(function (err) //Check for existing user.
                 {
                     $(".info-message").empty();
                     $(".info-message").append
                         (
                             "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">" +
                             "<strong>Invalid User Name!</strong> User name already taken." +
                             "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
                             "<span aria-hidden=\"true\">&times;</span></button></div>"
                         );
                 }); */

    })

});
