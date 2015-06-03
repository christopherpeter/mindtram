
function validateuser(){


    var currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        Parse.User.logOut();
    }

        Parse.User.logIn($("#username").val(), $("#password").val(), {
            success: function (user) {
                
                window.location.href = "myquestions.html";
            },
            error: function (user, error) {
                alert("Login Failed: Pls. check your credentials");

            }
        }); 
}


function register()
{

    var user = new Parse.User();
    user.set("username", $("#username").val());
    user.set("password", $("#password").val());
    user.set("email", $("#email").val());

    // other fields can be set just like with Parse.Object
    user.set("phone", $("#phone").val());

    var fileUploadControl = $("#profilePhotoFileUpload")[0];
    if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "photo.jpg";

        var parseFile = new Parse.File(name, file);

        user.set("userimage", parseFile);
    }

   

    user.signUp(null, {
        success: function (user) {
            window.location.href = "index.html";
        },
        error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
        }
    });
}


