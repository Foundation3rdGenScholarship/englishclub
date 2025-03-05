export const submitExercises = async (exercise_uuid, selectedAnswers) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const user_uuid = userData?.user_uuid;

  if (!user_uuid) {
    console.warn("No user found! Cannot submit.");
    return { success: false, message: "No user found!" };
  }

  // Convert selected answers into API format
  //   const user_answer = Object.entries(selectedAnswers).map(
  //     // q_uuid : uuid's  question from api
  //     // answer : text anwser from api
  //     ([q_uuid, answer]) => ({
  //       q_uuid, // Question UUID
  //       answers: answer, // Wrap answer in array
  //     })
  //   );

  const user_answer = Object.entries(selectedAnswers).map(
    ([q_uuid, answer]) => ({
      q_uuid,
      answers: [answer], // Wrap answer in an array
    })
  );

  console.log("This is an anwser to submit : ", user_answer);
  // user_anwser it an anwser that user complete and will to api

  console.log("Request Body:", {
    user_uuid,
    user_answer,
  });

  try {
    const response = await fetch(
      `https://english-club.istad.co/exercise/${exercise_uuid}/submit_answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_uuid,
          user_answer,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to submit exercise. Status: ${response.status}. Message: ${errorText}`
      );
    }

    const result = await response.json();

    console.log("Submission successful:", result);
    return { success: true, result };
  } catch (error) {
    console.error("Error submitting exercises:", error);
    return { success: false, message: "Submission failed" };
  }
};
