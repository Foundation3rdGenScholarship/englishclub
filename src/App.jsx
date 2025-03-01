import { Outlet } from "react-router";
import Sidebar from "./page/dashboard/Sidebar";
import NavbarDashboard from "./components/header/NavbarDashboard";

function App() {
  return (
    <div>
      <NavbarDashboard />
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
