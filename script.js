const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];                                       //storing user input pattern
let gamePattern = [];                                             //storing game pattern                               
let level = 0;
let started = false;
const soundPath = "./sounds/";
let highScore = localStorage.getItem("highScore") || 0;
$("#high-score").text("High Score: " + highScore);
$(document).keydown(function(e) {   
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
    level++;
    $("#level-title").text("Level " + level);
    $("#level-title").text("Get Ready...");  // Add a loading indicator (e.g., "Get Ready...") before the next sequence   
    // Delay the sequence generation by 1 second
    setTimeout(function () {
        $("#level-title").text("Level " + level); // Update to show the current level

        // Generate the random sequence
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        // Animate and play sound for the chosen button
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);
    }, 250); // 0.25-second delay
}

function playSound(name){
    let audio = new Audio(soundPath + name + ".mp3");                //audio location
    audio.play();}                                                      //audio play
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");                          //add button animation class from css
    setTimeout(function () {$("#" + currentColour).removeClass("pressed")}, 100);} //remove button animation class
function playWrongSound(){
    let audio = new Audio("./sounds/wrong.mp3");                        //wrong audio location
    audio.play();}
function gameOver(){  
    playWrongSound();  
    $("body").addClass("game-over");
    setTimeout(function () {$("body").removeClass("game-over")}, 500);
    $("#level-title").text("Game Over, Press Any Key to reset ");
    $("#level-title").text(`Level ${level} - High Score: ${highScore}`);
    startOver();
}
function startOver() {
    if (level > highScore) {
        highScore = level;
        localStorage.setItem("highScore", highScore);
        $("#high-score").text("High Score: " + highScore);
    }
    level = 0;
    gamePattern = [];
    started = false;
    $("#level-title").text("Game Over, Press Any Key to restart ");
}
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);}} 
    else {
        gameOver();
    }}
