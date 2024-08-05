import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Under Review", "Finished"],
      required: true,
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["Urgent", "Medium", "Low"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export { Task };
