import React, { useEffect } from "react";
import GlassCard from "../../components/card/GlassCard";
import { RiHeadphoneLine, RiFileList3Line } from "react-icons/ri";
import { FaRegFaceFrownOpen, FaArrowUpRightDots } from "react-icons/fa6";
import { AiOutlinePieChart, AiOutlineRead } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div
    className="h-full flex flex-col"
    data-aos="zoom-in"
    data-aos-duration="600"
  >
    <div className="p-2 flex flex-col items-center text-center flex-grow">
      <div
        className={`w-12 h-12 rounded-full flex justify-center items-center mb-6`}
      >
        {Icon && <Icon className="text-6xl text-black dark:text-white" />}
      </div>
      <h3 className="xl:text-heading-4 md:text-heading-4 text-heading-5 font-bold text-primary-500 mb-4">
        {title}
      </h3>
      <p className="text-des-4 md:text-des-4 lg:text-des-2 xl:text-des-2 text-gray-600 dark:text-white text-center">
        {description}
      </p>
    </div>
  </div>
);

const FeaturesGrid = () => {
  const { t } = useTranslation("homepage");
  const features = [
    {
      icon: RiHeadphoneLine,
      title: t("ca-listening"),
      description: t("ca-des-lis"),
    },
    {
      icon: FaArrowUpRightDots,
      title: t("ca-quiz"),
      description: t("ca-des-quiz"),
    },
    {
      icon: RiFileList3Line,
      title: t("ca-exercises"),
      description: t("ca-des-exercises"),
    },
    {
      icon: AiOutlineRead,
      title: t("ca-reading"),
      description: t("ca-des-reading"),
    },
    {
      icon: FaRegFaceFrownOpen,
      title: t("ca-speaking"),
      description: t("ca-des-speaking"),
    },
    {
      icon: AiOutlinePieChart,
      title: t("ca-vocabulary"),
      description: t("ca-des-vocabulary"),
    },
  ];

  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <div className="max-w-7xl mx-auto mt-20">
        {/* Title Section with fade-up animation */}
        <div className="xl:py-16 lg:py-14 md:py-12 sm:py-10 py-9">
          <div className="text-center" data-aos="fade-up">
            <span className="xl:text-heading-3 lg:text-heading-4 md:text-heading-5 text-heading-5 font-bold leading-tight text-primary-500 dark:text-white">
              {t("des-title")}
              <span className="text-secondary-500">
                {" "}
                {t("des-titleone")}
              </span>{" "}
              <span> {t("des-sub")}</span>
            </span>
            <p className="mt-4 xl:text-heading-4 lg:text-heading-5 md:text-heading-6 text-[14px] leading-7 text-gray-500 dark:text-gray-400sm:mt-8">
              {t("des-subtwo")}
            </p>
          </div>
        </div>

        {/* Features Grid with zoom-in animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-16 xl:text-heading-4 lg:text-heading-5 md:text-heading-6 text-[14px]">
          {features.map((feature, index) => (
            <GlassCard
              key={index}
              data-aos="fade-up" // Zoom-in effect on each card
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturesGrid;
