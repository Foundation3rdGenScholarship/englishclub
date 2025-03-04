import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IoCamera } from "react-icons/io5";
import { useSelector } from "react-redux";

// Validation schema
const validationSchema = Yup.object({
  user_name: Yup.string().required("សូមបញ្ជូលឈ្មោះរបស់អ្នក"),
  bio: Yup.string().required("សូមបញ្ជូលជីវប្រវត្តិរបស់អ្នក"),
});

const UserProfileForm = ({
  user,
  profilePreview,
  handleFileChange,
  handleUpdateProfile,
}) => {
  const theme = useSelector((state) => state.theme.theme); // Move inside the component

  return (
    <Formik
      initialValues={{
        user_name: user?.user_name || "",
        bio: user?.bio || "",
        profile: user?.profile || "", // The profile is initially empty, use default if needed
      }}
      validationSchema={validationSchema}
      onSubmit={handleUpdateProfile}
      enableReinitialize={true}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="p-4 sm:ml-64 mt-[88px] max-w-screen-xl">
          <div className="flex flex-col items-center mb-8 mt-12">
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                {profilePreview ? (
                  <img
                    className="w-full h-full object-cover"
                    src={profilePreview} // Display uploaded image
                    alt="user profile"
                  />
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    src={
                      user?.profile ||
                      (theme === "dark"
                        ? "../../../img/userDefault/user-white.png"
                        : "../../../img/userDefault/user-black.png")
                    }
                    alt="default profile" // Display default image if no profile set
                  />
                )}
              </div>

              <input
                type="file"
                name="profile"
                id="file"
                className="hidden"
                onChange={(event) => handleFileChange(event, setFieldValue)}
              />
              <label
                htmlFor="file"
                className="absolute bottom-2 right-2 cursor-pointer bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all"
              >
                <IoCamera className="text-xl text-gray-700" />
              </label>
            </div>

            <div className="text-center mt-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                សូមស្វាគមន៍{" "}
                <span className="text-secondary-500">{user?.user_name}</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                សូមធ្វើបច្ចុប្បន្នភាពព័ត៌មានរបស់អ្នក
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                ឈ្មោះ
              </label>
              <Field
                type="text"
                name="user_name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-secondary-500 dark:bg-gray-700 dark:text-white"
                placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                ជីវប្រវត្តិ
              </label>
              <Field
                as="textarea"
                name="bio"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-secondary-500 dark:bg-gray-700 dark:text-white"
                placeholder="បញ្ជូលជីវប្រវត្តិរបស់អ្នក"
                rows="4"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-secondary-500 text-white font-bold py-3 px-8 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "កំពុងរក្សាទុក..." : "រក្សាទុក"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserProfileForm;
