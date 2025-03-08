import React from "react";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router";
import { useAllGrammarQuery } from "../../../../redux/features/grammar/grammarSlice";
import HeroLevel from "../../../../components/heroCard/HeroLevel";
import MultipleChoiceQuiz from "../../../../components/exercises/MultipleChoiceQuiz";

export default function GrammarExercises() {
  const { lessonId } = useParams(); // Get lesson ID from URL
  const { data } = useAllGrammarQuery();
  console.log("Data query : ", data);
  const exercises = data?.flatMap((item) => item.lessons[0].exercises) || [];
  console.log("This is exercises : ", exercises[0]?.questions);

  // Find the lesson with the matching ID
  const lesson = data
    ?.flatMap((item) => item.lessons)
    .find((l) => l.lesson_uuid === lessonId);

  if (!lesson) return <p>Lesson not found</p>;
  //   console.log("Section : ", lesson[0].sections);
  //const { ex_uuid } = useParams(); // Extract the ex_uuid from the URL using useParams
  //const { data, isLoading, error } = useFetchExerciseByIdQuery(ex_uuid); // Use the query with ex_uuid as the argument
  const exercisesData = exercises[0]?.questions.map((item, index) => ({
    id: index + 1,
    question_text: item.question_text,
    correct_answer: item.correct_answer?.answer || "", // Ensure correct_answer is a string
    choices: item.choices.map((choice) => ({
      choice_uuid: choice.choice_uuid,
      is_correct: choice.is_correct,
      text: choice.text,
    })),
  }));
  return (
    <div className="p-4 sm:ml-64 mt-[88px]">
      <HeroLevel
        title={lesson.lesson_title}
        thumnail={lesson.thumbnail}
        description={lesson.description}
      />
      <div className="max-w-screen-lg m-auto">
        <ul className="w-full">
          {lesson.sections?.map((section, index) => (
            <li key={index}>
              <h3 className="font-semibold text-heading-4 text-primary-600 dark:text-white">
                {section.title}
              </h3>
              <p className="text-des-3 leading-10 text-text-des-light-mode dark:text-text-des-dark-mode">
                {section.description}
              </p>
              {/* This is for voice and video :  */}
              {section.voice && section.voice[0] && (
                <div className="w-full aspect-video">
                  {/* <div
                  dangerouslySetInnerHTML={{
                    __html: section.voice[0].voice_url,
                  }}
                  /> */}
                  <iframe
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/950458364?h=a06c6f907a"
                    className="w-full h-full"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
              {/* This is for example :  */}
              <p className="font-semibold text-heading-4 text-primary-600 dark:text-whites py-5">
                Example :{" "}
              </p>
              {section.examples && section.examples[0] && (
                <div
                  className="text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode leading-8"
                  dangerouslySetInnerHTML={{
                    __html: section.examples[0].example,
                  }}
                />
              )}
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-heading-4 text-primary-600 dark:text-white py-5">
          Reading :
        </h3>
        <div className="ml-5">
          {lesson.exercises?.map((exercise, index) => (
            <div key={index}>
              {/* <h3 className="font-semibold text-primary-600 dark:text-white">
                {exercise.lesson_title}
              </h3> */}
              <p
                className="text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode leading-8"
                dangerouslySetInnerHTML={{
                  __html: exercise.transcript,
                }}
              ></p>
              <h3 className="font-semibold text-heading-4 text-primary-600 dark:text-white py-5">
                Tip :
              </h3>
              <p
                className="text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode leading-8"
                dangerouslySetInnerHTML={{
                  __html: exercise.tip,
                }}
              ></p>
              {/* <div>{exercise.description.examples[0]}</div> */}
              {exercise?.questions.map((items) => {})}
            </div>
          ))}
          
          <MultipleChoiceQuiz exercises={exercisesData} />
        </div>
      </div>
    </div>
  );
}
