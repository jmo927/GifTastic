$( document ).ready(function() {

var gifTopics = [
    { topic: "Harry Potter" },
    { topic: "Doctor Who" },
    { topic: "Puppies" } 
]; // end gifTopics



for (var i = 0; i < gifTopics.length; i++) { //populate topic buttons
    var newBtn = $("<div>");
    newBtn.addClass("button");
    newBtn.attr("name", gifTopics[i].topic);
    newBtn.text(gifTopics[i].topic);
    $(".gif-buttons").append(newBtn);
}

$(".button").on("click", function() {
    $(".gif-populate").empty();
    var topicSelect = $(this).attr("name");
    getGifData(topicSelect);
});

function getGifData (topic) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Rqw6hNYfz3sptzKx4P67V4H6buutpXsl&q=" + topic +"&limit=10&offset=0&rating=&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i]);
            var gifContainer = $("<div>");
            gifContainer.addClass("gif-cont");

            var gifItself = $("<img>");
            gifItself.attr("src", response.data[i].images.original_still.url);
            gifItself.attr("gif-source", response.data[i].images.original.url);
            gifItself.attr("still-source", response.data[i].images.original_still.url);
            gifItself.attr("active", "no");
            gifItself.addClass("gif-itself");

            gifContainer.append(gifItself);

            $(".gif-populate").append(gifContainer);

            $(".gif-itself").on("click", function (){
                var gifRef = $(this).attr("gif-source");
                var stillRef = $(this).attr("still-source");
                if ($(this).attr("active" === "no")) {
                    $(this).attr("src", gifRef);
                    $(this).attr("active", "yes");
                } else {
                    $(this).attr("src", stillRef);
                }

            })
        }

        
    }); //end AJAX query
    
    
} //end getGifData

getGifData("harry potter");


}); //end Document.ready

// https://api.giphy.com/v1/gifs/search?api_key=Rqw6hNYfz3sptzKx4P67V4H6buutpXsl&q=&limit=25&offset=0&rating=G&lang=en

//q - query term or phrase
//limit - as advertised
//rating - how SFW do we want this?