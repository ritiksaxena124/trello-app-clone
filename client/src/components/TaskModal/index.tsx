import CloseIcon from "@/assets/icons/closeIcon.svg";
import FullScreenIcon from "@/assets/icons/fullScreenIcon.svg";
import ShareIcon from "@/assets/icons/shareIcon.svg";
import FavoriteIcon from "@/assets/icons/favoriteIcon.svg";
import {
  StatusIcon,
  PriorityIcon,
  DescriptionIcon,
  CalendarIcon,
  PlusIcon,
} from "@/assets/icons";

export default function TaskModal() {
  return (
    <>
      <section className="absolute top-0 left-0 w-full h-full z-10 bg-black/50"></section>
      <section className="fixed w-full max-w-xl right-0 top-0 h-screen bg-white z-20 p-6">
        <div className="flex justify-between mb-6 items-center">
          <div className="flex items-center gap-3">
            <span className="cursor-pointer">
              <img
                src={CloseIcon?.src}
                alt="close task modal"
                className="w-8 h-8"
              />
            </span>
            <span className="cursor-pointer">
              <img
                src={FullScreenIcon?.src}
                alt="close task modal"
                className="w-8 h-8"
              />
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <div className="flex gap-2 items-center bg-[#f3f3f3] py-2 px-4 rounded-md text-[#666] cursor-pointer">
              <button>Share</button>
              <img src={ShareIcon?.src} alt="share icon" />
            </div>
            <div className="flex gap-2 items-center bg-[#f3f3f3] py-2 px-4 rounded-md text-[#666] cursor-pointer">
              <button>Favorite</button>
              <img src={FavoriteIcon?.src} alt="share icon" />
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Title"
          className="text-[48px] outline-none font-medium"
        />
        <div className="py-6 space-y-5">
          <div className="flex items-center gap-2 text-[#666]">
            <img src={StatusIcon?.src} alt="" className="w-6 h-6" />
            <span className="text-base">Status</span>
          </div>
          <div className="flex items-center gap-2 text-[#666]">
            <img src={PriorityIcon?.src} alt="" className="w-6 h-6" />
            <span className="text-base">Priority</span>
          </div>
          <div className="flex items-center gap-2 text-[#666]">
            <img src={CalendarIcon?.src} alt="" className="w-6 h-6" />
            <span className="text-base">Deadline</span>
          </div>
          <div className="flex items-center gap-2 text-[#666]">
            <img src={DescriptionIcon?.src} alt="" className="w-6 h-6" />
            <span className="text-base">Description</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-800">
            <img src={PlusIcon?.src} alt="" className="w-6 h-6" />
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
