import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function NavbarOwner() {
  const { user } = useContext(AuthContext);

  const username = user?.username
    ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
    : "User";

  return (
    <header className="flex justify-between sm:px-12 px-10 h-15 items-center border-b border-gray-400/90">
      <Link to="/">
        <img src={assets.logo} alt="logo" />
      </Link>

      <div className="text-gray-500/90">Welcome, {username}</div>
    </header>
  );
}

export default NavbarOwner;
