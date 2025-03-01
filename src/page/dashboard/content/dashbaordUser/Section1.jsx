import React from "react";
import { useTranslation } from "react-i18next";
import img from "../../../../../public/svg/slideshowimg.svg";

export default function Section1() {
  const { t } = useTranslation("dashboard-overview");
  return (
    <>
      {/* first section */}
      <div className="relative flex justify-center">
        <div>
          <img src={img} alt="img-dashboard" />
        </div>
        <div className="absolute bottom-0 bg-white opacity-80 rounded-tl-[20px] rounded-tr-[20px]">
          <h1 className=" text-primary-500 font-bold  lg:text-heading-1 md:text-heading-3 text-heading-6 flex justify-center lg:py-14 sm:py-7 py-4 text-center lg:px-40 md:px-60 px-56">
            {t("learnOnline")}{" "}
            <span className="text-accents-color">{t("fluentflow")}</span>
          </h1>
        </div>
      </div>
    </>
  );
}
