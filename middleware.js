import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "ParkTube"; //main에 있는 siteName
  res.locals.routes = routes; //routes.js 사용
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next();
};

export const uploadVideo = multerVideo.single("videoFile");

//Connect 미들웨어를 이용해서 isAuthenticated 메서드를 호출하여
//로그인 판단 여부를 확인할 수 있습니다.
//로그인한 유저는 isAuthenticated는 true를 반환해서
//next()를 호출해서 다음 작업을 진행하게 됨
