import React from "react";
import { NavLink } from "react-router";

const ButtonNavigate = ({ text, link, onClick }) => {
  return (
    <NavLink
      to={link}
      onClick={onClick}
      className="text-[20px] text-white bg-secondary-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {text}
    </NavLink>
  );
};

export default ButtonNavigate;
