import React from "react";

const ModernInstructorCards = () => {
  const instructors = [
    {
      name: "Mom Reksmey",
      role: "Instructor - Leader, Data Analysis",
      quote: "Do it because they said you couldn't.",
      image: "/api/placeholder/400/400", // Replace with actual image path
      accent: "from-cyan-400 to-blue-500",
      pattern: "pattern1",
    },
    {
      name: "Kim Chansokpheng",
      role: "Instructor - Leader, Cybersecurity",
      quote: "Be humble",
      image: "/api/placeholder/400/400", // Replace with actual image path
      accent: "from-purple-400 to-pink-500",
      pattern: "pattern2",
    },
  ];

  const renderPattern = (type) => {
    if (type === "pattern1") {
      return (
        <div className="absolute -right-4 -top-4 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="75" cy="25" r="20" className="fill-current" />
            <circle cx="30" cy="70" r="12" className="fill-current" />
            <circle cx="85" cy="80" r="8" className="fill-current" />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="absolute -left-8 -bottom-8 w-48 h-48 opacity-20">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="10"
              y="10"
              width="30"
              height="30"
              rx="4"
              className="fill-current"
            />
            <rect
              x="50"
              y="10"
              width="20"
              height="20"
              rx="4"
              className="fill-current"
            />
            <rect
              x="20"
              y="50"
              width="25"
              height="25"
              rx="4"
              className="fill-current"
            />
            <rect
              x="60"
              y="50"
              width="15"
              height="15"
              rx="4"
              className="fill-current"
            />
          </svg>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          <div className="relative">
            <h2 className="text-4xl font-bold text-center">
              <span className="mr-3">អ្នកណែនាំរបស់យើង</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </h2>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
        </div>

        <div className="grid gap-16">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className={`relative ${
                index % 2 === 0 ? "text-right" : "text-left"
              }`}
            >
              {/* Card */}
              <div
                className={`relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-lg 
                bg-white/30 dark:bg-gray-800/30 border border-white/20 dark:border-gray-700/20
                ${index % 2 === 0 ? "ml-auto mr-0" : "ml-0 mr-auto"} 
                max-w-2xl z-10`}
              >
                {/* Background gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${instructor.accent} opacity-10`}
                ></div>

                {/* Decorative pattern */}
                {renderPattern(instructor.pattern)}

                <div
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  } gap-6 p-6`}
                >
                  {/* Image container with overlay */}
                  <div className="relative w-48 h-48 mx-auto md:mx-0 flex-shrink-0">
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${instructor.accent} opacity-40`}
                    ></div>
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="relative z-10 w-full h-full object-cover rounded-xl shadow-lg"
                    />

                    {/* Accent corner */}
                    <div
                      className={`absolute ${
                        index % 2 === 0 ? "-left-2" : "-right-2"
                      } -bottom-2 w-12 h-12 rounded-lg bg-gradient-to-br ${
                        instructor.accent
                      } shadow-lg`}
                    ></div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex flex-col ${
                      index % 2 === 0
                        ? "md:items-end md:text-right"
                        : "md:items-start md:text-left"
                    } text-center md:text-left`}
                  >
                    <h3 className="text-3xl font-bold mb-1">
                      {instructor.name}
                    </h3>
                    <div
                      className={`w-16 h-1 bg-gradient-to-r ${
                        instructor.accent
                      } rounded-full my-3 ${
                        index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                      } mx-auto`}
                    ></div>
                    <p className="text-lg font-medium mb-4">
                      {instructor.role}
                    </p>
                    <div className="relative">
                      <svg
                        className={`absolute ${
                          index % 2 === 0 ? "right-0 -mr-4" : "left-0 -ml-4"
                        } -mt-2 w-8 h-8 opacity-30`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-xl italic font-light mb-8 mx-4">
                        {instructor.quote}
                      </p>
                    </div>

                    {/* Social Icons */}
                    <div
                      className={`flex gap-3 ${
                        index % 2 === 0 ? "md:justify-end" : "md:justify-start"
                      } justify-center`}
                    >
                      <a
                        href="#"
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${instructor.accent} text-white shadow-lg transition-transform hover:scale-110`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/50 dark:bg-gray-700/50 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-white/50 dark:bg-gray-700/50 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div
                className={`absolute ${
                  index % 2 === 0 ? "left-0" : "right-0"
                } top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br ${
                  instructor.accent
                } opacity-30 blur-xl`}
              ></div>
              <div
                className={`absolute ${
                  index % 2 === 0 ? "left-8" : "right-8"
                } top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br ${
                  instructor.accent
                } opacity-20 blur-md`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernInstructorCards;
