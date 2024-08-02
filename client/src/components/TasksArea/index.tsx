"use client";
import { DropDownIcon, ClockIcon, PlusIcon } from "@/assets/icons";
// import { tasksData } from "@/data/tasksData";
import TaskList from "./TaskList";
import { useAppDispatch } from "@/lib/hooks";
import { toggleModal } from "@/lib/slices/taskModalSlice";

export default function TasksArea({tasksData}) {
  const dispatch = useAppDispatch();
  function handleTaskModal() {
    dispatch(toggleModal());
  }
  return (
    <div className="mt-6 rounded-lg bg-white w-full p-4 flex gap-6">
      {tasksData.map((tasks) => (
        <div key={tasks._id} className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-medium text-[#606060]">
              {tasks.status}
            </span>
            <img src={DropDownIcon?.src} alt="dropdown icon" />
          </div>
          {/* Tasks List */}
          <div className="space-y-4">
            <TaskList tasksList={tasks.tasks} />
            {/* Button to create new task */}
            <div onClick={handleTaskModal} className="flex justify-between items-center text-white bg-gradient-to-b from-[#3A3A3A] to-[#202020] p-3 rounded-md mt-4 cursor-pointer">
              <button className="text-white">
                Add new
              </button>
              <img src={PlusIcon?.src} alt="plus icon" className="invert" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
