//const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookeParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from home asshole gg!");
// 왼쪾은 request object, 오른 response object

const handleProfile = (req, res) => res.send("you are on my profile");
//이걸 arrow function이라고 한다.

app.use(cookeParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

const middleware = (req, res, next) => {
  res.send("not happening");
};

app.get("/", middleware, handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);

// function handleHome(req, res) {
//   // 왼쪾은 request object, 오른 response object
//   res.send("Hello from home!");
// }
// app.get("/", betweenHome, handleHome); //어떤사람이 여기 /에 접근하면 함수를 호출.
// //뭔가 응답하게 해야함. /만 입력하면 이 함수가 실행됨. 밑에 /profile하면 I'm betttwen안뜸
