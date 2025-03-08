import { Outlet } from "react-router";
import Sidebar from "./page/dashboard/Sidebar";
import NavbarDashboard from "./components/header/NavbarDashboard";
import { useDispatch } from "react-redux";
import { closeSidebar } from "./redux/features/user/visibilitySlice";

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <NavbarDashboard />
      <Sidebar />
      <div onClick={() => dispatch(closeSidebar())}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
