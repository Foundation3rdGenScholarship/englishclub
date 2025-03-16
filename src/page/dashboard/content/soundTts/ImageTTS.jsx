import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaVolumeUp } from "react-icons/fa";
import categoriesData from "../../../../data/vocabularies/soundtts.json"; // Import JSON data

// Card Component
const Card = ({ item }) => {
  const speak = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center rounded-xl bg-white dark:bg-gray-800 shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="w-full h-48 overflow-hidden relative group">
        <img
          src={item.image}
          alt={item.word}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        {/* Play Sound Button */}
        <button
          onClick={() => speak(item.word)}
          className="absolute bottom-4 left-4 bg-secondary-500 text-white p-3 rounded-full shadow-md transition-colors duration-300 flex items-center justify-center"
          aria-label="Play sound"
        >
          <FaVolumeUp className="text-xl" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 w-full text-center bg-gradient-to-b from-white/10 dark:from-gray-700/10 to-transparent">
        <p className="text-2xl font-bold text-primary-500 dark:text-white mb-2">
          {item.word}
        </p>
      </div>
    </div>
  );
};

// Category Component
const Category = ({ name, items, t }) => {
  const [loading, setLoading] = useState(true);

  // Simulate loading for the entire category
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold text-primary-500 mb-4">{t(name)}</h1>
      {loading ? (
        // Skeleton for the entire category
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl bg-white/10 backdrop-blur-md shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              {/* Skeleton for Image */}
              <div className="w-full h-48 bg-gray-300 animate-pulse" />
              {/* Skeleton for Word */}
              <div className="p-6 w-full text-center">
                <div className="h-6 w-3/4 mx-auto bg-gray-300 animate-pulse rounded mb-3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Actual content
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Component
const ImageTTS = () => {
  const { t } = useTranslation("soundtts");

  return (
    <div className="p-4 sm:ml-64 mt-[88px]">
      <div className="p-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-primary-500 dark:text-white">
          {t("Learning vocabularies with")}{" "}
          <span className="text-3xl md:text-4xl text-center text-secondary-500">
            {t("Sound")}
          </span>
        </h1>
        {categoriesData.categories.map((category, index) => (
          <Category
            key={index}
            name={category.name}
            items={category.items}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageTTS;
