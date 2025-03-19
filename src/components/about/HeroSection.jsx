import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const { t } = useTranslation("about");
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
    setIsAnimating(true);
  };

  const closePopup = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300); // Match this with animation duration
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://english-club.istad.co/files/80109abc-ca6b-481f-91dc-d7d9892cb87e.jpg"
          alt="Team"
          className="w-full h-full object-cover"
        />

        {/* Overlay that changes with Tailwind's dark mode */}
        <div className="absolute inset-0 bg-white/50 dark:bg-black/60 transition-colors duration-300"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-lg">
            {/* Text that changes color based on Tailwind's dark mode */}
            <div className="overflow-hidden mb-4">
              <h2 className="text-5xl sm:text-7xl font-bold text-secondary-500 animate-slice">
                FLUENTFLOW
              </h2>
            </div>
            <div className="overflow-hidden mb-4">
              <h2 className="text-5xl sm:text-7xl font-bold text-primary-500 animate-slice-delay-1">
                TEAM
              </h2>
            </div>
            <div className="overflow-hidden mb-8">
              <h2 className="text-6xl sm:text-7xl font-bold text-gray-800 dark:text-white animate-slice-delay-2"></h2>
            </div>

            {/* Description */}
            <div className="overflow-hidden mb-8">
              <p className="text-xl text-gray-600 dark:text-gray-200 animate-slice-delay-3">
                {t("team")}
              </p>
            </div>

            {/* Button with theme-aware styling */}
            {/* <button
              onClick={openPopup}
              className="px-8 py-4 bg-secondary-500 text-white dark:text-black font-bold rounded-md hover:bg-secondary-600 transition-all duration-300"
            >
              {t("explore")}
            </button> */}

            {/* Text Content */}

            {isOpen && (
              <div
                className={`fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-40 transition-opacity duration-300 ease-in-out ${
                  isAnimating ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={closePopup}
              >
                {/* Popup with improved design, scale and fade animation */}
                <div
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md mx-4 z-50 transition-all duration-300 ease-in-out ${
                    isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col">
                    {/* Logo and Title Section */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-600 text-white p-2 rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                          <path d="M18 12h-2.5a1.5 1.5 0 0 0 0 3H18"></path>
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                        FLUENTFLOW
                      </h2>
                    </div>

                    {/* Main Content */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      A free platform for Khmer speakers learning English.
                      Access quality language learning resources anytime,
                      anywhere.
                    </p>

                    {/* Project Information */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded mb-6">
                      <p className="text-gray-700 dark:text-gray-200 text-sm">
                        And also this website I create for final project at
                        ISTAD that have complete Courses Foundation Generation 3
                      </p>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        Free Access
                      </span>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        Khmer & English
                      </span>
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
                        ISTAD Project
                      </span>
                      <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300">
                        Foundation Gen 3
                      </span>
                    </div>

                    {/* Divider with improved styling */}
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white dark:bg-gray-800 px-4 text-sm text-gray-500 dark:text-gray-400">
                          Get Started
                        </span>
                      </div>
                    </div>

                    {/* Call to Action Button */}
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200">
                      Join FluentFlow
                    </button>

                    {/* Footer */}
                    <p className="text-gray-400 text-sm text-center mt-4">
                      Helping Cambodians master English since 2025
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
