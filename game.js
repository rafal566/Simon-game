
var buttonColours = ["red", "blue", "green", "yellow"]; //3

var gamePattern = []; //5
var userClickedPattern = []; //12

var started = false; //23
var level = 0; //22b

$(document).keydown(function() { //22a
  if (!started) {
    $("#level-title").text("Level " + level); //24
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() { //10

  var userChosenColour = $(this).attr("id"); //11
  userClickedPattern.push(userChosenColour); //13

  playSound(userChosenColour); //17
  animatePress(userChosenColour);


  checkAnswer(userClickedPattern.length-1); //28
});



function checkAnswer(currentLevel) { //27


  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //29

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) { //30

      setTimeout(function () { //31
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("GAME OVER! Press any key to Restart");
    startOver();
  }
}

function nextSequence() { //32


  userClickedPattern = []; //33

  level++;   //25
  $("#level-title").text("Level " + level);   //26

  var randomNumber = Math.round((Math.random()) * 3);   //2
  var randomChosenColour = buttonColours[randomNumber];  //4
  gamePattern.push(randomChosenColour);   //6

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);   //7 & 8
  playSound(randomChosenColour);   //16
}

function playSound(name) { //14
  var audio = new Audio("sounds/" + name + ".mp3");   //15
  audio.play();
}

function animatePress(currentColour) { //18 19
  $("#" + currentColour).addClass("pressed");   //20
  setTimeout(function () {   //21
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level=0;
  gamePattern = [];
  started = false;
}
