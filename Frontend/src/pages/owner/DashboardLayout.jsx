import React from "react";
import { Outlet } from "react-router-dom";
import NavbarOwner from "../../components/owner/NavbarOwner";
import SideBarOwner from "../../components/owner/SideBarOwner";

function DashboardLayout() {
  return (
    <>
      <div className="flex flex-col w-full">
        <NavbarOwner />
        <div className="flex w-full">
          <aside className="h-screen">
            <SideBarOwner />
          </aside>
          <main className="sm:px-4 px-2 sm:pt-10 pt-5 lg:px-10   min-w-0 border-l border-gray-400/90">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
