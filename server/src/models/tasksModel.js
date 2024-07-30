import mongoose, { mongo } from "mongoose";

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
    //   enum: ["Todo", "In Progress", "Under Review", "Finished"],
      required: true,
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["Urgent", "Medium", "Low"],
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const tasksDataSchema = mongoose.Schema({
  status: {
    type: String,
    required: true,
    // enum: ["Todo", "In Progress", "Under Review", "Finished"],
    default: "Todo"
  },
  tasks: [taskSchema],
});
const Task = mongoose.model("Task", taskSchema);
const TasksData = mongoose.model("TasksData", tasksDataSchema);

export { Task, TasksData };
