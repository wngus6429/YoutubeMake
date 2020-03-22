import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  getLogin,
  postJoin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogIn,
  getMe
  // facebookLogin,
  // postFacebookLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middleware";
//현재 폴더의 바깥으로 지정해야 해서 .. 두개 붙임.

const globalRouter = express.Router();
//onlyPublic 은 로그인한 사용자가 join, login에 접근 못하게 하기 위해
globalRouter.get(routes.join, onlyPublic, getJoin); //join 화면 만듬
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin); //join 처리
//postJoin에서 가입을 하고 바로 로그인 시키는 과정 join에 next() 있음.

globalRouter.get(routes.login, onlyPublic, getLogin); //로그인 화면 만듬
globalRouter.post(routes.login, onlyPublic, postLogin); //로그인 처리

globalRouter.get(routes.home, home); // routes.home링크로 home을 보냄.
//home을 video컨트롤러에서 가져옴
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogIn
);

globalRouter.get(routes.me, getMe);

// globalRouter.get(routes.facebook, facebookLogin);
// globalRouter.get(
//   routes.facebookCallback,
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   postFacebookLogin
// );

export default globalRouter;

//get을 쓰는것은 URL 창에 보이고 render 하기 위한 용도이며
//post를 쓰는것은 URL 창에 안보이는 다른 작업들 (패스워드, reqbody 등등) 하기 위해.
