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
import WorkTogether from "../../../public/svg/question.svg";
import OurTeamSection from "./OurTeamSection";
import HeroSection from "../../components/about/HeroSection";
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
      <HeroSection />
      <VissionCard />
      <MissionCard />
      <div className="px-4 md:px-8 xl:px-16 py-10 xl:mb-20 lg:mb-20 md:mb-20 sm:mb-16 mb-12">
        {/* <AboutUsShape className="flex justify-center relative z-10">
          <div className="relative z-20 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 xl:top-16 lg:top-14 md:top-12 sm:top-8 top-6">
            <div className="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20 dark:bg-black/10 dark:border-white/10">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-1/2 p-4 sm:p-8 lg:p-10">
                  <div className="transform transition-transform duration-300 hover:scale-105">
                    <img
                      src={WorkTogether}
                      alt={t("imageAlt") || "Collaboration illustration"}
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </div>
                </div>

                <div className="w-full sm:w-1/2 p-4 sm:p-8 lg:p-10">
                  <div className="space-y-4">
                    <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                      {t("title")}{" "}
                      <span className="text-accents-color">
                        {t("fluentflow")}
                      </span>
                    </h2>

                    <div className="mt-6 text-lg sm:text-xl leading-relaxed">
                      <span className="text-accents-color font-medium">
                        {t("fluentflow")}
                      </span>
                      <span className="dark:text-gray-300 text-gray-600">
                        {" "}
                        {t("description")}
                      </span>
                    </div>

                    <div className="pt-4 sm:pt-6">
                      <button className="px-6 py-3 bg-accents-color text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        {t("learnMore") || "Learn More"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AboutUsShape> */}
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
            </div>
            <div></div>
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
