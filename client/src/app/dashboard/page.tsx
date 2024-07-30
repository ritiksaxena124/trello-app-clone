"use client";

import ContentArea from "@/components/ContentArea/ContentArea";
import Sidebar from "@/components/Sidebar";
import TaskModal from "@/components/TaskModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserData() {
      const res = await fetch("http://localhost:9081/api/v1/user/getdata", {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data)
      setUser(data.user);
    }

    getUserData();
    const token = localStorage.getItem("token");
    if (!token) {
      return router.push("/login");
    }
  }, []);

  if(!user){
    return;
  }

  return (
    <div className="bg-[#F7F7F7] w-full min-h-screen flex relative">
      <Sidebar />
      <ContentArea user={user} />
      <TaskModal />
    </div>
  );
}
