import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  getChangePassword,
  postEditProfile,
  postChangePassword
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middleware";
//라우트와 컨트롤러를 가져와서 사용한다

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter; //파일로 export 한다는 이야기.

// MVC라는 것은 Model, View, Control을 의미한다.
// Model은 데이터임
// View, 데이터가 어떻게 생겼는지 (template)
// Control 데이터를 보여주는 함수
//URL에 해당하는 router를 사용하고, 실행하는 함수가 컨트롤러가 되겟지
