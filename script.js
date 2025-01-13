const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];                                       //storing user input pattern
let gamePattern = [];                                             //storing game pattern                               
let level = 0;
let started = false;
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

    let randomNumber = Math.floor(Math.random() * 4);               //random Number Generator 0-3 (4)
    let randomChosenColour = buttonColours[randomNumber];           // Generator from random number
    gamePattern.push(randomChosenColour);                           //random color store in "gamePattern" array

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //Fade button
    playSound(randomChosenColour);
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $("#level-title").text("Press Any Key to Start");
}
function playSound(name){
    let audio = new Audio("./sounds/" + name + ".mp3");                //audio location
    audio.play();                                                      //audio play
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");                          //add button animation class from css
    setTimeout(function () {$("#" + currentColour).removeClass("pressed")}, 100); //remove button animation class
}
function playWrongSound(){
    let audio = new Audio("./sounds/wrong.mp3");                        //wrong audio location
    audio.play();}
function gameOver(){  
    playWrongSound();  
    $("body").addClass("game-over");
    setTimeout(function () {$("body").removeClass("game-over")}, 500);
    $("#level-title").text("Game Over, Press Any Key to reset ");
    startOver();
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);}} 
        else {
        gameOver();
    }}
