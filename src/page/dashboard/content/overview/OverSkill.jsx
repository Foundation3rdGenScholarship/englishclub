import React from "react";
import { useTranslation } from "react-i18next";
import CourseCard from "../../../../components/card/CourseCard";
import TextAnimation from "../../../../components/progress/TextAnimation";
import { useAllSkillQuery } from "../../../../redux/features/skill/skillSlice";
import HeroSkillOverView from "../../../../components/heroCard/HeroSkillOverView";
import SkillTab from "../../../../components/tab/SkillTab";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import ServerErrorPage from "../../../err/ServerErrorPage";
import ButtonNavigate from "../../../../components/button/ButtonNavigate";

export const OverSkill = () => {
  const { t } = useTranslation("over-skill");
  const { isLoading, error } = useAllSkillQuery();
  if (isLoading) {
    return (
      <div className="mt-[88px] sm:pl-64">
        <HeroSkeleton />
        <CoursesSkeleton />
      </div>
    ); // Show loading while fetching data
  }

  if (error) {
    return (
      <div>
        <ServerErrorPage />
      </div>
    ); // Show error if there's a problem fetching the data
  }
  return (
    <div className="max-w-screen-2xl sm:ml-64 mt-[80px] ">
      <div className="max-w-full">
        <div className="container mx-auto px-4">
          <div className="text-heading-4 h-[100px] md:h-auto xl:text-heading-2 flex items-center gap-2">
            <div className="md:h-auto xl:text-heading-2 flex flex-wrap xl:flex-nowrap items-center gap-1 sm:gap-2 text-heading-4">
              <h1 className="text-primary-500 dark:text-primary-500 font-bold py-2 xl:py-5 whitespace-nowrap">
                {t("title")}
              </h1>
              <TextAnimation
                jsonName="reading"
                text1="readingHere"
                text2="fluentflow"
                text3="moreKnow"
              />
            </div>
          </div>

          {/* Hero Section */}
          <div className="rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src="https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/1280x500/public/2023-04/RS9171_GettyImages-1391836113_1440x960.jpg?itok=tOgk6wtV"
                alt="People collaborating at work"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="bg-white dark:bg-bg-dark-mode rounded-tl-lg rounded-tr-lg p-6 mx-4 text-center shadow-lg opacity-90">
                  <p className="text-primary-500 text-xl md:text-2xl font-bold mb-4">
                    {t("des")}
                  </p>
                  {/* <ButtonNavigate text={t("start")} /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4">
            <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-[29px]">
              {t("description")}
            </p>
            <h1 className="text-heading-3 text-primary-500 dark:text-primary-500 py-5 font-bold">
              {t("title2")}
            </h1>
            <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-[29px]">
              {t("description2")}
            </p>
            <h1 className="text-heading-3 text-primary-500 dark:text-primary-500 py-5 font-bold">
              {t("title3")}
            </h1>
            <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-[29px]">
              {t("description3")}
            </p>
          </div>
          {/* Courses Section */}
          <div className="flex flex-col gap-10 sm:pl-5 xl:pl-[100px]">
            {/* {readingJson.map((items) => (
              <CourseCard
                link={items.link}
                key={items.level}
                title={items.title}
                img={items.img}
                des={items.description}
              />
            ))} */}
          </div>
          {/* OverView*/}
          <div>
            {/* <HeroSkillOverView /> */}
            {/* <SkillTab /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
