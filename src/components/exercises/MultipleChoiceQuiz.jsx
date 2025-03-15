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
    const isDarkMode =
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const colors = {
      success: {
        light: { background: "#fff", text: "#4CAF50", progress: "#2E7D32" },
        dark: { background: "#1E1E1E", text: "#81C784", progress: "#66BB6A" },
      },
      error: {
        light: { background: "#fff", text: "#F44336", progress: "#D32F2F" },
        dark: { background: "#1E1E1E", text: "#E57373", progress: "#EF5350" },
      },
      warning: {
        light: { background: "#fff", text: "#FFA000", progress: "#FF6F00" },
        dark: { background: "#1E1E1E", text: "#FFB74D", progress: "#FF9800" },
      },
      info: {
        light: { background: "#fff", text: "#2196F3", progress: "#0D47A1" },
        dark: { background: "#1E1E1E", text: "#64B5F6", progress: "#42A5F5" },
      },
    };

    const theme = isDarkMode ? "dark" : "light";
    const colorScheme = colors[type]?.[theme] || {
      background: isDarkMode ? "#1E1E1E" : "#fff",
      text: isDarkMode ? "#fff" : "#000",
      progress: isDarkMode ? "#888" : "#555",
    };

    toast(message, {
      style: {
        backgroundColor: colorScheme.background,
        color: colorScheme.text,
        fontWeight: "bold",
      },
      progressStyle: {
        backgroundColor: colorScheme.progress,
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
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData?.user_uuid) {
      notify("🔒 Please log in to submit your answers.", "info");
      setUserLoggedIn(false);
      return;
    }

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
    <div className="text-black p-6 bg-white border-2 border-gray-600 dark:bg-bg-dark-mode dark:text-white shadow-md rounded-lg">
      {/* {!userLoggedIn && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/30 dark:border-blue-800">
          <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
            Account Required
          </h3>
          <p className="text-blue-600 dark:text-blue-200 mb-4">
            You need to log in or create an account to submit your answers and
            track your progress.
          </p>
          <button
            onClick={handleRedirectToLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Log In / Sign Up
          </button>
        </div>
      )} */}

      {exercises.map((exercise, index) => {
        const selectedAnswer = selectedAnswers[exercise.id];
        const isCorrect =
          exercise.choices.find(
            (choice) => choice.choice_uuid === selectedAnswer
          )?.is_correct || false;

        return (
          <div key={exercise.id} className="mb-6">
            <h2 className="font-bold text-heading-4 mb-2 text-primary-100">
              {index + 1}. {exercise.question_text}
            </h2>
            {exercise.choices.map((choice) => (
              <div key={choice.choice_uuid} className="mb-2">
                <label className="flex items-center gap-2 text-des-3 dark:text-text-des-dark-mode text-text-des-light-mode">
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
            ? "bg-primary-500 hover:bg-primary-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit
      </button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MultipleChoiceQuiz;
