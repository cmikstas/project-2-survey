// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function()
{
    $("#burger-submit").on("click", function(event)
    {
        event.preventDefault();

        let burgerName = $("#burger-input").val();

        //Exit if blank string.
        if(burgerName === "") return;

        $("#burger-input").val("");
        console.log(burgerName);
        
        //Send the POST request.
        $.ajax("/api/burger",
        {
            type: "POST",
            data: 
            {
                burgerName: burgerName
            }
        }).then(function(data)
        {
          console.log("Added new burger: " + data.id);
          //Reload the page to get the updated list
          location.reload();
        });
    });

    $(".delete-burger").on("click", function(event)
    {
        let id = $(this).attr("data-id");

        // Send the DELETE request.
        $.ajax("/api/burger/" + id,
        {
            type: "DELETE"
        }).then(function()
        {
            console.log("deleted burger: " + id);
            // Reload the page to get the updated list
            location.reload();
        });
    });

    $(".change-devoured").on("click", function(event)
    {
        let id = $(this).attr("data-id");
        console.log(id);

        // Send the PUT request.
        $.ajax("/api/burger/" + id,
        {
            type: "PUT"
        }).then(function()
        {
            console.log("Devoured burger: " + id);
            // Reload the page to get the updated list
            location.reload();
        });
    });
});
  