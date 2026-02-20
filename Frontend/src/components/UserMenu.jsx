import React, { useState } from "react";
import { assets } from "../assets/assets";
import ForgetPassword from "./ForgetPassword";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Loader from "../components/Loader";
import api from "../api/axios";
import { toast } from "react-toastify";
function UserMenu({ showUserMenu, setshowUserMenu }) {
  
  const { user, setUser, fetchUserBookings } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const [showForgetPassword, setForgetPassword] = useState(false);

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await api.post(`/v1/user/logout`);
      setUser(null);
      setshowUserMenu(false);
      toast.success("Logout successful!");
      localStorage.removeItem("isAuth");
      await fetchUserBookings();
    } catch (error) {
      console.log("logout failed", error);
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  if (loggingOut) {
    return <Loader />;
  }

  return (
    <>
      {showForgetPassword && (
        <ForgetPassword setForgetPassword={() => setForgetPassword(false)} />
      )}
      <div
        className={`absolute right-0 top-0 w-70 z-50 bg-light border border-gray-200 rounded-lg shadow-lg
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
            src={user?.avatar.url || assets.user_profile}
            alt="User Profile"
            className="w-12 h-12 rounded-full object-cover"
          />

          <img
            onClick={setshowUserMenu}
            src={assets.close_icon}
            alt="close_icon"
            className="absolute right-4 top-4 cursor-pointer w-4 h-4"
          />
        </div>
        <button
          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          onClick={() => setForgetPassword(true)}
        >
          Forgot Password
        </button>

        <button
          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default UserMenu;
