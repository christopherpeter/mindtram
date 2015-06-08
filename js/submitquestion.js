

function submitquestion()
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
    question.set("option1", $("#optiona").val());
    question.set("option2", $("#optionb").val());
    question.set("option3", $("#optionc").val());
    question.set("option4", $("#optiond").val());
    var e = document.getElementById("answer");
    var answer = e.options[e.selectedIndex].value;
    question.set("correctanswer", answer);
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