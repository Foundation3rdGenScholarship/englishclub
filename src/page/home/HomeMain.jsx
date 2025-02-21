import React from "react";
import Hero from "./Hero";
import shap from "../../../public/svg.home/1.svg";

const HomeMain = () => {
  return (
    <div>
      <div className="relative">
        <img
          src={shap}
          alt=""
          className="absolute mt-[-100px] w-[600px] right-0 z-[-1]"
        />
      </div>

      <Hero />
    </div>
  );
};

export default HomeMain;
