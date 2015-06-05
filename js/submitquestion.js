function loadquestionpreliminary()
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


}

function submitquestion()
{       

    var question = Parse.Object.extend("questionare");
    var question = new question();

    question.set("userid", Parse.User.current().id);
    question.set("question", $("#question").val());
    question.set("option1", $("#optiona").val());
    question.set("option2", $("#optionb").val());
    question.set("option3", $("#optionc").val());
    question.set("option4", $("#optiond").val());
    question.set("correctanswer", $("#answer").val());
    var startdate = new Date($("#startdate").val());
    var enddate = new Date($("#enddate").val());

    question.set("startdate", startdate);
    question.set("enddate", enddate);
   
    question.set("tags", $("#mySingleField").val());

    question.save(null, {
        success: function (question) {
            // Execute any logic that should take place after the object is saved.
            alert('Question submitted with ID: ' + question.id);
            window.location.href = "myquestions.html";
        },
        error: function (question, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}