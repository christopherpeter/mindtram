
function validateuser(){


    var currentUser = Parse.User.current();
    if (currentUser) {
        // do stuff with the user
        Parse.User.logOut();
    }

        Parse.User.logIn($("#username").val(), $("#password").val(), {
            success: function (user) {
                //alert(JSON.stringify(user));
               window.location.href = "myquestions.html";
            },
            error: function (user, error) {
                alert("Login Failed: Pls. check your credentials");

            }
        }); 
}


function register()
{
    $("#loader").show();
    var user = new Parse.User();
    user.set("username", $("#username").val());
    user.set("password", $("#password").val());
    user.set("email", $("#email").val());

    // other fields can be set just like with Parse.Object
    user.set("phone", $("#phone").val());   

    user.signUp(null, {
        success: function (user) {



            var profile = Parse.Object.extend("userprofiles");
            var profile = new profile();

            profile.set("userid", Parse.User.current().id);
                        

            var fileUploadControl = $("#profilePhotoFileUpload")[0];
            if (fileUploadControl.files.length > 0) {
                var file = fileUploadControl.files[0];
                var name = Parse.User.current().id+"_profilephoto.jpg";

                var parseFile = new Parse.File(name, file);

                profile.set("profileimage", parseFile);
            }

            profile.save(null, {
                success: function (profile) {
                    // Execute any logic that should take place after the object is saved.                  
                    window.location.href = "index.html";

                },
                error: function (question, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });
           
        },
        error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
        }
    });
}


function updateprofile() {


}