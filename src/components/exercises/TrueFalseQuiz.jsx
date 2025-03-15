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

  // console.log("Data In True False : ", exercises);

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
    <div className="p-6 dark:bg-bg-dark-mode dark:text-text-des-dark-mode dark:border-text-des-dark-mode dark:border-2 bg-white shadow-md rounded-lg">
      {!userLoggedIn && (
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
      )}

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
                className={`mt-2 text-sm ${
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
