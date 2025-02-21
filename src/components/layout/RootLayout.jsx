import React from "react";
import Navbar from "../header/Navbar";
import { Outlet } from "react-router";

// createa a header on this page
const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
