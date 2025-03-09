import { useTranslation } from "react-i18next";
import React from "react";
import GlassCard from "../../components/card/GlassCard";

export default function ContentSectionCard() {
  const { t } = useTranslation("homepage");

  const content = [
    {
      title: t("title-cards-skill"),
      des: t("des-card-skill"),
      sub: [t("sub-des-skill1"), t("sub-des-skill2"), t("sub-des-skill3")],
      image: "/img/image/skill.jpg",
      float: "right",
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
    },
    {
      title: t("title-cards-vocab"),
      des: t("des-card-vocab"),
      sub: [t("sub-des-vocab1"), t("sub-des-vocab2"), t("sub-des-vocab3")],
      image: "/img/image/vocab.jpg",
      float: "right",
    },
  ];

  return (
    <div className="mt-32  md:mx-28 space-y-16">
      <div className="text-center">
        <p className="text-primary-400 text-heading-3 font-bold">{t("title-card")} <span className="text-secondary-400 text-heading-3 font-bold">{t("title-cardii")}</span></p>
        <p className="text-primary-800 text-heading-5">{t("des-title-card")}</p>
      </div>
      {content.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-7 mx-[60px] ${
            item.float === "right" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Image Outside the GlassCard */}
          <div className="flex-1">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto object-cover rounded-tr-[50px] rounded-bl-[50px] shadow-lg"
            />
          </div>

          {/* Text Content Inside the GlassCard */}
          <div className="flex-1">
            <GlassCard
              className="p-6 rounded-tl-[50px] rounded-br-[50px] 
             bg-white/10 dark:bg-[#111827] 
             backdrop-blur-md border-2 border-white dark:border-none border-white/20"
            >
              <div className="p-5">
                <h3 className="text-primary-500 font-bold text-heading-3 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-white text-heading-5 leading-relaxed">
                  {item.des}
                </p>
                <ul className="list-disc pl-5 text-gray-500 dark:text-white mt-4">
                  {item.sub.map((sub, subIndex) => (
                    <li key={subIndex}>{sub}</li>
                  ))}
                </ul>
                <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-bold rounded-full shadow-md hover:bg-yellow-400">
                  {t("button-learn-more")}
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      ))}
    </div>
  );
}
