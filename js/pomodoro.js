var tick;
var timerType;
var work = 25 * 60;
var time = work;
var rest = 5 * 60;
var alarm = new Audio('http://soundbible.com/grab.php?id=1598&type=mp3');

document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();
  work =  document.getElementById("timer").value * 60;
  rest =  document.getElementById("rest").value * 60;
  if (work < 0) {
    work = 0;
  }
  if (rest < 0) {
    rest = 0;
  }
  document.getElementById("mainDisplay").innerHTML = convertTime(work)[0] + ":" + convertTime(work)[1];
  document.getElementById("secondaryDisplay").innerHTML = convertTime(rest)[0] + ":" + convertTime(rest)[1];
  time = work;
});

document.getElementById("clock").addEventListener("click", function() {
  timerType = timerType ? timerType : "work";
  timerClick();
  });

function timerClick() {
  if (!tick) {
    tick = setInterval(function() { updateClock() }, 1000);
  }
  else {
    clearInterval(tick);
    tick = undefined;
  }
}

function updateClock() {
  time--;
  if (timerType === "work") {
    document.getElementById("fill").style.height = 100 - (time / work) * 100 + "%";
  } else {
    document.getElementById("fill").style.height = time / rest * 100 + "%";
  }
  let [minutes, seconds] = convertTime(time);
  document.getElementById("mainDisplay").innerHTML = minutes + ":" + seconds;
  if (time === 0) {
    timerEnd();
  }
}

function timerEnd() {
  clearInterval(tick);
  tick = undefined;
  alarm.play();
  if (timerType === "work") {
    timerType = "break";
    time = rest;
    document.getElementById("mainDisplay").innerHTML = convertTime(rest)[0] + ":" + convertTime(rest)[1];
    document.getElementById("secondaryDisplay").innerHTML = convertTime(work)[0] + ":" + convertTime(work)[1];
    document.getElementById("displayType").innerHTML = "Rest";
  }
  else {
    timerType = "work";
    time = work;
    document.getElementById("mainDisplay").innerHTML = convertTime(work)[0] + ":" + convertTime(work)[1];
    document.getElementById("secondaryDisplay").innerHTML = convertTime(rest)[0] + ":" + convertTime(rest)[1];
    document.getElementById("displayType").innerHTML = "Work";
  }
  timerClick();
}

function convertTime (num) {
  let minutes = Math.floor(num / 60);
  let seconds = num % 60;

  minutes = minutes < 10 ? "0" + minutes: minutes;
  seconds = seconds < 10 ? "0" + seconds: seconds;
  return [minutes, seconds];
}
