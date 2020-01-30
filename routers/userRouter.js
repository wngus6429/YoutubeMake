import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
// MVC라는 것은 Model, View, Control을 의미한다.

// Model은 데이터임
// View, 데이터가 어떻게 생겼는지
// Control 데이터를 보여주는 함수
