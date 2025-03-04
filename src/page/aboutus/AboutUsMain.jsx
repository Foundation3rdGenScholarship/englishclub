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

const AboutUsMain = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation should happen only once
    });
  }, []);
  const { t } = useTranslation("about");
  return (
    <main className="max-w-screen-xl mx-auto">
      <section className="px-4 md:px-8 xl:px-16 py-10">
        <div className="flex justify-center">
          <AboutUsShape className="w-full max-w-[1205px] flex justify-center">
            <GlassCard className="relative top-20 w-full max-w-[1000px]  md:max-w-[1100px] xl:max-w-[1205px] px-4 md:px-8 xl:px-12 py-6 md:py-8 xl:py-10">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-black dark:text-white mt-4">
                  {t("title")}
                </h2>
                <p className="text-base md:text-lg xl:text-xl p-4 text-gray-600 dark:text-white">
                  {t("description")}
                </p>
              </div>
            </GlassCard>
          </AboutUsShape>
        </div>
      </section>

      <div className="mt-40 md:mt-96">
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
          <div data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <MissionCard />
          </div>
          <div>
            <VissionCard />
          </div>
        </div>
      </Bubbles>
      <div className="my-12">
        <p className="text-center text-blue-700  font-bold text-heading-4">
          {t("teammember")}
        </p>
      </div>
      <div>
        <MemberCard />
      </div>
    </main>
  );
};
export default AboutUsMain;
