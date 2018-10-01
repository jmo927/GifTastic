$(document).ready(function () {

    var gifTopics = [
        "Harry Potter",
        "Doctor Who",
        "Puppies",
        "Critical Role",
        "Downton Abbey",
        "Gilmore Girls",
        "Star Wars"
    ]; // end gifTopics

    var gifLimit = 10;
    var gifTemp = "";
    
    $("#ten-more").hide();

    function getButtons() {
        $(".gif-buttons").empty();
        for (var i = 0; i < gifTopics.length; i++) { //populate topic buttons
            var newBtn = $("<div>");
            newBtn.addClass("button");
            newBtn.attr("name", gifTopics[i]);
            newBtn.text(gifTopics[i]);
            $(".gif-buttons").append(newBtn);
        }

        $(".button").on("click", function () {
            $(".gif-populate").empty();
            $("#ten-more").show();
            gifTemp = $(this).attr("name");
            gifLimit = 10;
            getGifData(gifTemp, 10);
        });
    } //end getButtons

    $("#ten-more").on("click", function () {
        $(".gif-populate").empty();
        gifLimit += 10;
        getGifData(gifTemp, gifLimit);
    })
        
    //Some Form Stuff
    $(".input-button").on("click", function (){
        var x = form.inputbox.value;
        gifTopics.push(x);
        getButtons();
    });

    $(function() {
        $("form").submit(function() { return false; });
    });
    //End Form Stuff

    function getGifData(topic, limit) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Rqw6hNYfz3sptzKx4P67V4H6buutpXsl&q=" + topic + "&limit=" + limit + "&offset=0&rating=&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var gifContainer = $("<div>"); //wrapper
                gifContainer.addClass("gif-cont");
                gifContainer.attr("gif-source", response.data[i].images.original.url);
                gifContainer.attr("still-source", response.data[i].images.original_still.url);
                gifContainer.attr("active", "no");
                gifContainer.attr("rating", response.data[i].rating);

                var gifItself = $("<img>"); //image
                gifItself.attr("src", response.data[i].images.original_still.url);
                gifItself.addClass("gif-itself");
                gifContainer.append(gifItself);

                var gifRating = $("<h3>"); //rating
                gifRating.addClass("gif-rating");
                gifRating.text("Rating: " + response.data[i].rating);
                gifContainer.append(gifRating);

                $(".gif-populate").append(gifContainer);
            }; //end populate for loop

            $(".gif-cont").on("click", function () {
                var gifRef = $(this).attr("gif-source");
                var stillRef = $(this).attr("still-source");
                var gifRating = $(this).attr("rating");

                $(this).empty();
                var newImg = $("<img>");
                if ($(this).attr("active") === "no") {
                    newImg.attr("src", gifRef);
                    $(this).attr("active", "yes");
                } else {
                    newImg.attr("src", stillRef);
                    $(this).attr("active", "no");
                } //end if/else
                $(this).append(newImg);

                var ratingDisplay = $("<h3>");
                ratingDisplay.addClass("gif-rating");
                ratingDisplay.text("Rating: " + gifRating);
                $(this).append(ratingDisplay);
            });// end onClick

        }); //end AJAX query

    } //end getGifData

    getButtons();


}); //end Document.ready



// https://api.giphy.com/v1/gifs/search?api_key=Rqw6hNYfz3sptzKx4P67V4H6buutpXsl&q=&limit=25&offset=0&rating=G&lang=en

//q - query term or phrase
//limit - as advertised
//rating - how SFW do we want this?