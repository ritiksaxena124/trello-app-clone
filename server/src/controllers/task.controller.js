import { asyncHandler } from "../utils/asyncHandler.js"
import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority } = req.body;

    const task = await Task.create({
        title,
        description,
        status,
        priority,
        userId: req.user?._id
    })

    if (!task) {
        throw new ApiError(500, "Failed to create task")
    }

    res.status(200).json(new ApiResponse(200, "Task created successfully", task));
})

const deleteTask = asyncHandler(async (req, res) => {
    const { status, id } = req.query;

    const tasks = await TasksData.findOne({
        status
    })
    const newTasksList = tasks?.tasks.filter(task => task._id != id);
    tasks.tasks = newTasksList;
    await tasks.save();

    res.json({
        message: "Task deleted successfully",
        status, id,
        tasks,
    })
})

export { createTask, deleteTask }