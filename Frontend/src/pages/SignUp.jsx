import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import api from "../api/axios";
function SignUp({ onClose }) {
  const { setUser } = useContext(AuthContext);
  const [loginPage, setLoginPage] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [loginSignUploading, setloginSignUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    ``;
    e.preventDefault();
    try {
      setloginSignUploading(true);
      const url = loginPage ? "/api/v1/user/login" : "/api/v1/user/signup";
      const response = await api.post(`${url}`, formData);
      console.log(response);
      if (response.data.success === true) {
        setUser(response.data.data);
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        onClose();
      }
    } catch (error) {
      console.log(error.response);
      console.error(error.response?.data?.message || "Something went wrong");
      setUserDetails(error.response?.data?.message || "Something went wrong");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } finally {
      setloginSignUploading(false);
    }
  };
  if (loginSignUploading) {
    return <Loader />;
  }
  return (
    <section
      className="fixed inset-0 z-999 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white  flex items-center justify-center flex-col rounded-lg px-8 py-12 gap-5 w-90"
      >
        <div className="md:text-xl text-lg font-semibold flex justify-center gap-1 text-gray-700  w-full">
          <p className="text-primary">User</p> {loginPage ? "Login" : "Sign Up"}
        </div>
        <form
          className="flex flex-col gap-3 text-gray-700/90 w-full"
          onSubmit={handleSubmit}
        >
          {!loginPage && (
            <div className="flex flex-col gap-1">
              <label htmlFor="username">Name</label>
              <input
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                value={formData.username}
                type="text"
                name="username"
                required
                placeholder="type here"
                className="placeholder:text-gray-500/90 outline-none border border-gray-400/90 rounded p-2"
              />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              type="email"
              name="email"
              required
              placeholder="type here"
              className="placeholder:text-gray-500/90 outline-none border border-gray-400/90 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="password">Password</label>
            <div className="border border-gray-400/90 flex justify-between  rounded">
              {" "}
              <input
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
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
          <div>
            {loginPage ? "Create an account?" : "Already have account?"}
            <span
              className="text-primary cursor-pointer"
              onClick={() => {
                setLoginPage((prev) => !prev);
                setUserDetails("");
              }}
            >
              click here
            </span>
          </div>
          <div className="w-full">
            {loginPage ? (
              <button
                type="submit"
                className="text-white bg-primary px-3 py-2 rounded w-full hover:bg-blue-800 transition-all duration-300 ease-in-out"
              >
                Login
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-primary px-3 py-2 rounded w-full hover:bg-blue-800 transition-all duration-300 ease-in-out"
              >
                Create Account
              </button>
            )}
          </div>
          <div className="text-center text-red-600 mt-2">{userDetails}</div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
