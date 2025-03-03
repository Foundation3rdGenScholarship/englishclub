import React from "react";

const StatsSummary = () => {
  // Data for each level (A1, A2, B1, B2, C1, C2)
  const levels = [
    {
      name: "A1",
      image:
        "https://project-english-club.vercel.app/assets/Listening-DRjLXa_y.png",
      completed: 0,
      total: 10,
    },
    {
      name: "A2",
      image:
        "https://project-english-club.vercel.app/assets/reading10-B6uM6VFf.png",
      completed: 5,
      total: 10,
    },
    {
      name: "B1",
      image:
        "https://project-english-club.vercel.app/assets/speaking10-DeXVtclm.png",
      completed: 7,
      total: 10,
    },
    {
      name: "B2",
      image:
        "https://project-english-club.vercel.app/assets/writing-Bv33aIX_.png",
      completed: 3,
      total: 10,
    },
    {
      name: "C1",
      image:
        "https://project-english-club.vercel.app/assets/vocabulary-C_LuEoE2.png",
      completed: 8,
      total: 10,
    },
    {
      name: "C2",
      image:
        "https://project-english-club.vercel.app/assets/garmmar1-BGSaCA1i.png",
      completed: 2,
      total: 10,
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:ml-64 mt-[88px] max-w-screen-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        ព័ត៌មានលម្អិតអំពីការធ្វើលំហាត់
      </h2>

      {/* Grid Layout for Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level, index) => {
          const progress = (level.completed / level.total) * 100; // Calculate progress percentage

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
                      / {level.total} បានធ្វើ
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
                        stroke="#fba518" // Blue color for progress
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
