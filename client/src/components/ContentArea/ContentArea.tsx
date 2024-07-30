"use client";

import HelpIcon from "@/assets/icons/helpIcon.svg";
import Graphic1 from "@/assets/icons/graphic1.svg";
import Graphic2 from "@/assets/icons/graphic2.svg";
import Graphic3 from "@/assets/icons/graphic3.svg";
import CalendarIcon from "@/assets/icons/calendarIcon.svg";
import AutomationIcon from "@/assets/icons/automationIcon.svg";
import FilterIcon from "@/assets/icons/filterIcon.svg";
import ShareIcon from "@/assets/icons/shareIcon.svg";
import SearchIcon from "@/assets/icons/searchIcon.svg";
import CreateTaskIcon from "@/assets/icons/addIcon.svg";
import TasksArea from "../TasksArea";
import { useAppDispatch } from "@/lib/hooks";
import { toggleModal } from "@/lib/slices/taskModalSlice";
import { PrimaryBtn } from "../Button";

export default function ContentArea({user}) {
  const dispatch = useAppDispatch();
  const cardsData = [
    {
      id: 1,
      title: "Introducing tags",
      content:
        "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
      imgSrc: Graphic1?.src,
    },
    {
      id: 2,
      title: "Share Notes Instantly",
      content:
        "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
      imgSrc: Graphic2?.src,
    },
    {
      id: 3,
      title: "Access Anywhere",
      content:
        "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
      imgSrc: Graphic3?.src,
    },
  ];

  function handleTaskModal() {
    dispatch(toggleModal());
  }

  return (
    <div className="w-full p-8 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-[48px] font-semibold">Good morning, {user?.fullName.split(" ")[0]}!</h1>
        <div className="flex gap-2 items-center">
          <span>Help & feedback</span>
          <img src={HelpIcon?.src} alt="help icon" />
        </div>
      </div>

      <div className="flex gap-4 flex-wrap mt-6">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="flex gap-4 p-4 bg-white rounded-md w-full max-w-lg lg:w-[calc(100%/3-16px)]"
          >
            <img src={card.imgSrc} alt={card.title} className="w-24 object-contain" />
            <div className="text-[#868686]">
              <h3 className="text-base font-semibold mb-1">{card.title}</h3>
              <p className="text-sm">{card.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        {/* search */}
        <div className="w-full max-w-64 p-3 flex items-center justify-between rounded-md border border-zinc-300 outline-none bg-white text-[#606060] focus:border focus:border-zinc-400">
          <input
            type="text"
            name="search"
            placeholder="Search..."
            className="w-full text-base outline-none"
          />
          <img src={SearchIcon?.src} alt="search icon" className="cursor-pointer"/>
        </div>
        {/* options */}
        <div className="flex items-center gap-2 justify-evenly">
          <div className="flex gap-2 items-center text-[#666] cursor-pointer p-3 rounded-md">
            <span>Calendar view</span>
            <img src={CalendarIcon?.src} alt="" />
          </div>
          <div className="flex gap-2 items-center text-[#666] cursor-pointer p-3 rounded-md">
            <span>Automation</span>
            <img src={AutomationIcon?.src} alt="" />
          </div>
          <div className="flex gap-2 items-center text-[#666] cursor-pointer p-3 rounded-md">
            <span>Filter</span>
            <img src={FilterIcon?.src} alt="" />
          </div>
          <div className="flex gap-2 items-center text-[#666] cursor-pointer p-3 rounded-md">
            <span>Share</span>
            <img src={ShareIcon?.src} alt="" />
          </div>
          <PrimaryBtn onClick={handleTaskModal} title="Create new" type="button" icon={CreateTaskIcon} />
        </div>
      </div>
      <TasksArea tasksData = {user.tasksData}/>
    </div>
  );
}
