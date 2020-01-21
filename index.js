//const express = require("express");
import express from "express";
const app = express();

const PORT = 4000;

const handleListening = () =>
  console.log(`Listening on : http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from home asshole gg!");
// 왼쪾은 request object, 오른 response object

const handleProfile = (req, res) => res.send("you are on my profile");
//이걸 arrow function이라고 한다.

app.get("/", handleHome); //어떤사람이 여기 /에 접근하면 함수를 호출.
//뭔가 응답하게 해야함.

app.get("/profile", handleProfile);

app.listen(4000, handleListening);

// function handleHome(req, res) {
//   // 왼쪾은 request object, 오른 response object
//   res.send("Hello from home!");
// }
