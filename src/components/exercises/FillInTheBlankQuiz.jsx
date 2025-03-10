import React, { useState } from "react";
import { submitExercises } from "../../services/submitExercises.js";
import { useTranslation } from "react-i18next";
import SubmitPopup from "../popup/SubmitPopup.jsx";

const FillInTheBlankQuiz = ({ exercises, ex_uuid }) => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // Handle input change
  const handleInputChange = (exerciseId, value) => {
    if (!isSubmitted) {
      setAnswers((prev) => ({
        ...prev,
        [exerciseId]: value.trim(), // Trim spaces to avoid accidental empty input
      }));
    }
  };

  // Check if all blanks are filled
  const isAllFilled = exercises.every(
    (exercise) => answers[exercise.id]?.length > 0
  );

  // Function to play sound (assuming this is defined elsewhere)
  const playSound = (soundId) => {
    // Implementation for playing sound
    console.log(`Playing sound: ${soundId}`);
  };

  // Prepare the answers object
  const prepareAnswers = () => {
    return {
      user_answer: exercises.map((exercise) => ({
        q_uuid: exercise.question_uuid,
        answers: [answers[exercise.id] || ""],
      })),
    };
  };

  // Handle submission
  const handleSubmit = async () => {
    if (!isSubmitted && isAllFilled) {
      setIsSubmitted(true);

      const formattedAnswers = prepareAnswers();

      try {
        const result = await submitExercises(ex_uuid, formattedAnswers);

        if (result.success) {
          setFeedbackMessage("Exercise submitted successfully!");

          // Play the correct sound for each correct answer
          exercises.forEach((exercise, index) => {
            const userAnswer = answers[exercise.id] || "";
            const isCorrect =
              String(userAnswer).toLowerCase() ===
              String(exercise.correct_answer?.answer || "").toLowerCase();

            if (isCorrect) {
              playSound(`correct${index + 1}`);
            }
          });
        } else {
          setFeedbackMessage(t("multipleChoics") || "Submission failed");
        }
      } catch (error) {
        setFeedbackMessage(`Error: ${error.message || "Something went wrong"}`);
      }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {exercises.map((exercise, index) => {
        const userAnswer = answers[exercise.id] || "";
        const isCorrect =
          isSubmitted &&
          String(userAnswer).toLowerCase() ===
            String(exercise.correct_answer?.answer || "").toLowerCase();

        return (
          <div key={exercise.id} className="mb-6">
            <h2 className="font-bold text-lg mb-2">
              {index + 1}. {exercise.question_text}
            </h2>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => handleInputChange(exercise.id, e.target.value)}
              disabled={isSubmitted}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
            {isSubmitted && (
              <p
                className={`mt-2 ${
                  isCorrect ? "text-green-600" : "text-red-600"
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
        );
      })}

      <button
        onClick={handleSubmit}
        disabled={!isAllFilled || isSubmitted}
        className={`px-4 py-2 rounded-lg text-white ${
          isAllFilled && !isSubmitted
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit
      </button>

      {feedbackMessage && (
        <SubmitPopup
          message={feedbackMessage}
          type={feedbackMessage.includes("Error") ? "error" : "success"}
          onClose={() => setFeedbackMessage("")}
        />
      )}
    </div>
  );
};

export default FillInTheBlankQuiz;
