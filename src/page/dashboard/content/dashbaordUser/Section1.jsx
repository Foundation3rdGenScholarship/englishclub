import React from "react";
import { useTranslation } from "react-i18next";
import img from "../../../../../public/img/dashboard/girls.jpg";
import CourseThumbnail from "../../../../components/heroCard/CourseThumbnail";

export default function Section1() {
  const { t } = useTranslation("dashboard-overview");
  return (
    <>
      {/* first section */}
      <div className="relative flex justify-center ">
        <div className="flex justify-center w-full">
          <img
            src={img}
            alt="img-dashboard"
            className="rounded-lg  max-h-screen"
          />
          <div className="absolute bottom-0 flex justify-center bg-bg-light-mode dark:bg-bg-dark-mode rounded-tl-lg  rounded-tr-lg">
            <h2 className=" text-primary-500 font-bold  xl:text-heading-1 lg:text-heading-2  md:text-heading-4 sm:text-heading-5  text-heading-6 whitespace-nowrap xl:py-10 lg:py-8 md:py-6 sm:py-4 py-2 text-center xl:px-20 lg:px-12 md:px-10 sm:px-6 px-6">
              {t("learnOnline")}
              <span className="text-accents-color">{t("fluentflow")}</span>
            </h2>
          </div>
        </div>
      </div>

      {/* New */}

      <div className="relative overflow-hidden rounded-xl shadow-lg group">
        {/* Image container with hover effect */}
        <div className="w-full h-full overflow-hidden">
          <img
            src={img}
            alt="course-thumbnail"
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
        </div>

        {/* Course title container */}
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-sm bg-white/10 p-4 border-t border-white/20">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-bold lg:text-2xl md:text-xl sm:text-lg text-base">
              {t("learnOnline")}{" "}
              <span className="text-accents-color font-extrabold">
                {t("fluentflow")}
              </span>
            </h2>

            {/* Optional badge or level indicator */}
            <div className="bg-accents-color text-white px-3 py-1 rounded-full text-sm font-medium">
              {t("featured")}
            </div>
          </div>
        </div>

        {/* Hover state info overlay - optional */}
        <div className="absolute inset-0 bg-primary-500/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="text-center p-6">
            <span className="text-white font-bold text-xl mb-2 block">
              {t("startLearning")}
            </span>
            <button className="bg-white text-primary-500 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              {t("viewCourse")}
            </button>
          </div>
        </div>
      </div>

      {/* From Deepseek */}

      <div className="relative overflow-hidden rounded-xl shadow-2xl group transform transition-transform duration-300 hover:scale-102">
        {/* Image container with hover effect */}
        <div className="w-full h-full overflow-hidden">
          <img
            src={img}
            alt="course-thumbnail"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90"></div>
        </div>

        {/* Course title container */}
        <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md bg-white/5 p-6 border-t border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-bold lg:text-2xl md:text-xl sm:text-lg text-base">
              {t("learnOnline")}{" "}
              <span className="text-accents-color font-extrabold">
                {t("fluentflow")}
              </span>
            </h2>

            {/* Optional badge or level indicator */}
            <div className="bg-accents-color text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              {t("featured")}
            </div>
          </div>
        </div>

        {/* Hover state info overlay */}
        <div className="absolute inset-0 bg-primary-500/90 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="text-center p-6">
            <span className="text-white font-bold text-2xl mb-4 block">
              {t("startLearning")}
            </span>
            <button className="bg-white text-primary-500 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg">
              {t("viewCourse")}
            </button>
          </div>
        </div>
      </div>
      <CourseThumbnail img={img} />
    </>
  );
}
