export const submitExercises = async (exercise_uuid, selectedAnswers) => {
	const userData = JSON.parse(localStorage.getItem("user"));
	const user_uuid = userData?.user_uuid;
  
	if (!user_uuid) {
	  console.warn("No user found! Cannot submit.");
	  return { success: false, message: "No user found!" };
	}
  
	// Convert selected answers into API format
	const user_answer = Object.entries(selectedAnswers).map(([q_uuid, answer]) => ({
	  q_uuid, // Question UUID
	  answers: [answer], // Wrap answer in array
	}));
  
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
		throw new Error("Failed to submit exercise");
	  }
  
	  const result = await response.json();
  
	  // Store completed exercises
	  const completedExercises =
		JSON.parse(localStorage.getItem("completedExercises")) || {};
	  completedExercises[exercise_uuid] = true;
	  localStorage.setItem("completedExercises", JSON.stringify(completedExercises));
  
	  console.log("Submission successful:", result);
	  return { success: true, result };
	} catch (error) {
	  console.error("Error submitting exercises:", error);
	  return { success: false, message: "Submission failed" };
	}
  };
  