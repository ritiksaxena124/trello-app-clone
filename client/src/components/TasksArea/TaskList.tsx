"use client";
import { ClockIcon } from "@/assets/icons";
import { useEffect, useState } from "react";
import { taskModel } from "@/data/tasksData";
import PriorityTag from "../PriorityTag";

export default function TaskList({ tasksList }) {
  const [tasks, setTasks] = useState<taskModel[]>(tasksList);
  if (!tasksList) return;

  useEffect(() => {
    setTasks(tasksList);
  }, []);

  return (
    <>
      {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-[#F9F9F9] border border-[#DEDEDE] p-4 rounded-md space-y-4"
        >
          <div className="w-full">
            <h4 className="font-medium mb-1 text-[#707070] text-base">
              {task.title}
            </h4>
            <p className="text-sm text-[#797979]">{task.description}</p>
          </div>
          {/* Priority */}
          <PriorityTag title={task.priority}/>
          {/* Deadline Date */}
          <div className="flex items-center gap-2">
            <img src={ClockIcon?.src} alt="deadline" />
            <span className="font-medium text-[#606060]">{task.deadline}</span>
          </div>
          {/* Last updated time */}
          <div className="text-[#797979]">{task.lastUpdated}</div>
        </div>
      ))}
    </>
  );
}
