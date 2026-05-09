import React from "react";
import { Outlet } from "react-router-dom";
import MemberNavbar from "../Components/Member/Layout/MemberNavbar";
import MemberSidebar from "../Components/Member/Layout/MemberSidebar";
import { useTheme } from "../Context/DarkModeProvider";

const MemberLayout = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex min-h-screen ${isDarkMode ? "bg-slate-900" : "bg-slate-50"}`}
    >
      <MemberSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <MemberNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MemberLayout;
