import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useFetchExercisesQuery,
  useFetchSubmitExercisesByLevelQuery,
} from "../../redux/features/exercises/exerciseApi";
import { BeatLoader } from "react-spinners";
import { skipToken } from "@reduxjs/toolkit/query/react";

// Helper function to get level image
const getLevelImage = (level) => {
  const images = {
    A1: "https://cdn3d.iconscout.com/3d/premium/thumb/e-learning-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--online-study-education-teaching-internomo-v1-pack-seo-web-illustrations-3049732.png",
    A2: "https://cdn3d.iconscout.com/3d/premium/thumb/live-3d-icon-download-in-png-blend-fbx-gltf-file-formats--streaming-video-online-broadcast-podcast-day-pack-network-communication-icons-7794707.png?f=webp",
    B1: "https://project-english-club.vercel.app/assets/speaking10-DeXVtclm.png",
    B2: "https://project-english-club.vercel.app/assets/writing-Bv33aIX_.png",
    C1: "https://project-english-club.vercel.app/assets/vocabulary-C_LuEoE2.png",
  };

  return images[level] || "";
};

const StatsSummary = () => {
  const { t } = useTranslation("userProfile");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [levelsData, setLevelsData] = useState([]);

  // Fetch user data from local storage
  const userData = JSON.parse(localStorage.getItem("user"));
  const user_uuid = userData?.user_uuid;
  console.log("userData :>> ", userData);
  if (!user_uuid) {
    console.error("User UUID is missing!");
    return <div>Error: User not found!</div>;
  }

  // Fetch all exercises
  const { data: allExercises, isLoading: isExercisesLoading } =
    useFetchExercisesQuery();

  // Fetch exercises by level using Redux
  const levelNames = ["A1", "A2", "B1", "B2", "C1"];
  const levelQueries = levelNames.map((level) => {
    const queryArgs = user_uuid ? { user_uuid, level } : skipToken;
    return useFetchSubmitExercisesByLevelQuery(queryArgs);
  });

  // Log level queries for debugging
  useEffect(() => {
    levelQueries.forEach((query, index) => {
      console.log(`Level ${levelNames[index]} Data:`, query.data);
      console.log(`Level ${levelNames[index]} Error:`, query.error);
    });
  }, [levelQueries]);

  // Calculate total and completed exercises for each level
  useEffect(() => {
    if (!isExercisesLoading && allExercises) {
      // Group exercises by level
      const groupedExercises = allExercises.reduce((acc, exercise) => {
        const level = exercise.exercise_level;
        if (!acc[level]) acc[level] = [];
        acc[level].push(exercise);
        return acc;
      }, {});

      // Map level data
      const levelsData = levelNames.map((level, index) => {
        const { data: levelExercises } = levelQueries[index];
        const completed = levelExercises?.data?.length || 0;
        const total = groupedExercises[level]?.length || 0;
        return {
          name: level,
          image: getLevelImage(level),
          completed,
          total,
        };
      });

      setLevelsData(levelsData);
      setIsLoading(false);
    }
  }, [isExercisesLoading, allExercises, ...levelQueries]);

  // Show loading state while waiting for data
  if (isLoading) {
    return (
      <div className="bg-bg-light-mode dark:bg-gray-900 rounded-xl p-6 sm:ml-64 max-w-screen-xl mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {t("details about the")}{" "}
          <span className="text-secondary-500">{t("exercises")}</span>
        </h2>
        <div className="flex justify-center items-center h-64">
          <BeatLoader color="#fba518" />
        </div>
      </div>
    );
  }

  // Show error state if any query fails
  const errors = levelQueries.filter((query) => query.isError);
  if (errors.length > 0) {
    return (
      <div className="bg-bg-light-mode dark:bg-gray-900 rounded-xl p-6 sm:ml-64 max-w-screen-xl mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {t("error loading data")}
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-bg-light-mode dark:bg-gray-900 rounded-xl p-6 sm:ml-64 mt-[88px] max-w-screen-xl mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        {t("details about the")}{" "}
        <span className="text-secondary-500">{t("exercises")}</span>
      </h2>

      {/* Grid Layout for Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levelsData.map((level, index) => {
          const progress =
            level.total > 0
              ? ((level.completed / level.total) * 100).toFixed(2)
              : 0;

          return (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6">
                <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img
                    className="w-12 h-12 object-cover"
                    src={level.image}
                    alt={level.name}
                  />
                </div>

                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">
                  {level.name}
                </h3>

                <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
                  <span className="font-medium text-secondary-500">
                    {level.completed}
                  </span>{" "}
                  / {level.total} {t("done")}
                </p>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-secondary-500 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="text-center text-gray-600 dark:text-gray-400">
                  {progress}% {t("completed")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsSummary;
