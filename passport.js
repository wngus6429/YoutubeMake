import passport from "passport"; //Npm install passport passport-local
import GithubStrategy from "passport-github";
//import FacebookStrategy from "passport-facebook";
import User from "./models/User"; //모델 소환~~~ , strategy라는건 로그인 하는 방식임
import {
  githubLoginCallback
  // facebookLoginCallback
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());
//passport-local-mongoose가 제공하는 strategy 사용. username과 passport를 쓰는 strategy

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);
//어떤 field가 쿠키에 포함될것인지. 쿠키에는 오직 user.id만 담아서 보내도록해 라고 하는거임.
passport.serializeUser(User.serializeUser());
//쿠키의 정보를 어떻게 사용자로 전환하는가.
passport.deserializeUser(User.deserializeUser());

//serialize
//지금 웹브라우저에 있는 사용자에 대해서, 어떤 정보를 가질 수 있느냐.
//쿠키가 어떤 정보를 가질 수 있느냐!, 쿠키정보는 자동으로 백엔드로 전송
//그리고 serialization은 어떤 field가 쿠키에 포함될 것인지 알려주는 역할을 함.
//지금 serializeUser함수는 쿠키에 user.id만 담으라고 되어 있음. 오로지 ID만 전송
//그리고 사용자가 브라우저를 열어서 쿠키를 봐도 id만 보임

//deserializeUser는 어느 사용자인지 어떻게 찾는가? 쿠키를 받았는데. id가 1이라면
// 여기에서는 쿠키에게 user.id를 예를들어 숫자 1을 주었고, deserialize는 그 쿠키의
//정보를 어떻게 사용자로 전환하는가를 의미함. 이걸 설명하는 이유는, 여러줄 코드 대신에
//passport-local-mongoose의 도움으로 지름길을 쓸 것이다.
// 그래서 위에 2줄로 표현 끝임

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FB_ID,
//       clientSecret: process.env.FB_SECRET,
//       callbackURL: `https://afraid-baboon-46.localtunnel.me${routes.facebookCallback}`,
//       profileFields: ["id", "displayName", "photos", "email"],
//       scope: ["public_profile", "email"]
//     },
//     facebookLoginCallback
//   )
// );
