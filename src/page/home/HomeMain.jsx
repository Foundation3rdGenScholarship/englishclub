import React from "react";
import Hero from "./Hero";
import shap from "../../../public/svg/1.svg";
import ellipseHalf from "../../../public/svg/2.svg";

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
      <div className="relative">
        <img
          src={ellipseHalf}
          alt=""
          className="absolute mt-[170px] w-[200px] left-0 z-[-1]"
        />
      </div>

      <Hero />
    </div>
  );
};

export default HomeMain;
