import React from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
function Navbar() {
  return (
    <>
      <header className="w-screen">
        <nav>
          <div>
            <Link to="/">
              <img src={assets.logo} alt="logo" />
            </Link>
          </div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/cars">Cars</NavLink>
            </li>
            <li>
              <NavLink to="/mybookings">My Bookings</NavLink>
            </li>
            <li>
              <input type="text" placeholder="Search cars" />
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/signup">
                <button type="button">SignUp</button>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
