let debug = true;
var map;

var userCommentsArr    = [];
var surveyUserArr      = [];
var questionOptionsArr = [];
var selectionArray     = [];
var markers            = [];

$(document).ready(function ()
{
    geoInitialize();
    googlePlacesSearch()
    pullUsers();

    //***************************************** New Stuff *****************************************

    let showDistros = function()
    {
        //Get the logged in username.
        let username = $(".navbar-user").attr("data-username");

        //Grab all the user's distribution lists.
        $.get("/api/getdistros/" + username)
        .then(function(data)
        {
            if(debug)console.log(data);

            //Create distribution list divs and add them to the page.
            for(let i = 0; i < data.length; i++)
            {
                let distroBlock = $("<div>");

                let addDistroBtn = $("<button>");
                addDistroBtn.addClass("addDistroBtn addUserBtns mr-2");
                addDistroBtn.append("+");
                distroBlock.append(addDistroBtn);

                let delDistroBtn = $("<button>");
                delDistroBtn.addClass("delDistroBtn deleteUserBtns mr-2");
                delDistroBtn.append("<span>&times</span>");
                distroBlock.append(delDistroBtn);
                
                let distroLabel = $("<span>");
                distroLabel.html("<b>" + data[i].title + "</b>");
                distroBlock.append(distroLabel);

                //Delete distribution list if delete button clicked.
                delDistroBtn.on("click", function()
                {
                    event.preventDefault();

                    //Make sure the user really wants to remove the list.
                    if (confirm("Are you sure you want to remove this distribution list?"))
                    {
                        $.ajax("/api/deletedistro/" + data[i].id,
                        {
                            type: "DELETE"
                        }).then(function(result)
                        {
                            if(debug)console.log("Deleted distribution list");
                            $("#distroDiv").empty();
                            showDistros();
                        });
                    }
                });

                //Add users to the survey if the add button is clicked.
                addDistroBtn.on("click", function(event)
                {
                    event.preventDefault();

                    let userArray = data[i].list.split(",");

                    //Loop through current added users to see
                    //if the selected user needs to be added.
                    for(let j = 0; j < userArray.length; j++)
                    {
                        let userName = userArray[j];

                        if (!surveyUserArr.includes(userName))
                        {
                            surveyUserArr.push(userName);
                            surveyUserArr.sort();
                            console.log(surveyUserArr);

                            let deleteButtonIcon = "<span>&times</span>";
                            let deleteUserBtn = $("<button>");
                            deleteUserBtn.addClass("deleteUserBtns");
                            deleteUserBtn.attr("type", "button");

                            let userBoxFinal = $("<label>");
                            userBoxFinal.addClass("form-check-label mx-3");
                            userBoxFinal.append(userName);

                            let userNameFinalDiv = $("<div>");
                            userNameFinalDiv.addClass("form-check");

                            deleteUserBtn.append(deleteButtonIcon);
                            userNameFinalDiv.append(deleteUserBtn);
                            userNameFinalDiv.append(userBoxFinal);
                            $("#usersAdded").append(userNameFinalDiv);

                            deleteUserBtn.on("click", function (event)
                            {
                            
                                //Returns the index of the user name in the array.
                                //Returns -1 if not found. 
                                let index = surveyUserArr.indexOf(userName);

                                //Should always be found but check just to be safe.
                                if(index >= 0)
                                {
                                    surveyUserArr.splice(index, 1);
                                    console.log(surveyUserArr);
                                    userNameFinalDiv.remove();
                                }
                            });
                        }
                    }
                });

                $("#distroDiv").append(distroBlock);
            }
        })
        .fail(function(err)
        {
            throw err;
        });
    }

    //Show the distribution lists when the page loads.
    showDistros();

    $("#distro-btn").on("click", function(event)
    {
        event.preventDefault();

        let invalidUsers = false;
        let invalidText  = false;
        let listTitle    = $("#distro-text").val().trim();

        //Get the logged in username.
        let username = $(".navbar-user").attr("data-username");

        //Reset the invalid indicators.
        $("#usersAdded").removeClass("not-valid");
        $("#distro-text").removeClass("not-valid");

        //Ensure users are added and a title for the distribution list is present.
        if(!surveyUserArr.length)
        {
            $("#usersAdded").addClass("not-valid");
            invalidUsers = true;
        }

        if(listTitle === "")
        {
            $("#distro-text").addClass("not-valid");
            invalidText = true;
        }

        //Exit if any errors detected.
        if(invalidUsers || invalidText)
        {
            return;
        }

        //Join the users into a comma separated list.
        let distroText = surveyUserArr.join();

        //Send the POST request.
        $.ajax("/api/addlist",
        {
            type: "POST",
            data:
            { 
                username: username,
                list:     distroText,
                title:    listTitle
            }
        })
        .then(function(data)
        {
            if(debug)console.log("List Id:" + data.id);

            //Show the updated dustribution lists.
            $("#distro-text").val("");
            $("#distroDiv").empty();
            showDistros();

        });
    });







    //*********************************************************************************************
    
    $("#comment-btn").on("click", function (event)
    {
        event.preventDefault();

        let userName    = $(".navbar-user").attr("data-username");
        let userComment = $("#comment-text").val().trim();
        let fullComment = "<b>" + userName + "</b>" + ": " + userComment;
        let commentDiv  = $("<div>");

        commentDiv.attr("contenteditable", "true");
        commentDiv.addClass("mx-2");

        commentDiv.append(fullComment);
        $("#commentsDiv").append(commentDiv);
        $("#comment-text").val("");

        let commentDetails =
        {
            userName: userName,
            userComment: userComment,
        }

        userCommentsArr.push(commentDetails);
        //console.log(userComments);
    });

    function geoInitialize()
    {
        // Create a map centered in SLC.
        map = new google.maps.Map(document.getElementById('map'),
        {
            center: { lat: 40.7608, lng: -111.8910 },
            zoom: 9
        });
    }
    
    function pullUsers()
    {
        $.ajax("/api/allusers",
        {
            type: "GET"
        })
        .then(function(data)
        {
            console.log(data);
            for (let i = 0; i < data.length; i++)
            {
                let userName = data[i].username;

                let buttonIcon = "+";
                //console.log(userName);

                let addUserBtn = $("<button>");
                addUserBtn.addClass("addUserBtns");
                addUserBtn.attr("type", "button");
                //addUserBtn.attr("data-username", userName);

                let userBox = $("<label>");
                userBox.addClass("form-check-label mx-3");
                userBox.append(userName);

                let userNameDiv = $("<div>");
                userNameDiv.addClass("form-check");

                addUserBtn.append(buttonIcon);
                userNameDiv.append(addUserBtn);
                userNameDiv.append(userBox);
                $("#userResults").append(userNameDiv);

                addUserBtn.on("click", function (event)
                {                    
                    if (!surveyUserArr.includes(userName))
                    {
                        surveyUserArr.push(userName);
                        surveyUserArr.sort();
                        console.log(surveyUserArr);

                        let deleteButtonIcon = "<span>&times</span>";
                        let deleteUserBtn = $("<button>");
                        deleteUserBtn.addClass("deleteUserBtns");
                        deleteUserBtn.attr("type", "button");

                        let userBoxFinal = $("<label>");
                        userBoxFinal.addClass("form-check-label mx-3");
                        userBoxFinal.append(userName);

                        let userNameFinalDiv = $("<div>");
                        userNameFinalDiv.addClass("form-check");

                        deleteUserBtn.append(deleteButtonIcon);
                        userNameFinalDiv.append(deleteUserBtn);
                        userNameFinalDiv.append(userBoxFinal);
                        $("#usersAdded").append(userNameFinalDiv);

                        deleteUserBtn.on("click", function (event)
                        {
                            //Returns the index of the user name in the array.
                            //Returns -1 if not found. 
                            let index = surveyUserArr.indexOf(userName);

                            //Should always be found but check just to be safe.
                            if(index >= 0)
                            {
                                surveyUserArr.splice(index, 1);
                                console.log(surveyUserArr);
                                userNameFinalDiv.remove();
                            }
                        });
                    }
                });
            }
        });
    }

    //***************************************** New Stuff *****************************************

    //Refersh the users list.
    $("#refresh-users").on("click", function (event)
    {
        $("#userResults").empty();
        pullUsers();
    });

    //*********************************************************************************************

    function googlePlacesSearch()
    {
        $("#gPlacesSearch").on("click", function (event)
        {
            let googleLocation = $("#gPlacesLocation").val().trim();
            let googleState = $("#gPlacesState").val().trim();

            let query = googleLocation + ", " + googleState;
            //console.log(query);

            let radius = $("#gPlacesRadius").val().trim();
            let radiusInt = parseInt(radius);
            //console.log(radius);

            if (googleLocation !== "" && googleState !== "" && radiusInt !== "")
            {
                if(isNaN(radiusInt))
                {
                    console.log("radius must be an integer");
                    return;
                }

                $.ajax("/api/places/" + query + "/" + radius,
                {
                    type: "GET"
                }).then(function(data)
                {
                //console.log(data);

                for (let i = 0; i < data.length; i++)
                {
                    let address = data[i].formatted_address;
                    let latLong = data[i].geometry.location;
                    let name = data[i].name;
                    //console.log(address);
                    //console.log(latLong);
                    //console.log(name);

                    let placesBtnIcon = "+";
                    let placesBtn = $("<button>");
                    placesBtn.addClass("addPlacesButton");
                    placesBtn.attr("type", "button");
                    placesBtn.attr("data-username", name);

                    let placesBox = $("<label>");
                    placesBox.addClass("form-check-label mx-3");
                    placesBox.append(name);

                    let placesResult = $("<div>");
                    placesResult.addClass("form-check");

                    placesBtn.append(placesBtnIcon);
                    placesResult.append(placesBtn);
                    placesResult.append(placesBox);

                    $("#gPlacesResults").append(placesResult);

                    placesBtn.on("click", function (event)
                    {
                        let surveyOption = ($(this).attr("data-username"));
                        //console.log(surveyOption);

                        if (!questionOptionsArr.includes(surveyOption))
                        {
                            questionOptionsArr.push(surveyOption);
                            console.log(questionOptionsArr);

                            let deleteOptionIcon = "<span>&times</span>";
                            let deleteOptionBtn = $("<button>");
                            deleteOptionBtn.addClass("deleteUserBtns");
                            deleteOptionBtn.attr("type", "button");
                            deleteOptionBtn.attr("data-username", surveyOption);

                            let questionBox = $("<label>");
                            questionBox.addClass("form-check-label mx-3");
                            questionBox.append(surveyOption);

                            let questionDiv = $("<div>");
                            questionDiv.addClass("form-check");

                            deleteOptionBtn.append(deleteOptionIcon);
                            questionDiv.append(deleteOptionBtn);
                            questionDiv.append(questionBox);
                            $("#questionOptions").append(questionDiv);

                            deleteOptionBtn.on("click", function (event)
                            {
                                let surveyOption2 = ($(this).attr("data-username"));
                                //console.log(deleteUserNameBtn);
    
                                if (questionOptionsArr.includes(surveyOption2))
                                {
                                    questionOptionsArr.splice(surveyOption2, 1);
                                    console.log(questionOptionsArr);
                                    questionDiv.empty();
                                }
                            });
                        }
                        else
                        {
                            return;
                        }
                    });
                }

                });
            }
            else
            {
                console.log("Please make valid selections");
                return;
            }
        });
        
    }
});