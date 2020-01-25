//const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookeParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

const PORT = 4000; //인터넷 접속 4000 이라곸

const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from home asshole gg!");
// 왼쪾은 request object, 오른 response object

const handleProfile = (req, res) => res.send("you are on my profile");
//이걸 arrow function이라고 한다.

app.use(cookeParser()); //쿠키 저장기능
app.use(bodyParser.json()); //json에 대한 이해 , 향후 알게됨
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); //보안 증가
app.use(morgan("dev"));

const middleware = (req, res, next) => {
  res.send("not happening"); //res로 차단 해버려서 다음 handleHome에 못함
};

app.get("/", middleware, handleHome); //중간에 걸려버리노

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);

// function handleHome(req, res) {
//   // 왼쪾은 request object, 오른 response object
//   res.send("Hello from home!");
// }
// app.get("/", betweenHome, handleHome); //어떤사람이 여기 /에 접근하면 함수를 호출.
// //뭔가 응답하게 해야함. /만 입력하면 이 함수가 실행됨. 밑에 /profile하면 I'm betttwen안뜸
