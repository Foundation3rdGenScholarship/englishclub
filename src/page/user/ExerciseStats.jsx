import React from "react";
import ReactApexChart from "react-apexcharts";
import {
  useFetchExercisesQuery,
  useFetchSubmitExercisesQuery,
  useFetchSubmitExercisesByLevelQuery,
} from "../../redux/features/exercises/exerciseApi";
import { useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
const ExerciseStats = () => {
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation("userProfile");
  const { data: allExercises, isLoading: isExercisesLoading } =
    useFetchExercisesQuery();
  console.log("AllExercises: ", allExercises?.length);
  const { data: submitExercises, isLoading: isSubmitExercisesLoading } =
    useFetchSubmitExercisesQuery(userData?.user_uuid);

  const levels = ["A1", "A2", "B1", "B2", "C1"];
  const exercisesByLevel = levels.map((level) => {
    const { data: exercises } = useFetchSubmitExercisesByLevelQuery({
      user_uuid: userData?.user_uuid,
      level,
    });
    return { level, exercises };
  });
  console.log("ExerciseByLevel: ", exercisesByLevel);

  // Group exercises by level
  const groupedExercises =
    allExercises?.reduce((acc, exercise) => {
      const level = exercise.exercise_level;
      if (!acc[level]) acc[level] = [];
      acc[level].push(exercise);
      return acc;
    }, {}) || {};
  console.log("GroupedExercise: ", groupedExercises);

  // Calculate completion percentage
  const totalA1 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "A1"
  );
  console.log("TotalA1: ", totalA1);
  const totalA2 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "A2"
  );
  const totalB1 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "B1"
  );
  const totalB2 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "B2"
  );
  const totalC1 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "C1"
  );

  const [state, setState] = useState(() => {
    // Retrieve stored data or set default values
    const storedState = localStorage.getItem("chartState");
    return storedState
      ? JSON.parse(storedState)
      : {
          series: [
            groupedExercises?.A1?.length || 13,
            groupedExercises?.A2?.length || 1,
            groupedExercises?.B1?.length || 6,
            groupedExercises?.B2?.length || 1,
            groupedExercises?.C1?.length || 5,
          ],
          options: {
            chart: { type: "donut" },
            labels: ["A1", "A2", "B1", "B2", "C1"],
            colors: ["#fbae2f", "#fcb746", "#c98413", "#fcc05d", "#e29516"],
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: { width: 200 },
                  legend: { position: "bottom" },
                },
              },
            ],
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      show: true,
                      label: "Total of Exercises",
                      formatter: function (w) {
                        return allExercises?.length || 26;
                      },
                    },
                  },
                },
              },
            },
            dataLabels: {
              enabled: true,
              formatter: function (val, opts) {
                return (
                  opts.w.globals.labels[opts.seriesIndex] +
                  ": " +
                  val.toFixed(2) +
                  "%"
                );
              },
            },
            legend: { position: "right" },
          },
        };
  });

  // Store state in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("chartState", JSON.stringify(state));
  }, [state]);

  return (
    <div className="p-4 sm:ml-64 mt-[88px] max-w-screen-xl  place-items-center place-content-center text-second bg-bg-light-mode dark:bg-gray-900 rounded-xl">
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
        {t("rate of exercises")}{" "}
        <span className="text-secondary-500">{t("by level")}</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-center items-center">
        <div className="w-[25rem] h-[18rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] chart order-2 mx-auto">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            width="100%"
            height="100%"
            className="flex justify-center items-center"
          />
        </div>
        <img
          className="h-[450px] order-1"
          src="../../../public/svg/UserProfile.svg"
          alt="Completion"
        />
      </div>
    </div>
  );
};

const calculateCompletionPercentage = (
  exercisesByLevel,
  groupedExercises,
  level
) => {
  const submittedForLevel =
    exercisesByLevel.find((item) => item.level === level)?.exercises?.payload
      ?.length || 0;
  const totalForLevel = groupedExercises[level]?.length || 0;
  return totalForLevel > 0
    ? parseFloat(((submittedForLevel / totalForLevel) * 100).toFixed())
    : 0;
};

export default ExerciseStats;
