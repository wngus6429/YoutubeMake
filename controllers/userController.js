import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password != password2) {
    res.status(400); //html status code 라고 있음. 100 200 300 등등
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
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

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home
});

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

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const user = await User.findById({ id });
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
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
