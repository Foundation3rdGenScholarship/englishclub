import { Outlet } from "react-router";
import Sidebar from "./page/dashboard/Sidebar";
import NavbarDashboard from "./components/header/NavbarDashboard";
import { useDispatch } from "react-redux";
import { closeSidebar } from "./redux/features/user/visibilitySlice";
import React from "react";
import { useNetworkState } from "react-use";
import NetworkStatus from "./utils/NetworkStatus";
import SEO from "./components/SEO/SEO";

function App() {
  const dispatch = useDispatch();
  const { online } = useNetworkState();
  if (!online) {
    return <NetworkStatus />;
  }
  return (
    <>
     <SEO/>
      <NavbarDashboard />
      <Sidebar />
      <div onClick={() => dispatch(closeSidebar())}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
