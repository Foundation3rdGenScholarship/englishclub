import React, { useState } from "react";

const MultipleChoiceQuiz = ({ exercises }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle answer selection
  const handleAnswerSelection = (exerciseId, choiceId) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [exerciseId]: choiceId,
      }));
    }
  };

  // Check if all questions are answered
  const isAllAnswered = exercises.every(
    (exercise) => selectedAnswers[exercise.id]
  );

  // Handle submission
  const handleSubmit = () => {
    if (isAllAnswered) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="text-black p-6 bg-white border-2 border-gray-600 dark:bg-bg-dark-mode dark:text-white shadow-md rounded-lg">
      {exercises.map((exercise, index) => {
        const selectedAnswer = selectedAnswers[exercise.id];
        const isCorrect =
          exercise.choices.find(
            (choice) => choice.choice_uuid === selectedAnswer
          )?.is_correct || false;

        return (
          <div key={exercise.id} className="mb-6">
            <h2 className="font-bold text-lg mb-2">
              {index + 1}. {exercise.question_text}
            </h2>
            {exercise.choices.map((choice) => (
              <div key={choice.choice_uuid} className="mb-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`exercise-${exercise.id}`}
                    value={choice.choice_uuid}
                    checked={selectedAnswer === choice.choice_uuid}
                    onChange={() =>
                      handleAnswerSelection(exercise.id, choice.choice_uuid)
                    }
                    disabled={isSubmitted}
                    className="cursor-pointer"
                  />
                  {choice.text}
                </label>
              </div>
            ))}
            {isSubmitted && (
              <p
                className={`mt-2 ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect
                  ? "Correct!"
                  : `Incorrect. Correct answer: ${
                      exercise.choices.find((c) => c.is_correct)?.text
                    }`}
              </p>
            )}
          </div>
        );
      })}

      <button
        onClick={handleSubmit}
        disabled={!isAllAnswered || isSubmitted}
        className={`px-4 py-2 rounded-lg text-white ${
          isAllAnswered && !isSubmitted
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit
      </button>
    </div>
  );
};

export default MultipleChoiceQuiz;
