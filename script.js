const text = "かみまみた!!";
const speed = 100;
const delay = 1000;
let textElement = document.getElementById('text');
let bar = document.getElementById('loading-bar');
let currentProgress = 0;
let isYamadaBoosted = false;
let lastPlayedTime = 0;

textElement.style.fontFamily = '"Josefin Sans", "Tsukimi Rounded", sans-serif';

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
const now = Date.now();
if (now - lastPlayedTime < 100) return;
lastPlayedTime = now;
  const audio = document.getElementById('heckchu');
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }

  if (currentProgress < 100) {
    currentProgress += 20;
    if (bar) {
      bar.style.width = `${currentProgress}%`;
    }

    if (currentProgress === 100) {
      const completeAudio = document.getElementById('yamadasuki');
      if (completeAudio && audio) {
        audio.addEventListener('ended', function() {
          completeAudio.currentTime = 0;

          if (!isYamadaBoosted) {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioCtx.createMediaElementSource(completeAudio);
            const gainNode = audioCtx.createGain();

            source.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            isYamadaBoosted = true;
          }

          completeAudio.play();
        }, { once: true });
      }
    }
  } else {
    resetProgress();
  }
});

function resetProgress() {
  currentProgress = 0;
  if (bar) {
    bar.style.width = '0%';
  }
}

document.getElementById('stopmusicbtn').addEventListener('click', function() {
  const mainMusic = document.getElementById('mainMusic');
  if (mainMusic) {
    mainMusic.pause();
    mainMusic.currentTime = 0;
  }
});

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