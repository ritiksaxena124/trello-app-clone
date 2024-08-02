import express from "express";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import taskRouter from "./routers/taskRouter.js";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const options = {
  origin: "http://localhost:3000",
  credentials: true,
};

// Middlewares
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

export { app };