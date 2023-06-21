import express from "express";
import { NewUser, Test } from "../controller/controller_user.js";
const RouterUser = express.Router();

RouterUser.post("/add", NewUser);
RouterUser.get("/test", Test);

export default RouterUser;
