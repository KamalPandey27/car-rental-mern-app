import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { SignUp } from "../pages";
import { AuthContext } from "../context/AuthContext";
import UserMenu from "./UserMenu";
function Navbar() {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showUserMenu, setshowUserMenu] = useState(false);
  const navigate = useNavigate();
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

  const handleDashboard = () => {
    if (user) {
      navigate("/owner");
    } else {
      alert("please login to access dashboard");
    }
  };
  return (
    <>
      <header className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-borderColor fixed top-0 z-50 h-18.25 transition-all bg-light w-full">
        <nav className="flex items-center justify-between w-full">
          <div>
            <Link to="/">
              <img src={assets.logo} alt="logo" />
            </Link>
          </div>

          {/* for laptop and tablet */}

          <ul className=" hidden md:flex items-center justify-between xl:gap-7 md:gap-5  text-[16px]">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-black" : " text-gray-600"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cars"
                className={({ isActive }) =>
                  isActive ? "text-black" : " text-gray-600"
                }
              >
                Cars
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mybookings"
                className={({ isActive }) =>
                  isActive ? "text-black" : " text-gray-600"
                }
              >
                My Bookings
              </NavLink>
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
              <button
                onClick={handleDashboard}
                className={({ isActive }) =>
                  isActive ? "text-black" : " text-gray-600"
                }
              >
                Dashboard
              </button>
            </li>
            <li>
              <UserMenu
                showUserMenu={showUserMenu}
                setshowUserMenu={() => setshowUserMenu(false)}
              />
              <div>
                {user ? (
                  <button
                    onClick={() => setshowUserMenu(true)}
                    type="button"
                    className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
                  >
                    {String(user.username).toUpperCase()}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSignUp(true)}
                    type="button"
                    className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
                  >
                    SignUp
                  </button>
                )}

                {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
              </div>
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
            className={`bg-white md:hidden absolute top-0 right-0 h-screen w-screen flex flex-col  xl:gap-7 md:gap-5 gap-3  text-[16px] p-5 transition-all duration-300 ease-in-out ${
              open
                ? "translate-x-0 opacity-100 pointer-events-auto "
                : "translate-x-full opacity-0 pointer-events-none"
            }`}
          >
            <li>
              <NavLink to="/" onClick={() => setOpen((prev) => !prev)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/cars" onClick={() => setOpen((prev) => !prev)}>
                Cars
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mybookings"
                onClick={() => setOpen((prev) => !prev)}
              >
                My Bookings
              </NavLink>
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
              <button
                onClick={() => {
                  handleDashboard();
                  setOpen((prev) => !prev);
                }}
                className={({ isActive }) =>
                  isActive ? "text-black" : " text-gray-600"
                }
              >
                Dashboard
              </button>
            </li>
            <li>
              <UserMenu
                showUserMenu={showUserMenu}
                setshowUserMenu={() => setshowUserMenu(false)}
              />

              <div>
                {user ? (
                  <button
                    onClick={() => setshowUserMenu(true)}
                    type="button"
                    className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
                  >
                    {String(user.username).toUpperCase()}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowSignUp(true);
                    }}
                    type="button"
                    className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
                  >
                    SignUp
                  </button>
                )}

                {showSignUp && <SignUp onClose={() => setShowSignUp(false)} />}
              </div>
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
