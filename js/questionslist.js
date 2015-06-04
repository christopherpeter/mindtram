function loadquestions()
{

    var userimage = "";
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

    var questions = Parse.Object.extend("questionare");
    var query = new Parse.Query(questions);
    
    query.equalTo("userid", Parse.User.current().id);
    query.find({
        success: function (questions) {
            var output="";
          for (var i = 0; i < questions.length; i++) {
                var object = questions[i];

                output = output + "<b>Question " + (i + 1) + "</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#'>Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='#'>Delete</a><br/><br/>";
                output = output + "<label>" + object.get('question') + "</label><br/><br/>"
                output = output + "Option A  -<label>" + object.get('option1') + "</label><br/><br/>"
                output = output + "Option B  -<label>" + object.get('option2') + "</label><br/><br/>"
                output = output + "Option C -<label>" + object.get('option3') + "</label><br/><br/>"
                output = output + "Option D -<label>" + object.get('option4') + "</label><br/><br/>"
                output = output + "Correct Answer -<label>" + object.get('correctanswer') + "</label><br/><br/><br/><br/>"
                output = output + "<hr/>"
          }

          $("#questions").html(output);
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            alert("Error: " + error.code + " " + error.message);
        }
    });
}

function logout()
{

    Parse.User.logOut();

    window.location.href = "index.html";

}