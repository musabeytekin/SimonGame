// $('#level-title').text("working")
var level = 0;
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = getRandomInteger(0,3);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
  var chosenButtonId = '#' + randomChosenColor;
  $(chosenButtonId).fadeOut(100).fadeIn(200);
  playSound(randomChosenColor);
}

const playSound = (name) => {
  var audioPath = "sounds/" + name + ".mp3";
  var audio = new Audio(audioPath);
  audio.play();
}

const animatePress = (currentColor) => {
  $('#' + currentColor).addClass('pressed');
  setTimeout(() => {
    $('#' + currentColor).removeClass('pressed');
  }, 100)
}

$('.btn').click((event) => {

  var userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
})

const checkAnswer = (currentLevel) => {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(() => {
        nextSequence();
      }, 1000)
    }}
    else {
      playSound('wrong');
      $('body').addClass("game-over");
      $('#level-title').text("Game Over, Press Any Key to ReStart");
      setTimeout(() => {
        $('body').removeClass("game-over");
      }, 200);
      startOver();
    }


}

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
}



$(document).keypress(() => {
  if (!started) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
})
