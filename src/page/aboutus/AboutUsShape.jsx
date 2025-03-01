import React from "react";
import vector1 from "../../../public/img/vextor/Vector19.svg";
import vector2 from "../../../public/img/vextor/Vector20.svg";

export default function AboutUsShape({children}) {
  return (
    <div>
      <div>
        <img
          src={vector2}
          alt=""
          className="absolute mt-[54px] w-[445px] h-[762px]  right-0 overflow-hidden -z-10"
        />
      </div>
      <div>
        <img
          src={vector1}
          alt=""
          className="absolute mt-[147px] w-[755px] h-[581px] left-0 overflow-hidden -z-10"
        />
      </div>
      {children}
    </div>
  );
}
