import React from "react";
import { useTranslation } from "react-i18next";
import Leaphea from "../../../public/img/image/Leaphea.png";
import GlassCard from "../../components/card/GlassCard";
import { Button } from "flowbite-react";
import ButtonHero from "../../components/button/ButtonHero";

const Hero = () => {
  const { t } = useTranslation("homepage");
  return (
    <div className="pt-14">
      <GlassCard className="h-[700px] sm:h-full md:h-[500px] flex items-center rounded-[3rem_0px]">
        <div className="flex flex-col md:flex-row justify-center items-center py-8  m-auto h-full w-full">

          {/* Left Content */}
          <div className="p-6 w-full md:w-[50%] flex flex-col items-center md:text-left order-2 md:order-1 sm:h-full sm:flex sm:justify-center">
            <h2 className="text-[#111828] dark:text-white text-heading-5 sm:text-heading-4 md:text-heading-4 lg:text-heading-3 font-bold mb-1 sm:leading-tight md:leading-normal">
              {t("practice-your")}
              <span className="block text-heading-5 sm:text-heading-4 md:text-heading-4 lg:text-heading-3   font-bold mb-1 sm:leading-tight md:leading-normal">
                {t("practice-des")}
              </span>
            </h2>
            <p className="text-gray-500 dark:text-white text-[14px] sm:text-[15px] md:text-[16px] lg:text-des-3 leading-snug sm:leading-normal">
              {t("hero-des")}
            </p>

            {/* button */}
            <div className="w-full flex justify-center md:justify-start mt-4 sm:pr-0">
              <a href="#ask-question" className="w-full sm:w-auto">
                <ButtonHero
                  label={t("hero-btn")}
                  className="w-full sm:w-auto sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 
                  text-[12px] sm:text-[13px] md:text-[16px] text-white font-medium 
                  bg-secondary-500/80 backdrop-blur-md border border-white/20 
                  hover:bg-secondary-700 hover:backdrop-blur-lg 
                  focus:ring-4 focus:outline-none focus:ring-secondary-200 
                  rounded-lg text-center transition-all duration-300"
                >
                  {t("hero-btn")}
                </ButtonHero>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full flex justify-center md:justify-end md:w-1/2 order-1 sm:h-full sm:flex sm:items-center ">
            <img src={Leaphea} className="w-5/6 md:w-[85%]" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default Hero;
