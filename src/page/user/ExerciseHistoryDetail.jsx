import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import Modal from "react-modal"; // For delete confirmation modal
import NavbarDashboard from "../../components/header/NavbarDashboard";
import UserProfileSidebar from "../../components/header/UserProfileSideBar";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUserVerifyMutation } from "../../redux/features/user/userSlice";
import ExerciseHistoryDetailSidebar from "../../components/header/ExerciseHistoryDetailSideBar";
import SignOut from "./SignOut";
import { BeatLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const ExerciseHistoryDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { exercise } = location.state || {};
  const [exerciseDetails, setExerciseDetails] = useState(null); // Store exercise details fetched by UUID
  const [loading, setLoading] = useState(true); // Loading state while fetching the exercise details
  const [showSignOutModal, setShowSignOutModal] = useState(false); // Modal visibility state
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const [verify] = useUserVerifyMutation();
  const { t } = useTranslation("userProfile");

  // Fetch user data with token
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
        setLoading(false); // Stop loading
      }
    };

    fetchUserInfo();
  }, [accessToken, verify, dispatch]);

  if (!exercise) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          No exercise data found
        </h2>
      </div>
    );
  }

  // Fetch exercise details by UUID
  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        const response = await fetch(
          `https://english-club.istad.co/exercises/${exercise?.ex_uuid}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setExerciseDetails(result.payload); // Store fetched exercise data
          setLoading(false); // Set loading to false once the data is fetched
        } else {
          throw new Error("Failed to fetch exercise details");
        }
      } catch (error) {
        console.error("Error fetching exercise details:", error);
        setError("Failed to fetch exercise details.");
        setLoading(false);
      }
    };

    if (exercise?.ex_uuid) {
      fetchExerciseDetails();
    }
  }, [exercise?.ex_uuid, accessToken]);

  // Modal handling for sign-out
  const closeModal = () => {
    setShowSignOutModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-6 sm:ml-64 max-w-screen-xl mb-16">
        <BeatLoader color="#fba518" size={20} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <NavbarDashboard />
      <ExerciseHistoryDetailSidebar
        showSignOutModal={showSignOutModal}
        setShowSignOutModal={setShowSignOutModal}
      />
      {showSignOutModal && <SignOut closeModal={closeModal} />}
      <div className="p-6 sm:ml-64 mt-[88px]">
        <div className="p-6 max-w-screen-2xl  mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-500 dark:text-white mb-6">
            {t("details of")}{" "}
            <span className="text-secondary-500">{t("exercises history")}</span>
          </h2>
          <div className="flex justify-between mb-10">
            <div className="flex flex-col w-3/4">
              <h3 className="text-lg font-semibold text-primary-500 mb-2">
                {t("title")}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {exercise?.ex_title}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {exercise?.ex_description}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium">
                {t("level")} {exercise?.ex_level}
              </p>
            </div>
          </div>
          {/* Exercise Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 text-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-primary-500 dark:text-primary-400 mb-2">
                {t("score")}
              </h3>
              <p className="text-secondary-500 dark:text-secondary-400">
                {exercise?.scores}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-primary-500 dark:text-primary-400 mb-2">
                {t("type of Question")}
              </h3>
              <p className="text-secondary-500 dark:text-secondary-400">
                {exerciseDetails?.questions?.[0]?.type}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-primary-500 dark:text-primary-400 mb-2">
                {t("completed On")}
              </h3>
              <p className="text-secondary-500 dark:text-secondary-400">
                {new Date(exercise?.complete_date).toLocaleDateString()}
              </p>
            </div>
          </div>
          {/* Answers Table */}
          <h3 className="text-xl font-bold text-primary-500 mb-4">
            {t("answer of each questions:")}
          </h3>
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white dark:bg-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                    {t("no.")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                    {t("question")}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-primary-500 dark:text-primary-400 uppercase tracking-wider">
                    {t("answer")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {exerciseDetails?.questions?.map((question, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">
                      {question?.question_text}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-500 dark:text-green-400">
                      {question?.correct_answer[0].answer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseHistoryDetail;
