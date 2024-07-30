import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/getdata", async (req, res) => {
  const token = req.headers?.cookie.replace("token=", "");
  const blob = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById({
    _id: blob.id,
  }).populate("tasksData").select("-password");

  res.json({
    user
  });
});

export default router;
