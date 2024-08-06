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
      const result: Response = await fetch(
        "http://localhost:9081/api/v1/user/getdata",
        {
          credentials: "include",
        }
      );

      const user = await result.json();

      if (user?.statusCode == 401) {
        return router.push("/login");
      }

      if (user?.statusCode == 201) {
        setUser(user?.data);
      }
    }

    getUserData();
  }, []);

  if (!user) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-zinc-800">Loading..</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F7] w-full min-h-screen flex relative">
      <Sidebar />
      <ContentArea user={user} />
      <TaskModal />
    </div>
  );
}
