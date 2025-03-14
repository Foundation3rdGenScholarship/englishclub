import React from "react";

const HeroLevel = ({ thumnail, title, description }) => {
  return (
    <div className="max-w-screen-2xl">
      <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
        <h1 className="text-primary-500 dark:text-primary-500 pb-5 font-bold">
          {title}
        </h1>
      </div>

      <div className="rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={thumnail}
            alt="People collaborating at work"
            className="w-full h-[400px] object-cover"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-10 py-5">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeroLevel;
