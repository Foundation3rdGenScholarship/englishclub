import React from "react";

export default function AboutUsShape({ children, className = "" }) {
  return (
    <div className={`relative w-full mx-auto ${className}`}>
      {/* Left Shape */}
      <div className="absolute top-0 -left-48 -z-10 hidden md:block md:-left-52 lg:-left-64 xl:-left-80 2xl:-left-96">
        <img
          src="/img/vextor/leftshape.svg"
          alt="Left Shape"
          className="w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] 2xl:w-[800px]"
        />
      </div>

      {/* Right Shape */}
      <div className="absolute top-0 -right-48 -z-10 hidden md:block md:-right-52 lg:-right-64 xl:-right-80 2xl:-right-96">
        <img
          src="/img/iconSVG/Vector 20.svg"
          alt="Right Shape"
          className="w-[500px] md:w-[550px] lg:w-[650px] xl:w-[750px] 2xl:w-[750px]"
        />
      </div>

      {children}
    </div>
  );
}
