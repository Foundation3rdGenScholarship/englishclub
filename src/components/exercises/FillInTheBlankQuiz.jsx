import React, { useState } from "react";
import { submitExercises } from "../../services/submitExercises.js";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FillInTheBlankQuiz = ({ exercises, ex_uuid }) => {
  const { t } = useTranslation("error");
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize toast notifications
  const notify = (message, type = "success") => {
    const colors = {
      success: { background: "#fff", text: "#4CAF50", progress: "#2E7D32" },
      error: { background: "#fff", text: "#F44336", progress: "#D32F2F" },
      warning: { background: "#fff", text: "#FFA000", progress: "#FF6F00" },
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

  const handleSubmit = async () => {
    if (!isSubmitted && isAllFilled) {
      setIsSubmitted(true);

      const formattedAnswers = prepareAnswers();

      try {
        const result = await submitExercises(ex_uuid, formattedAnswers);

        if (result.success) {
          notify("🎉 Exercise submitted successfully!", "success");
        } else if (
          result.message.includes("already submitted") ||
          result.message.includes("already done this exercise")
        ) {
          notify("⚠️ You've already completed this exercise!", "warning");
        } else {
          notify(t("fillintheblank") || "❌ Submission failed", "error");
        }
      } catch (error) {
        notify(`❌ Error: ${error.message || "Something went wrong"}`, "error");
      }
    }
  };

  return (
    <div className="p-6 dark:bg-bg-dark-mode dark:text-text-des-dark-mode bg-white shadow-md rounded-lg">
      <div className="space-y-6">
        {exercises.map((exercise, index) => {
          const userAnswer = answers[exercise.id] || "";
          const isCorrect =
            isSubmitted &&
            String(userAnswer).toLowerCase() ===
              String(exercise.correct_answer?.answer || "").toLowerCase();

          const parts = exercise.question_text.split("_____");

          return (
            <div
              key={exercise.id}
              className="pb-4 border-b dark:border-gray-700 last:border-none"
            >
              <div className="flex items-start mb-2">
                <span className="flex-shrink-0 flex items-center justify-center bg-blue-500 text-white rounded-full w-7 h-7 mr-3 font-medium">
                  {index + 1}
                </span>
                <div className="flex-grow">
                  <p className="text-lg">
                    {parts.map((part, partIndex, array) => (
                      <span key={partIndex}>
                        {part}
                        {partIndex < array.length - 1 && (
                          <input
                            type="text"
                            className={`dark:bg-gray-600 border-b-2 border-none focus:ring-0 p-2 px-2 text-center w-40 mx-1 outline-none ${
                              isSubmitted
                                ? isCorrect
                                  ? "border-green-500 text-green-600"
                                  : "border-red-500 dark:text-red-500 text-red-600"
                                : "border-gray-500"
                            }`}
                            value={userAnswer}
                            onChange={(e) =>
                              handleInputChange(exercise.id, e.target.value)
                            }
                            disabled={isSubmitted}
                          />
                        )}
                      </span>
                    ))}
                  </p>

                  {isSubmitted && (
                    <p
                      className={`mt-2 ${
                        isCorrect
                          ? "text-green-600"
                          : "dark:text-red-900 text-red-600"
                      }`}
                    >
                      {isCorrect
                        ? "Correct!"
                        : `Incorrect. Correct answer: ${
                            exercise.correct_answer?.answer || "N/A"
                          }`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isAllFilled || isSubmitted}
        className={`mt-5 px-4 py-2 rounded-lg text-white ${
          isAllFilled && !isSubmitted
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit
      </button>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default FillInTheBlankQuiz;
