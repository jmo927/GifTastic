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
    $(this).css("background-color", "#bbaa00")
    var topicSelect = $(this).attr("name");
    console.log(topicSelect);
});

}); //end Document.ready
