import React, { useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { IoCamera } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Typed from "typed.js";

const UserProfileForm = ({
  user,
  profilePreview,
  setProfilePreview,
  handleFileChange,
  handleUpdateProfile,
  isLoading,
}) => {
  const theme = useSelector((state) => state.theme.theme);
  const { t } = useTranslation("userProfile");
  const profileFallback = user?.user_name
    ? user?.user_name[0].toUpperCase()
    : "G";

  const validationSchema = null; // Set to null to remove required validation for now

  const handleFileChangeWrapper = (event, setFieldValue, setTouched) => {
    handleFileChange(event, setFieldValue);
    setTouched({ profile: true }); // Manually mark the profile field as touched
  };

  const typedRef = useRef(null);
  const typedInstance = useRef(null);

  useEffect(() => {
    if (!isLoading && typedRef.current && user?.user_name) {
      // Destroy previous instance if it exists
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }

      if (typedRef.current) {
        typedInstance.current = new Typed(typedRef.current, {
          strings: [user.user_name],
          typeSpeed: 130,
          backSpeed: 50,
          backDelay: 2000,
          startDelay: 500,
          loop: true,
          cursorChar: "|",
          onStringTyped: () => {
            const cursor = document.querySelector(".typed-cursor");
            if (cursor) {
              cursor.style.color = "#fba518";
            }
          },
        });
      }
    }

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, [user?.user_name, isLoading]);

  return (
    <Formik
      initialValues={{
        user_name: user?.user_name || "",
        bio: user?.bio || "",
        profile: user?.profile || "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleUpdateProfile}
      enableReinitialize={true}
    >
      {({ setFieldValue, isSubmitting, values, dirty, setTouched }) => (
        <Form
          className="p-4 sm:ml-64 mt-[60px] max-w-screen-xl"
          data-aos="fade-down"
        >
          <div className="flex flex-col items-center mb-8 mt-12">
            {/* Profile Image Skeleton */}
            <div className="relative w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-1">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-secondary-200">
                {isLoading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-full"></div>
                ) : profilePreview ? (
                  <img
                    className="w-full h-full object-cover"
                    src={profilePreview}
                    alt="user profile"
                  />
                ) : user?.profile ? (
                  <img
                    className="w-full h-full rounded-full"
                    src={user?.profile}
                    alt="user photo"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-7xl">
                    {profileFallback}
                  </div>
                )}
              </div>

              {/* File Input */}
              <input
                type="file"
                name="profile"
                id="file"
                className="hidden"
                onChange={(event) =>
                  handleFileChangeWrapper(event, setFieldValue, setTouched)
                }
              />
              <label
                htmlFor="file"
                className="absolute bottom-2 right-2 cursor-pointer bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
              >
                <IoCamera className="text-xl text-gray-700" />
              </label>
            </div>

            {/* Welcome Message Skeleton */}
            <div className="text-center mt-6">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-500 dark:text-white">
                {isLoading ? (
                  <div className="h-8 bg-gray-200 animate-pulse w-48 mx-auto rounded"></div>
                ) : (
                  <>
                    {t("welcome to")}{" "}
                    <span ref={typedRef} className="text-secondary-500"></span>
                  </>
                )}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {isLoading ? (
                  <div className="h-4 bg-gray-200 animate-pulse w-32 mx-auto rounded"></div>
                ) : (
                  t("please update your information")
                )}
              </p>
            </div>
          </div>

          {/* Form Fields Skeleton */}
          <div className="max-w-2xl mx-auto bg-[#f8f8f8] dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-8">
            {/* Name Field Skeleton */}
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                {t("name")}
              </label>
              {isLoading ? (
                <div className="h-12 bg-gray-200 animate-pulse rounded-lg"></div>
              ) : (
                <Field
                  type="text"
                  name="user_name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-secondary-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t("please enter your name")}
                />
              )}
            </div>

            {/* Bio Field Skeleton */}
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                {t("bio")}
              </label>
              {isLoading ? (
                <div className="h-24 bg-gray-200 animate-pulse rounded-lg"></div>
              ) : (
                <Field
                  as="textarea"
                  name="bio"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-secondary-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t("please enter your bio")}
                  rows="4"
                />
              )}
            </div>

            {/* Save Button Skeleton */}
            <div className="flex justify-end">
              {isLoading ? (
                <div className="h-12 w-32 bg-gray-200 animate-pulse rounded-lg"></div>
              ) : (
                <button
                  type="submit"
                  className="bg-secondary-500 text-white font-bold py-3 px-8 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all disabled:opacity-50"
                  disabled={isSubmitting || (!dirty && !profilePreview)} // Enable save if form is dirty or profilePreview is set
                >
                  {isSubmitting ? t("saving...") : t("save")}
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;
