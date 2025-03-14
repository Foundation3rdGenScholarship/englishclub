import React from "react";
import HeroLevel from "../../../../components/heroCard/HeroLevel";
import { useTranslation } from "react-i18next";
import { useAllWritingA2QueryQuery } from "../../../../redux/features/skill/skillSlice";
import CourseCard from "../../../../components/card/CourseCard";
import { useNavigate } from "react-router-dom";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import ServerErrorPage from "../../../err/ServerErrorPage";

export const WritingA2 = () => {
  const { data, isLoading, error } = useAllWritingA2QueryQuery();
  const { t } = useTranslation("reading");
  const navigate = useNavigate(); // Initialize navigate hook
  const exercises = data?.flatMap((item) => item.exercises) || [];

  if (isLoading) {
    return (
      <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
        <HeroSkeleton />
        <CoursesSkeleton />
      </div>
    );
  }

  if (error) {
    return <ServerErrorPage />; // Handle errors properly
  }

  // Handle click on card to get exercise ID and navigate to another page
  const handleCardClick = (id) => {
    navigate(`/exercises/${id}`); // Navigate to exercise detail page
    console.log(id);
    const fullUrl = `/exercises/${id}`;
    console.log("Full URL:", fullUrl); // This should log the full URL
  };

  return (
    <div className="max-w-screen-xl sm:ml-64 mt-[88px] mb-10 px-4">
      <HeroLevel
        thumnail={
          "https://www.bangor.ac.uk/sites/default/files/styles/16x9_1100w/public/2020-05/shutterstock_1252112308%20Resized.jpg?h=d3aaaeb5&itok=pdlLp-Sj"
        }
        title={t("a2writing")}
        description={t("writinga2description")}
      />
      {/* Render Courses  */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {exercises.map((item, index) => (
          <CourseCard
            key={index}
            title={item.title}
            img={item.thumbnail}
            des={item.description}
            onClick={() => handleCardClick(item.ex_uuid)} // Passing the ex_uuid correctly
          />
        ))}
      </div>
    </div>
  );
};
