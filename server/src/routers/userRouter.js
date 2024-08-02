import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/getdata", async (req, res) => {
  const token = req.headers.cookie?.replace("token=", "");
  if (!token) {
    return res.status(401).json({
      msg: "Unauthorized",
      status: 401
    })
  }
  const blob = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById({
    _id: blob.id,
  }).populate("tasksData").select("-password");

  res.json({
    user,
    status: 201
  });
});

export default router;
