var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

// An event listener that waits for a key to be pressed to initialize the game.
$(document).keydown(function(){
  if (started == false) {
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
  }
});

// Handles a click event listener that clicks the specific tile selected.
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickPattern.length-1);
  console.log(userClickPattern);
});

 // Generates a new random color to add into the sequence.
function nextSequence() {
  userClickPattern=[];
  level++;
  $("h1").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  console.log(randomChosenColor);
}

//  Checks whether the tiles clicked corresponds with the gamePattern tiles selected
// if wrong, the game then ends and starts a new one, if it matches then proceed
// to the next sequence
function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press any key to restart");
    startOver();
  }
}

// The function which resets the game when it ends.
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

// The function which plays corresponding sounds specific to the tile clicked.
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

// Animates each tile clicked.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
