import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import vector1 from "../../../public/img/vextor/Vector19.svg";
import vector2 from "../../../public/img/vextor/Vector20.svg";
import MentorCard from "../../components/card/MentorCard";
import Bubbles from "../../components/card/Bubble";
import MissionCard from "../../components/card/MissionCard";
import VissionCard from "../../components/card/VissionCard";

const AboutUsMain = () => {
  const { t } = useTranslation("about");
  return (
    <>
      <section>
        <div>
          <img
            src={vector2}
            alt=""
            className="absolute mt-[54px] w-[445px] h-[762px]  right-0 overflow-hidden -z-10"
          />
        </div>
        <div>
          <img
            src={vector1}
            alt=""
            className="absolute mt-[147px] w-[755px] h-[581px] left-0 overflow-hidden -z-10"
          />
        </div>
        <div className="justify-items-center">
          <GlassCard className="relative top-[194px] w-[1205px] h-[429px]">
            <div className="text-center ">
              <div className="text-[32px] mt-11 font-bold">{t("title")}</div>
              <div className="text-[24px] p-4 text-gray-600">
                {t("description")}
              </div>
            </div>
          </GlassCard>
        </div>
      </section>
      <div className="mt-[500px]">
        <div>
          <p className="text-center text-blue-700  font-bold text-heading-4">
            {t("mentor")}
          </p>
        </div>
        <div>
          <MentorCard></MentorCard>
        </div>
      </div>
      <div className="mt-36">
        <div className="h-[900px] w-auto flex items-center justify-center">
          <Bubbles />
        </div>
        <div className="relative bottom-[900px] z-10 flex flex-col gap-14 justify-center items-center h-screen">
            <MissionCard/>
            <VissionCard/>
        </div>
      </div>
    </>
  );
};
export default AboutUsMain;
