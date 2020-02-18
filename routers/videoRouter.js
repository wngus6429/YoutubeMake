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
import { uploadVideo, onlyPrivate } from "../middleware";

const videoRouter = express.Router();

console.log(routes.editVideo);

//upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload); //가운데가 미들웨어
//video detail
videoRouter.get(routes.videoDetail(), videoDetail);
//edit video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);
//delete video
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);
//deleteVideo는 string을 return하는 function 이다.

export default videoRouter;

//routes.뭐시기()는 더 이상 string이 아니라 사실상 funtion 이라고 보면됨.

// MVC라는 것은 Model, View, Control을 의미한다.
// Model은 데이터임
// View, 데이터가 어떻게 생겼는지 (template)
// Control 데이터를 보여주는 함수
//URL에 해당하는 router를 사용하고, 실행하는 함수가 컨트롤러가 되겟지
