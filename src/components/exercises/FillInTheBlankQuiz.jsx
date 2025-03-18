import React, { useState, useEffect } from "react";
import { submitExercises } from "../../services/submitExercises.js";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import successSound from "../../../public/sounds/correct.mp3"; // Happy sound
import failureSound from "../../../public/sounds/failure.mp3"; // Sad sound

const FillInTheBlankQuiz = ({ exercises, ex_uuid }) => {
  const { t } = useTranslation("error");
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  console.log("Data Exer ; ", exercises);

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
      success: { background: "#fff", text: "#4CAF50", progress: "#2E7D32" },
      error: { background: "#fff", text: "#F44336", progress: "#D32F2F" },
      warning: { background: "#fff", text: "#FFA000", progress: "#FF6F00" },
      info: { background: "#fff", text: "#2196F3", progress: "#0D47A1" },
    };

    toast(message, {
      style: {
        backgroundColor: colors[type]?.background || "#333",
        color: colors[type]?.text || "#fff",
        fontWeight: "bold",
      },
      progressStyle: {
        backgroundColor: colors[type]?.progress || "#555",
      },
    });
  };

  const handleInputChange = (exerciseId, value) => {
    if (!isSubmitted) {
      setAnswers((prev) => ({
        ...prev,
        [exerciseId]: value.trim(),
      }));

      // Clear validation error when user starts typing
      if (validationErrors[exerciseId]) {
        setValidationErrors((prev) => ({
          ...prev,
          [exerciseId]: false,
        }));
      }
    }
  };

  const isAllFilled = exercises.every(
    (exercise) => answers[exercise.id]?.length > 0
  );

  const prepareAnswers = () => {
    return {
      user_answer: exercises.map((exercise) => ({
        q_uuid: exercise.question_uuid,
        answers: [answers[exercise.id] || ""],
      })),
    };
  };

  const validateAnswers = () => {
    const errors = {};
    let hasErrors = false;

    exercises.forEach((exercise) => {
      if (!answers[exercise.id] || answers[exercise.id].trim() === "") {
        errors[exercise.id] = true;
        hasErrors = true;
      }
    });

    setValidationErrors(errors);
    return !hasErrors;
  };

  // Handle redirection to login page
  const handleRedirectToLogin = () => {
    // Replace with your actual login page URL
    window.location.href = "/login";
  };

  // Function to play sound
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  // playSound(failureSound);

  // playSound(successSound);

  const handleSubmit = async () => {
    // Validate all answers first
    if (!validateAnswers()) {
      notify("❌ Please fill in all blanks before submitting", "error");
      return;
    }

    if (!isSubmitted) {
      setIsSubmitted(true);
      const formattedAnswers = prepareAnswers();

      try {
        const result = await submitExercises(ex_uuid, formattedAnswers);

        if (result.success) {
          notify("🎉 Exercise submitted successfully!", "success");

          // Check if all answers are correct
          const allCorrect = exercises.every(
            (exercise) =>
              String(answers[exercise.id]?.toLowerCase()) ===
              String(exercise.correct_answer?.answer.toLowerCase())
          );

          if (allCorrect) {
            playSound(successSound); // 🎉 Play happy sound
          } else {
            playSound(failureSound); // 😢 Play sad sound
          }
        } else {
          notify(`⚠️ You've already completed this exercise!", "warning"`);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        notify(`❌ Error: ${error.message || "Something went wrong"}`, "error");
        setIsSubmitted(false);
      }
    }
  };

  return (
    <div className="p-6 dark:bg-bg-dark-mode dark:text-text-des-dark-mode bg-white shadow-lg rounded-xl border dark:border-gray-700">
      <h2 className="text-xl font-bold mb-6 text-center dark:text-white text-black">
        Fill in the Blank Quiz
      </h2>

      <div className="space-y-8">
        {exercises.map((exercise, index) => {
          const userAnswer = answers[exercise.id] || "";
          const isCorrect =
            isSubmitted &&
            String(userAnswer).toLowerCase() ===
              String(exercise.correct_answer?.answer || "").toLowerCase();
          const hasError = validationErrors[exercise.id];

          const parts = exercise.question_text.split("_____");

          return (
            <div
              key={exercise.id}
              className="p-4 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 transition-all hover:shadow-md"
            >
              <div className="flex items-start">
                <span className="flex-shrink-0 flex items-center justify-center bg-blue-500 text-black dark:text-white rounded-full w-8 h-8 mr-3 font-medium shadow-sm">
                  {index + 1}
                </span>
                <div className="flex-grow">
                  <p className="text-lg leading-relaxed text-black dark:text-gray-100">
                    {parts.map((part, partIndex, array) => (
                      <span key={partIndex}>
                        {part}
                        {partIndex < array.length - 1 && (
                          <span className="relative inline-block mx-1">
                            <input
                              type="text"
                              className={`dark:bg-gray-700 rounded-md border focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 p-2 px-3 text-center w-40 outline-none transition-all ${
                                isSubmitted
                                  ? isCorrect
                                    ? "border-green-500 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300"
                                    : "border-red-500 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300"
                                  : hasError
                                  ? "border-red-500 dark:border-red-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                              value={userAnswer}
                              onChange={(e) =>
                                handleInputChange(exercise.id, e.target.value)
                              }
                              disabled={isSubmitted}
                              placeholder="Type answer..."
                            />
                            {isSubmitted && (
                              <span className="absolute -right-2 -top-2">
                                {isCorrect ? (
                                  <span className="flex items-center justify-center w-6 h-6 bg-green-500 text-black dark:text-white rounded-full text-xs">
                                    ✓
                                  </span>
                                ) : (
                                  <span className="flex items-center justify-center w-6 h-6 bg-red-500 text-black dark:text-white rounded-full text-xs">
                                    ✗
                                  </span>
                                )}
                              </span>
                            )}
                            {hasError && !isSubmitted && (
                              <p className="text-xs text-red-500 mt-1">
                                This field is required
                              </p>
                            )}
                          </span>
                        )}
                      </span>
                    ))}
                  </p>

                  {isSubmitted && (
                    <div
                      className={`mt-3 p-3 rounded-md ${
                        isCorrect
                          ? "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500"
                          : "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500"
                      }`}
                    >
                      <p
                        className={`text-sm font-medium ${
                          isCorrect
                            ? "text-green-600 dark:text-green-300"
                            : "text-red-600 dark:text-red-300"
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <span className="font-bold">Correct!</span> Great
                            job!
                          </>
                        ) : (
                          <>
                            <span className="font-bold">Incorrect.</span>{" "}
                            Correct answer:{" "}
                            <span className="font-bold">
                              {exercise.correct_answer?.answer || "N/A"}
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

      <div className="mt-8 flex justify-end">
        <>
          <button
            onClick={handleSubmit}
            disabled={isSubmitted}
            className={`px-6 py-3 rounded-lg text-white font-medium transition-all shadow-md ${
              !isSubmitted
                ? "bg-secondary-400 hover:bg-secondary-600"
                : "bg-secondary-200 cursor-not-allowed"
            }`}
          >
            {isSubmitted ? "Submitted" : "Submit Answers"}
          </button>

          {isSubmitted && (
            <button
              onClick={() => window.location.reload()}
              className="ml-4 px-6 py-3 rounded-lg border border-primary-950 text-primary-950 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
            >
              Try Again
            </button>
          )}
        </>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default FillInTheBlankQuiz;
