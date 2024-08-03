import express from "express";

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

// Routes import
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";

// Routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

export { app };