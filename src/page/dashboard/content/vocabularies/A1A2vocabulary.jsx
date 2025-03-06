import React from "react";
import { useTranslation } from "react-i18next";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import ServerErrorPage from "../../../err/ServerErrorPage";
import { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

const A1A2vocabulary = () => {
  const { t } = useTranslation("dashboard");


  // if (isLoading) {
  //   return (
  //     <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
  //       <HeroSkeleton />
  //       <CoursesSkeleton />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <ServerErrorPage />;
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
     Hello
    </div>
  );
};

export default A1A2vocabulary;
