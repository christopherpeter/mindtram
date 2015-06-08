function loadquestions() {

    var questions = Parse.Object.extend("questionare");
    var query = new Parse.Query(questions);

    query.equalTo("userid", {
        __type: "Pointer",
        className: "_User",
        objectId: Parse.User.current().id
    }).descending("updatedAt");

    //query.equalTo("userid", Parse.User.current().id);
    query.find({
        success: function (questions) {
            var output = "";
            for (var i = 0; i < questions.length; i++) {
                var object = questions[i];

                output = output + ' <div class="panel panel-default">';
                output = output + ' <div class="panel-heading"><a onclick=deletequestion("' + object.id + '") style="margin-left:15px"  class="pull-right">Delete</a><a href="editquestion.html?' + object.id + '" class="pull-right">Edit</a> <h4>Question ' + (i + 1) + '</h4></div>';
                output = output + ' <div class="panel-body">';
                output = output + ' <span>'+object.get('question')+'</span>';
                output = output + ' <div class="clearfix"></div>';
                output = output + ' <hr>';
                output = output + "<p>Option A -<label>" + object.get('option1') + "</label></p>"
                output = output + "<p>Option B -<label>" + object.get('option2') + "</label></p>"
                output = output + "<p>Option C -<label>" + object.get('option3') + "</label></p>"
                output = output + "<p>Option D -<label>" + object.get('option4') + "</label></p>"
                output = output + ' <hr>'
                output = output + ' <p>Correct Answer:' + object.get('correctanswer') + '</p>';
                output = output + ' </div>';
                output = output + ' </div>';            

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

function deletequestion(questionid) {

    var question = Parse.Object.extend("questionare");
    var query = new Parse.Query(question);
    query.get(questionid, {
        success: function (myObj) {
            // The object was retrieved successfully.
            myObj.destroy({
                success: function (myObj) {
                    alert("question deleted successfully!")
                    location.reload();
                },
                error: function (myObj, error) {
                    alert('Failed to create new object, with error code: ' + error.message);
                    // error is a Parse.Error with an error code and message.
                }
            });
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
        }
    });

}

