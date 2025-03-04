import React from "react";
import { useTranslation } from "react-i18next";

const StatsSummary = () => {
  const { t } = useTranslation("userProfile");

  // Retrieve stored chart data
  const storedChartData = JSON.parse(localStorage.getItem("chartState")) || {
    series: [0, 0, 0, 0, 0], // Default values if nothing is stored
  };

  console.log(storedChartData.series);

  const levels = [
    {
      name: "A1",
      image:
        "https://project-english-club.vercel.app/assets/Listening-DRjLXa_y.png",
      completed: 6,
      total: storedChartData.series[0] || 0,
    },
    {
      name: "A2",
      image:
        "https://project-english-club.vercel.app/assets/reading10-B6uM6VFf.png",
      completed: 0,
      total: storedChartData.series[1] || 0,
    },
    {
      name: "B1",
      image:
        "https://project-english-club.vercel.app/assets/speaking10-DeXVtclm.png",
      completed: 3,
      total: storedChartData.series[2] || 0,
    },
    {
      name: "B2",
      image:
        "https://project-english-club.vercel.app/assets/writing-Bv33aIX_.png",
      completed: 0,
      total: storedChartData.series[3] || 0,
    },
    {
      name: "C1",
      image:
        "https://project-english-club.vercel.app/assets/vocabulary-C_LuEoE2.png",
      completed: 2,
      total: storedChartData.series[4] || 0,
    },
  ];

  return (
    <div className="bg-bg-light-mode dark:bg-gray-900 rounded-xl p-6 sm:ml-64 mt-[88px] max-w-screen-xl mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        {t("details about the")}{" "}
        <span className="text-secondary-500">{t("exercises")}</span>
      </h2>

      {/* Grid Layout for Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level, index) => {
          const progress =
            level.total > 0
              ? ((level.completed / level.total) * 100).toFixed(2)
              : 0; // Prevent division by zero

          return (
            <a
              href={`/dashboard/${level.name.toLowerCase()}`}
              key={index}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="p-6 flex justify-between items-center">
                  {/* Level Image */}
                  <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <img
                      className="w-12 h-12 object-cover"
                      src={level.image}
                      alt={level.name}
                    />
                  </div>
                  <div className="flex flex-col">
                    {/* Level Name */}
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {level.name}
                    </h3>
                    {/* Completion Text */}
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      <span className="font-medium text-secondary-500">
                        {level.completed}
                      </span>{" "}
                      / {level.total} {t("done")}
                    </p>
                  </div>
                  {/* Progress Circle */}
                  <div className="relative w-24 h-24">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Background Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="10"
                      />
                      {/* Progress Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#fba518" // Orange color for progress
                        strokeWidth="10"
                        strokeDasharray="283" // Circumference of the circle (2 * π * r)
                        strokeDashoffset={283 - (283 * progress) / 100} // Dynamic offset based on progress
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)" // Start progress from the top
                      />
                    </svg>

                    {/* Progress Text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-semibold text-gray-800 dark:text-white">
                        {progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default StatsSummary;
