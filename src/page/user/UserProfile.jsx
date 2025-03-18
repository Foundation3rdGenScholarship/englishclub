import React, { useEffect, useState } from "react";
import { useUserVerifyMutation } from "../../redux/features/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import NavbarDashboard from "../../components/header/NavbarDashboard";
import UserProfileSidebar from "../../components/header/UserProfileSideBar";
import ProfileForm from "./UserProfileForm";
import ExerciseStats from "./ExerciseStats";
import StatsSummary from "./StatsSummary";
import {
  useUploadFileMutation,
  useUpdateUserInfoMutation,
} from "../../verify/userApi";
import { useDispatch } from "react-redux";
import { setUser, updateUser } from "../../redux/features/user/authSlice";
import SignOut from "./SignOut";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const UserProfile = () => {
  const [profilePreview, setProfilePreview] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploadFile] = useUploadFileMutation();
  const [updateUserInfo] = useUpdateUserInfoMutation();
  const [showSignOutModal, setShowSignOutModal] = useState(false); // Modal visibility state
  const accessToken = localStorage.getItem("access_token");
  const location = useLocation();
  const dispatch = useDispatch();
  const [verify] = useUserVerifyMutation();
  const { t } = useTranslation("userProfile");

useEffect(() => {
  const fetchUserInfo = async () => {
    setLoading(true); // Start loading

    if (!accessToken) {
      setError("Access token is missing. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await verify({ token: accessToken }).unwrap();
      if (response?.payload) {
        setUserData(response.payload); // Update state first
        dispatch(updateUser(response.payload));
      } else {
        setError("Failed to load user data.");
      }
    } catch (err) {
      setError("Failed to fetch user data.");
    } finally {
      setUserData((prevData) => {
        if (prevData) {
          setTimeout(() => setLoading(false), 1000); // Ensure skeleton stays briefly visible
        }
        return prevData;
      });
    }
  };

  fetchUserInfo();
}, [accessToken, verify, dispatch]);


  const handleFileChange = async (event) => {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];

      // Validate file type and size
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error(t("File size exceeds the limit of 5MB."));
        return;
      }
      if (
        !["image/jpeg", "image/png", "image/jpg"].includes(selectedFile.type)
      ) {
        toast.error(t("Invalid file type. Only JPEG, PNG and JPG files are allowed."));
        return;
      }

      const formData = new FormData();
      formData.append("files", selectedFile, selectedFile.name); // Append file with its name

      try {
        const result = await uploadFile(formData).unwrap();
        toast.success(result.message); // Display success message from the API
        if (result?.payload?.file_urls?.length > 0) {
          setProfilePreview(result.payload.file_urls[0].file_path);
        }
      } catch (error) {
        toast.error(
          `Upload failed: ${error?.data?.message || "Unknown error"}`
        );
      }
    } else {
      toast.error(t("Please select a file to upload."));
    }
  };

  const handleUpdateProfile = async (values) => {
    try {
      const response = await verify({ token: accessToken }).unwrap();
      const data = {
        user_uuid: response?.payload?.user_uuid, // Ensure this is the correct user ID
        user_name: values.user_name,
        profile: profilePreview || userData.profile, // Use the preview or the existing profile image
        bio: values.bio,
      };

      // Use the mutation to send the data to the server
      const result = await updateUserInfo(data).unwrap(); // Use unwrap to handle the result directly
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(`Update failed: ${error.message}`);
    }
  };

  // Toggle modal visibility
  const handleSignOutClick = () => {
    setShowSignOutModal(true); // Show the sign-out modal when the link is clicked
  };

  // Close modal
  const closeModal = () => {
    setShowSignOutModal(false);
  };


  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>; // Show error message if fetching fails
  }

  return (
    <section className="overflow-hidden">
      <NavbarDashboard />
      <UserProfileSidebar
        showSignOutModal={showSignOutModal}
        setShowSignOutModal={setShowSignOutModal}
      />
      {userData && (
        <>
          <section id="profile-section">
            <ProfileForm
              user={userData}
              profilePreview={profilePreview}
              handleFileChange={handleFileChange}
              handleUpdateProfile={handleUpdateProfile}
              isLoading={loading} // Pass the loading state to ProfileForm
            />
          </section>

          <section id="exercise-section">
            <ExerciseStats />
            <StatsSummary />
          </section>

          {/* Render the SignOut Modal conditionally */}
          {showSignOutModal && <SignOut closeModal={closeModal} />}
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default UserProfile;
