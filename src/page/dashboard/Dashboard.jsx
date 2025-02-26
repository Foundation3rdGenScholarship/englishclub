import React from "react";
import Sidebar from "./Sidebar";
import User from "./content/User";
import NavbarDashboard from "../../components/header/NavbarDashboard";

const Dashboard = () => {
  return (
    <div>
      {/* Start Navbar */}
      <NavbarDashboard />

      {/* Start sidebar */}
      <Sidebar />

      {/* Start Content */}
      <User />
    </div>
  );
};

export default Dashboard;
