const text = "かみまみた!!";
const speed = 100;
const delay = 1000;
const textElement = document.getElementById('text');
textElement.style.fontFamily = '"Josefin Sans", "Tsukimi Rounded", sans-serif';

let currentProgress = 0;

function type(index = 0) {
  if (index < text.length) {
    textElement.textContent += text.charAt(index);
    setTimeout(() => type(index + 1), speed);
  } else {
    setTimeout(backspace, delay);
  }
}

function backspace(index = text.length - 1) {
  if (index >= 0) {
    textElement.textContent = textElement.textContent.substring(0, textElement.textContent.length - 1);
    setTimeout(() => backspace(index - 1), speed);
  } else {
    setTimeout(type, delay);
  }
}

type();

document.getElementById('image').addEventListener('click', function() {
  const audio = document.getElementById('heckchu');
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }

  if (currentProgress < 100) {
    currentProgress += 20;
    const bar = document.getElementById('loading-bar');
    if (bar) {
      bar.style.width = currentProgress + '%';
    }
  } else {
    resetProgress();
  }
});

function resetProgress() {
  currentProgress = 0;
  const bar = document.getElementById('loading-bar');
  if (bar) {
    bar.style.width = '0%';
  }
}

window.onload = function() {
  const welcomeMusic = document.getElementById('welcomeMusic');
  const mainMusic = document.getElementById('mainMusic');

  if (welcomeMusic) {
    welcomeMusic.play().catch(err => console.log("Autoplay blocked by browser policy:", err));

    welcomeMusic.onended = function() {
      if (mainMusic) {
        mainMusic.loop = true;
        mainMusic.play();
      }
    };
  }
};