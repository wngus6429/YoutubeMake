//const express = require("express");
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookeParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
const app = express();

app.use(cookeParser()); //쿠키 저장기능
app.use(bodyParser.json()); //json에 대한 이해 , 향후 알게됨
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); //보안 증가
app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
