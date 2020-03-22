import express from "express"; //프레임워크 임포트
import morgan from "morgan"; //무슨 일이 어디서 일어났는지 기록하는 거임. 어떤 접속, 브라우저 등등
import helmet from "helmet"; // 노드js 보안에 도움이 되는 것임.
import cookieParser from "cookie-parser"; //쿠키 저장기능 (익스프레스 미들웨어)
import bodyParser from "body-parser"; // 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middleware"; //미들웨어 정보 내놔
import routes from "./routes"; //라우트 정보 내놔
import userRouter from "./routers/userRouter"; //유저라우터 정보 내놔
import videoRouter from "./routers/videoRouter"; //비디오라우터 정보 내놔
import globalRouter from "./routers/globalRouter"; //글로벌 라우터 정보 내놔
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express(); //const는 ES6의 새로운 기능이다.

const CokieStore = MongoStore(session);

app.use(helmet()); //보안 증가
app.set("view engine", "pug"); //HTML 편하게 작성하게 도와주는 pug
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser()); //쿠키 저장기능
app.use(bodyParser.json()); //// 사용자가 웹사이트로 전달하는 정보들을 검사하는 미들웨어
//request정보에서 form이나 json 형태로된 body를 검사함
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); //컬러 들어감 ^.^
app.use(
  session({
    //아무거나 넣어도 동작. id 전송할때 암호화해서 못 알아보게 함
    secret: process.env.COOKIE_SECRET,
    resave: true, //세션을 강제로 저장하는 기능
    saveUninitialized: false,
    //초기화되지 않은(uninitialized) 세션을 저장소에 저장함.새로운 세션이지만 변경되지 않은 세션은 초기화되지 않습니다.
    //로그인 session에 이용하려면, false를 선택하는것이 유용합니다.
    store: new CokieStore({ mongooseConnection: mongoose.connection })
    //이걸 함으로 인해 서버가 재시작 되어도 쿠키를 보존 할 수 있음. 그래서 유저는 여전히 로그인상태
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;

//app.js는 오직 express를 배치 하기 위해
//ES6에는 흥미로운 부분이 있는데. 모듈이라는게 있어서 우리 코드를
//공유 할 수가 있음. 다른 파일에서의 코드를 가져다가 사용 할 수 있음.
//app.use is to USE a middleware.
//app.get is to only answer to GET requests to a certain routes.
// app.use("/user", userRouter)
//user의 의미는. 누군가가 /user 경로에 접속하면 이 router 전체를 사용하겠다는 의미
