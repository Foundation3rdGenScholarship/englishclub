// CourseCard.jsx
import React from "react";
import { NavLink } from "react-router";
import { GiOpenBook } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const CourseCard = ({
  link,
  title,
  img,
  des,
  onClick,
  level = "Beginner",
  lesson = 1,
}) => {
  const { t } = useTranslation("courseCard");

  // Create a component for the card content to avoid duplication
  const CardContent = () => (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Image Container with Gradient Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>

        {/* Level Badge */}
        <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          {level || "All Levels"}
        </div>

        {/* Duration Badge */}
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-700/90 text-slate-800 dark:text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <GiOpenBook size={12} />
          {lesson} {lesson === 1 ? t("lesson") : t("lessons")}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="block text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-primary-500 transition-colors duration-300">
          {title}
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4 flex-grow">
          {des}
        </p>

        {/* Action Button */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700 mt-auto">
          <span className="text-primary-500 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
            {t("startLearning")}{" "}
            <FaArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </span>
        </div>
      </div>
    </div>
  );

  // Conditional rendering based on navigation method
  if (link && !onClick) {
    // Use NavLink for link-based navigation
    return (
      <NavLink
        to={link}
        className="group w-full h-full transition-all duration-300 hover:translate-y-1 cursor-pointer block"
      >
        <CardContent />
      </NavLink>
    );
  } else if (onClick) {
    // Use div with onClick for function-based navigation
    return (
      <div
        onClick={onClick}
        className="group w-full h-full transition-all duration-300 hover:translate-y-1 cursor-pointer"
      >
        <CardContent />
      </div>
    );
  } else {
    // Fallback for when neither navigation method is provided
    return (
      <div className="group w-full h-full transition-all duration-300 hover:translate-y-1">
        <CardContent />
      </div>
    );
  }
};

export default CourseCard;
