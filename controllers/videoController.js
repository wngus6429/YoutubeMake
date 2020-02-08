import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;
  // const searchingBy = req.query.term;
  // res.render("search", { pageTitle: "Search", searchingBy:searchingBy });
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { file, title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
  //
  res.render("upload", { pageTitle: "Upload" });
  // To do : 비디오 업로드 및 저장
  //res.redirect(routes.videoDetail(123)); //db.js의 영상 id를 가져옴
};
export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
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
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
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
    await Video.findOneAndUpdate({ id }, { title, description }); //뒤에 부분이 수정하고 싶은곳
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video" });

//여기가 MVC에서 C부분임
//Pug로 V부분도 할 예정임
