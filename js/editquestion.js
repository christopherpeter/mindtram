
var urlsplit = "";
function loadquestionpreliminary() {
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


     urlsplit = window.location.href.split("?");

    var question = Parse.Object.extend("questionare");
    var query = new Parse.Query(question);

    query.equalTo("objectId", urlsplit[1]);
    query.find({
        success: function (question) {

            //  alert(JSON.stringify(profile));

            var output = "";
            for (var i = 0; i < question.length; i++) {

                var object = question[i];               

                $("#question").val(object.get('question'));
                $("#optiona").val(object.get('option1'));
                $("#optionb").val(object.get('option2'));
                $("#optionc").val(object.get('option3'));
                $("#optiond").val(object.get('option4'));
                $("#answer").val(object.get('correctanswer'));
                $("#startdate").val((object.get('startdate').getMonth() + 1) + '/' + object.get('startdate').getDate() + '/' + object.get('startdate').getFullYear());
                $("#enddate").val((object.get('enddate').getMonth() + 1) + '/' + object.get('enddate').getDate() + '/' + object.get('enddate').getFullYear());

            }

        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            alert("Error: " + error.code + " " + error.message);
        }
    });

}

function savequestion() {

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

    question.save(urlsplit[1], {
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