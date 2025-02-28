import React from "react";
import Sidebar from "./Sidebar";
import User from "./content/User";
import Listening from "./content/skill/Listening";
import Reading from "./content/skill/Reading";
import NavbarDashboard from "../../components/header/NavbarDashboard";
import { useSelector, useDispatch } from "react-redux";
import Writing from "./content/skill/Writing";
import Speaking from "./content/skill/Speaking";
import A1A2grammar from "./content/grammars/A1A2grammar";
import B1B2grammar from "./content/grammars/B1B2grammar";
import C1grammar from "./content/grammars/C1grammar";
import MoreDoc from "./content/grammars/MoreDoc";
import A1A2vocabulary from "./content/vocabularies/A1A2vocabulary";
import B1B2vocabulary from "./content/vocabularies/B1B2vocabulary";
import { toggle } from "../../redux/features/user/visibilitySlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { activeItem } = useSelector((state) => state.sidebar);
  const isVisible = useSelector((state) => state.visibility.isVisible);

  return (
    <div>
      {/* Start Navbar */}
      <NavbarDashboard />

      {/* Start sidebar */}
      <Sidebar />

      {/* Start Content */}

      <div onClick={() => dispatch(toggle())}>
        {activeItem === "dashboard" && <User />}
        {activeItem === "listening" && <Listening />}
        {activeItem === "reading" && <Reading />}
        {activeItem === "writing" && <Writing />}
        {activeItem === "speaking" && <Speaking />}
        {activeItem === "a1a2grammar" && <A1A2grammar />}
        {activeItem === "b1b2grammar" && <B1B2grammar />}
        {activeItem === "c1grammar" && <C1grammar />}
        {activeItem === "moredoc" && <MoreDoc />}
        {activeItem === "a1a2vocabulary" && <A1A2vocabulary />}
        {activeItem === "b1b2vocabulary" && <B1B2vocabulary />}
      </div>
    </div>
  );
};

export default Dashboard;
