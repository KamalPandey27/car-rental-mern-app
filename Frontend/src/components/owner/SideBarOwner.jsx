import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { ownerMenuLinks } from "../../assets/assets";
function SideBarOwner() {
  const [image, setImage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="md:w-60 w-12 border-r border-gray-400/90 py-8 h-full ">
        <div className="flex flex-col gap-2 justify-center items-center ">
          <label htmlFor="image" className="cursor-pointer relative group">
            <img
              src={image || assets.user_profile}
              alt="user_profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <input
              type="file"
              className="md:w-13 w-10 rounded-full "
              hidden
              accept="image/*"
              id="image"
              onChange={handleImageUpload}
            />
            <div className=" absolute top-0 z-10  w-10 h-10 md:w-12 md:h-12 rounded-full object-cover  bg-black/40 flex  opacity-0 group-hover:opacity-100 justify-center items-center transition-all duration-300 ease-in-out">
              <img
                src={assets.edit_icon}
                alt="edit_icon"
                className="w-5 opacity-100"
              />
            </div>
          </label>

          <span className="md:text-[16px] text-sm">Kamal</span>
        </div>
        <div className="py-8 ">
          {ownerMenuLinks.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={item.path}
                end={item.path === "/owner"}
                // If the link is /owner → be strict (use end)
                // If the link is anything else → don’t be strict
                className={({ isActive }) =>
                  ` relative flex gap-2 items-center md:px-4 px-3 py-3    text-primary
             ${isActive ? "bg-primary/10" : "bg-white"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? item.coloredIcon : item.icon}
                      alt="dashboardIcon"
                      className="w-5"
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
      </div>
    </>
  );
}

export default SideBarOwner;
