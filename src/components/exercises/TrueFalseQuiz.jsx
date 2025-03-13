import React, { useState } from "react";
import { submitExercises } from "../../services/submitExercises.js";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrueFalseQuiz = ({ exercises, ex_uuid }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation("error");

  console.log("Data In True False : ", exercises);

  const notify = (message, type = "success") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const prepareAnswers = () => {
    if (!exercises || exercises.length === 0) {
      console.warn("No exercises found to prepare answers");
      return { user_answer: [] };
    }

    const user_answer = exercises
      .filter((exercise) => selectedAnswers[exercise.id])
      .map((exercise) => ({
        q_uuid: exercise.question_uuid,
        answers: [selectedAnswers[exercise.id]],
      }));

    return { user_answer };
  };

  const handleAnswerSelection = (questionId, choiceId) => {
    if (!isSubmitted) {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: choiceId,
      }));
    }
  };

  const isAllAnswered =
    exercises &&
    exercises.length > 0 &&
    exercises.every((exercise) => selectedAnswers.hasOwnProperty(exercise.id));

  const handleSubmit = async () => {
    if (isAllAnswered) {
      setIsSubmitted(true);
      try {
        const answers = prepareAnswers();
        if (answers && answers.user_answer.length > 0) {
          const result = await submitExercises(ex_uuid, answers);

          if (result && result.success) {
            notify("Exercise submitted successfully!", "success");
          } else {
            notify(t("trueFalse") || "Submission failed", "error");
          }
        } else {
          notify("Error: No answers to submit", "error");
        }
      } catch (error) {
        notify(
          `Error: ${error.message || "Failed to submit exercises"}`,
          "error"
        );
      }
    }
  };

  const getCorrectChoice = (question) => {
    return question.choices.find((choice) => choice.is_correct === true);
  };

  const isChoiceCorrect = (question, selectedChoiceId) => {
    const selectedChoice = question.choices.find(
      (choice) => choice.choice_uuid === selectedChoiceId
    );
    return selectedChoice && selectedChoice.is_correct === true;
  };

  if (!exercises || exercises.length === 0) {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        No exercises available
      </div>
    );
  }

  return (
    <div className="p-6 dark:bg-bg-dark-mode dark:text-text-des-dark-mode dark:border-text-des-dark-mode dark:border-2 bg-white shadow-md rounded-lg">
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
              {exercise.choices && exercise.choices.length > 0 ? (
                exercise.choices.map((choice) => (
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
                ))
              ) : (
                <p>No choices available for this question</p>
              )}
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default TrueFalseQuiz;
