import express from "express";

import { loginUser, logoutUser, registerUser, retrieveUserData } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/logout").get(logoutUser);
router.route("/getdata").get(retrieveUserData);

export default router;
