let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];                                             //storing game pattern
let userClickedPattern = [];                                      //storing user input pattern

$(".btn").on("click", function () {   
    let userChosenColour = $(this).attr("id");                   // Store the id of the clicked button
    userClickedPattern.push(userChosenColour);                    //user input pattern store to "userClickedPattern"
    playSound(userClickedPattern);  
});
function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);             //random Number Generator 0-3 (4)
    let randomChosenColour = buttonColours[randomNumber];         // Generator from random number

    gamePattern.push(randomChosenColour);                         //random color store in "gamePattern" array

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //Fade button
    
    playSound();
}
function playSound(randomChosenColour){
    let audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    audio.play();                                                      //audio play
}



