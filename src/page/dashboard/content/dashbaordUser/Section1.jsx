import React from "react";
import { useTranslation } from "react-i18next";
import img from "../../../../../public/svg/slideshowimg.svg";

export default function Section1() {
  const { t } = useTranslation("dashboard-overview");
  return (
    <>
      {/* first section */}
      <div className="relative flex justify-center">
        <div className="flex justify-center w-full">
          <img src={img} alt="img-dashboard" />
          <div className="absolute bottom-0 flex justify-center bg-white opacity-80 rounded-tl-[20px] rounded-tr-[20px]">
            <h1 className=" text-primary-500 font-bold  lg:text-heading-2 whitespace-nowrap md:text-heading-5 text-heading-6 flex justify-center lg:py-10 md:py-7 sm:py-4 py-2 text-center lg:px-14 md:px-8 px-4">
              {t("learnOnline")}{" "}
              <span className="text-accents-color">{t("fluentflow")}</span>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
