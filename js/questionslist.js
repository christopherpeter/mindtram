function loadquestions() {

    var questions = Parse.Object.extend("questionare");
    var query = new Parse.Query(questions);

    query.equalTo("userid", {
        __type: "Pointer",
        className: "_User",
        objectId: Parse.User.current().id
    }).descending("createdAt");

    query.include("userprofileid");



    //query.equalTo("userid", Parse.User.current().id);
    query.find({
        success: function (questions) {



            var Post = Parse.Object.extend("questionare");
            var Comment = Parse.Object.extend("answers");

            var innerQuery = new Parse.Query(Post);
            var query = new Parse.Query(Comment);
            query.include("userprofileid");
            query.matchesQuery("questionid", innerQuery);

            query.descending("createdAt");

            query.find({
                success: function (comments) {

                    var output = "";
                    for (var i = 0; i < questions.length; i++) {
                        var object = questions[i];

                        var commentsfound = false;
                        var yourcomments = "";
                        var commentsoutput = "";
                        var optionselected = "";
                        for (var j = 0; j < comments.length; j++) {

                            if (comments[j].get("questionid").id == questions[i].id) {

                                commentsfound = true;

                                yourcomments = comments[j].get("comments");

                                if (yourcomments == "")
                                {
                                    yourcomments = ' with no comments';
                                }
                                else {
                                    yourcomments = ' and commented : ' + yourcomments;

                                }

                                switch(comments[j].get("answer"))
                                {
                                    case "1":
                                        optionselected = "Option A"
                                        break;
                                    case "2":
                                        optionselected = "Option B"
                                        break;
                                    case "3":
                                        optionselected = "Option C"
                                        break;
                                    case "4": optionselected = "Option D"
                                        break;                                   

                                }

                                if (object.get('type') == "optional") {
                                    commentsoutput = commentsoutput + '<span class="glyphicon glyphicon-ok"></span> ' + comments[j].get("userprofileid").get("firstname") + ' ' + comments[j].get("userprofileid").get("lastname") + ' answered : ' + optionselected + yourcomments + '<br/>'
                                }
                                else {

                                    commentsoutput = commentsoutput + '<span class="glyphicon glyphicon-ok"></span>' + comments[j].get("userprofileid").get("firstname") + ' ' + comments[j].get("userprofileid").get("lastname") + ' commented : ' + yourcomments + '<br/>'
                                }
                            }

                        }
                        //alert(commentsfound);
                        if (commentsfound == false) {

                            output = output + ' <div class="panel panel-default">';
                            output = output + ' <div class="panel-heading"><a onclick=deletequestion("' + object.id + '") style="margin-left:15px"  class="pull-right">Delete</a><a href="editquestion.html?' + object.id + '" class="pull-right">Edit</a> <h4>Question ' + (i + 1) + '</h4></div>';
                            output = output + ' <div class="panel-body">';
                            output = output + ' <span>' + object.get('question') + '</span>';
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
                        else {

                            output = output + ' <div class="panel panel-default">';
                            output = output + ' <div class="panel-heading"><a onclick=deletequestion("' + object.id + '") style="margin-left:15px"  class="pull-right">Delete</a><a href="editquestion.html?' + object.id + '" class="pull-right">Edit</a> <h4>Question ' + (i + 1) + '</h4></div>';
                            output = output + ' <div class="panel-body">';
                            output = output + ' <span>' + object.get('question') + '</span>';
                            output = output + ' <div class="clearfix"></div>';
                            output = output + ' <hr>';
                            output = output + "<p>Option A -<label>" + object.get('option1') + "</label></p>"
                            output = output + "<p>Option B -<label>" + object.get('option2') + "</label></p>"
                            output = output + "<p>Option C -<label>" + object.get('option3') + "</label></p>"
                            output = output + "<p>Option D -<label>" + object.get('option4') + "</label></p>"
                            output = output + ' <hr>'
                            output = output + ' <p>Correct Answer:' + object.get('correctanswer') + '</p>';
                            output = output + '<div class="alert alert-info">'
                            output = output + commentsoutput;
                            output = output + '  </div>'
                            output = output + ' </div>';
                            output = output + ' </div>';
                        }

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

