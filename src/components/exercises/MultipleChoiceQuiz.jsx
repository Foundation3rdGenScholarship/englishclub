import React, { useState, useEffect } from "react";
import { submitExercises } from "../../services/submitExercises.js";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MultipleChoiceQuiz = ({ exercises, ex_uuid }) => {
  const { t } = useTranslation("error");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData?.user_uuid) {
      setUserLoggedIn(false);
    }
  }, []);

  // Initialize toast notifications
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

  // Function to play sound
  const playSound = (soundName) => {
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    // audio.play();
  };

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

  // Prepare the answers object
  const prepareAnswers = () => {
    return {
      user_answer: exercises.map((exercise) => ({
        q_uuid: exercise.question_uuid,
        answers: selectedAnswers[exercise.id]
          ? [selectedAnswers[exercise.id]]
          : [],
      })),
    };
  };

  // Handle redirection to login page
  const handleRedirectToLogin = () => {
    // Replace with your actual login page URL
    window.location.href = "/login";
  };

  // Handle submission
  const handleSubmit = async () => {
    // Check if user is logged in first
    // const userData = JSON.parse(localStorage.getItem("user"));
    // if (!userData?.user_uuid) {
    //   notify("🔒 Please log in to submit your answers.", "info");
    //   setUserLoggedIn(false);
    //   return;
    // }

    if (!isAllAnswered) {
      notify("⚠️ Please answer all questions before submitting.", "error");
      return;
    }

    setIsSubmitted(true);
    const answers = prepareAnswers();

    try {
      const result = await submitExercises(ex_uuid, answers);

      if (result.success) {
        notify("🎉 Exercise submitted successfully!", "success");

        // Play the correct sound for each correct answer
        exercises.forEach((exercise, index) => {
          const selectedAnswer = selectedAnswers[exercise.id];
          const isCorrect =
            exercise.choices.find(
              (choice) => choice.choice_uuid === selectedAnswer
            )?.is_correct || false;

          if (isCorrect) {
            playSound(`correct${index + 1}`);
          }
        });
      } else {
        let errorMessage = result.message || t("multipleChoics");

        if (errorMessage.includes("No user found")) {
          notify("🔒 Please log in to submit your answers.", "info");
          setUserLoggedIn(false);
        } else if (errorMessage.includes("already done this exercise")) {
          notify(
            "⚠️ You've already completed this exercise. Try another one!",
            "warning"
          );
        } else {
          notify(`❌ Submission failed: ${errorMessage}`, "error");
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      notify("🚨 An unexpected error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="text-black p-6 border-2 border-gray-200 dark:border-gray-600 dark:bg-bg-dark-mode dark:text-white shadow-md rounded-lg">

      {exercises.map((exercise, index) => {
        const selectedAnswer = selectedAnswers[exercise.id];
        const isCorrect =
          exercise.choices.find(
            (choice) => choice.choice_uuid === selectedAnswer
          )?.is_correct || false;
        const correctChoice = exercise.choices.find((c) => c.is_correct);

        return (
          <div
            key={exercise.id}
            className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <h2 className="font-bold text-heading-4 mb-3 text-primary-100">
              {index + 1}. {exercise.question_text}
            </h2>
            <div className="space-y-2">
              {exercise.choices.map((choice) => {
                const isSelected = selectedAnswer === choice.choice_uuid;
                const isCorrectChoice = choice.is_correct;

                let optionClass =
                  "p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700";

                if (isSubmitted) {
                  if (isSelected && isCorrectChoice) {
                    optionClass += " bg-green-100 dark:bg-green-900/50";
                  } else if (isSelected && !isCorrectChoice) {
                    optionClass += " bg-red-100 dark:bg-red-900/50";
                  } else if (isCorrectChoice) {
                    optionClass += " bg-green-50 dark:bg-green-900/30";
                  }
                } else if (isSelected) {
                  optionClass += " bg-blue-100 dark:bg-blue-900/50";
                }

                return (
                  <div key={choice.choice_uuid} className={optionClass}>
                    <label className="flex items-center gap-3 w-full cursor-pointer text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode">
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-primary-500"
                            : "border-gray-300 dark:border-gray-500"
                        }`}
                      >
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-primary-500" />
                        )}
                      </div>
                      <span>{choice.text}</span>

                      {isSubmitted && isCorrectChoice && (
                        <svg
                          className="w-5 h-5 text-green-500 ml-auto"
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
                      )}

                      <input
                        type="radio"
                        name={`exercise-${exercise.id}`}
                        value={choice.choice_uuid}
                        checked={selectedAnswer === choice.choice_uuid}
                        onChange={() =>
                          handleAnswerSelection(exercise.id, choice.choice_uuid)
                        }
                        disabled={isSubmitted}
                        className="sr-only"
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            {isSubmitted && (
              <p
                className={`mt-3 p-2 rounded ${
                  isCorrect
                    ? "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-200"
                    : "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-200"
                }`}
              >
                {isCorrect
                  ? "Correct!"
                  : `Incorrect. Correct answer: ${correctChoice?.text}`}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!isAllAnswered || isSubmitted}
          className={`px-4 py-2 rounded-lg text-white transition-colors ${
            isAllAnswered && !isSubmitted
              ? "bg-secondary-400 hover:bg-secondary-600"
              : "bg-secondary-200 cursor-not-allowed"
          }`}
        >
          {isSubmitted ? "Submitted" : "Submit"}
        </button>

        {isSubmitted && (
          <button
            onClick={() => window.location.reload()}
            className="ml-3 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
          >
            Try Again
          </button>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MultipleChoiceQuiz;
