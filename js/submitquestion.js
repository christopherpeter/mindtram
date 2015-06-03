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

    question.save(null, {
        success: function (question) {
            // Execute any logic that should take place after the object is saved.
            alert('Question submitted with ID: ' + question.id);
           
        },
        error: function (question, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}