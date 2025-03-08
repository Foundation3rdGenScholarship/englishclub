import React from "react";
import { useParams } from "react-router-dom";
// import { useParams } from "react-router";
import { useAllGrammarQuery } from "../../../../redux/features/grammar/grammarSlice";
import HeroLevel from "../../../../components/heroCard/HeroLevel";

export default function GrammarExercises() {
  const { lessonId } = useParams(); // Get lesson ID from URL
  const { data } = useAllGrammarQuery();
  console.log("Data query : ", data);

  // Find the lesson with the matching ID
  const lesson = data
    ?.flatMap((item) => item.lessons)
    .find((l) => l.lesson_uuid === lessonId);

  if (!lesson) return <p>Lesson not found</p>;
  //   console.log("Section : ", lesson[0].sections);
  //const { ex_uuid } = useParams(); // Extract the ex_uuid from the URL using useParams
  //const { data, isLoading, error } = useFetchExerciseByIdQuery(ex_uuid); // Use the query with ex_uuid as the argument
  return (
    <div className="p-4 sm:ml-64 mt-[88px]">
      <HeroLevel
        title={lesson.lesson_title}
        thumnail={lesson.thumbnail}
        description={lesson.description}
      />
      <div className="max-w-screen-lg m-auto">
        <ul>
          {lesson.sections?.map((section, index) => (
            <li key={index}>
              <h3 className="font-semibold text-heading-4">{section.title}</h3>
              <p className="text-des-3 leading-10">{section.description}</p>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold text-heading-4">Exercises</h3>
        <ul className="list-disc ml-5">
          {lesson.exercises?.map((exercise, index) => (
            <li key={index}>
              <h3 className="font-semibold">{exercise.lesson_title}</h3>
              <p>Lesson Level: {exercise.lesson_level}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
