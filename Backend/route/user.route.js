import express from "express";
import { signup, login } from "../controller/user.controller.js";
const router = express.Router();

console.log("User route loaded");

router.post("/signup", signup);
router.post("/login", login);

export default router;
