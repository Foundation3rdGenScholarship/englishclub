import React from "react";
const ButtonHero = ({ href = "#", label = "Button Name", className = "" }) => {
  return (
    <a href={href}>
      <button
        className={`text-heading-5 text-white m-3 bg-secondary-500 hover:bg-gradient-to-bl 
            focus:ring-4 focus:outline-none focus:ring-secondary-200 
            font-medium rounded-lg text-sm px-5 py-2 text-center ${className}`}
      >
        {label}
      </button>
    </a>
  );
};

export default ButtonHero;
