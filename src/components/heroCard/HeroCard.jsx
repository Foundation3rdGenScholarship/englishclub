import React from "react";

export const HeroCard = () => {
  return (
    <div>
      <div className="rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src="https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/2021-10/RS5825_169280449-hig.jpg?itok=wYILtdrb"
            alt="People collaborating at work"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="bg-white dark:bg-bg-dark-mode rounded-lg p-6 mx-4 text-center shadow-lg">
              <p className="text-primary-500 text-xl md:text-2xl font-bold mb-4">
                {t("des")}
              </p>
              <button className="dark:bg-secondary-900 bg-secondary-500 dark:hover:bg-secondary-700 hover:bg-secondary-700 text-white text-des-4 py-3 px-8 rounded-full mt-2 transition duration-300">
                {t("start")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
