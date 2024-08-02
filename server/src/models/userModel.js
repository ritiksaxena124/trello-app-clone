import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  tasksData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TasksData",
    },
  ],
});



// This "pre" hook runs before saving the data into the database
userSchema.pre("save", async function (next) {
  // Don't run the logic if the password field is not changed
  if (!this.isModified("password")) return next();

  // Hash the password
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(this.password, salt, function (err, hash) {
      this.password = hash;
      next();
    })
  })
})

const User = mongoose.model("User", userSchema);

export default User;
