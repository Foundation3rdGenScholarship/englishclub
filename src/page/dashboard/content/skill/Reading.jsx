import React from "react";
import { useTranslation } from "react-i18next";
import { Suspense } from "react";
import { useAllReadingQuery } from "../../../../redux/features/skill/readingSlice";
import CourseCard from "../../../../components/card/CourseCard";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";

const Reading = () => {
  const { data, isLoading } = useAllReadingQuery();
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  const getAllCourses = data?.payload;
  console.log(getAllCourses);

  const query = useAllReadingQuery();

  const { t } = useTranslation("reading");
  return (
    <div className="max-w-screen-xl sm:ml-64 mt-[80px]">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="max-w-full">
          <div className="container mx-auto px-4">
            <h1 className="text-heading-1 text-text-des-light-mode dark:text-primary-500 py-5 font-bold">
              {t("title")}
            </h1>

            {/* <!-- Card with image and text --> */}
            <div className="rounded-lg overflow-hidden">
              {/* <!-- Image with people collaborating --> */}
              <div className="relative">
                <img
                  src="https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/2021-10/RS5825_169280449-hig.jpg?itok=wYILtdrb"
                  alt="People collaborating at work"
                  className="w-full h-[400px] object-cover"
                />

                {/* <!-- Overlay text box --> */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="bg-white dark:bg-bg-dark-mode rounded-lg p-6 mx-4 text-center shadow-lg">
                    {/* <!-- Khmer text for the main message --> */}
                    <p className="text-primary-500 text-xl md:text-2xl font-bold mb-4">
                      {t("des")}
                    </p>

                    {/* <!-- Button with Khmer text --> */}
                    <button className="dark:bg-secondary-900 bg-secondary-500 dark:hover:bg-secondary-700 hover:bg-secondary-700 text-white text-des-4 py-3 px-8 rounded-full mt-2 transition duration-300">
                      {t("start")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-black dark:text-text-des-dark-mode">
            នៅទីនេះអ្នកអាចស្វែងរកសកម្មភាពដើម្បីអនុវត្តជំនាញអានរបស់អ្នក។
            ការអាននឹងជួយអ្នកឱ្យប្រសើរឡើងនូវការយល់ដឹងរបស់អ្នកអំពីភាសា
            និងបង្កើតវាក្យសព្ទរបស់អ្នក។
          </p>
        </div>
        <div className="flex flex-col gap-10 pl-[200px]">
          <CourseCard />
          {isLoading &&
            skeleton.map((index) => <CoursesSkeleton key={index} />)}
          {!isLoading &&
            getAllCourses &&
            getAllCourses.length > 0 &&
            getAllCourses.map((item, index) => (
              <CourseCard
                key={index}
                title={item.skill_name}
                img={item.thumbnail}
                des={item.description}
              />
            ))}
        </div>
      </Suspense>
    </div>
  );
};

export default Reading;
