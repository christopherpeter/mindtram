function loadfeeds() {

    var answerobject = "";

    $("#questions").html('<img src="images/716.GIF" />');
    var questions = Parse.Object.extend("questionare");

    var query = new Parse.Query(questions);
    query.include("userprofileid");

    query.descending("createdAt");

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
            }).descending("createdAt");

            query.find({
                success: function (comments) {

                    //alert(comments[0].get("questionid").id);
                    var output = "";
                    for (var i = 0; i < questions.length; i++) {
                        var object = questions[i];                        
                       
                        var commentsfound = false;
                        var yourcomments = "";
                        for (var j = 0; j < comments.length; j++) {

                            if (comments[j].get("questionid").id == questions[i].id) {

                                commentsfound = true;
                                yourcomments = comments[j].get("comments");
                            }

                        }
                        //alert(commentsfound);
                        if (commentsfound == false) {                           

                            output = output + ' <div class="panel panel-default">';
                            output = output + ' <div class="panel-heading"><h4>Question was posted by  ' + object.get("userprofileid").get("firstname") + ' ' + object.get("userprofileid").get("lastname") + '</h4><img src="' + object.get("userprofileid").get("profileimage").url() + '"  style="border-radius:50%;width:50px;float:right;margin-top:-15px"></div>';
                            output = output + ' <div class="panel-body">';
                            output = output + ' <span>' + object.get('question') + '</span>';
                            output = output + ' <div class="clearfix"></div>';
                            output = output + ' <hr>';
                            output = output + "<p>Option A -<label>" + object.get('option1') + "</label></p>"
                            output = output + "<p>Option B -<label>" + object.get('option2') + "</label></p>"
                            output = output + "<p>Option C -<label>" + object.get('option3') + "</label></p>"
                            output = output + "<p>Option D -<label>" + object.get('option4') + "</label></p>"
                            output = output + ' <hr>'                           
                            output = output + '<form onsubmit="return false;">';
                            if (object.get('type') == "optional") {
                                output = output + '<select id="' + object.id + '_answeroption"><option value="no">Select Your Answer</option><option value="1">Option A</option><option value="2">Option B</option><option value="3">Option C</option><option value="4">Option D</option></select>';
                            }
                            output = output + '<div class="input-group">';
                            output = output + '<input type="text" class="form-control" id="' + object.id + '_comment" placeholder="Comment on your answer">';
                            output = output + '<div class="input-group-btn">';
                            output = output + '<button class="btn btn-default" onclick=saveanswer("' + object.id + '")><i class="glyphicon glyphicon-ok"></i></button>';
                            output = output + '</div>';
                            output = output + '</div>';
                            output = output + '</form>';
                            output = output + ' </div>';
                            output = output + ' </div>';
                            
                            
                        }

                        else {
                           
                            output = output + ' <div class="panel panel-default">';
                            output = output + ' <div class="panel-heading"><h4>Question was posted by  ' + object.get("userprofileid").get("firstname") + ' ' + object.get("userprofileid").get("lastname") + '</h4><img src="' + object.get("userprofileid").get("profileimage").url() + '"  style="border-radius:50%;width:50px;float:right;margin-top:-15px"></div>';
                            output = output + ' <div class="panel-body">';
                            output = output + ' <span>' + object.get('question') + '</span>';
                            output = output + ' <div class="clearfix"></div>';
                            output = output + ' <hr>';
                            output = output + "<p>Option A -<label>" + object.get('option1') + "</label></p>"
                            output = output + "<p>Option B -<label>" + object.get('option2') + "</label></p>"
                            output = output + "<p>Option C -<label>" + object.get('option3') + "</label></p>"
                            output = output + "<p>Option D -<label>" + object.get('option4') + "</label></p>"
                            output = output + ' <hr>'
                            output = output + ' <div class="alert alert-success">'
                            if (object.get('type') == "optional") {
                                output = output + ' <strong><span class="glyphicon glyphicon-ok"></span>You have answered this question</strong>'
                            }
                            else {

                                output = output + ' <strong><span class="glyphicon glyphicon-ok"></span>Your Comments: ' + yourcomments + '</strong>'
                            }
                            output = output + '  </div>'
                            output = output + ' </div>';
                            output = output + ' </div>';

                        }
                    }

                    $("#questions").html(output);

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


function saveanswer(questionid) {
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

            var e = document.getElementById(questionid + '_answeroption');
            var answeroption = e.options[e.selectedIndex].value;

            answer.set("answer", answeroption);
            answer.set("comments", $('#' + questionid + '_comment').val());

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