"use client";

import ContentArea from "@/components/ContentArea/ContentArea";
import Sidebar from "@/components/Sidebar";
import TaskModal from "@/components/TaskModal";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return router.push("/login");
    }
  }, []);

  return (
    <div className="bg-[#F7F7F7] w-full min-h-screen flex relative">
      <Sidebar />
      <ContentArea />
      <TaskModal />
    </div>
  );
}
