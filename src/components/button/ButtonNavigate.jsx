import React from "react";
import { NavLink } from "react-router-dom"; // Ensure correct import

const ButtonNavigate = ({ text, link, onClick, addMoreStyle }) => {
  return (
    <NavLink
      to={link}
      onClick={onClick}
      className={`text-[14px] text-white bg-secondary-500 hover:bg-secondary-600 focus:ring-4 focus:outline-none focus:ring-secondary-200 font-medium rounded-lg px-4 py-2.5 md:px-3 md:py-2 md:text-[16px] lg:px-3.5 lg:py-2.5 lg:text-[19px] text-center z-30 ${
        addMoreStyle ? addMoreStyle : ""
      }`}
    >
      {text}
    </NavLink>
  );
};

export default ButtonNavigate;
