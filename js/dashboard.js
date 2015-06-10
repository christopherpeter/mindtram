var questionid = '';
function loaddashboard() {
    var statistics = Parse.Object.extend("questionare");
    var query = new Parse.Query(statistics);
    query.equalTo("userid", {
        __type: "Pointer",
        className: "_User",
        objectId: Parse.User.current().id
    }).descending("updatedAt");
    query.count({
        success: function (count) {
            $("#totalquestions").html("Questions Posted: " + count);
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
            $("#totalanswers").html("Answered: " + count);
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

            var Post = Parse.Object.extend("questionare");
            var Comment = Parse.Object.extend("answers");
            var innerQuery = new Parse.Query(Post);
            var query = new Parse.Query(Comment);
            query.matchesQuery("questionid", innerQuery);

            query.equalTo("userid", {
                __type: "Pointer",
                className: "_User",
                objectId: Parse.User.current().id
            }).descending("updatedAt");

            query.find({
                success: function (comments) {

                    var output = "";
                    for (var i = 0; i < questions.length; i++) {
                        var object = questions[i];
                        questionid = questions[i].id;

                        var commentsfound = false;
                        for (var j = 0; j < comments.length; j++) {

                            if (comments[j].get("questionid").id == questions[i].id) {

                                commentsfound = true;
                            }

                        }
                        if (commentsfound == false) {

                            $("#latestquestionoveralluser").html(object.get("userprofileid").get("firstname") + " " + object.get("userprofileid").get("lastname"));

                            $('#latesquestionoveralluserimage')[0].src = object.get("userprofileid").get("profileimage").url();
                            $("#latestquestionoverall").html(object.get('question'));

                            $("#latestquestionoveralloption1").html("Option A: " + object.get('option1'));
                            $("#latestquestionoveralloption2").html("Option B: " + object.get('option2'));
                            $("#latestquestionoveralloption3").html("Option C: " + object.get('option3'));
                            $("#latestquestionoveralloption4").html("Option D: " + object.get('option4'));

                            $("#latestquestionoverallanswerform").show();
                            $("#latestquestionoverallanswercomplete").hide();
                        }
                        else {

                            $("#latestquestionoveralluser").html(object.get("userprofileid").get("firstname") + " " + object.get("userprofileid").get("lastname"));

                            $('#latesquestionoveralluserimage')[0].src = object.get("userprofileid").get("profileimage").url();
                            $("#latestquestionoverall").html(object.get('question'));

                            $("#latestquestionoveralloption1").html("Option A: " + object.get('option1'));
                            $("#latestquestionoveralloption2").html("Option B: " + object.get('option2'));
                            $("#latestquestionoveralloption3").html("Option C: " + object.get('option3'));
                            $("#latestquestionoveralloption4").html("Option D: " + object.get('option4'));

                            $("#latestquestionoverallanswerform").hide();
                            $("#latestquestionoverallanswercomplete").show();

                        }

                    }

                }
            });
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


function postquestion() {
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


function latestquestionoverallsaveanswer() {
    var questions = Parse.Object.extend("questionare");

    var query = new Parse.Query(questions);
    query.include("userprofileid");
    query.equalTo("objectId", questionid);
    query.find({
        success: function (questions) {

            var answer = Parse.Object.extend("answers");
            var answer = new answer();

            answer.set("userid", {
                __type: "Pointer",
                className: "_User",
                objectId: Parse.User.current().id
            });

            answer.set("questionid", {
                __type: "Pointer",
                className: "questionare",
                objectId: questions[0].id
            });

            var e = document.getElementById('answeroption');
            var answeroption = e.options[e.selectedIndex].value;

            answer.set("answer", answeroption);
            answer.set("comments", $('#latestquestionoverallcomment').val());

            if (questions[0].get('correctanswer') == answeroption)
                answer.set("iscorrect", 1);
            else
                answer.set("iscorrect", 0);

            answer.save(null, {
                success: function (answer) {
                    // Execute any logic that should take place after the object is saved.
                    alert('Answer submitted with ID: ' + answer.id);

                    var answerstats = Parse.Object.extend("useranswerstats");
                    var query = new Parse.Query(answerstats);
                    query.equalTo("userid", {
                        __type: "Pointer",
                        className: "_User",
                        objectId: Parse.User.current().id
                    });
                    query.find({
                        success: function (answerstats) {

                            if (answerstats.length == 0) {

                                var answerstats = Parse.Object.extend("useranswerstats");
                                var answerstats = new answerstats();

                                answerstats.set("userid", {
                                    __type: "Pointer",
                                    className: "_User",
                                    objectId: Parse.User.current().id
                                });
                                answerstats.increment("answercount");
                                if (answer.get("iscorrect") == 1)
                                    answerstats.increment("score");

                                answerstats.save(null, {
                                    success: function (answerstats) {

                                        loadfeeds();
                                    }
                                });

                            }
                            else {
                                var answerstats1 = Parse.Object.extend("useranswerstats");
                                var answerstats1 = new answerstats1();

                                answerstats1.set("objectId", answerstats[0].id);
                                answerstats1.increment("answercount");

                                if (answer.get("iscorrect") == 1)
                                    answerstats1.increment("score");

                                answerstats1.save(null, {
                                    success: function (answerstats1) {
                                        loadfeeds();
                                    }
                                });

                            }

                        },
                        error: function (error) {
                            alert("Error: " + error.code + " " + error.message);
                        }
                    });

                },
                error: function (question, error) {
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });

        },
        error: function (object, error) {
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
            alert("Error: " + error.code + " " + error.message);
        }
    });


}