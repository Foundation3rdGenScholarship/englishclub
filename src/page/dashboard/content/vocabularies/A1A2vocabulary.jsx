import React from "react";
import { useTranslation } from "react-i18next";

const A1A2vocabulary = () => {
  const { t } = useTranslation("dashboard");
  return (
    <div className="p-4 sm:ml-64  mt-[88px] h-[3000px]">
      <h1 className="dark:text-white text-black">
        This Content of A1 A2 vocabulary
      </h1>
    </div>
  );
};

export default A1A2vocabulary;
