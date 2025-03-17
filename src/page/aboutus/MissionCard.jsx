import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import hello from "../../../public/img/iconSVG/hello.svg";
export default function MissionCard() {
  const { t } = useTranslation("about");

  return (
    <div className="flex justify-center p-4">
      <GlassCard className="max-w-screen-xl p-5">
        <div className="flex flex-wrap items-center justify-center p-4 gap-6">
          {/* Image (Hidden on small screens) */}
          <img
            className="hidden sm:hidden md:block w-full max-w-[350px] md:max-w-[400px] lg:max-w-[450px]"
            src={hello}
            loading="lazy"
            alt="Mission"
          />

          {/* Text Content */}
          <div className="text-center md:text-left flex-1">
            <h2 className="font-bold xl:text-heading-4 md:text-heading-4 text-heading-5 text-accents-color">
              {t("ourmission")}
            </h2>
            <p className="dark:text-white text-gray-500 text-des-4 md:text-des-4 lg:text-des-2 xl:text-des-2 mt-3">
              {t("mission-description")}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
