"use client";

import NotificationBellIcon from "@/assets/icons/notification-bell.svg";
import NotificationSunIcon from "@/assets/icons/notification-sun.svg";
import ExpandIcon from "@/assets/icons/expand.svg";
import HomeIcon from "@/assets/icons/home.svg";
import BoardsIcon from "@/assets/icons/boards.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import TeamsIcon from "@/assets/icons/teams.svg";
import AnalyticsIcon from "@/assets/icons/analytics.svg";
import CreateIcon from "@/assets/icons/addIcon.svg";
import DownloadIcon from "@/assets/icons/downloadIcon.svg";

import { PrimaryBtn } from "../Button";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleModal } from "@/lib/slices/taskModal";

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  async function handleLogout() {
    const res = await fetch("http://localhost:9081/api/v1/auth/logout", {
      credentials: "include",
    });
    const data = await res.json();

    console.log(data);
    router.push("/login");
  }

  function toggleTaskModal() {
    dispatch(toggleModal());
  }

  console.log(useAppSelector((store) => store.taskModal.isOpen));

  return (
    <div className="w-72 relative basis-1/5 min-h-screen bg-white px-4 py-6 space-y-6 border-r border-[#DDDDDD] flex flex-col justify-between overflow-hidden">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1722038400&semt=sph"
              alt="avatar"
              className="w-10 h-10 rounded-lg"
            />
            <p className="text-lg font-semibold">Joe Gardner</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="flex gap-3">
              <span>
                <img src={NotificationBellIcon?.src} alt="notification bell" />
              </span>
              <span>
                <img src={NotificationSunIcon?.src} alt="notification bell" />
              </span>
              <span>
                <img src={ExpandIcon?.src} alt="notification bell" />
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm bg-[#F4F4F4] text-[#797979] px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex gap-2 p-2 bg-[#F4F4F4] text-[#797979] rounded-md border border-[#DDDDDD]">
            <img src={HomeIcon?.src} alt="home icon" className="w-6 h-6 " />
            <p>Home</p>
          </div>
          <div className="flex gap-2 p-2 text-[#797979] rounded-md">
            <img src={BoardsIcon?.src} alt="home icon" className="w-6 h-6 " />
            <p>Boards</p>
          </div>
          <div className="flex gap-2 p-2 text-[#797979]">
            <img src={SettingsIcon?.src} alt="home icon" className="w-6 h-6 " />
            <p>Settings</p>
          </div>
          <div className="flex gap-2 p-2 text-[#797979]">
            <img src={TeamsIcon?.src} alt="home icon" className="w-6 h-6 " />
            <p>Teams</p>
          </div>
          <div className="flex gap-2 p-2 text-[#797979]">
            <img
              src={AnalyticsIcon?.src}
              alt="home icon"
              className="w-6 h-6 "
            />
            <p>Analytics</p>
          </div>
          <PrimaryBtn
            onClick={toggleTaskModal}
            type="button"
            title="Create new task"
            icon={CreateIcon}
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-1 rounded-md bg-[#F3F3F3] py-3 px-2 cursor-pointer">
        <img src={DownloadIcon?.src} alt="download icon1" />
        <div>
          <p className="text-[#666666] text-lg font-medium">Download the app</p>
          <p className="text-[#666666] text-sm">Get the full experience </p>
        </div>
      </div>
    </div>
  );
}
