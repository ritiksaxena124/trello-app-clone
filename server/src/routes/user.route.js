import express from "express";

import { loginUser, logoutUser, registerUser, retrieveUserData } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);

// secured routes
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/getdata").get(verifyJWT, retrieveUserData);

export default router;
