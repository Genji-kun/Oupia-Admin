"use client"

import withAuth from "@/utils/withAuth";
import { UserOverView } from "./_components/user-overview";
import { useAppContext } from "@/contexts/app-context";

const DashboardPage = () => {
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return <></>
  }

  return (
    <div className="w-full h-full grid grid-cols-7">
      <div className="col-span-3 grid flex-1 gap-4 border rounded-lg p-4 pl-1 dark:bg-oupia-base h-full">
        <h1 className="font-semibold text-lg ml-5">Thống kê người dùng</h1>
        <UserOverView />
      </div>
    </div>
  );
}

export default (DashboardPage);