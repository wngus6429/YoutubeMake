import express from "express";
import routes from "../routes";
//현재 폴더의 바깥으로 지정해야 해서 .. 두개 붙임.

const globalRouter = express.Router();

globalRouter.get(routes.home, (req, res) => res.send("Home"));
globalRouter.get(routes.join, (req, res) => res.send("Join"));
globalRouter.get(routes.login, (req, res) => res.send("Login"));
globalRouter.get(routes.logout, (req, res) => res.send("Logout"));
globalRouter.get(routes.search, (req, res) => res.send("Search"));

export default globalRouter;
