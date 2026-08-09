const text = "かみまみた!!";
const speed = 100;
const delay = 1000;
const textElement = document.getElementById('text');
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
  const audio = document.getElementById('heckchu');
  audio.currentTime = 0;   
  audio.play();
});
const audio = document.ge
  if (currentProgress < 100) {
    currentProgress += 20;
    
    const bar = document.getElementById('loading-bar');
    if (bar) {
      bar.style.width = currentProgress + '%';
    }
  }
});

window.onload = function() {
  const welcomeMusic = document.getElementById('welcomeMusic');
  const mainMusic = document.getElementById('mainMusic');
  
  welcomeMusic.play();
  
  welcomeMusic.onended = function() {
    mainMusic.loop = true; 
    mainMusic.play();
  };
};
