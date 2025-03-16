import React, { useState, useEffect } from "react";
import { submitExercises } from "../../services/submitExercises.js";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TrueFalseQuiz = ({ exercises, ex_uuid }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const { t } = useTranslation("error");
  // Check if user is logged in on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData?.user_uuid) {
      setUserLoggedIn(false);
    }
  }, []);

  // Initialize toast notifications with the same style as MultipleChoiceQuiz
  const notify = (message, type = "success") => {
    const colors = {
      success: { background: "#fff", text: "#4CAF50", progress: "#2E7D32" }, // White background, Green text
      error: { background: "#fff", text: "#F44336", progress: "#D32F2F" }, // White background, Red text
      warning: { background: "#fff", text: "#FFA000", progress: "#FF6F00" }, // White background, Yellow-Orange text
      info: { background: "#fff", text: "#2196F3", progress: "#0D47A1" }, // White background, Blue text
    };

    toast(message, {
      style: {
        backgroundColor: colors[type]?.background || "#333", // Default to dark gray if type not found
        color: colors[type]?.text || "#fff", // Apply the text color
        fontWeight: "bold",
      },
      progressStyle: {
        backgroundColor: colors[type]?.progress || "#555",
      },
    });
  };

  // Handle redirection to login page
  const handleRedirectToLogin = () => {
    // Replace with your actual login page URL
    window.location.href = "/login";
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
    // Check if user is logged in first
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData?.user_uuid) {
      notify("🔒 Please log in to submit your answers.", "info");
      setUserLoggedIn(false);
      return;
    }

    if (isAllAnswered) {
      setIsSubmitted(true);
      try {
        const answers = prepareAnswers();
        if (answers && answers.user_answer.length > 0) {
          const result = await submitExercises(ex_uuid, answers);

          if (result && result.success) {
            notify("🎉 Exercise submitted successfully!", "success");
          } else {
            // Check for specific error conditions
            if (result?.message?.includes("No user found")) {
              notify("🔒 Please log in to submit your answers.", "info");
              setUserLoggedIn(false);
            } else if (
              result?.message?.includes("already done this exercise")
            ) {
              notify(
                "⚠️ You've already completed this exercise. Try another one!",
                "warning"
              );
            } else {
              notify(`❌ ${t("trueFalse") || "Submission failed"}`, "error");
            }
          }
        } else {
          notify("❌ Error: No answers to submit", "error");
        }
      } catch (error) {
        notify(
          `🚨 Error: ${error.message || "Failed to submit exercises"}`,
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
    <div className="p-6 dark:bg-bg-dark-mode dark:text-text-des-dark-mode bg-white shadow-lg rounded-xl border dark:border-gray-700">
      {/* {!userLoggedIn && (
        <div className="mb-8 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-lg dark:bg-blue-900/20 dark:border-blue-600 shadow-sm">
          <div className="flex items-start">
            <div className="mr-3 flex-shrink-0 text-blue-600 dark:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2 text-lg">
                Account Required
              </h3>
              <p className="text-blue-600 dark:text-blue-200 mb-4">
                You need to log in or create an account to submit your answers
                and track your progress.
              </p>
              <button
                onClick={handleRedirectToLogin}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Log In / Sign Up
              </button>
            </div>
          </div>
        </div>
      )} */}

      <h2 className="text-xl font-bold mb-6 text-center text-black dark:text-white">
        True/False Quiz
      </h2>

      <div className="space-y-6">
        {exercises.map((exercise, index) => {
          const selectedChoiceId = selectedAnswers[exercise.id];
          const isAnswerCorrect =
            selectedChoiceId && isChoiceCorrect(exercise, selectedChoiceId);
          const correctChoice = getCorrectChoice(exercise);

          return (
            <div
              key={exercise.id}
              className="p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-all"
            >
              <div className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center bg-blue-500 text-white rounded-full w-8 h-8 mr-3 font-medium">
                  {index + 1}
                </span>
                <div className="flex-grow">
                  <h2
                    className="font-bold text-lg mb-3 text-black
                   dark:text-white"
                  >
                    {exercise.question_text}
                  </h2>

                  <div className="flex gap-4 mb-2">
                    {exercise.choices && exercise.choices.length > 0 ? (
                      exercise.choices.map((choice) => {
                        const isSelected =
                          selectedChoiceId === choice.choice_uuid;
                        const isCorrectChoice = choice.is_correct;

                        let buttonClass =
                          "flex-1 py-3 px-4 rounded-lg border font-medium transition-all text-center";

                        if (isSubmitted) {
                          if (isSelected && isCorrectChoice) {
                            buttonClass +=
                              " bg-green-100 border-green-500 text-green-700 dark:bg-green-900/30 dark:text-green-300";
                          } else if (isSelected && !isCorrectChoice) {
                            buttonClass +=
                              " bg-red-100 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300";
                          } else if (isCorrectChoice) {
                            buttonClass +=
                              " bg-green-50 border-green-300 text-green-600 dark:bg-green-900/20 dark:text-green-300";
                          } else {
                            buttonClass +=
                              " bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400";
                          }
                        } else {
                          buttonClass += isSelected
                            ? " bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500"
                            : " bg-white border-gray-300 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600";
                        }

                        return (
                          <label
                            key={choice.choice_uuid}
                            className={buttonClass}
                          >
                            <div className="flex items-center justify-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name={`exercise-${exercise.id}`}
                                value={choice.choice_uuid}
                                checked={isSelected}
                                onChange={() =>
                                  handleAnswerSelection(
                                    exercise.id,
                                    choice.choice_uuid
                                  )
                                }
                                disabled={isSubmitted}
                                className="sr-only"
                              />
                              {choice.text}

                              {isSubmitted && isSelected && (
                                <span className="ml-2">
                                  {isCorrectChoice ? (
                                    <svg
                                      className="w-5 h-5 text-green-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                      ></path>
                                    </svg>
                                  ) : (
                                    <svg
                                      className="w-5 h-5 text-red-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                      ></path>
                                    </svg>
                                  )}
                                </span>
                              )}
                            </div>
                          </label>
                        );
                      })
                    ) : (
                      <p className="text-gray-500 italic dark:text-gray-400">
                        No choices available for this question
                      </p>
                    )}
                  </div>

                  {isSubmitted && (
                    <div
                      className={`mt-3 p-3 rounded-md ${
                        isAnswerCorrect
                          ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
                          : "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500"
                      }`}
                    >
                      <p
                        className={`text-sm font-medium ${
                          isAnswerCorrect
                            ? "text-green-600 dark:text-green-300"
                            : "text-red-600 dark:text-red-300"
                        }`}
                      >
                        {isAnswerCorrect ? (
                          <span className="font-bold">Correct!</span>
                        ) : (
                          <>
                            <span className="font-bold">Incorrect.</span> The
                            correct answer is:{" "}
                            <span className="font-bold">
                              {correctChoice
                                ? correctChoice.text
                                : "Not available"}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!isAllAnswered || isSubmitted}
          className={`px-6 py-3 rounded-lg text-white font-medium transition-all shadow-md ${
            isAllAnswered && !isSubmitted
              ? "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed opacity-75"
          }`}
        >
          {isSubmitted ? "Submitted" : "Submit Answers"}
        </button>

        {isSubmitted && (
          <button
            onClick={() => window.location.reload()}
            className="ml-4 px-6 py-3 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
          >
            Try Again
          </button>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default TrueFalseQuiz;
