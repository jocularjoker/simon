// alert("connected");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var gameStarted = false;

// create the next random color and record in gamePattern
function nextSequence() {

  level ++;
  $("#level-title").text("Level " + level);
  userPattern = [];
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}


// every user click - sound, animation, record
$(".btn").click(function() {

  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  userPattern.push(userChosenColor);
  checkAnswer(userPattern.length-1);

});

function playSound(name) {

  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();

}


function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

// press any key to start & call nextSequence
$("body").keypress(function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});


function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] !== userPattern[currentLevel]) {

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 1000);

    $("h1").text("Game Over, Press Any Key to Restart");

    gameStarted = false;
    level = 0;
    userPattern = [];
    gamePattern = [];

    return;

  } else {
    console.log("success");
  }

  if (gamePattern.length === userPattern.length) {
    setTimeout(function () {nextSequence();}, 1000);
  }

}
