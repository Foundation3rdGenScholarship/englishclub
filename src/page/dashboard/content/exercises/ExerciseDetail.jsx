import { useParams } from "react-router-dom"; // To access the URL params
import {  useFetchExerciseByIdQuery } from "../../../../redux/features/exercises/exercisesSlice"; // Import the custom hook

const ExerciseDetail = () => {
  const { ex_uuid } = useParams(); // Extract the ex_uuid from the URL using useParams
  const { data, isLoading, error } =  useFetchExerciseByIdQuery(ex_uuid); // Use the query with ex_uuid as the argument

  console.log(data);

  if (isLoading) {
    return <div>Loading exercise details...</div>; // Show loading while fetching data
  }

  if (error) {
    return <div>Error fetching exercise details</div>; // Show error if there's a problem fetching the data
  }

  // If data is available, render exercise details
  return (
    <div className="max-w-screen-xl sm:ml-64 mt-[80px] mb-10">
      <div className="max-w-full">
        <div className="container mx-auto px-4">
          <div className="text-heading-4 h-[100px] md:h-auto md:text-heading-2 flex items-center gap-2">
            <h1 className="text-primary-500 dark:text-primary-500 py-5 font-bold">
				{data.title}
            </h1>
          </div>

          {/* Hero Section */}
          <div className="rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={data.thumbnail}
                alt="People collaborating at work"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Description */}
          <div className="p-4">
            <p className="text-black text-des-3 text-justify dark:text-text-des-dark-mode m-auto leading-10">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
