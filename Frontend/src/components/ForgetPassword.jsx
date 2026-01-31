import React, { useState } from "react";
import { assets } from "../assets/assets";
import api from "../api/axios";
import Loader from "../components/Loader";
function ForgetPassword({ setForgetPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [responseAPI, setResponseAPI] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      setLoading(false);
      return;
    }
    try {
      const response = await api.post("/api/v1/user/forgetPassword", { email });

      if (response.data.success) {
        setResetPassword(true);
        setResponseAPI(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setResponseAPI(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const resetHandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !OTP || !newPassword) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/api/v1/user/resetPassword", {
        email,
        otp: OTP,
        newPassword,
      });

      if (response.data.success) {
        alert("Password reset successful");
        setForgetPassword(false);
      }
      
    } catch (error) {
      console.log(error);
      setResponseAPI(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <section
        className="fixed inset-0 z-999 flex items-center  justify-center bg-black/40"
        onClick={() => setForgetPassword(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white  flex items-center justify-center flex-col rounded-lg px-8 py-12 gap-5 w-90"
        >
          <div className="md:text-xl text-lg font-semibold flex justify-center gap-1 text-gray-700  w-full">
            <p className="text-primary">Forget Password</p>
          </div>
          <form
            className="flex flex-col gap-3 text-gray-700/90 w-full"
            onSubmit={resetPassword ? resetHandleSubmit : handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                value={email}
                disabled={resetPassword}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="type here"
                className="placeholder:text-gray-500/90 outline-none border border-gray-400/90 rounded p-2"
              />
            </div>

            {resetPassword && (
              <div className="flex flex-col gap-1">
                <label htmlFor="OTP">OTP</label>
                <input
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  placeholder="type here"
                  className="placeholder:text-gray-500/90 outline-none border border-gray-400/90 rounded p-2"
                />
              </div>
            )}

            {resetPassword && (
              <div className="flex flex-col gap-1 ">
                <label htmlFor="password">New Password</label>
                <div className="border border-gray-400/90 flex justify-between  rounded">
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="type here"
                    className="placeholder:text-gray-500/90 outline-none p-2  "
                  />
                  <img
                    src={showPassword ? assets.eye_close_icon : assets.eye_icon}
                    alt="eye_icon"
                    className="w-10 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </div>
              </div>
            )}

            <div className="w-full">
              {resetPassword ? (
                <button
                  type="submit"
                  className="text-white bg-primary px-3 py-2 rounded w-full hover:bg-blue-800 transition-all duration-300 ease-in-out"
                >
                  Reset Password
                </button>
              ) : (
                <button
                  type="submit"
                  className="text-white bg-primary px-3 py-2 rounded w-full hover:bg-blue-800 transition-all duration-300 ease-in-out"
                >
                  Forget Password
                </button>
              )}
            </div>
            <div className="text-center text-red-600 mt-2">{responseAPI}</div>
          </form>
        </div>
      </section>
    </>
  );
}

export default ForgetPassword;
