let debug = true;
let userSurveys;
let surveyInterval;

//Show the user their surveys.
let showSurveys = function()
{
    let radioValue = $("input[name='survey-type']:checked").val();
    if(debug)console.log(radioValue);

    //Clear out any old surveys.
    $("#surveys-div").empty();

    //Determine which surveys to show.
    switch(radioValue)
    {
        case "active": //Active surveys.
            for(let i = 0; i < userSurveys.length; i++)
            {
                //Get the relevant data from the survey object.
                let surveyId      = userSurveys[i].id;
                let surveyTakerId = userSurveys[i].SurveyId;
                let startTime     = userSurveys[i].Survey.startTime;
                let endTime       = userSurveys[i].Survey.stopTime;
                let startMoment   = moment(startTime, "YYYY-MM-DD hh:mm:ss");
                let endMoment     = moment(endTime,   "YYYY-MM-DD hh:mm:ss");
                let thisMoment    = moment();

                //Only display the survey if it is active.
                if(endMoment > thisMoment && startMoment < thisMoment)
                {
                    let title  = userSurveys[i].Survey.surveyTitle;
                    let owner  = userSurveys[i].Survey.User.username;
                    let isRead = userSurveys[i].isRead;

                    let surveyDiv = $("<div>");
                    surveyDiv.attr("id", "survey-div" + surveyTakerId);
                    surveyDiv.addClass("survey-div");
                    surveyDiv.append("<div class=\"survey-title\">" + title + "</div>");

                    let ownerDiv = $("<div>");
                    ownerDiv.append("<b>Owner: </b>");
                    ownerDiv.addClass("survey-info-div");
                    ownerDiv.append(owner);
                    surveyDiv.append(ownerDiv);

                    let timeDiv  = $("<div>");
                    timeDiv.append("<b>End Time: </b>");
                    timeDiv.addClass("survey-info-div");
                    timeDiv.append(moment(endMoment).format("YYYY-MM-DD hh:mm:ss"));
                    surveyDiv.append(timeDiv);

                    //Calculate remaining time for the survey.
                    let remaining = endMoment.diff(thisMoment);
                    let remainString = moment.utc(remaining).format("HH:mm:ss")

                    let remainDiv = $("<div>");
                    remainDiv.append("<b>Time Remaining: </b>");
                    remainDiv.addClass("survey-info-div");
                    remainDiv.append(remainString);
                    surveyDiv.append(remainDiv);

                    let surveyBtn = $("<button>");
                    surveyBtn.append("Enter Survey");
                    surveyBtn.addClass("survey-btn btn btn-primary");
                    surveyDiv.append(surveyBtn);

                    surveyBtn.on("click", function()
                    {
                        // Send the PUT request.
                        $.ajax("/api/markasread/" + surveyTakerId,
                        {
                            type: "PUT"
                        }).then(function()
                        {
                            if(debug)console.log("Entered survey: " + surveyId);
                            window.location.replace("/takesurvey/" +  surveyId);
                        });
                    })

                    let deleteBtn = $("<button>");
                    deleteBtn.append("Delete");
                    deleteBtn.addClass("survey-btn btn btn-danger");
                    surveyDiv.append(deleteBtn);

                    deleteBtn.on("click", function()
                    {
                        if (confirm("Are you sure you want to remove this survey from your queue?"))
                        {
                            //Send the DELETE request.
                            $.ajax("/api/deletesurveytaker/" + surveyTakerId,
                            {
                                type: "DELETE" 
                            })
                            .then(function()
                            {
                                userSurveys.splice(i, 1); //Keep artifacts from refreshing to the page.
                                $("#survey-div" + surveyTakerId).remove();
                                console.log(surveyDiv);
                                if(debug)console.log("deleted survey taker: " + surveyTakerId);
                            });
                        }
                    })

                    if(!isRead)
                    {
                        let newDiv = $("<div>");
                        newDiv.append("<b>*NEW!*</b>");
                        newDiv.addClass("new-div");
                        surveyDiv.append(newDiv);
                    }

                    


                    


                    


                    $("#surveys-div").append(surveyDiv);
                }

                



                
            }

            break;
    }



}

//Add listener to the radio buttons.
$(".form-check-input").click(function()
{
    showSurveys();
});

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

let runHome = function()
{
    //Get the logged in username.
    let username = $(".navbar-user").attr("data-username");

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

$(document).ready(function()
{
    runHome();
    setInterval(function(){runHome()}, 3000);
    setInterval(function(){showSurveys()}, 1000);
});