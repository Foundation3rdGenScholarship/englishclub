import { useTranslation } from "react-i18next";
import React from "react";

export default function ContentSectionCard() {
  const { t } = useTranslation("homepage");
  const content = [
    {
      title: t("title-cards-skill"),
      des: t("des-card-skill"),
      sub: [t("sub-des-skill1"), t("sub-des-skill2"), t("sub-des-skill3")],
    },
    {
      title: t("title-cards-grammar"),
      des: t("des-card-grammar"),
      sub: [
        t("sub-des-grammar1"),
        t("sub-des-grammar2"),
        t("sub-des-grammar3"),
      ],
    },
    {
      title: t("title-cards-vocab"),
      des: t("des-card-vocab"),
      sub: [t("sub-des-vocab1"), t("sub-des-vocab2"), t("sub-des-vocab3")],
    },
  ];
  return (
    <div>
      <div className="flex flex-col justify-center mt-40">
        {content.map((item, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index === 2 ? "flex-row" : "flex-row-reverse"
            } justify-between space-x-6`}
          >
            <div className="text-white font-bold text-xl px-6 py-2 rounded-tl-[25px] rounded-br-[25px] bg-accents-color mb-[15px]">
              {item.title}
            </div>
            <div className="p-6 rounded-tl-[50px] rounded-br-[50px] bg-white/10 backdrop-blur-md border-2 border-white dark:border-none border-white/20">
              <p className="text-heading-5 text-black dark:text-white">
                {item.des}
              </p>
              <ul className="list-disc pl-6 mt-3">
                {item.sub.map((sub, index) => (
                  <li key={index} className="text-black dark:text-white">
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
