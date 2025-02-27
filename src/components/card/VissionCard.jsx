
import GlassCard from "./GlassCard";
import education from "../../../public/img/iconSVG/education.svg"
import { useTranslation } from "react-i18next";
import React from 'react'

export default function VissionCard() {
    const { t } = useTranslation("about");
    return (
      <div className="flex justify-center">
        <GlassCard className="w-[1100px] h-[380px]">
          <div className="flex justify-center p-3">
            <img className="float-left w-[450px]" src={education} alt="" />
            <div className="text-center p-2">
              <div className="p-2 text-heading-3 font-bold text-accents-color">
                {t("ourvision")}
              </div>
              <div className="text-lg text-[#666666]">
                {t("vision-description")}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    );
}

