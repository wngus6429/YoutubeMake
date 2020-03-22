import passport from "passport";
import routes from "../routes";
import User from "../models/User"; //User안에 Schema가 담겨있음.
import { renderSync } from "node-sass";

//스키마에서 User로 받았지만 DB가 users로 만듬.

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400); //html status code 라고 있음. 100 200 300 등등
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        //스키마 내용의 name, email 받아서 사용자를 생성
        name,
        email
      });
      await User.register(user, password);
      //문서참고해서 register사용해서 등록, 즉 postJoin에서 생성과 등록 둘다 함.
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
    // To Do : Register User
    // To Do : Log User in
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

//passport.authenticate는 username(여기서는 email), password를 찾아보도록 설정됨
//여기 local은 우리가 설치해준strategy
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
  //바로 지금 로그인한 사용자로 바로 연결하기 위해 뒤에 붙임. req.user는 현재 로그인된 사용자.
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    //users/무작위id로 들어갔을때 에러 뜨는거 방지하기 위해 try catch문 사용
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email, //file이 있으면 file.path : 뒤 , 없으면 같은 avatarUrl
      avatarUrl: file ? file.path : req.user.avatarUrl
      //우린 user.avatarUrl을 가지고 있음. 만약 새로운 avatarfile이 없다면
      //유저가 파일을 추가하지 않으면 avatarUrl을 중복해서 쓰지 않음. 그래서 현재 있는걸 줌
      //request객체 안에는 user가 있다는 사실을 기억해야함.
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(`/users/${routes.changePassword}`);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatarUrl;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

//사실 뒤에서 return 암묵적으로 행하는중
// function alal() {
//   return true;
// }

// alal = () => true;

//컨트롤러는 어떤 일이 어떻게 발생하는지에 관한 로직임

// export const facebookLogin = passport.authenticate("facebook");

// export const facebookLoginCallback = async (_, __, profile, cb) => {
//   const {
//     _json: { id, name, email }
//   } = profile;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       user.facebookId = id;
//       user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
//       user.save();
//       return cb(null, user);
//     }
//     const newUser = await User.create({
//       email,
//       name,
//       facebookId: id,
//       avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
//     });
//     return cb(null, newUser);
//   } catch (error) {
//     return cb(error);
//   }
// };

// export const postFacebookLogin = (req, res) => {
//   res.redirect(routes.home);
// };
