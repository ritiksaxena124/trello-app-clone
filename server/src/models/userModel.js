import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String
  },
});



// This "pre" hook runs before saving the data into the database
userSchema.pre("save", async function (next) {
  // Don't run the logic if the password field is not changed
  if (!this.isModified("password")) return next();

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign({
    _id: this._id,
    email: this.email
  }, process.env.JWT_SECRET);
}

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({
    _id: this._id
  }, process.env.JWT_SECRET);

}

const User = mongoose.model("User", userSchema);

export default User;
