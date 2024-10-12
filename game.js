// Arrays
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

// Game state
let level = 0;
let gameStarted = false;

$(document).on("keydown touchstart", function(e) {
    if (e.type === "touchstart") {
        e.preventDefault(); // Prevent default touch behavior
    }
    if (!gameStarted || $("body").hasClass("game-over")) {
        startGame();
    }
});

function startGame() {
    gameStarted = true;
    level = 0;
    gamePattern = [];
    $("#level-title").text("Level " + level);
    $("body").removeClass("game-over");
    nextSequence();
}

$(".btn").on("click touchstart", function(e){
    if (e.type === "touchstart") {
        e.preventDefault(); // Prevent default touch behavior
    }
    if (gameStarted && !$("body").hasClass("game-over")) {
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        
        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);
    }
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, you suck, Leander Rules! Press Any Key to Restart");
    gameStarted = false;
}