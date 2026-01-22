import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";

function SignUp({ onClose }) {
  const { setUser } = useContext(AuthContext);
  const [loginPage, setLoginPage] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = loginPage ? "/api/v1/user/login" : "/api/v1/user/signup";
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${url}`,
        formData,
        {
          withCredentials: true,
          // “Bhai cookies accept kar aur future requests mein bhejna”
        },
      );

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
      console.error(error.response?.data?.message || "Something went wrong");
      setUserDetails(error.response?.data?.message || "Something went wrong");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

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
              placeholder="type here"
              className="placeholder:text-gray-500/90 outline-none border border-gray-400/90 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              type="password"
              name="password"
              placeholder="type here"
              className="placeholder:text-gray-500/90 outline-none border border-gray-400/90 rounded p-2"
            />
          </div>
          <div>
            {loginPage ? "Create an account?" : "Already have account?"}
            <span
              className="text-primary cursor-pointer"
              onClick={() => setLoginPage((prev) => !prev)}
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
          {loginPage ? (
            <div className="text-center text-red-600 mt-2">{userDetails}</div>
          ) : (
            ""
          )}
        </form>
      </div>
    </section>
  );
}

export default SignUp;
