"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import GlassCard from "../../components/card/GlassCard";

const FeedbackSection = () => {
  const { t } = useTranslation(["homepage", "about"]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 600, once: false });

    const aosRefreshInterval = setInterval(() => {
      AOS.refresh();
    }, 600);

    return () => clearInterval(aosRefreshInterval);
  }, []);

  // Feedback data
  const feedback = [
    {
      id: 1,
      text: t("feedback-des-one", { ns: "homepage" }),
      author: t("sanom", { ns: "about" }),
      position: t("student"),
      image: "/img/image/sanom.jpg",
      stars: 4,
    },
    {
      id: 2,
      text: t("feedback-des-two", { ns: "homepage" }),
      author: t("rotana", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/rotana.JPG",
      stars: 5,
    },
    {
      id: 3,
      text: t("feedback-des-three", { ns: "homepage" }),
      author: t("leaphea", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/leaphea.JPG",
      stars: 5,
    },
    {
      id: 4,
      text: t("feedback-des-four", { ns: "homepage" }),
      author: t("vuthy", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/vuthy.JPG",
      stars: 5,
    },
    {
      id: 5,
      text: t("feedback-des-five", { ns: "homepage" }),
      author: t("bora", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/bora.JPG",
      stars: 5,
    },
    {
      id: 6,
      text: t("feedback-des-six", { ns: "homepage" }),
      author: t("oudom", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/oudom.JPG",
      stars: 5,
    },
    {
      id: 7,
      text: t("feedback-des-seven", { ns: "homepage" }),
      author: t("eric", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/eric.JPG",
      stars: 4,
    },
  ];

  // Duplicate feedback for seamless looping
  const duplicatedFeedback = [
    ...feedback,
    ...feedback,
    ...feedback,
    ...feedback,
  ];

  // Ref for the scroll container
  const scrollContainerRef = useRef(null);

  // State to track auto-scrolling
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Scroll to the previous item
  const scrollPrevious = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300, // Adjust scroll distance
        behavior: "smooth",
      });
    }
  };

  // Scroll to the next item
  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300, // Adjust scroll distance
        behavior: "smooth",
      });
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    let autoScrollInterval;

    if (isAutoScrolling) {
      autoScrollInterval = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } =
            scrollContainerRef.current;

          // Calculate the next scroll position
          const nextScrollLeft = scrollLeft + 300; // Adjust scroll distance

          // If at the end, reset to the beginning instantly
          if (nextScrollLeft >= scrollWidth - clientWidth) {
            scrollContainerRef.current.scrollTo({
              left: 0,
              behavior: "instant",
            });
          } else {
            scrollContainerRef.current.scrollBy({
              left: 300, // Adjust scroll distance
              behavior: "smooth",
            });
          }
        }
      }, 2000); // Adjust auto-scroll interval
    }

    return () => clearInterval(autoScrollInterval);
  }, [isAutoScrolling]);

  return (
    <div className="py-16 dark:from-gray-900 dark:to-gray-800 my-16 overflow-y-hidden">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2
          className="xl:text-heading-3 lg:text-heading-4 md:text-heading-5 text-heading-5 font-bold text-primary-500 dark:text-white text-center mb-12"
          data-aos="fade-up"
        >
          {t("feedback")}{" "}
          <span className="text-secondary-400 xl:text-heading-3 lg:text-heading-4 md:text-heading-5 text-heading-5 font-bold">
            {t("students")}
          </span>
        </h2>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scroll-smooth scrollbar-hide relative overflow-y-hidden"
          style={{
            scrollBehavior: "smooth",
            cursor: "grab",
          }}
          onMouseDown={(e) => {
            // Enable dragging to scroll
            const startX = e.pageX;
            const scrollLeft = scrollContainerRef.current.scrollLeft;

            const onMouseMove = (e) => {
              const x = e.pageX - startX;
              scrollContainerRef.current.scrollLeft = scrollLeft - x;
            };

            const onMouseUp = () => {
              document.removeEventListener("mousemove", onMouseMove);
              document.removeEventListener("mouseup", onMouseUp);
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
          }}
          onMouseEnter={() => setIsAutoScrolling(false)} // Pause auto-scroll on hover
          onMouseLeave={() => setIsAutoScrolling(true)} // Resume auto-scroll on leave
        >
          {/* Scroll content */}
          <div className="flex gap-8 transition-all w-max">
            {duplicatedFeedback.map((feed, index) => (
              <div
                key={`${feed.id}-${index}`}
                className="flex-shrink-0 w-96"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <GlassCard className="w-full xl:h-[25rem] lg:h-96 md:h-[21rem] sm:h-72 h-80 flex flex-col justify-between dark:bg-gray-800/50 rounded-xl bg-[#f5f5f5] shadow-sm transition-shadow duration-300 p-8">
                  <div className="text-secondary-500 flex gap-1">
                    {[...Array(feed.stars)].map((_, i) => (
                      <FaStar key={i} size={20} />
                    ))}
                  </div>
                  <p className="my-6 text-gray-600 dark:text-gray-300 text-des-4 md:text-des-4 lg:text-des-3 xl:text-des-3 leading-relaxed line-clamp-6">
                    {feed.text}
                  </p>

                  <div className="mt-6 flex items-center xl:gap-4 lg:gap-3 gap-2">
                    <div className="h-12 w-12 overflow-hidden rounded-full shadow-md">
                      <img
                        alt={`${feed.author} profile picture`}
                        src={feed.image}
                        width="50"
                        height="50"
                        decoding="async"
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="xl:text-heading-5 lg:text-heading-6 md:text-[14px] text-[12px] font-semibold text-gray-900 dark:text-white">
                        {feed.author}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {feed.position}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrevious}
          aria-label="Previous"
          className="absolute left-0 top-2/3 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <FaChevronLeft className="text-gray-700 dark:text-white" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Next"
          className="absolute right-0 top-2/3 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          <FaChevronRight className="text-gray-700 dark:text-white" />
        </button>
      </div>
    </div>
  );
};

export default FeedbackSection;
