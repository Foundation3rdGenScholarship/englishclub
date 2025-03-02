import { useParams } from "react-router-dom"; // To access the URL params
import { useExerciseDetailsQuery } from "../../../../redux/features/exercises/exercisesSlice"; // Import the custom hook
import FillInTheBlankQuiz from "../../../../components/exercises/FillInTheBlankQuiz";
import DOMPurify from "dompurify";

// import {MultipleChoice} from "../../../../components/exercises/MultipleChoice";
import MultipleChoice from "../../../../components/exercises/MultipleChoice";
import MultipleChoiceQuiz from "../../../../components/exercises/MultipleChoiceQuiz";
import TrueFalseQuiz from "../../../../components/exercises/TrueFalseQuiz";

const ExerciseDetail = () => {
  const { ex_uuid } = useParams(); // Extract the ex_uuid from the URL using useParams
  const { data, isLoading, error } = useExerciseDetailsQuery(ex_uuid); // Use the query with ex_uuid as the argument

  // for Exercises :
  // const exerciseData = {
  //   choices: [
  //     {
  //       choice_uuid: "2b458b36-c8d1-4723-acce-548bef5dd889",
  //       is_correct: true,
  //       text: "I'm angry.",
  //     },
  //     {
  //       choice_uuid: "c8aaf162-c7ff-4cf9-9945-cf4ed307f79f",
  //       is_correct: false,
  //       text: "I'm sad.",
  //     },
  //     {
  //       choice_uuid: "31f46cf-082a-44bb-8462-da9240ca1595",
  //       is_correct: false,
  //       text: "I'm happy.",
  //     },
  //   ],
  //   correct_answer: [{ answer: "I'm angry." }],
  //   question_text: "What does 'sargh' mean?",
  //   type: "TRUE_OR_FALSE",
  // };

  // const exercisesData = [
  //   {
  //     id: 1,
  //     question_text: "How do you feel?",
  //     choices: [
  //       { choice_uuid: "1", is_correct: true, text: "I'm angry." },
  //       { choice_uuid: "2", is_correct: false, text: "I'm sad." },
  //       { choice_uuid: "3", is_correct: false, text: "I'm happy." },
  //     ],
  //   },
  // ];

  // Assuming 'data' is your original array from the console output

  // console.log(exercisesData);

  // Rendering the component
  // <MultipleChoiceQuiz exercises={exercisesData} />;

  if (isLoading) {
    return <div>Loading exercise details...</div>; // Show loading while fetching data
  }

  if (error) {
    return <div>Error fetching exercise details</div>; // Show error if there's a problem fetching the data
  }
  data?.questions.map((item) => {
    console.log(item.question_text);
  });

  const transcript = data?.transcript || "";

  const exercisesData = data?.questions.map((item, index) => {
    return {
      id: index + 1,
      question_text: item.question_text,
      choices: item.choices.map((choice) => ({
        choice_uuid: choice.choice_uuid,
        is_correct: choice.is_correct,
        text: choice.text,
      })),
    };
  });

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
          <div className="max-w-[1000px]">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(transcript),
              }}
            />
          </div>

          {/* <div>
            <MultipleChoice exercise={exerciseData} />
          </div> */}
          <div>
            {data?.questions[0].type?.toUpperCase() === "TRUE_OR_FALSE" ? (
              <TrueFalseQuiz exercises={exercisesData} />
            ) : // <h1>"for true and false question"</h1>
            data?.questions[0].type?.toUpperCase() === "MULTIPLE_CHOICES" ? (
              <MultipleChoiceQuiz exercises={exercisesData} />
            ) : data?.questions[0].type?.toUpperCase() ===
              "FILL_IN_THE_BLANK" ? (
              <FillInTheBlankQuiz exercises={exercisesData} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
