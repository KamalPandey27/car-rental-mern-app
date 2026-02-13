import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Footer } from "./components";
import ScrollToTop from "./ScrollToTop";
import PopUpMessage from "./components/PopUpMessage";
function Layout() {
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <>
      <ScrollToTop />
      <PopUpMessage />
      {!isOwnerPath && <Navbar />}
      <Outlet />
      {!isOwnerPath && <Footer />}
    </>
  );
}

export default Layout;
