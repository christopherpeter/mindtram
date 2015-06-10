
var urlsplit = "";
function loadquestionpreliminary() {
    
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
                $("#answer option[value=" + object.get('correctanswer') + "]").attr('selected', 'selected');
                $("#questiontype option[value=" + object.get('type') + "]").attr('selected', 'selected');
                $("#startdate").val((object.get('startdate').getMonth() + 1) + '/' + object.get('startdate').getDate() + '/' + object.get('startdate').getFullYear());
                $("#enddate").val((object.get('enddate').getMonth() + 1) + '/' + object.get('enddate').getDate() + '/' + object.get('enddate').getFullYear());

                var splittag = object.get("tags").split(",");

                for (var i = 0; i < splittag.length; i++)
                {
                    $('#myTags').tagit('createTag', splittag[i]);
                }

                //alert($("#mySingleField").val());
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

    question.set("objectId", urlsplit[1]);
    question.set("userid", {
        __type: "Pointer",
        className: "_User",
        objectId: Parse.User.current().id
    });
    question.set("question", $("#question").val());
    question.set("option1", $("#optiona").val());
    question.set("option2", $("#optionb").val());
    question.set("option3", $("#optionc").val());
    question.set("option4", $("#optiond").val());
    var e = document.getElementById("answer");
    var answer = e.options[e.selectedIndex].value;
    question.set("correctanswer", answer);
    var startdate = new Date($("#startdate").val());
    var enddate = new Date($("#enddate").val());
    var f = document.getElementById("questiontype");
    var questiontype = f.options[f.selectedIndex].value;
    question.set("type", questiontype);

    question.set("userprofileid", {
        __type: "Pointer",
        className: "userprofiles",
        objectId: localStorage.getItem("profileid")
    });

    question.set("startdate", startdate);
    question.set("enddate", enddate);
    question.set("tags", $("#mySingleField").val());
    question.save(null, {
        success: function (question) {
            // Execute any logic that should take place after the object is saved.
            alert('Question Updated successfully!');

            window.location.href = "myquestions.html";

        },
        error: function (question, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
}