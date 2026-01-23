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
          <main className="px-4 pt-10 md:px-10  min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
