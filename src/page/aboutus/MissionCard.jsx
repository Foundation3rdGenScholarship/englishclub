import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import hello from "../../../public/svg/skill/video.svg";
export default function MissionCard() {
  const { t } = useTranslation("about");

  return (
    <section class="py-1 sm:py-14 px-10">
      <div class="mx-auto">
        <div class="grid items-center grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-20">
          <div class="relative pl-20 pr-6 sm:pl-6 md:px-0">
            <div class="relative w-full max-w-4xl mt-4 mb-10 ml-auto">
              <img class="ml-auto" src={hello} alt="" />
            </div>
          </div>
          <p class="mt-4 text-des-2 leading-relaxed text-text-des-light-mode dark:text-text-des-dark-mode">
            {t("mission-description")}
          </p>
        </div>
      </div>
    </section>
  );
}
