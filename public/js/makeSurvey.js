var map;

var userCommentsArr = [];
var surveyUserArr   = [];

var selectionArray  = [];

var markers = [];

$(document).ready(function () 
{
    geoInitialize();
    pullUsers();
    
    $("#comment-btn").on("click", function (event)
    {
        let userName    = $(".navbar-user").attr("data-username");
        let userComment = $(".addComment").val().trim();
        let fullComment = "<b>" + userName + "</b>" + ": " + userComment;
        let commentDiv  = $("<div>");

        commentDiv.attr("contenteditable", "true");
        commentDiv.addClass("mx-2");

        commentDiv.append(fullComment);
        $("#commentsDiv").append(commentDiv);
        $(".addComment").val("");

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

                let userBox = $("<label>");
                userBox.addClass("form-check-label mx-3");
                userBox.append(userName);

                let checkbox = $("<input>");
                checkbox.addClass("form-check-input");
                checkbox.attr("type", "checkbox");
                checkbox.attr("data-username", userName);

                let userNameDiv = $("<div>");
                userNameDiv.addClass("form-check");

                userNameDiv.append(checkbox);
                userNameDiv.append(userBox);
                $("#userResults").append(userNameDiv);
            }

            checkbox.on("click", function (event)
            {
                
            });
        });
    }
});