import React, { useContext, useState } from "react";
import { assets, ownerMenuLinks } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axios";
import Loader from "../../components/Loader";

function SideBarOwner() {
  const { user, setUser } = useContext(AuthContext);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await api.patch("/api/v1/user/AddUserAvatar", formData);

      if (response?.data?.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error("Avatar upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Safe username
  const username = user?.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : "User";

  // ✅ Safe avatar
  const avatarUrl = user?.avatar?.url || assets.user_placeholder || "";

  return (
    <>
      {uploading && <Loader />}

      <div className="md:w-60 w-12 py-8 h-full">
        {/* PROFILE */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <label htmlFor="image" className="cursor-pointer relative group">
            <img
              src={avatarUrl}
              alt="user_profile"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />

            <input
              type="file"
              hidden
              accept="image/*"
              id="image"
              onChange={handleImageUpload}
            />

            <div className="absolute top-0 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 flex opacity-0 group-hover:opacity-100 justify-center items-center transition-all">
              <img src={assets.edit_icon} alt="edit_icon" className="w-5" />
            </div>
          </label>

          <span className="md:text-[16px] text-sm">{username}</span>
        </div>

        {/* MENU */}
        <div className="py-8">
          {ownerMenuLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/owner"}
              className={({ isActive }) =>
                `relative flex gap-2 items-center md:px-4 px-3 py-3 text-primary
                 ${isActive ? "bg-primary/10" : "bg-white"}`
              }
            >
              {({ isActive }) => (
                <>
                  <img
                    src={isActive ? item.coloredIcon : item.icon}
                    alt="icon"
                    className="w-5"
                  />
                  <span className="text-sm md:flex hidden">{item.name}</span>

                  {isActive && (
                    <div className="h-8 rounded-l w-1.5 bg-primary-dull absolute right-0" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideBarOwner;
