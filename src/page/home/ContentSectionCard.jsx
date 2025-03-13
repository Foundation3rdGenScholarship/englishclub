import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import GlassCard from "../../components/card/GlassCard";
import ButtonNavigate from "../../components/button/ButtonNavigate";
import AOS from "aos";
import "aos/dist/aos.css"; // Make sure you import the AOS CSS

export default function ContentSectionCard() {
  const { t } = useTranslation("homepage");

  // Initialize AOS when component mounts
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration
      once: false, // Trigger animation only once
    });
  }, []);

  const content = [
    {
      title: t("title-cards-skill"),
      des: t("des-card-skill"),
      sub: [t("sub-des-skill1"), t("sub-des-skill2"), t("sub-des-skill3")],
      image: "/img/image/skill.jpg",
      float: "right",
      link: "/skills",
    },
    {
      title: t("title-cards-grammar"),
      des: t("des-card-grammar"),
      sub: [
        t("sub-des-grammar1"),
        t("sub-des-grammar2"),
        t("sub-des-grammar3"),
      ],
      image: "/img/image/grammer.jpg",
      float: "left",
      link: "/over-grammar",
    },
    {
      title: t("title-cards-vocab"),
      des: t("des-card-vocab"),
      sub: [t("sub-des-vocab1"), t("sub-des-vocab2"), t("sub-des-vocab3")],
      image: "/img/image/vocab.jpg",
      float: "right",
      link: "/over-vocabulary",
    },
  ];

  return (
    <div className="xl:mt-28 lg:mt-24 md:mt-20 sm:mt-16 mt-14 space-y-16 max-w-7xl mx-auto">
      <div className="text-center" data-aos="fade-up">
        <p className="text-primary-400 xl:text-heading-3 lg:text-heading-4 md:text-heading-5 text-heading-5 font-bold">
          {t("title-card")}{" "}
          <span className="text-secondary-400 xl:text-heading-3 lg:text-heading-4 md:text-heading-5 text-heading-5 font-bold">
            {t("title-cardii")}
          </span>
        </p>
        <p className="text-primary-800 xl:text-heading-4 lg:text-heading-5 md:text-heading-6 text-[14px]">
          {t("des-title-card")}
        </p>
      </div>

      {content.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col xl:flex-row lg:flex-row sm:flex-col md:flex-row items-center gap-7  max-w-7xl mx-auto px-8
          ${item.float === "right" ? "md:flex-row-reverse" : "lg:flex-row"}`}
        >
          <div
            className="flex-1"
            data-aos={item.float === "right" ? "fade-left" : "fade-right"}
            data-aos-duration="600"
          >
            <GlassCard
              className="rounded-tl-[50px] rounded-br-[50px] 
             backdrop-blur-md border-2 border-white dark:border-none border-white/20"
            >
              <div className="p-3">
                <h3 className="text-primary-500 font-bold xl:text-heading-3 lg:text-heading-4 md:text-heading-5 text-heading-5 mb-4 ">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-white xl:text-heading-4 lg:text-heading-5 md:text-heading-6 text-[14px] leading-relaxed ">
                  {item.des}
                </p>
                <ul className="list-disc pl-5 text-gray-500 dark:text-white mt-4 mb-8 xl:text-heading-4 lg:text-heading-5 md:text-heading-6 text-[14px]">
                  {item.sub.map((sub, subIndex) => (
                    <li key={subIndex}>{sub}</li>
                  ))}
                </ul>
                <ButtonNavigate
                  text={t("start Learning")}
                  link={item.link}
                  addMoreStyle="xl:text-heading-5 lg:text-heading-6 md:text-[14px] text-[12px]"
                />
              </div>
            </GlassCard>
          </div>

          {/* Image - Responsive Positioning */}
          <div className="flex-1 order-2 md:order-${item.float === 'right' ? '2' : '1'} sm:order-2">
            <img
              data-aos={item.float === "right" ? "fade-right" : "fade-left"}
              data-aos-duration="600"
              src={item.image}
              alt={item.title}
              loading="lazy"
              className=" h-auto md:h-[25rem] md:w-full object-cover rounded-tr-[50px] rounded-bl-[50px] shadow-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
