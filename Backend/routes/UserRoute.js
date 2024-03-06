import express from "express";
import jwt from "jsonwebtoken";
import { login, signUp } from "../controller/AuthUser.js";

const route = express.Router();

route.post("/signup", signUp);
route.post("/login", login);

export default route;
