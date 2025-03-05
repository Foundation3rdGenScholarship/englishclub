import React, { useState, useEffect } from "react";
import extraVideo from "../../../../data/extraVideo/extraVideo.json";

const ExtraVideo = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a data fetch delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-[88px] sm:ml-64">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {loading
          ? // Show skeleton when loading
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-lg overflow-hidden animate-pulse"
              >
                <div className="bg-gray-300 w-full h-52"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-5/6 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/4"></div>
                </div>
              </div>
            ))
          : // Show actual videos when loaded
            extraVideo.map((resource, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative pt-[56.25%]">
                  <iframe
                    src={`https://www.youtube.com/embed/${resource.youtubeId}`}
                    title={resource.title}
                    className="absolute top-0 left-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 dark:text-text-des-dark-mode">{resource.title}</h3>
                  <div className="flex justify-between items-center">
                    {resource.extra && (
                      <span className="text-xs text-red-500">
                        {resource.extra}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ExtraVideo;
