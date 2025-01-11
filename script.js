const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];                                       //storing user input pattern
let gamePattern = [];                                             //storing game pattern                               
let level = 0;
var started = false;
$(document).keydown(function() {   
    if (!started) {                                      // Check if the function has been called before
    $("#level-title").text("Level " + level);
    nextSequence();                                    
    started = true;                                       // Set the flag to true after the first press                                    
    }});
$(".btn").on("click", function () {   
    let userChosenColour = $(this).attr("id");                   // Store the id of the clicked button
    userClickedPattern.push(userChosenColour);                    //user input pattern store to "userClickedPattern"
    playSound(userChosenColour);  
    animatePress(userChosenColour); 
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;                                                       // Increment level
    $("#level-title").text("Level " + level);

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
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);}} 
    else {
        console.log("Wrong");
        // Add logic for game over/reset
    }}

