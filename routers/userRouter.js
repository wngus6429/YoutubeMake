import express from "express";

const userRouter = express.Router();

export default userRouter;

// userRouter.get("/", (req, res) => res.send("user index"));
// userRouter.get("/edit", (req, res) => res.send("user edit"));
// userRouter.get("/password", (req, res) => res.send("user password"));

// MVC라는 것은 Model, View, Control을 의미한다.

// Model은 데이터임
// View, 데이터가 어떻게 생겼는지
// Control 데이터를 보여주는 함수
