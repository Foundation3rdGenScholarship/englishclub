import React from "react";
import vector1 from "../../../public/img/vextor/Vector19.svg";
import vector2 from "../../../public/img/vextor/Vector20.svg";

export default function AboutUsShape({children , className=""}) {
  return (
    <div className="max-w-screen-xl" {...className}>
      <div>
        <img src={vector2} alt="shape"
          className="absolute top-16 -right-20 -z-10 hidden md:block w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[550px] sm:h-[300px] md:h-[550px] lg:h-[600px] xl:h-[700px] "
          />
      </div>
      <div>
        <img
          src={vector1}
          alt="shape"
          className="absolute top-32 left-0 -z-10 hidden md:block w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[755px] "
        />
      </div>
      {children}
    </div>
  );
}
