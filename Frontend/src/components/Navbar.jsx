import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <header className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all bg-light">
        <nav className="flex items-center justify-between w-full">
          <div>
            <Link to="/">
              <img src={assets.logo} alt="logo" />
            </Link>
          </div>

          {/* for laptop and tablet */}

          <ul className=" hidden md:flex items-center justify-between xl:gap-7 md:gap-5  text-[16px]">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/cars">Cars</NavLink>
            </li>
            <li>
              <NavLink to="/mybookings">My Bookings</NavLink>
            </li>
            <li className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
              <input
                type="text"
                placeholder="Search cars"
                className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              />
              <img src={assets.search_icon} alt="search" />
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                <button
                  type="button"
                  className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
                >
                  SignUp
                </button>
              </NavLink>
            </li>
          </ul>

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden flex cursor-pointer"
          >
            <img src={assets.menu_icon} alt="menu_icon" />
          </button>

          {/* for mobiles */}

          <ul
            ref={menuRef}
            className={`bg-white md:hidden absolute top-0 right-0 h-screen w-[60vw] flex flex-col  xl:gap-7 md:gap-5 gap-3  text-[16px] p-5 transition-all duration-300 ease-in-out ${
              open
                ? "translate-x-0 opacity-100 pointer-events-auto "
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/cars">Cars</NavLink>
            </li>
            <li>
              <NavLink to="/mybookings">My Bookings</NavLink>
            </li>
            <li className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56">
              <input
                type="text"
                placeholder="Search cars"
                className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              />
              <img src={assets.search_icon} alt="search" />
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                <button
                  type="button"
                  className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
                >
                  SignUp
                </button>
              </NavLink>
            </li>

            <button
              onClick={() => setOpen((prev) => !prev)}
              className="h-5 absolute top-5 right-8"
            >
              <img src={assets.close_icon} alt="close_icon" />
            </button>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
