// import { useTranslation } from "react-i18next";
// import React from "react";
// import { useAllReadingQuery } from "../../../../redux/features/skill/readingSlice";
// import CourseCard from "../../../../components/card/CourseCard";

// const Reading = () => {
//   const { data, isLoading, error } = useAllReadingQuery();
//   const { t } = useTranslation("reading");

//   if (isLoading) return <p>Loading...</p>;
//   if (error)
//     return (
//       <p className="p-4 sm:ml-64 mt-[88px] dark:text-white text-black">
//         Error: {error.message}
//       </p>
//     );

//   return (
//     <div className="p-4 sm:ml-64 mt-[88px]">
//       <h1 className="text-des-1 text-text-des-light-mode dark:text-text-des-dark-mode">{t("title")}</h1>
//       {data?.payload?.map((item) => (
//         <h1 key={item.id} className=" text-black dark:text-white">
//           {item.description}
//         </h1>
//       ))}
//       <CourseCard />
//     </div>
//   );
// };

// export default Reading;

// useEffect(() => {
//   startTransition(() => {
//     if (query.isLoading) {
//       setIsLoading(true);
//     } else if (query.error) {
//       setError(query.error);
//       setIsLoading(false);
//     } else {
//       setData(query.data);
//       setIsLoading(false);
//     }
//   });
// }, [query]);

// if (isLoading) return <p>Loading...</p>;
// if (error)
//   return (
//     <p className="p-4 sm:ml-64 mt-[88px] dark:text-white text-black">
//       Error: {error.message}
//     </p>
//   );

{
  /* <h1 className="text-des-1 text-text-des-light-mode dark:text-text-des-dark-mode">
        {t("title")}
      </h1>
      {data?.payload?.map((item) => (
        <h1 key={item.id} className=" text-black dark:text-white">
          {item.description}
        </h1>
      ))} */
}

// import { useAllReadingQuery } from "../../../../redux/features/skill/readingSlice";
// import { useTranslation } from "react-i18next";
// import React, { useState, useEffect } from "react";
// import CourseCard from "../../../../components/card/CourseCard";

// const Reading = () => {
//   const { t } = useTranslation("reading");

//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <div className="p-4 sm:ml-64 mt-[88px]">
//         <CourseCard />
//       </div>
//     </Suspense>
//   );
// };

// export default Reading;

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
    <div className="p-4 sm:ml-64 mt-[88px]">
      <Suspense fallback={<div>Loading...</div>}>
        <h1 className="text-des-1 text-text-des-light-mode dark:text-text-des-dark-mode">
          {t("title")}
        </h1>
        <div className="flex flex-col gap-10">
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
