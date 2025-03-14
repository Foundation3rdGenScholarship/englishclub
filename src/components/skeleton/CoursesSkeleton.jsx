import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="w-full h-full">
      <div className="overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg h-full flex flex-col">
        {/* Image Skeleton with Badge Placeholder */}
        <div className="relative h-48 bg-gray-200 dark:bg-gray-700 animate-pulse">
          {/* Level Badge Skeleton */}
          <div className="absolute top-4 left-4 bg-gray-300 dark:bg-gray-600 w-20 h-6 rounded-full"></div>

          {/* Duration Badge Skeleton */}
          <div className="absolute top-4 right-4 bg-gray-300 dark:bg-gray-600 w-24 h-6 rounded-full"></div>
        </div>

        {/* Content Section Skeleton */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Title Skeleton */}
          <div className="h-7 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>

          {/* Description Skeleton */}
          <div className="flex flex-col gap-2 mb-4 flex-grow">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>

          {/* Action Button Skeleton */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700 mt-auto">
            <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-28"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CoursesGridSkeleton = () => {
  const skeletons = Array(6).fill(0); // Creates an array of length 6 (3 rows of 2 columns)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-4">
      {skeletons.map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default CoursesGridSkeleton;
