import React, { useEffect, useRef, useState } from "react";

function SignUp({ onClose }) {
  const [loginPage, setLoginPage] = useState(false);
  const loginSignUpPage = useRef(null);
  useEffect(() => {
    const handlePageClose = (event) => {
      if (
        loginSignUpPage.current &&
        !loginSignUpPage.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handlePageClose);

    return () => {
      document.removeEventListener("mousedown", handlePageClose);
    };
  }, [onClose]);

  return (
    <section className="fixed inset-0 z-999 flex items-center justify-center bg-black/40">
      <div
        ref={loginSignUpPage}
        onMouseDown={(e) => e.stopPropagation()}
        className="bg-white  flex items-center justify-center flex-col rounded-lg px-8 py-12 gap-5 w-90"
      >
        <div className="md:text-xl text-lg font-semibold flex justify-center gap-1 text-gray-700  w-full">
          <p className="text-primary">User</p> Sign Up
        </div>
        <form className="flex flex-col gap-3 text-gray-700/90 w-full">
          {loginPage ? (
            ""
          ) : (
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="type here"
                className="placeholder:text-gray-500/90 outline-none border border-gray-400/90 rounded p-2"
              />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              name=""
              id="Email"
              placeholder="type here"
              className="placeholder:text-gray-500/90 outline-none border border-gray-400/90 rounded p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name=""
              id="Password"
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
        </form>
      </div>
    </section>
  );
}

export default SignUp;
