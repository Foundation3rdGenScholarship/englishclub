import React from "react";
import { useTranslation } from "react-i18next";
import CourseCard from "../../../../components/card/CourseCard";
import listeningJson from "../../../../data/json/listeningJson";
import { useAllListeningQuery } from "../../../../redux/features/skill/listeningSlice";
import TextAnimation from "../../../../components/progress/TextAnimation";
import ButtonNavigate from "../../../../components/button/ButtonNavigate";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import ServerErrorPage from "../../../err/ServerErrorPage";

const Listening = () => {
  const { t } = useTranslation("listening");
  const { isLoading, error } = useAllListeningQuery();

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
        <div className="container mx-auto px-4">
          <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
            <h1 className="text-primary-500 dark:text-primary-500 py-5 font-bold">
              {t("title")}
            </h1>
            <TextAnimation
              jsonName={"reading"}
              text1={"readingHere"}
              text2={"fluentflow"}
              text3={"moreKnow"}
            />
          </div>

          {/* Hero Section */}
          <div className="overflow-hidden">
            <div className="relative">
              <img
                src="https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/RS4758_AA047774-low.jpg?itok=PZYR9572"
                alt="People collaborating at work"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="bg-white dark:bg-bg-dark-mode rounded-tl-lg rounded-tr-lg opacity-90 p-6 mx-4 text-center shadow-lg">
                  <p className="text-primary-500 text-xl md:text-2xl font-bold mb-4">
                    {t("des")}
                  </p>
                  {/* <ButtonNavigate text={t("start")} link={"#"} /> */}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="py-5">
            <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-[29px]">
              {t("description")}
            </p>
          </div>

          {/* Courses Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {listeningJson.map((items) => (
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

export default Listening;
