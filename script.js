let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];                                             //storing game pattern
let userClickedPattern = [];                                      //storing user input pattern

$(".btn").on("click", function () {   
    let userChosenColour = $(this).attr("id");                   // Store the id of the clicked button
    userClickedPattern.push(userChosenColour);                    //user input pattern store to "userClickedPattern"
    playSound(userClickedPattern);  
    animatePress(userClickedPattern); 
});
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);             //random Number Generator 0-3 (4)
    let randomChosenColour = buttonColours[randomNumber];         // Generator from random number

    gamePattern.push(randomChosenColour);                         //random color store in "gamePattern" array

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //Fade button
    
    playSound(randomChosenColour);
}
function playSound(name){
    let audio = new Audio("./sounds/" + name + ".mp3");                //audio location
    audio.play();                                                      //audio play
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");                          //add button animation class from css
    setTimeout(function () {$("#" + currentColour).removeClass("pressed")}, 100); //remove button animation class
}
$(document).keydown(function() {   
    if (!window.keyPressed) {                                      // Check if the function has been called before
      window.keyPressed = true;                                    // Set the flag to true after the first press
      nextSequence();                                              // Call your function here
    }});
  



