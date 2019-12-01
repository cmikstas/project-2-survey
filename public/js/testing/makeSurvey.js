var map;

var userComments = [];

var selectionArray = [];

var markers = [];

$(document).ready(function () 
{
    geoInitialize();
    
    $("#comment-btn").on("click", function (event)
    {
        let userName =    $(".navbar-user").attr("data-username");
        let userComment = $(".addComment").val().trim();

        let fullComment = "<b>" + userName + "</b>" + ": " + userComment;
        let commentDiv =  $("<div>");
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

        userComments.push(commentDetails);
        console.log(userComments);
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
        
});