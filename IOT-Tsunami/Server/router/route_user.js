import express from "express";
import { NewUser } from "../controller/controller_user.js";
const RouterUser = express.Router();

RouterUser.post("/add", NewUser);

export default RouterUser;
