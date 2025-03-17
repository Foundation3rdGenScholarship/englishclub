import React, { use } from "react";
import { useEffect } from "react";
import GlassCard from "../../components/card/GlassCard";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import MentorCard from "./MentorCard";
import Bubbles from "../../components/card/Bubble";
import MissionCard from "./MissionCard";
import VissionCard from "./VissionCard";
import AboutUsShape from "./AboutUsShape";
import MemberCard from "./MemberCard";
import WorkTogether from "../../../public/img/vextor/undraw_working-together_r43a.svg";
import OurTeamSection from "./OurTeamSection";
const AboutUsMain = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: "ease-in-out", // Easing function
      once: false, // Whether animation should happen only once
    });
  }, []);
  const { t } = useTranslation("about");
  return (
    <main className="mx-auto overflow-hidden">
      <div className="px-4 md:px-8 xl:px-16 py-10 xl:mb-20 lg:mb-20 md:mb-20 sm:mb-16 mb-12">
        <AboutUsShape className="flex justify-center relative z-10">
          <GlassCard className="flex max-w-screen-xl relative xl:top-12 lg:top-12 md:top-12 sm:top-8 top-4 z-20 mx-auto p-5 sm:border-stone-200 md:border-stone-200 xl:border-white">
            <div className="sm:flex items-center">
              <div className="sm:w-1/2 p-10">
                <div className="image object-center text-center">
                  <img src={WorkTogether} />
                </div>
              </div>
              <div className="sm:w-1/2 p-5 dark:text-white text-black">
                <div className="text">
                  {/* <span className="dark:text-white text-black border-b-2 border-accents-color uppercase">
                    {t("aboutUs")}
                  </span> */}
                  <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
                    {t("title")}{" "}
                    <span className="text-accents-color">
                      {t("fluentflow")}
                    </span>
                  </h2>
                  <p className="text-accents-color xl:text-heading-4 lg:text-heading-5 md:text-heading-6 text-[14px]">
                    {t("fluentflow")}
                    <span className="dark:text-white text-gray-500 xl:text-heading-4 lg:text-heading-5 md:text-heading-6 text-[14px]">
                      {t("description")}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </AboutUsShape>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <div className="xl:mb-20 lg:mb-20 md:mb-20 sm:mb-16 mb-12">
          <div>
            <p className="text-center text-primary-950 dark:text-primary-100 font-bold text-heading-3">
              {t("mentor")}
            </p>
          </div>
          <div>
            <MentorCard></MentorCard>
          </div>
        </div>
        <div className="xl:mb-20 lg:mb-20 md:mb-20 sm:mb-16 mb-12">
          <div className="relative z-10 flex flex-col gap-8 justify-center items-center ">
            <div>
              {/* data-aos="fade-up" data-aos-anchor-placement="top-bottom" */}
              <MissionCard />
            </div>
            <div>
              <VissionCard />
            </div>
          </div>
        </div>
        <div className="xl:mb-20 lg:mb-20 md:mb-20 sm:mb-16 mb-12">
          <p className="text-center text-primary-950 dark:text-primary-100  font-bold text-heading-3">
            {t("teammember")}
          </p>
        </div>
        <div className="xl:mb-20 lg:mb-20 md:mb-20 sm:mb-16 mb-12">
          <MemberCard />
        </div>
      </div>
    </main>
  );
};
export default AboutUsMain;
