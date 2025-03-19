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
import { Vission } from "./Vission";
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
    <main className=" mx-auto overflow-hidden">
      <HeroSection />
      <div className="max-w-7xl m-auto">
        <Bubbles>
          <Vission />
          <VissionCard />
          <MissionCard />
        </Bubbles>
        <p className="text-center text-primary-500 font-bold text-heading-3">
          {t("mentor")}
        </p>
        <MentorCard />
        <div className="max-w-screen-xl mx-auto">
          <div className="xl:mb-20 lg:mb-20 md:mb-20 sm:mb-16 mb-12">
            <p className="text-center text-primary-500  font-bold text-heading-3">
              {t("teammember")}
            </p>
          </div>
          <div className="xl:mb-20 lg:mb-20 md:mb-20 sm:mb-16 mb-12">
            <MemberCard />
          </div>
        </div>
      </div>
    </main>
  );
};
export default AboutUsMain;
