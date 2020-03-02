//이곳에서는 비디오플레이어 아이콘과 연결해서 동작 만듬.
const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
}

if (videoContainer) {
  init();
}
