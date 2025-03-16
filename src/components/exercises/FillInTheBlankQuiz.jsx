import React, { useState } from "react";
import { submitExercises } from "../../services/submitExercises.js";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FillInTheBlankQuiz = ({ exercises, ex_uuid }) => {
  const { t } = useTranslation("error");
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log("Data Exer ; ", exercises);

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
                              {exercise.correct_answer || "N/A"}
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
          disabled={!isAllFilled || isSubmitted}
          className={`px-6 py-3 rounded-lg  text-white font-medium transition-all shadow-md ${
            isAllFilled && !isSubmitted
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

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default FillInTheBlankQuiz;
