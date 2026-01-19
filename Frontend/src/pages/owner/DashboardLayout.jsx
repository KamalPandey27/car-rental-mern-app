import React from "react";
import { Outlet } from "react-router-dom";
import NavbarOwner from "../../components/owner/NavbarOwner";
import SideBarOwner from "../../components/owner/SideBarOwner";
function DashboardLayout() {
  return (
    <>
      <div className="flex flex-col">
        <NavbarOwner />
        <div className="flex">
          <SideBarOwner />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;
