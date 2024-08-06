"use client";
import CloseIcon from "@/assets/icons/closeIcon.svg";
import FullScreenIcon from "@/assets/icons/fullScreenIcon.svg";
import ShareIcon from "@/assets/icons/shareIcon.svg";
import FavoriteIcon from "@/assets/icons/favoriteIcon.svg";
import React, { useState } from "react";
import {
  StatusIcon,
  PriorityIcon,
  DescriptionIcon,
  CalendarIcon,
  PlusIcon,
} from "@/assets/icons";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleModal } from "@/lib/slices/taskModalSlice";
import { TaskDetails } from "@/interfaces";
import PriorityTag from "../PriorityTag";
import Image from "next/image";

export default function TaskModal() {
  const [toggleDropdown, setToggleDropdown] = useState<{
    status: boolean;
    priority: boolean;
  }>({
    status: false,
    priority: false,
  });
  const [taskDetails, setTaskDetails] = useState<TaskDetails>({
    title: "",
    description: "",
    status: "Todo",
    priority: "Low",
  });

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((store) => store.taskModal.isOpen);

  function closeTaskModal() {
    dispatch(toggleModal());
  }
  function handleToggleDropdown(element: keyof typeof toggleDropdown) {
    setToggleDropdown((prev) => ({
      ...prev,
      [element]: !prev[element],
    }));
  }

  function handleTaskDetails(
    name: string,
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setTaskDetails((prev) => ({
      ...prev,
      [name]: value ? value : e.target.value,
    }));

    if (name == "status" || name == "priority") {
      setToggleDropdown(() => ({
        status: false,
        priority: false,
      }));
    }
  }

  async function handleCreateTask() {
    if (!taskDetails.title) {
      alert("Title cannot be empty");
      return;
    }

    const res = await fetch("http://localhost:9081/api/v1/task/create", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(taskDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    dispatch(toggleModal());
  }

  return (
    <>
      <section
        onClick={closeTaskModal}
        className={`${
          isOpen ? "opacity-1" : "hidden"
        } absolute top-0 left-0 w-full h-full z-10 bg-black/50`}
      ></section>
      <section
        className={`fixed w-full max-w-xl right-0 top-0 h-screen bg-white z-20 p-6 ${
          isOpen ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <div className="flex justify-between mb-6 items-center">
          <div className="flex items-center gap-3">
            <span onClick={closeTaskModal} className="cursor-pointer">
              <Image
                src={CloseIcon?.src}
                alt="close task modal"
                className="w-8 h-8"
                width={32}
                height={32}
              />
            </span>
            <span className="cursor-pointer">
              <Image
                src={FullScreenIcon?.src}
                alt="close task modal"
                className="w-8 h-8"
                width={32}
                height={32}
              />
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <div
              onClick={handleCreateTask}
              className="flex gap-2 items-center py-2 px-4 rounded-md cursor-pointer text-white bg-gradient-to-b from-[#3A3A3A] to-[#202020]"
            >
              <button>Create</button>
              <Image
                src={PlusIcon?.src}
                alt="create icon"
                className="invert"
                width={32}
                height={32}
              />
            </div>
            <div className="flex gap-2 items-center bg-[#f3f3f3] py-2 px-4 rounded-md text-[#666] cursor-pointer">
              <Image
                src={ShareIcon?.src}
                alt="share icon"
                width={32}
                height={32}
              />
            </div>
            <div className="flex gap-2 items-center bg-[#f3f3f3] py-2 px-4 rounded-md text-[#666] cursor-pointer">
              <Image
                src={FavoriteIcon?.src}
                alt="share icon"
                width={32}
                height={32}
              />
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Title"
          className="text-[48px] outline-none font-medium"
          name="title"
          value={taskDetails.title}
          onChange={(e) => handleTaskDetails("title", "", e)}
        />
        <div className="py-6 space-y-5">
          {/* Status */}
          <div className="flex items-center">
            <div className="flex grow items-center gap-2 text-[#666]">
              <Image
                src={StatusIcon?.src}
                alt=""
                className="w-6 h-6"
                width={32}
                height={32}
              />
              <span className="text-base">Status</span>
            </div>

            <div className="relative grow max-w-44">
              <button
                className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => {
                  handleToggleDropdown("status");
                  setToggleDropdown((prev) => ({
                    ...prev,
                    priority: false,
                  }));
                }}
              >
                {taskDetails.status}
              </button>

              <div
                className={`absolute z-20 ${
                  toggleDropdown.status ? "h-fit" : "hidden"
                } mt-2 bg-white divide-y w-full divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li
                    onClick={(e) => handleTaskDetails("status", "Todo", e)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Todo
                  </li>
                  <li
                    onClick={(e) =>
                      handleTaskDetails("status", "In Progress", e)
                    }
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    In Progress
                  </li>
                  <li
                    onClick={(e) =>
                      handleTaskDetails("status", "Under Review", e)
                    }
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Under Review
                  </li>
                  <li
                    onClick={(e) => handleTaskDetails("status", "Finished", e)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Finished
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Priority */}
          <div className="flex items-center">
            <div className="flex grow items-center gap-2 text-[#666]">
              <Image
                src={PriorityIcon?.src}
                alt=""
                className="w-6 h-6"
                width={32}
                height={32}
              />
              <span className="text-base">Priority</span>
            </div>

            <div className="relative grow max-w-44">
              <PriorityTag
                title={taskDetails.priority}
                onClick={() => {
                  handleToggleDropdown("priority");
                  setToggleDropdown((prev) => ({
                    ...prev,
                    status: false,
                  }));
                }}
              />

              <div
                className={`absolute z-20 ${
                  toggleDropdown.priority ? "h-fit" : "hidden"
                } mt-2 bg-white divide-y w-full divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li
                    onClick={(e) => {
                      handleTaskDetails("priority", "Urgent", e);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Urgent
                  </li>
                  <li
                    onClick={(e) => handleTaskDetails("priority", "Medium", e)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Medium
                  </li>
                  <li
                    onClick={(e) => handleTaskDetails("priority", "Low", e)}
                    className="block px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Low
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#666]">
            <Image
              src={CalendarIcon?.src}
              alt=""
              className="w-6 h-6"
              width={32}
              height={32}
            />
            <span className="text-base">Deadline</span>
          </div>
          <div className="flex items-center gap-2 text-[#666]">
            <Image
              src={DescriptionIcon?.src}
              alt=""
              className="w-6 h-6"
              width={32}
              height={32}
            />
            <span className="text-base">Description</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-800">
            <Image
              src={PlusIcon?.src}
              alt=""
              className="w-6 h-6"
              width={32}
              height={32}
            />
            <span className="text-base">Add custom property</span>
          </div>
        </div>
        <div className="w-full rounded-sm h-[2px] bg-[#DEDEDE] mb-6"></div>
        <textarea
          name="content"
          id="content"
          placeholder="Start writing, or drag your own files here."
          className="resize-none w-full h-full min-h-[calc(100% - 164px)] outline-none"
        ></textarea>
      </section>
    </>
  );
}
