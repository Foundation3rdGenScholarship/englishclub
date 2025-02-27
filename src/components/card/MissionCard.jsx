import React from "react";
import GlassCard from "./GlassCard";
import missionIcon from "../../../public/img/iconSVG/hello.svg";
import { useTranslation } from "react-i18next";

export default function MissionCard() {
  const { t } = useTranslation("about");
  return (
    <div className="flex justify-center">
      <GlassCard className="w-[1100px] h-[380px]">
        <div className="flex justify-center p-3">
          <img className="float-left w-[450px]" src={missionIcon} alt="" />
          <div className="text-center p-2">
            <div className="p-2 text-heading-3 font-bold text-accents-color">
              {t("ourmission")}
            </div>
            <div className="text-lg text-[#666666]">
              {t("mission-description")}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
