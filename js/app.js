
function validateuser(){

    $("#loader").show();

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

                alert('Failed to create new object, with error code: ' + error.message);
                //alert("Login Failed: Pls. check your credentials");
                $("#loader").hide();
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
                    $("#loader").hide();
                }
            });
           
        },
        error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
            $("#loader").hide();
        }
    });
}

function loadprofile()
{

    var profile = Parse.Object.extend("User");
    var query = new Parse.Query(profile);

    query.equalTo("objectId", Parse.User.current().id);
    query.find({
        success: function (profile) {

          //  alert(JSON.stringify(profile));

            var output = "";
            for (var i = 0; i < profile.length; i++) {
                var object = profile[i];

                $("#username").val(object.get('username'));
               
                $("#email").val(object.get('email'));
                $("#phone").val(object.get('phone'));

                var query1 = new Parse.Query("userprofiles");
                query1.equalTo("userid", Parse.User.current().id);
                query1.find({
                    success: function (result) {

                        for (var i = 0; i < result.length; i++) {
                            var object = result[i];

                            userimage = object.get("profileimage").url();
                            $('#profileimage')[0].src = userimage;
                        }
                    },
                    error: function (error) {
                        // Something went wrong
                    }
                });
              
            }

            
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            alert("Error: " + error.code + " " + error.message);
        }
    });

}

function updateprofile() {

    $("#loader").show();
   
    var user = Parse.User.current();
    user.set("username", $("#username").val());

    if ($("#password").val() != null && $("#password").val() != "") {
        user.set("password", $("#password").val());
    }

    user.set("email", $("#email").val());

    // other fields can be set just like with Parse.Object
    user.set("phone", $("#phone").val());

    user.save(null, {
        success: function (user) {
            
          
            var profile = Parse.Object.extend("userprofiles");
            var profile = new profile();
            profile.set("userid", Parse.User.current().id);

            var fileUploadControl = $("#profilePhotoFileUpload")[0];
            if (fileUploadControl.files.length > 0) {



                var file = fileUploadControl.files[0];
                var name = Parse.User.current().id + "_profilephoto.jpg";

                var parseFile = new Parse.File(name, file);

                profile.set("profileimage", parseFile);

                profile.save(null, {
                    success: function (profile) {
                        // Execute any logic that should take place after the object is saved.                  
                        window.location.href = "myquestions.html";

                    },
                    error: function (question, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to create new object, with error code: ' + error.message);
                        $("#loader").hide();
                    }
                });
            }            

        },
        error: function (user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
            $("#loader").hide();
        }
    });
}

function loadstatistics()
{   

    

}

function logout() {

    Parse.User.logOut();

    window.location.href = "index.html";

}