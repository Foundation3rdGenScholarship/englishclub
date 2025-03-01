import { useTranslation } from "react-i18next";
import { useAllReadingQuery } from "../../../../redux/features/skill/readingSlice";
import CourseCard from "../../../../components/card/CourseCard";
import CoursesSkeleton from "../../../../components/skeleton/CoursesSkeleton";
import readingJson from "../../../../data/json/reading.json";
import TextAnimation from "../../../../components/progress/TextAnimation";
import NotFound from "../../../err/NotFound";
import { FaS } from "react-icons/fa6";
import { HeroSkeleton } from "../../../../components/skeleton/HeroSkeleton";

const ReadingDetail = () => {
  const skeleton = Array(8).fill(0);
  const { data, isLoading, error } = useAllReadingQuery();
  const { t } = useTranslation("reading");
  const exercises = data?.flatMap((item) => item.exercises) || [];

  if (isLoading) {
    return (
      <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
        <HeroSkeleton />
        <CoursesSkeleton />
      </div>
    );
  }

  if (error) {
    return <NotFound />; // Handle errors properly
  }

  return (
    <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
      <div className="max-w-full">
        <div className="container mx-auto px-4">
          <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
            <h1 className="text-primary-500 dark:text-primary-500 py-5 font-bold">
              {t("a1reading")}
            </h1>
          </div>

          {/* Hero Section */}
          <div className="rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src="https://learnenglish.britishcouncil.org/sites/podcasts/files/styles/max_1300x1300/public/RS8046_GettyImages-1036609896-hig.jpg?itok=MbOoWQsT"
                alt="People collaborating at work"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Description */}
          <div className="p-4">
            <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-10">
              {t("a1description")}
            </p>
          </div>

          {/* Courses Section */}
          <div className="flex flex-col gap-10 sm:pl-5 xl:pl-[100px]">
            {exercises.map((item, index) => (
              <CourseCard
                key={index}
                title={item.title}
                img={item.thumbnail}
                des={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingDetail;
