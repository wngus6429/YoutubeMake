import express from "express";
import routes from "../routes";

const userRouter = express.Router();

export default userRouter;

userRouter.get(routes.users, (req, res) => res.send("Users"));
userRouter.get(routes.userDetail, (req, res) => res.send("User Detail"));
userRouter.get(routes.editProfile, (req, res) => res.send("Edit Profile"));
userRouter.get(routes.changePassword, (req, res) => res.send("Change Password"));
// userRouter.get("/", (req, res) => res.send("user index"));
// userRouter.get("/edit", (req, res) => res.send("user edit"));
// userRouter.get("/password", (req, res) => res.send("user password"));

// MVC라는 것은 Model, View, Control을 의미한다.

// Model은 데이터임
// View, 데이터가 어떻게 생겼는지
// Control 데이터를 보여주는 함수
