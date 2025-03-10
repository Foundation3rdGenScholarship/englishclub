import React, { useState } from "react";

const TrueFalseQuiz = ({ exercises, ex_uuid }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log("Data In True False : ", exercises);

  // Handle selection
  const handleAnswerSelection = (questionId, choiceId) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: choiceId,
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

  // Find the correct choice for a question
  const getCorrectChoice = (question) => {
    return question.choices.find((choice) => choice.is_correct === true);
  };

  // Check if selected choice is correct
  const isChoiceCorrect = (question, selectedChoiceId) => {
    const selectedChoice = question.choices.find(
      (choice) => choice.choice_uuid === selectedChoiceId
    );
    return selectedChoice && selectedChoice.is_correct === true;
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {exercises.map((exercise, index) => {
        const selectedChoiceId = selectedAnswers[exercise.id];
        const isAnswerCorrect =
          selectedChoiceId && isChoiceCorrect(exercise, selectedChoiceId);
        const correctChoice = getCorrectChoice(exercise);

        return (
          <div key={exercise.id} className="mb-6">
            <h2 className="font-bold text-lg mb-2">
              {index + 1}. {exercise.question_text}
            </h2>
            <div className="flex gap-4">
              {exercise.choices.map((choice) => (
                <label
                  key={choice.choice_uuid}
                  className="flex items-center gap-2"
                >
                  <input
                    type="radio"
                    name={`exercise-${exercise.id}`}
                    value={choice.choice_uuid}
                    checked={selectedChoiceId === choice.choice_uuid}
                    onChange={() =>
                      handleAnswerSelection(exercise.id, choice.choice_uuid)
                    }
                    disabled={isSubmitted}
                    className="cursor-pointer"
                  />
                  {choice.text}
                </label>
              ))}
            </div>
            {isSubmitted && (
              <p
                className={`mt-2 ${
                  isAnswerCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isAnswerCorrect
                  ? "Correct!"
                  : `Incorrect. The correct answer is: ${
                      correctChoice ? correctChoice.text : "Not available"
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
