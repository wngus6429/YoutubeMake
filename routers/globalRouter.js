import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout
} from "../controllers/userController";
//현재 폴더의 바깥으로 지정해야 해서 .. 두개 붙임.

const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin); //아이디 만듬
globalRouter.post(routes.join, postJoin); //아이디 만듬 정보 가림

globalRouter.get(routes.login, getLogin); //로그인 함
globalRouter.post(routes.login, postLogin); //로그인 정보 가림

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, logout);

export default globalRouter;
