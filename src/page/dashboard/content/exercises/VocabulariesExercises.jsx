import React from "react";
// import { useParams } from "react-router-dom";
import { useParams } from "react-router";
import HeroLevel from "../../../../components/heroCard/HeroLevel";
import MultipleChoiceQuiz from "../../../../components/exercises/MultipleChoiceQuiz";
import { useAllVocabulariesQuery } from "../../../../redux/features/vocabularies/VocabulariesSlice";
import FillInTheBlankQuiz from "../../../../components/exercises/FillInTheBlankQuiz";
import fillInTheBlankData from "../../../../components/quiz/00895195-49a4-4943-ba46-5128b21ca67d";

export default function VocabulariesExercises() {
  const { lessonId } = useParams(); // Get lesson ID from URL
  const { data } = useAllVocabulariesQuery();

  console.log("Data query in vocabulary  : ", data);
  const allData = data?.payload;
  const exercises = allData?.flatMap((item) => item.lessons[0].exercises) || [];
  console.log("This is exercises : ", exercises[0]?.questions);

  const ex_uuid = exercises[0]?.ex_uuid;

  // Find the lesson with the matching ID
  const lesson = allData
    ?.flatMap((item) => item.lessons)
    .find((l) => l.lesson_uuid === lessonId);

  if (!lesson) return <p>Lesson not found</p>;
  //   console.log("Section : ", lesson[0].sections);
  //const { ex_uuid } = useParams(); // Extract the ex_uuid from the URL using useParams
  //const { allData, isLoading, error } = useFetchExerciseByIdQuery(ex_uuid); // Use the query with ex_uuid as the argument
  const exercisesData = exercises[0]?.questions.map((item, index) => ({
    id: index + 1,
    question_text: item.question_text,
    question_uuid: item.q_uuid, // this is an question uuid
    correct_answer: item.correct_answer[0].answer || "", // Ensure correct_answer is a string
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
                  {/* <iframe
                    title="vimeo-player"
                    src="https://player.vimeo.com/video/950458364?h=a06c6f907a"
                    className="w-full h-full"
                    frameborder="0"
                    allowfullscreen
                  ></iframe> */}
                  {section.section_uuid ===
                    "00a52469-946d-4cc3-9952-205c6e82b39b" && (
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/ugsRzHMIF2o"
                      title="Jobs and Occupations - Vocabulary for Kids - Compilation"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                  )}
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
              {/* {exercise?.questions.map((items) => {})} */}
              <div className="flex flex-col gap-10">
                <MultipleChoiceQuiz
                  exercises={exercisesData}
                  ex_uuid={ex_uuid}
                />
                {
                  <FillInTheBlankQuiz
                    exercises={fillInTheBlankData}
                    ex_uuid={"00895195-49a4-4943-ba46-5128b21ca67d"}
                  />
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
//00895195-49a4-4943-ba46-5128b21ca67d
