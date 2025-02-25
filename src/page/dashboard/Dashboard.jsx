import React from "react";
import Sidebar from "./Sidebar";
import User from "./content/User";
import NavbarDashboard from "../../components/header/NavbarDashboard";

const Dashboard = () => {
  return (
    <div>
      <NavbarDashboard />
      {/* Start sidebar */}
      <Sidebar />
      {/* End sidebar */}

      {/* Start Content */}
      <User />
    </div>
  );
};

export default Dashboard;
