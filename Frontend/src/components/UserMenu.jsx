import React from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
function UserMenu({ showUserMenu, setshowUserMenu }) {
  const { setUser } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true },
      );
      alert("user logout");
      setUser(null);
      setshowUserMenu();
    } catch (error) {
      console.log("logout failed", error);
    }
  };

  return (
    <div
      className={`absolute right-0 top-0 w-70 bg-light border border-gray-200 rounded-lg shadow-lg
      transform transition-all duration-300 ease-in-out
      ${
        showUserMenu
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      {/* Profile + Close */}
      <div className="flex justify-center py-3 border-b border-gray-200 relative">
        <img
          src={assets.user_profile}
          alt="User Profile"
          className="w-12 h-12 rounded-full object-cover"
        />

        <img
          onClick={() => setshowUserMenu(false)}
          src={assets.close_icon}
          alt="close_icon"
          className="absolute right-4 top-4 cursor-pointer w-4 h-4"
        />
      </div>

      <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
        Forgot Password
      </button>

      <button
        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default UserMenu;
