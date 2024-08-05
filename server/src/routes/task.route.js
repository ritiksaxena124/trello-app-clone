import express from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask, deleteTask } from "../controllers/task.controller.js";

const router = express.Router();

// secured routes
router.route("/create").post(verifyJWT, createTask);
router.route("/delete").delete(verifyJWT, deleteTask);

export default router;