import React from "react";
import GlassCard from "../../components/card/GlassCard";
import missionIcon from "../../../public/img/iconSVG/hello.svg";
import { useTranslation } from "react-i18next";

export default function MissionCard() {
  const { t } = useTranslation("about");

  return (
    <div className="flex justify-center p-4">
      <GlassCard className="w-full max-w-[1100px] p-5 md:h-[380px]">
        <div className="flex flex-col md:flex-row items-center justify-center p-3 gap-6">
          {/* Image */}
          <img
            className="hidden md:block w-full max-w-[350px] md:max-w-[450px] md:ml-auto"
            src={missionIcon}
            loading="lazy"
            alt="Mission"
          />

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-accents-color">
              {t("ourmission")}
            </h2>
            <p className="text-base md:text-lg text-[#666666] dark:text-white mt-3">
              {t("mission-description")}
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
