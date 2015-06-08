function loadfeeds()
{
    var questions = Parse.Object.extend("questionare");
  
    var query = new Parse.Query(questions);
    query.include("userprofileid");
    query.descending("updatedAt");
    query.find({
        success: function (questions) {

           
            var output = "";
            for (var i = 0; i < questions.length; i++) {
                var object = questions[i];
               
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
                output = output + '<form>';
                output = output + '<select id="answeroption"><option value="no">Select Your Answer</option><option value="1">Option A</option><option value="2">Option B</option><option value="3">Option C</option><option value="4">Option D</option></select>';
                output = output + '<div class="input-group">';                
                output = output + '<input type="text" class="form-control" id="' + object.id + '_comment" placeholder="Comment on your answer">';
                output = output + '<div class="input-group-btn">';
                output = output + '<button class="btn btn-default" onclick="saveanswer("' + object.id + '")"><i class="glyphicon glyphicon-ok"></i></button>';
                output = output + '</div>';                
                output = output + '</div>';
                output = output + '</form>';
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


function saveanswer(questionid)
{

}