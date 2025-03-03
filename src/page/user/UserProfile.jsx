import React, { useEffect, useState } from "react";
import { useUserVerifyMutation } from "../../redux/features/user/userSlice";
import {
  useFetchExercisesQuery,
  useFetchSubmitExercisesQuery,
  useFetchSubmitExercisesByLevelQuery,
} from "../../redux/features/exercises/exerciseApi";
import ProfileForm from "./UserProfileForm";
import ExerciseStats from "./ExerciseStats";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import NavbarDashboard from "../../components/header/NavbarDashboard";
import UserProfileSidebar from "../../components/header/UserProfileSideBar";
import {
  useUploadFileMutation,
  useUpdateUserInfoMutation,
} from "../../verify/userApi";
import { useDispatch } from "react-redux";
import { setUser, updateUser } from "../../redux/features/user/authSlice"; // Import setUser
import StatsSummary from "./StatsSummary";
const UserProfile = () => {
  const [profilePreview, setProfilePreview] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [uploadFile] = useUploadFileMutation();
  const [
    verifyUser,
    {
      data: verifiedUser,
      isLoading: isUserLoading,
      isError: isUserError,
      error: userError,
    },
  ] = useUserVerifyMutation();

  const {
    data: allExercises,
    isLoading: isExercisesLoading,
    isError: isExercisesError,
    error: exercisesError,
  } = useFetchExercisesQuery();

  const {
    data: submitExercises,
    isLoading: isSubmitExercisesLoading,
    isError: isSubmitExercisesError,
    error: submitExercisesError,
  } = useFetchSubmitExercisesQuery(userData?.user_uuid);

  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const exercisesByLevel = levels.map((level) => {
    const { data: exercises } = useFetchSubmitExercisesByLevelQuery({
      user_uuid: userData?.user_uuid,
      level,
    });
    return { level, exercises };
  });

const handleFileChange = async (event) => {
  const fileInput = event.target;

  if (fileInput.files && fileInput.files.length > 0) {
    const selectedFile = fileInput.files[0];
    const formData = new FormData();
    formData.append("files", selectedFile); // Ensure the field name matches the API's expectations

    // Log the FormData to debug
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const result = await uploadFile(formData).unwrap();
      console.log("✅ Upload successful:", result);
    } catch (error) {
      console.error("🚨 Upload Error:", error);
      toast.error(
        `Upload failed: ${error?.data?.detail?.[0]?.msg || "Unknown error"}`
      );
    }
  } else {
    console.error("❌ No file selected.");
    toast.error("Please select a file to upload.");
  }
};

  const [updateUserInfo] = useUpdateUserInfoMutation();

  const handleUpdateProfile = async (values) => {
    try {
      await updateUserInfo({
        user_uuid: userData.user_uuid,
        user_name: values.user_name,
        profile: profileImage || userData.profile,
        bio: values.bio,
      }).unwrap();
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(`Profile update failed: ${error.message}`);
    }
  };

  const groupedExercises =
    allExercises?.reduce((acc, exercise) => {
      const level = exercise.exercise_level;
      if (!acc[level]) acc[level] = [];
      acc[level].push(exercise);
      return acc;
    }, {}) || {};

  const totalA1 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "A1"
  );
  const totalA2 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "A2"
  );
  const totalB1 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "B1"
  );
  const totalB2 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "B2"
  );
  const totalC1 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "C1"
  );
  const totalC2 = calculateCompletionPercentage(
    exercisesByLevel,
    groupedExercises,
    "C2"
  );
  const accessToken = localStorage.getItem("access_token");
  const [verify] =
    useUserVerifyMutation();
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!accessToken) return;

      try {
        const response = await verify({ token: accessToken }).unwrap();
        console.log("API Response:", response); // Log the response

        if (response?.payload) {
          setUserData(response.payload); // Set the data to state
          dispatch(updateUser(response.payload)); // Dispatch to Redux
        } else {
          setError("Failed to load user data.");
        }
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [accessToken, verify, dispatch]);

  if (isUserLoading) {
    return <LoadingSpinner />;
  }

  if (isUserError || isExercisesError || isSubmitExercisesError) {
    const errorMessage =
      userError?.message ||
      exercisesError?.message ||
      submitExercisesError?.message;
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <section>
      <NavbarDashboard />
      <UserProfileSidebar />
      {userData && (
        <>
          <ProfileForm
            user={userData}
            profilePreview={profilePreview}
            handleFileChange={handleFileChange}
            handleUpdateProfile={handleUpdateProfile}
          />
          <ExerciseStats
            totalA1={totalA1}
            totalA2={totalA2}
            totalB1={totalB1}
            totalB2={totalB2}
            totalC1={totalC1}
            totalC2={totalC2}
          />
          <StatsSummary/>
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

const calculateCompletionPercentage = (
  exercisesByLevel,
  groupedExercises,
  level
) => {
  const submittedForLevel =
    exercisesByLevel.find((item) => item.level === level)?.exercises?.payload
      ?.length || 0;
  const totalForLevel = groupedExercises[level]?.length || 0;
  return totalForLevel > 0
    ? parseFloat(((submittedForLevel / totalForLevel) * 100).toFixed())
    : 0;
};

export default UserProfile;
