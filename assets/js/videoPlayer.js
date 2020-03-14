//이곳에서는 비디오플레이어 아이콘과 연결해서 동작 만듬.
const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumnBtn");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="far fa-pause-circle"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fab fa-gitlab"></i>';
  }
}

function handleVolumnClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume; //이걸 해야 음소거 풀었을떄 원래 자리로감
  } else {
    volumeRange.value = 0; //이걸 해야 음소거 하면 볼륨 바가 0으로 감
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  //videoContainer.webkitRequestFullscreen(); //고유의 기능
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}

function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
  //document.webkitExitFullscreen(); //고유의 기능
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  //현재시간
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
  //비디오 전체시간
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString; //totaTime String을 정의해줌.
  setInterval(getCurrentTime, 1000); //1초마다 실행 된드는거
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fab fa-gitlab"></i>';
}

function handleDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    //볼륨 크기 조절 아이콘
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

function init() {
  videoPlayer.volume = 0.5; //기본 볼륨
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumnClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init();
}
