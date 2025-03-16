import React from "react";
import { useTranslation } from "react-i18next";
import CourseCard from "../../../../components/card/CourseCard";
import speaking from "../../../../data/json/speaking.json";
import TextAnimation from "../../../../components/progress/TextAnimation";
import ButtonNavigate from "../../../../components/button/ButtonNavigate";
import { HeroCard } from "../../../../components/heroCard/HeroCard";
import { useAllSpeakingQuery } from "../../../../redux/features/skill/speakingSlice";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import ServerErrorPage from "../../../err/ServerErrorPage";

const Speaking = () => {
  const { t } = useTranslation("speaking");
  const { isLoading, error } = useAllSpeakingQuery();

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
    <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
      <div className="max-w-full">
        <div className=" container mx-auto px-4">
          <HeroCard
            title={t("title")}
            img={
              "https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/RS8016_GettyImages-646457628-hig_2.jpg?itok=z_YbpNkB"
            }
            text1={t("text1")}
            text2={t("text2")}
            text3={t("text3")}
            des={t("des")}
            start={t("start")}
            description={t("description")}
          />
          {/* Level Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {speaking.map((items) => (
              <CourseCard
                link={items.link}
                key={items.level}
                title={items.title}
                img={items.img}
                des={items.description}
                lesson={items.lesson}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speaking;
