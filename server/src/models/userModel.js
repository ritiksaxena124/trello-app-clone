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
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
