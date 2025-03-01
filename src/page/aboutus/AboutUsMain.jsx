import React from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";

import MentorCard from "../../components/card/MentorCard";
import Bubbles from "../../components/card/Bubble";
import MissionCard from "../../components/card/MissionCard";
import VissionCard from "../../components/card/VissionCard";
import AboutUsShape from "./AboutUsShape";

const AboutUsMain = () => {
  const { t } = useTranslation("about");
  return (
    <>
      <section>
        <div>
          <AboutUsShape>
            <div className="justify-items-center">
              <GlassCard className="relative top-[194px] w-[1205px] h-[429px]">
                <div className="text-center ">
                  <div className="text-[32px] mt-11 font-bold">
                    {t("title")}
                  </div>
                  <div className="text-[24px] p-4 text-gray-600">
                    {t("description")}
                  </div>
                </div>
              </GlassCard>
            </div>
          </AboutUsShape>
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
      <Bubbles className="mt-36">
        <div className="relative z-10 flex flex-col gap-8 justify-center items-center h-screen">
          <MissionCard />
          <VissionCard />
        </div>
      </Bubbles>
    </>
  );
};
export default AboutUsMain;
