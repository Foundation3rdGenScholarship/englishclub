import React from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import GlassCard from "../../components/card/GlassCard";

const FeedbackSection = () => {
  const { t } = useTranslation(["homepage", "about"]);

  const feedback = [
    {
      id: 1,
      text: t("feedback-des-one", { ns: "homepage" }),
      author: t("rotana", { ns: "about" }),
      position: t("student"),
      image: "/img/teamwork-img/rotana.JPG",
      stars: 4,
    },
    {
      id: 2,
      text: t("feedback-des-two", { ns: "homepage" }),
      author: t("sanom", { ns: "about" }),
      position: t("student"),
      image: "img/image/sanom.jpg",
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
  ];
 

  return (
    <>
      <div className="py-12">
        <h2 className="text-heading-3 font-bold text-bg-dark-mode dark:text-white text-center mb-12">
          {t("feedback")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-0 pb-6">
          {feedback.map((feed) => (
            <GlassCard
              key={feed.id}
              className="w-full flex flex-col justify-between dark:border-secondary-500 bg-[#ffff] dark:bg-white/10 p-8"
            >
              <div className="text-secondary-500 flex gap-2">
                {[...Array(feed.stars)].map((_, index) => (
                  <FaStar key={index} size={20} />
                ))}
              </div>
              <p className="my-4 mb-0 text-des-2 font-normal leading-relaxed tracking-wide text-gray-400">
                {feed.text}
              </p>

              <div className="mt-6 flex items-center gap-6">
                <div className="h-10 w-10 overflow-hidden rounded-full shadow-sm outline-neutral-800">
                  <div className="relative inline-block overflow-hidden rounded-lg border-neutral-800">
                    <img
                      alt={`${feed.author} profile picture`}
                      src={feed.image}
                      width="50"
                      height="50"
                      decoding="async"
                      data-nimg="1"
                      className="inline-block"
                      loading="lazy"
                      style={{ color: "transparent" }}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-des-3 leading-relaxed tracking-wide text-bg-dark-mode dark:text-white">
                    {feed.author}
                  </p>
                  <p className="text-des-4 leading-relaxed tracking-wide text-gray-500">
                    {feed.position}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeedbackSection;
