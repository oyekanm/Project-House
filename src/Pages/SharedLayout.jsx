import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Scroll from "../components/Scroll";

function SharedLayout({ scroll }) {
  return (
    <>
      <Navbar />
      <Outlet />
      <Scroll scroll={scroll} />
      <Footer />
    </>
  );
}

export default SharedLayout;
