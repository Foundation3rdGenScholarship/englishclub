import React, { useState } from "react";

const TrueFalseQuiz = ({ exercises }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle selection
  const handleAnswerSelection = (exerciseId, answer) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [exerciseId]: answer,
      }));
    }
  };

  // Check if all questions are answered
  const isAllAnswered = exercises.every((exercise) =>
    selectedAnswers.hasOwnProperty(exercise.id)
  );

  // Handle submission
  const handleSubmit = () => {
    if (isAllAnswered) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      {exercises.map((exercise, index) => {
        const selectedAnswer = selectedAnswers[exercise.id];
        const isCorrect = selectedAnswer === exercise.correct_answer;

        return (
          <div key={exercise.id} className="mb-6">
            <h2 className="font-bold text-lg mb-2">
              {index + 1}. {exercise.question_text}
            </h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`exercise-${exercise.id}`}
                  value="true"
                  checked={selectedAnswer === true}
                  onChange={() => handleAnswerSelection(exercise.id, true)}
                  disabled={isSubmitted}
                  className="cursor-pointer"
                />
                True
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`exercise-${exercise.id}`}
                  value="false"
                  checked={selectedAnswer === false}
                  onChange={() => handleAnswerSelection(exercise.id, false)}
                  disabled={isSubmitted}
                  className="cursor-pointer"
                />
                False
              </label>
            </div>
            {isSubmitted && (
              <p
                className={`mt-2 ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect
                  ? "Correct!"
                  : `Incorrect. The correct answer is: ${
                      exercise.correct_answer ? "True" : "False"
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

export default TrueFalseQuiz;
