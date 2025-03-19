import React from "react";
import { useTranslation } from "react-i18next";

export const Vission = () => {
  const { t } = useTranslation("about");
  return (
    <section class="py-10 sm:py-16 lg:py-24 px-2">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="lg:max-w-3xl">
          <h2 class="text-3xl font-bold leading-tight text-primary-500 sm:text-4xl lg:text-5xl">
            {t("question")}
          </h2>

          <div class="mt-20 dark:text-white">
            <blockquote>
              <p class="text-2xl leading-relaxed text-black dark:text-text-des-dark-mode md:leading-relaxed md:text-des-2">
                {t("description")}
              </p>
            </blockquote>
            <div class="flex items-center mt-16">
              <p class="text-lg font-semibold text-secondary-500">Support</p>
              <p class="ml-3 text-lg text-gray-600 dark:text-white">
                By ISTAD, FluentFlow
              </p>
            </div>
          </div>

          <div class="flex items-center mt-12 space-x-4">
            <div class="flex items-center justify-center w-24 h-24 rounded-full ring-2 ring-blue-600">
              <img
                class="object-cover w-20 h-20 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKGTGbxG8U4JL7ToKMVGIQ1Jno1a6gdOM2uQ&s"
                alt="Istad"
              />
            </div>

            <div class="flex items-center justify-center w-24 h-24 rounded-full ring-2 ring-transparent dark:border-none border-2 border-primary-500">
              <img
                class="object-cover w-20 h-20 rounded-full"
                src="https://english-club.istad.co/files/2a0fb88c-c773-4c3d-8c28-df9555732c2a.png"
                alt="FluentFlow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
