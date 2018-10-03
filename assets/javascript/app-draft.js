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

    var gifLimit = 0;
    var gifTemp = "";

    var favSave = [];
    
    $("#ten-more").hide();

    function getButtons() {
        $(".gif-buttons").empty();
        for (var i = 0; i < gifTopics.length; i++) { //populate topic buttons
            var newBtn = $("<button>");
            newBtn.addClass("button");
            newBtn.attr("name", gifTopics[i]);
            newBtn.text(gifTopics[i]);
            $(".gif-buttons").append(newBtn);
        }
    } //end getButtons

    $("#ten-more").on("click", function () {
        gifLimit += 10;
        getGifData(gifTemp, gifLimit);
    })
        
    //Some Form Stuff
    $(".input-button").on("click", function (event){
        event.preventDefault();
        var x = form.inputbox.value;
        gifTopics.push(x);
        getButtons();
    });

    // $(function() {
    //     $("form").submit(function() { return false; });
    // });
    //End Form Stuff

    function getGifData(topic, offset) {
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Rqw6hNYfz3sptzKx4P67V4H6buutpXsl&q=" + topic + "&limit=10&offset=" + offset + "&rating=&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            // console.log(response);

            for (var i = 0; i < response.data.length; i++) {

                var gifContainer = $("<div>"); //wrapper
                gifContainer.addClass("gif-cont");

                gifContainer.attr("gif-source", response.data[i].images.original.url);
                gifContainer.attr("still-source", response.data[i].images.original_still.url);
                gifContainer.attr("rating", response.data[i].rating);
                gifContainer.attr("active", "no");

                var gifItself = $("<img>"); //image
                gifItself.attr("src", response.data[i].images.original_still.url);
                gifItself.addClass("gif-itself");
                gifContainer.append(gifItself);

                var gifRating = $("<h3>"); //rating
                gifRating.addClass("gif-rating");
                gifRating.text("Rating: " + response.data[i].rating);
                gifContainer.append(gifRating);
                
                var addFav = $("<button>");
                addFav.addClass("add-fav");
                addFav.attr("gif-source", response.data[i].images.original.url);
                addFav.attr("still-source", response.data[i].images.original_still.url);
                addFav.attr("rating", response.data[i].rating);
                addFav.text("Favorite");
                gifContainer.append(addFav);
                $(".gif-populate").append(gifContainer);
            }; //end populate for loop
        }); //end AJAX query
    } //end getGifData

    getButtons();

    $(document).on("click", ".gif-cont", function () {  //GIF on.click
        var gifRef = $(this).attr("gif-source");
        var stillRef = $(this).attr("still-source");
        var gifRating = $(this).attr("rating");

        $(this).empty();
        var newImg = $("<img>");
        newImg.addClass("gif-itself");
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
    });// end GIF onClick

    $(document).on("click", ".add-fav", function () { 
        var favTemp = {
            favGif : $(this).attr("gif-source"),
            favStill : $(this).attr("still-source"),
            favRating : $(this).attr("rating")
        };
        favSave.push(favTemp);
        console.log(favSave);
    });//end populate favs

    $(document).on("click", ".button", function () { //button on.click
        $(".gif-populate").empty();
        $("#ten-more").show();
        gifTemp = $(this).attr("name");
        gifLimit = 0;
        getGifData(gifTemp, gifLimit);
    });//end button on.click

    $(document).on("click", "#display-favorites", function () {
        $(".gif-populate").empty();
        for (var i = 0; i < favSave.length; i++) {

            var gifContainer = $("<div>"); //wrapper
            gifContainer.addClass("gif-cont");

            gifContainer.attr("gif-source", favSave[i].favGif);
            gifContainer.attr("still-source", favSave[i].favStill);
            gifContainer.attr("rating", favSave[i].favRating);
            gifContainer.attr("active", "no");

            var gifItself = $("<img>"); //image
            gifItself.attr("src", favSave[i].favStill);
            gifItself.addClass("gif-itself");
            gifContainer.append(gifItself);

            var gifRating = $("<h3>"); //rating
            gifRating.addClass("gif-rating");
            gifRating.text("Rating: " + favSave[i].favRating);
            gifContainer.append(gifRating);
            
            $(".gif-populate").append(gifContainer);
        }; //end populate for loop
    })//end display favorites

}); //end Document.ready


// https://api.giphy.com/v1/gifs/search?api_key=Rqw6hNYfz3sptzKx4P67V4H6buutpXsl&q=&limit=25&offset=0&rating=G&lang=en

//q - query term or phrase
//limit - as advertised
//offset - start from where?
//rating - how SFW do we want this?