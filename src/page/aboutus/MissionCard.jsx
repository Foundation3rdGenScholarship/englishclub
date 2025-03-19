import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import hello from "../../../public/svg/skill/video.svg";
import Bubbles from "../../components/card/Bubble";
export default function MissionCard() {
  const { t } = useTranslation("about");

  return (
    <section class="py-1 sm:py-14 px-10" data-aos="zoom-out-left">
      
      <div class="mx-auto">
        <div class="flex flex-col-reverse md:flex-row items-center gap-6">
          {/* Image Section */}
          <div class="relative pr-6 sm:pl-6 md:px-0 w-full md:w-1/2 flex justify-center">
            <img
              class="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain"
              src={hello}
              alt="mission"
            />
          </div>

          {/* Text Section */}
          <div class="w-full md:w-1/2 text-des-1 text-secondary-500">
            <h1 class="text-2xl font-bold">{t("ourmission")}</h1>
            <p class="mt-4 text-des-2 leading-relaxed text-text-des-light-mode dark:text-text-des-dark-mode">
              {t("mission-description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
