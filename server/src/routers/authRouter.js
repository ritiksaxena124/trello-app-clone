import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(401).json({
      message: "Incorrect credentials",
      status: 401,
    });
  }

  const blob = await bcrypt.compare(password, user.password);

  if (!blob) {
    return res.status(401).json({
      message: "Incorrect credentials",
      status: 401,
    });
  }

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

  res.status(201).json({
    message: "User loggedIn",
    status: 201,
    token
  });
});

router.post("/register", (req, res) => {
  const { fullName, email, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log("Error generating salt", err);
      throw err;
    }

    bcrypt.hash(password, salt, async (err, result) => {
      if (err) {
        console.log("Error hashing password", err);
        throw err;
      }
      // logic to create a user in database goes here
      const user = await User.create({
        fullName,
        email,
        password: result,
      });

      if (!user) {
        res.status(401).json({
          message: "Unable to register user.",
          status: 401,
        });
      }

      // create a jwt token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const options = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("token", token, options);
      res.status(201).json({
        message: "User registered successfully!",
        token,
        status: 201,
      });
    });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token")
  res.json({ message: "Logged out successfully" });
});
export default router;
