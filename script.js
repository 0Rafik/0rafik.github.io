const text = "かみまみた!!";
const speed = 100;
const delay = 1500; //delay if want to change it 
let textElement = document.getElementById('text');
let bar = document.getElementById('loading-bar');
let currentProgress = 0;
let isYamadaBoosted = false;
let lastPlayedTime = 0;
let isFirstClick = true;
let isTyping = false;
let typingTimeout = null;

textElement.style.fontFamily = '"Josefin Sans", "Tsukimi Rounded", sans-serif';

function type(index = 0) {
  if (index < text.length) {
    textElement.textContent += text.charAt(index);
    typingTimeout = setTimeout(() => type(index + 1), speed);
  } else {
    typingTimeout = setTimeout(backspace, delay);
  }
}

function backspace(index = text.length - 1) {
  if (index >= 0) {
    textElement.textContent = textElement.textContent.substring(0, textElement.textContent.length - 1);
    typingTimeout = setTimeout(() => backspace(index - 1), speed);
  } else {
    isTyping = false;
    typingTimeout = null;
  }
}

function startTypingCycle() {
  if (isTyping) {
    clearTimeout(typingTimeout);
    isTyping = false;
  }
  textElement.textContent = '';
  isTyping = true;
  type(0);
}

document.getElementById('image').addEventListener('click', function() {
  const now = Date.now();
  if (now - lastPlayedTime < 200) return;
  lastPlayedTime = now;

  if (isFirstClick) {
    const welcome = document.getElementById('welcomeMusic');
    if (welcome) {
      welcome.currentTime = 0;
      welcome.play().catch(err => console.log("Play blocked:", err));
    }
    isFirstClick = false;
    return;
  }

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
      const ryosuki = document.getElementById('yamadasuki');
      if (ryosuki && audio) {
        audio.pause();
        audio.currentTime = 0;
        if (!isYamadaBoosted) {
          const audioContx = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioContx.createMediaElementSource(ryosuki);
          const gainNode = audioContx.createGain();
          source.connect(gainNode);
          gainNode.connect(audioContx.destination);
          isYamadaBoosted = true;
        }
        ryosuki.currentTime = 0;
        ryosuki.play();
        startTypingCycle(); 
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

document.getElementById('playMainMusicBtn').addEventListener('click', function() {
  const mainMusic = document.getElementById('mainMusic');
  if (mainMusic) {
    mainMusic.loop = true;
    mainMusic.play().catch(err => console.log("Play blocked:", err));
  }
});