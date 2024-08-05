import express from "express";

import { TasksData } from "../models/tasksModel.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

router.post("/create", async (req, res) => {
    const { title, description, status, priority } = req.body;
    const token = req.cookies?.accessToken;
    const blob = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: blob.id });

    let task = await TasksData.findOneAndUpdate({ status }, {
        status,
        $push: {
            tasks: {
                title,
                description,
                priority,
                status,
            }
        }
    })

    if (!task) {
        task = await TasksData.create({
            status,
            tasks: [{
                title,
                description,
                priority,
                status,
            }]
        })
    }

    const isPresent = await User.find({
        tasksData: task._id
    }).select("-password")

    if (isPresent) {
        return res.status(200).json({ message: "Task created successfully" });
    }
    await user.tasksData.push(task_id)
    await user.save();

    res.status(200).json({ message: "Task created successfully" })
})

router.delete("/delete", async (req, res) => {
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

export default router;