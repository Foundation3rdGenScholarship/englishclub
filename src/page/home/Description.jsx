import React from "react";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";

const Description = () => {
  const { t } = useTranslation("homepage");
  return (
    <>
      {/* count number */}
      <div className="flex items-center justify-center">
        <div className="bg-[#fdfefe] dark:bg-transparent rounded-lg shadow-md p-6 grid grid-cols-2 md:flex md:justify-around w-full gap-4 md:gap-0">
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500">
              {" "}
              <CountUp end={23} duration={10} />
            </p>
            <p className="text-lg text-black dark:text-[#fdfefe]">
              {t("ca-student")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500"><CountUp end={219} duration={10} /></p>
            <p className="text-lg text-black dark:text-[#fdfefe]">
              {t("ca-lesson")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500"><CountUp end={56} duration={10} /></p>
            <p className="text-lg text-black dark:text-[#fdfefe]">
              {t("ca-exercise")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-heading-3 font-bold text-secondary-500"><CountUp end={40} duration={10} /></p>
            <p className="text-lg text-black dark:text-[#fdfefe]">
              {t("ca-videos")}
            </p>
          </div>
        </div>
      </div>
      <br />
    </>
  );
};

export default Description;
