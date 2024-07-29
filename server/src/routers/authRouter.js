import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  res.send("Login");
});

router.post("/register", (req, res) => {
  const { fullName, email, password } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log("Error generating salt", err);
      throw err;
    }

    bcrypt.hash(password, salt, (err, result) => {
      if (err) {
        console.log("Error hashing password", err);
        throw err;
      }
      // logic to create a user in database goes here
      // create a jwt token
      const token = jwt.sign({}, process.env.JWT_SECRET);

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
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});
export default router;
