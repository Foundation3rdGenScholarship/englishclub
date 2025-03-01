import React from "react";
import circleRight from "../../../public/svg/circle-right.svg";
import circleCenter from "../../../public/svg/circle-right.svg";
import ellipse from "../../../public/svg/Ellipse.svg";

const CircleBackgroundLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-bg-dark-mode overflow-hidden">
      {/* Circle 1 (Top-left) */}
      <img
        src={ellipse}
        className="absolute top-[10%] left-[-2%] w-8 pointer-events-none -z-30"
      />

      {/* Circle 2 (Below Circle 1) */}
      <img
        src={ellipse}
        alt="Circle 2"
        className="absolute top-[20%] left-[0%] w-8 pointer-events-none -z-30"
      />

      {/* Circle 3 (Below Circle 2) */}
      <img
        src={ellipse}
        alt="Circle 3"
        className="absolute top-[30%] left-[2%] w-8 pointer-events-none -z-30"
      />

      {/* Circle 4 (Below Circle 3) */}
      <img
        src={ellipse}
        alt="Circle 4"
        className="absolute top-[40%] left-[4%] w-8 pointer-events-none -z-30"
      />

      {/* Circle 5 (Right side) */}
      <img
        src={ellipse}
        alt="Circle 5"
        className="absolute top-[50%] right-[5%] w-16 pointer-events-none -z-30"
      />

      {/* Main content above the circles */}
      <div className="relative z-10 p-6 bg-white/80 dark:bg-gray-800/60 backdrop-blur-md rounded shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default CircleBackgroundLayout;
