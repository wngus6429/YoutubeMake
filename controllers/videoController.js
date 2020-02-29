import routes from "../routes";
import Video from "../models/Video"; //이걸로 모델 데이터를 불러옴

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    //최신꺼를 위에 배열하기 위해 뒤에 소트 사용
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
    //첫번쨰는 템플릿 pug 이고 뒤에는 추가할 내용 객체를 적은거임 main보면 암
  }
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
  // const searchingBy = req.query.term; zz
  // res.render("search", { pageTitle: "Search", searchingBy:searchingBy });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  const {
    body: { file, title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title, //이거 title:title 줄인거
    description, //이것도 마찬가지 description:description
    creator: req.user.id
  });
  console.log(newVideo);
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
  //res.render("upload", { pageTitle: "Upload" });
  // To do : 비디오 업로드 및 저장
  //res.redirect(routes.videoDetail(123)); //db.js의 영상 id를 가져옴
};
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    //console.log(video); //adding creator to video
    res.render("videoDetail", { pageTitle: video.title, video });
    //video:video 는 video 와 같다.
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description }); //뒤에 부분이 수정하고 싶은곳
    //console.log(video);
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
  //비디오 삭제가 되던, 안되던 무조건 home으로 간다.
};

// 여기가 MVC에서 C부분임
//pageTitle 이건 말 그대로 페이지 타이틀임
//redirect는 사용자를 어디 홈페이지로 보내는 역할
//res.render("home")은 home.pug를 렌더링한다.
//getEditVideo는 템플릿을 랜더링 하는거임
//get은 뭔가를 채워넣는 작업이고, post는 업데이트하고 redirect하는 작업임
