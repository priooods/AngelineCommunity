import express from "express";
import { NewUser, FindUserForDelete } from "../controller/controller_user.js";
const RouterUser = express.Router();

RouterUser.post("/add", NewUser);
RouterUser.post("/remove", FindUserForDelete);

export default RouterUser;
