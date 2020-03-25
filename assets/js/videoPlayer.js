//이곳에서는 비디오플레이어 아이콘과 연결해서 동작 만듬.
const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton"); // 플레이버튼제어
const volumeBtn = document.getElementById("jsVolumnBtn"); // 볼륨버튼제어
const fullScreenBtn = document.getElementById("jsFullScreen"); //풀스크린버튼
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
    //버튼 클릭 할때는 화면 멈춘 상태였으니
    videoPlayer.play(); //재생중인 화면, 재생중이기에 아래 아이콘으로
    playBtn.innerHTML = '<i class="far fa-pause-circle"></i>';
    //안에 더블따옴이 있어서 싱글따옴으로 감쌈
  } else {
    videoPlayer.pause(); //일시정지 화면, 일리섲ㅇ지중이기에 아래 아이콘으로
    playBtn.innerHTML = '<i class="fab fa-gitlab"></i>';
  }
}

function handleVolumnClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false; //소리나는 상태
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>'; //소리 나고 있는 아이콘
    volumeRange.value = videoPlayer.volume; //이걸 해야 음소거 풀었을떄 원래 자리로감
  } else {
    // 볼륨업 상태에서 버튼 누르고 이게 제일 먼저 작동
    volumeRange.value = 0; //이걸 해야 음소거 하면 볼륨 바가 0으로 감
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function goFullScreen() {
  //버튼 누를시 일어나는 일
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen(); //풀스크린인 가즈아
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen(); //파이어폭스
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen(); //구글크롬
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen(); //엣지
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>'; //풀스크린 했으니 작게하는 버튼도
  fullScreenBtn.removeEventListener("click", goFullScreen); //다시 클릭한다고 또 크게 할 필요 없음
  fullScreenBtn.addEventListener("click", exitFullScreen); // 버튼 누를시 풀스크린 해제
}

function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
  //document.webkitExitFullscreen(); //고유의 기능
  if (document.exitFullscreen) {
    document.exitFullscreen(); //풀스크린해제
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen(); //파이어폭스
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen(); //크롬
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen(); //엣지
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
  //다른 곳에서도 쓸수 있게 앞에 const 안 붙임.
  videoPlayer.volume = 0.5; //기본 볼륨
  playBtn.addEventListener("click", handlePlayClick); //플레이버튼
  volumeBtn.addEventListener("click", handleVolumnClick); //볼륨버튼
  fullScreenBtn.addEventListener("click", goFullScreen); //풀스크린버튼
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init();
}
