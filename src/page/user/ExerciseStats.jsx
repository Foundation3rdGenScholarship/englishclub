import React from "react";
import Chart from "react-apexcharts";

const ExerciseStats = ({
  totalA1,
  totalA2,
  totalB1,
  totalB2,
  totalC1,
  totalC2,
}) => {
  const options = {
    xaxis: {
      categories: ["សរុបទាំងអស់", "C2", "C1", "B2", "B1", "A2", "A1"],
      labels: {
        show: true,
        style: {
          colors: [
            "#F16622",
            "#F16622",
            "#F16622",
            "#F16622",
            "#F16622",
            "#F16622",
            "#F16622",
          ],
          fontSize: "15px",
          fontFamily: "Suwannaphum",
        },
      },
    },
    markers: {
      size: 5,
      hover: {
        size: 10,
      },
    },
    plotOptions: {
      radar: {
        polygons: {
          strokeColor: "#e8e8e8",
          fill: {
            colors: ["#f8f8f8", "#fff"],
          },
        },
      },
    },
  };

  const series = [
    {
      name: "Exercises",
      data: [100, totalC2, totalC1, totalB2, totalB1, totalA2, totalA1],
      color: "#0EBC87",
    },
  ];

  return (
    <div className="p-4 sm:ml-64 mt-[88px] max-w-screen-xl grid lg:grid-flow-col place-items-center place-content-center text-second bg-gray-200 dark:bg-gray-900 rounded-xl">
      <div className="w-[20rem] h-[20rem] md:w-[25rem] md:h-[25rem] lg:w-[30rem] lg:h-[30rem] chart">
        <Chart
          options={options}
          series={series}
          type="radar"
          width="100%"
          height="100%"
        />
      </div>
      <img
        className="h-[300px]"
        src="https://project-english-club.vercel.app/assets/completion-sMDCzGAI.png"
        alt="Completion"
      />
    </div>
  );
};

export default ExerciseStats;
