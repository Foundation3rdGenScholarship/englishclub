import React from "react";
import Navbar from "../header/Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

// createa a header on this page
const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
