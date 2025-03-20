import React, { useState, useEffect,useRef } from "react";
import { useTranslation } from "react-i18next";
import Typed from "typed.js";
const HeroSection = () => {
  const { t } = useTranslation("about");
  const [loaded, setLoaded] = useState(false);
  const typedRef = useRef(null);
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
  useEffect(() => {
    setLoaded(true);
  }, []);
useEffect(() => {
  const typed = new Typed(typedRef.current, {
    strings: ["FLUENTFLOW"],
    typeSpeed: 130,
    backSpeed: 50,
    backDelay: 2000,
    startDelay: 200,
    loop: true,
    cursorChar: "|",
    onStringTyped: () => {
      const cursor = document.querySelector(".typed-cursor");
      if (cursor) {
        cursor.style.color = "#fba518";
      }
    },
  });

  return () => {
    typed.destroy(); // Clean up the instance
  };
}, []);

  return (
    <div className="relative h-screen w-full">
      {/* Background Image with Subtle Zoom Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://english-club.istad.co/files/80109abc-ca6b-481f-91dc-d7d9892cb87e.jpg"
          alt="Team"
          className={`w-full h-screen object-cover ${
            loaded ? "scale-100" : "scale-100"
          } transition-transform duration-800 ease-out`}
        />
      </div>

      {/* Improved Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-black/60 z-1"></div>
      <div className="absolute inset-0 z-2">
        {/* Gradient overlay specifically for text area */}
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-black/80 to-transparent"></div>

        {/* Additional contrast layer for text area */}
        <div className="absolute left-0 top-0 w-3/4 h-full bg-gradient-to-b from-black/50 via-transparent to-black/40"></div>
      </div>

      {/* Accent Elements */}
      {/* <div className="absolute left-0 top-0 h-full w-1 bg-primary-500"></div>
      <div className="absolute left-0 bottom-0 h-2 w-48 bg-primary-400"></div> */}

      {/* Content Container - Left aligned for better readability */}
      <div className="relative z-10 h-full flex items-center">
        <div className="">
          <div className="w-full h-screen flex justify-center flex-col backdrop-blur-sm animate-slice-delay-1 px-[3rem] sm:px-[2rem] md:px-[4rem] lg:px-[10rem] rounded-lg border-l-4 border-primary-500 z-50">
            {/* Brand Text with Better Contrast */}
            <div className="mb-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-none">
                <span
                  className="text-secondary-500 font-[Poppins]"
                  ref={typedRef}
                ></span>
              </h1>
            </div>

            {/* Subtitle with Better Visibility */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-1 bg-primary-400 mr-4"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-medium text-primary-500 font-[Poppins] animate-slice-delay-1">
                TEAM
              </h2>
            </div>

            {/* Description with Improved Readability */}
            <div className="mb-10">
              <p className="text-md md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-gray-100 animate-slice-delay-2">
                {t("team")}
              </p>
            </div>

            {/* Button with Better Visibility */}
            <div className="flex space-x-4 items-center">
              <a
                href="#learn-more"
                className="group flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 shadow-lg"
              >
                <span className="text-white font-medium 2xl:text-2xl">
                  {t("learn more")}
                </span>
                <div className="relative h-5 w-5 overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 left-0 h-5 w-5 text-secondary-500 transform group-hover:translate-y-10 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -top-10 left-0 h-5 w-5 text-secondary-500 transform group-hover:translate-y-10 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Element */}
      {/* <div className="absolute top-8 right-8 px-4 py-2 border border-gray-400/30 rounded-lg backdrop-blur-sm flex items-center space-x-2 z-10">
        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-md dark:bg-orange-900 dark:text-orange-300 text-sm font-medium">
          ISTAD Foundation Gen 3
        </span>
      </div> */}
      <div className="absolute top-8 right-8 px-4 py-2 border bg-white/10 backdrop-blur-md border-white/20 rounded-xl hover:bg-white/20  flex items-center space-x-2 z-10 animate-slice-delay-2">
        <div className="w-2 h-2 rounded-full bg-secondary-500"></div>
        <span className="text-gray-300 text-sm 2xl:text-xl">
          ISTAD Foundation {t("Gen 3")}
        </span>
      </div>
    </div>
  );
};

export default HeroSection;
