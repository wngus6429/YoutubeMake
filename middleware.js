import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "unploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "ParkTube"; //main에 있는 siteName
  res.locals.routes = routes; //routes.js 사용
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
//로그인한 사용자가 가입화면(join)에 못 가게 하기 위해

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
//사용자가 로그인한 상태라면 next를 해줌, 그렇지 않으면 home으로

export const uploadVideo = multerVideo.single("videoFile");
//single은 파일 한개만을 올릴수 있다는것임.
export const uploadAvatar = multerAvatar.single("avatar");

//Connect 미들웨어를 이용해서 isAuthenticated 메서드를 호출하여
//로그인 판단 여부를 확인할 수 있습니다.
//로그인한 유저는 isAuthenticated는 true를 반환해서
//next()를 호출해서 다음 작업을 진행하게 됨

//multer는
//var upload = multer({ dest: 'uploads/' })
// 입력한 파일이 uploads/ 폴더 내에 저장된다.
// multer라는 모듈이 함수라서 함수에 옵션을 줘서 실행을 시키면, 해당 함수는 미들웨어를 리턴한다.
