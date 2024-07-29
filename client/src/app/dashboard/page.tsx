"use client";

import ContentArea from "@/components/ContentArea/ContentArea";
import Sidebar from "@/components/Sidebar";
import TaskModal from "@/components/TaskModal";

export default function Page() {
  return (
    <div className="bg-[#F7F7F7] w-full min-h-screen flex relative">
      <Sidebar />
      <ContentArea />
      <TaskModal />
    </div>
  );
}
