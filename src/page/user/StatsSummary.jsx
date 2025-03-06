import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useFetchExercisesQuery,
  useFetchSubmitExercisesByLevelQuery,
} from "../../redux/features/exercises/exerciseApi";
import { BeatLoader } from "react-spinners";

// Helper function to get level image
const getLevelImage = (level) => {
  switch (level) {
    case "A1":
      return "https://cdn3d.iconscout.com/3d/premium/thumb/e-learning-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--online-study-education-teaching-internomo-v1-pack-seo-web-illustrations-3049732.png";
    case "A2":
      return "https://cdn3d.iconscout.com/3d/premium/thumb/live-3d-icon-download-in-png-blend-fbx-gltf-file-formats--streaming-video-online-broadcast-podcast-day-pack-network-communication-icons-7794707.png?f=webp";
    case "B1":
      return "https://project-english-club.vercel.app/assets/speaking10-DeXVtclm.png";
    case "B2":
      return "https://project-english-club.vercel.app/assets/writing-Bv33aIX_.png";
    case "C1":
      return "https://project-english-club.vercel.app/assets/vocabulary-C_LuEoE2.png";
    default:
      return "";
  }
};

const StatsSummary = () => {
  const { t } = useTranslation("userProfile");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [levelsData, setLevelsData] = useState([]);

  // Fetch user data from local storage and parse it
  const userData = JSON.parse(localStorage.getItem("user")); // Replace "userData" with the actual key
  const user_uuid = userData?.user_uuid; // Extract user_uuid from the parsed object
  // Fetch all exercises
  const { data: allExercises, isLoading: isExercisesLoading } =
    useFetchExercisesQuery();

  // Fetch completed exercises for each level
  const a1Exercises = useFetchSubmitExercisesByLevelQuery({
    user_uuid: user_uuid, // Use the extracted user_uuid
    level: "A1",
  });
  const a2Exercises = useFetchSubmitExercisesByLevelQuery({
    user_uuid: user_uuid,
    level: "A2",
  });
  const b1Exercises = useFetchSubmitExercisesByLevelQuery({
    user_uuid: user_uuid,
    level: "B1",
  });
  const b2Exercises = useFetchSubmitExercisesByLevelQuery({
    user_uuid: user_uuid,
    level: "B2",
  });
  const c1Exercises = useFetchSubmitExercisesByLevelQuery({
    user_uuid: user_uuid,
    level: "C1",
  });

  // Calculate total and completed exercises for each level
  useEffect(() => {
    if (!isExercisesLoading && allExercises) {
      const groupedExercises = allExercises.reduce((acc, exercise) => {
        const level = exercise.exercise_level;
        if (!acc[level]) acc[level] = [];
        acc[level].push(exercise);
        return acc;
      }, {});

      const levelsData = [
        {
          name: "A1",
          image: getLevelImage("A1"),
          completed: a1Exercises.data?.payload?.length || 0,
          total: groupedExercises["A1"]?.length || 0,
        },
        {
          name: "A2",
          image: getLevelImage("A2"),
          completed: a2Exercises.data?.payload?.length || 0,
          total: groupedExercises["A2"]?.length || 0,
        },
        {
          name: "B1",
          image: getLevelImage("B1"),
          completed: b1Exercises.data?.payload?.length || 0,
          total: groupedExercises["B1"]?.length || 0,
        },
        {
          name: "B2",
          image: getLevelImage("B2"),
          completed: b2Exercises.data?.payload?.length || 0,
          total: groupedExercises["B2"]?.length || 0,
        },
        {
          name: "C1",
          image: getLevelImage("C1"),
          completed: c1Exercises.data?.payload?.length || 0,
          total: groupedExercises["C1"]?.length || 0,
        },
      ];

      setLevelsData(levelsData);
      setIsLoading(false);
    }
  }, [
    isExercisesLoading,
    allExercises,
    a1Exercises.data,
    a2Exercises.data,
    b1Exercises.data,
    b2Exercises.data,
    c1Exercises.data,
  ]);

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
              : 0; // Prevent division by zero

          return (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6">
                {/* Level Image */}
                <div className="w-20 h-20 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <img
                    className="w-12 h-12 object-cover"
                    src={level.image}
                    alt={level.name}
                  />
                </div>

                {/* Level Name */}
                <h3 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-2">
                  {level.name}
                </h3>

                {/* Completion Text */}
                <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-4">
                  <span className="font-medium text-secondary-500">
                    {level.completed}
                  </span>{" "}
                  / {level.total} {t("done")}
                </p>

                {/* Progress Bar with Animation */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                  <div
                    className="bg-secondary-500 h-2.5 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* Progress Percentage */}
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
