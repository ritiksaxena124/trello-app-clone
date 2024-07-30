import dotenv from "dotenv";
import express from "express";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9081;

const options = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);

const serverStart = async () => {
  try {
    await connectDB();
    app.on("error", (err) => {
      console.error("Error: ", err);
      throw err;
    });
    app.listen(port, (req, res) => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.log("Failed to start the server", err);
    throw err;
  }
};

serverStart();
