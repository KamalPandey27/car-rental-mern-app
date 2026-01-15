import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Footer } from "./components";
import ScrollToTop from "./ScrollToTop";
function Layout() {
  const isOwnerPath = useLocation().pathname.startsWith("/owner");
  return (
    <>
      <ScrollToTop />
      {!isOwnerPath && <Navbar />}
      <Outlet />
      {!isOwnerPath && <Footer />}
    </>
  );
}

export default Layout;
