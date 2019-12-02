let debug = true;
let username;
let id;
let surveyData;






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
    if(debug)console.log(surveyData.survey);

    //Display the survey title.
    $("#survey-title").text(surveyData.survey[0].surveyTitle);





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
            console.log("Data: " + data);
            console.log("Survey: " + dbSurvey);
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

$(document).ready(function()
{
    id = $(".navbar-user").attr("data-survey");
    getSurveys();
    getSurveyData();
    setInterval(function(){getSurveys()}, 3000);
});