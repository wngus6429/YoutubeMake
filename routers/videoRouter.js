import express from "express";
import routes from "../routes";
import {
  getUpload,
  postUpload,
  videoDetail,
  getEditVideo,
  postEditVideo,
  deleteVideo
} from "../controllers/videoController";
import { uploadVideo } from "../middleware";

const videoRouter = express.Router();

console.log(routes.editVideo);

//upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload); //가운데가 미들웨어
//video detail
videoRouter.get(routes.videoDetail(), videoDetail);
//edit video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);
//delete video
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;

// MVC라는 것은 Model, View, Control을 의미한다.
// Model은 데이터임
// View, 데이터가 어떻게 생겼는지 (template)
// Control 데이터를 보여주는 함수
//URL에 해당하는 router를 사용하고, 실행하는 함수가 컨트롤러가 되겟지
