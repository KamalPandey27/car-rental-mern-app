import React from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { ownerMenuLinks } from "../../assets/assets";
function SideBarOwner() {
  return (
    <>
      <aside className=" md:w-60 border-r border-gray-400/90 py-8 h-screen">
        <div className="flex flex-col gap-2 justify-center items-center">
          <input
            type="image"
            src={assets.user_profile}
            alt="profile"
            className="md:w-13 w-10 rounded-full"
          />
          <span className="md:text-[16px] text-sm">Kamal</span>
        </div>
        <div className="py-8 ">
          {ownerMenuLinks.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.path}
                end={item.path === "/owner"}
                className={({ isActive }) =>
                  ` relative flex gap-2 items-center px-4 py-3   text-primary
             ${isActive ? "bg-primary/10" : "bg-white"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? item.coloredIcon : item.icon}
                      alt="dashboardIcon"
                    />
                    <span className="text-sm md:flex hidden"> {item.name}</span>
                    {isActive && (
                      <div className="h-8 rounded-l w-1.5 bg-primary-dull absolute right-0"></div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
}

export default SideBarOwner;
