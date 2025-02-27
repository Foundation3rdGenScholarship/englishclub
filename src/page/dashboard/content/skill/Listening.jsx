import React from "react";
import { useTranslation } from "react-i18next";
import CourseCard from "../../../../components/card/CourseCard";

const Listening = () => {
  const { t } = useTranslation("dashboard");
  return (
    <div className="p-4 sm:ml-64  mt-[88px] h-[3000px]">
      <h1 className="dark:text-white text-black">This Content of Listening</h1>
      <div className="grid">
        <CourseCard />
      </div>
    </div>
  );
};

export default Listening;
