let debug = true;
let username;
let id;
let surveyData;
let lastComments = 0;






//Figure out how many surveys have not been read.
let calcUnread = function()
{
    let unread = 0;
    for(let i = 0; i < userSurveys.length; i++)
    {
        if(!userSurveys[i].isRead)
        {
            unread++;
        }
    }

    $("#unread-div").text(unread);
}

let getSurveys = function() 
{
    //Get the logged in username.
    username = $(".navbar-user").attr("data-username");

    //Grab all the surveys the user is a part of.
    $.get("/api/usersurveys/" + username)
    .then(function(data)
    {
        if(debug)console.log(data);
        userSurveys = data;

        //Calculate how many unread surveys there are.
        calcUnread();
    })
    .fail(function(err)
    {
        throw err;
    });
}

//Display the survey when the page first loads.
let buildSurvey = function()
{
    if(debug)console.log(surveyData.survey[0]);
    if(debug)console.log(surveyData.data);

    let commentsArray = surveyData.data.comments;
    //lastComments = commentsArray.length;

    //Display the survey title.
    $("#survey-title").text(surveyData.survey[0].surveyTitle);

    //Add initial comments to the survey.
    /*
    for(let i = 0; i < commentsArray.length; i++)
    {
        let username = commentsArray[i].username;
        let comment = commentsArray[i].comment;
        let commentText = "<b>" + username + ": </b>" + comment + "<br>";
        $("#comments-div").append(commentText);
    }
    */





}

let getSurveyData = function()
{
    //Grab the initial survey data.
    $.get("/api/initialsurveydata/" + id)
    .then(function(data)
    {
        $.get("/api/survey/" + id)
        .then(function(dbSurvey)
        {
            surveyData =
            {
                survey: dbSurvey,
                data: data
            };
            
            //Put the initial survey data on the display.
            buildSurvey();
        })
        .fail(function(err)
        {
            throw err;
        });
    })
    .fail(function(err)
    {
        throw err;
    });
}

//Check if there are any new comments.  If so, update them on the page.
let updateComments = function()
{
    $.get("/api/numcomments/" + id)
        .then(function(dbComments)
        {
            let numComments = dbComments.commentCount;
            
            //Check to see if there are any new comments since last check.
            if(numComments > lastComments)
            {
                $.get("/api/surveycomments/" + id)
                .then(function(dbComment)
                {
                    if(debug)console.log(dbComment);

                    for(let i = lastComments; i < dbComment.length; i++)
                    {
                        let username = dbComment[i].username;
                        let comment = dbComment[i].comment;
                        let commentText = "<b>" + username + ": </b>" + comment + "<br>";
                        $("#comments-div").append(commentText);
                    }




                    lastComments = numComments;
                })
                .fail(function(err)
                {
                    throw err;
                });
            }
        })
        .fail(function(err)
        {
            throw err;
        });
}


//Send a user comment to the server.
let sendComment = function(event)
{
    event.preventDefault();

    let comment = $("#comment-text").val().trim();
    $("#comment-text").val("");

    //Send the POST request.
    $.ajax("/api/postcomment",
    {
        type: "POST",
        data:
        { 
            username: username,
            comment:  comment,
            surveyId: id
        }
    })
    .then(function(data)
    {
        console.log(data);
        if(debug)console.log("Comment Posted");
    });
}

$(document).ready(function()
{
    $("#comment-btn").on("click", sendComment);
    id = $(".navbar-user").attr("data-survey");
    getSurveys();
    getSurveyData();
    updateComments();
    setInterval(function(){getSurveys()}, 3000);
    setInterval(function(){updateComments()}, 1000);
});