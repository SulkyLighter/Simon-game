// arrays
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

//starting the game
let level = 0;
let gameStarted = false;

$(document).keydown(function() {
if (!gameStarted) {
    $("#level-title").text("level " + level);
    nextSequence();
    gameStarted = true;
    }  
});

// function for when you click a button
$(".btn").on("click", function(){
    if (gameStarted) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    }
    });


// function for random choosing
function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("level " + level);

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
}

//sound function
function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


//animate click function
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

   setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
}, 100)
}

// check answers
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000)
    } 
} else {
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, you suck, Leander Rules! Click any button to restart");

    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    startOver();
}
}

// Reset the game
function startOver() {
level = 0;
gamePattern = [];
gameStarted = false;
}