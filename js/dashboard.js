function loaddashboard()
{
    var statistics = Parse.Object.extend("questionare");
    var query = new Parse.Query(statistics);
    query.equalTo("userid", {
        __type: "Pointer",
        className: "_User",
        objectId: Parse.User.current().id
    }).descending("updatedAt");
    query.count({
        success: function (count) {
            $("#totalquestions").html("Questions Posted: "+count);
        },
        error: function (error) {
            // The request failed
        }
    });


    var statistics1 = Parse.Object.extend("answers");
    var query = new Parse.Query(statistics1);
    query.equalTo("userid", {
        __type: "Pointer",
        className: "_User",
        objectId: Parse.User.current().id
    }).descending("updatedAt");
    query.count({
        success: function (count) {
            $("#totalanswers").html("Answered: "+count);
        },
        error: function (error) {
            // The request failed
        }
    });


    var questions = Parse.Object.extend("questionare");

    var query = new Parse.Query(questions);
    query.include("userprofileid");
    query.descending("updatedAt");
    query.limit(1);
    query.find({
        success: function (questions) {

            var output = "";
            for (var i = 0; i < questions.length; i++) {
                var object = questions[i];

                $("#latestquestionoveralluser").html(object.get("userprofileid").get("firstname") + " " + object.get("userprofileid").get("lastname"));

                $("#latesquestionoveralluserimage").src = object.get("userprofileid").get("profileimage").url();

                $("#latestquestionoverall").html(object.get('question'));

                $("#latestquestionoveralloption1").html("Option A: "+object.get('option1'));
                $("#latestquestionoveralloption2").html("Option B: " + object.get('option2'));
                $("#latestquestionoveralloption3").html("Option C: " + object.get('option3'));
                $("#latestquestionoveralloption4").html("Option D: " + object.get('option4'));

            }
            
        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            alert("Error: " + error.code + " " + error.message);
        }
    });


    var questions1 = Parse.Object.extend("questionare");

    var query = new Parse.Query(questions1);
    query.equalTo("userid", {
        __type: "Pointer",
        className: "_User",
        objectId: Parse.User.current().id
    }).descending("updatedAt");

    query.limit(1)

    query.include("userprofileid");    
    
    query.find({
        success: function (questions) {

            var output = "";

            for (var i = 0; i < questions.length; i++) {

                var object = questions[i];               

                $("#latestquestion").html(object.get('question'));

                $("#latestquestionoption1").html("Option A: " + object.get('option1'));
                $("#latestquestionoption2").html("Option B: " + object.get('option2'));
                $("#latestquestionoption3").html("Option C: " + object.get('option3'));
                $("#latestquestionoption4").html("Option D: " + object.get('option4'));

            }

        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            alert("Error: " + error.code + " " + error.message);
        }
    });


}


function postquestion()
{
    var question = Parse.Object.extend("questionare");
    var question = new question();

    question.set("userid", {
        __type: "Pointer",
        className: "_User",
        objectId: Parse.User.current().id
    });

    question.set("userprofileid", {
        __type: "Pointer",
        className: "userprofiles",
        objectId: localStorage.getItem("profileid")
    });


    question.set("question", $("#question").val());
    question.set("type", "discussion");   

    question.save(null, {
        success: function (question) {
            // Execute any logic that should take place after the object is saved.
            alert('Question submitted for discussion with ID: ' + question.id);
            $("#question").val("");
        },
        error: function (question, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });

}


function latestquestionoverallsaveanswer()
{


}