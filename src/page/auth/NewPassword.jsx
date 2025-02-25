import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { FaLock, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import resetpasswordimg from "../../../public/svg/resetpassword.svg";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import blob from "../../../public/svg/Blob.svg";
import ellipse from "../../../public/svg/Ellipse.svg";
import {
  fetchNewPassword,
  selectNewPassword,
} from "../../redux/features/user/userSlice";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useTranslation } from "react-i18next";
export default function NewPassword() {
  const response = useSelector(selectNewPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation("login"||"register");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const email = location?.state?.email;
  console.log("email in NewPassword", email);

  const [showPassword, setShowPassword] = useState(false);
  const [cShowPassword, setCShowPassword] = useState(false);

  useEffect(() => {
    if (response?.status === 200) {
      navigate("/login", { state: { email } });
    }
  }, [response?.status, navigate, email]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCShowPasswordVisibility = () => {
    setCShowPassword(!cShowPassword);
  };
  const handleGoBack = () => {
    navigate("/");
  };

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .matches(
        strongPasswordRegex,
        t(
          "password must contain one uppercase letter, one lowercase letter, one special character, a number, and be at least 8 characters long."
        )
      )
      .required(t("password is required")),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        t("confirm Password need to be the same as Password!")
      )
      .required(t("Confirm Password is required")),
  });
  const handleLoading = () => (
    <section>
      <div>
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-6 h-6 me-3 animate-spin"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
      </div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <video
          className="w-full h-full object-cover opacity-55"
          autoPlay
          muted
          loop
          preload="auto"
        >
          <source src="src/assets/video/loading.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );

  return (
    <div className="flex flex-wrap h-screen items-center justify-center bg-white dark:bg-bg-dark-mode">
      {/* Container */}
      <div className="relative flex w-full max-w-8xl overflow-hidden rounded-2xl backdrop-blur-lg  transition-all min-w-[200px]">
        {/* Left - Image (Hidden on Small Screens) */}
        <div className="max-w-7xl w-full flex mx-auto flex-wrap">
          <div className="hidden w-full md:w-[40%] lg:flex p-4 order-2 md:order-2 lg:order-1 mx-auto">
            <img
              src={resetpasswordimg}
              alt="Reset Password Illustration"
              className="w-full"
            />
          </div>

          {/* Right - Form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 order-1 md:order-1">
            <div className="w-full max-w-lg bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg dark:bg-gray-800/60">
              <div className="flex justify-between">
                <a href="/">
                  <img
                    src={theme === "light" ? logolightmode : logodarkmode}
                    alt="Logo"
                    className="w-32 md:w-40"
                  />
                </a>
                <button
                  onClick={handleGoBack}
                  className="p-2 rounded-full transition duration-300"
                >
                  <FaTimes className="text-xl text-gray-700 dark:text-gray-300" />
                </button>
              </div>
              <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                {t("reset password")}
              </h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  const payload = {
                    email,
                    ...values,
                    // Include email in the payload
                  };
                  await dispatch(fetchNewPassword(payload));
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    {/* Password Field */}
                    <div className="relative">
                      <label
                        htmlFor="newPassword"
                        className="block mb-2 text-des-4 font-medium text-gray-900 dark:text-white"
                      >
                        {t("new password")}
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <Field
                          type={showPassword ? "text" : "password"}
                          id="newPassword"
                          name="newPassword"
                          className="w-full bg-white/30 dark:bg-gray-700 px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder={t("enter your new password")}
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-1 pr-3 flex items-center text-xl leading-5 text-gray-500 dark:text-gray-40 "
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="text-red-400 text-sm mt-1"
                      />
                    </div>

                    {/* Confirm New Password Field */}
                    <div className="relative">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-des-4 font-medium text-gray-900 dark:text-white"
                      >
                        {t("confirm password")}
                        <span className="text-red-500"> *</span>
                      </label>
                      <div className="relative">
                        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <Field
                          type={cShowPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          className="w-full bg-white/30 dark:bg-gray-700 px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder={t("enter your confirm new password")}
                        />
                        <button
                          type={cShowPassword ? "text" : "password"}
                          onClick={toggleCShowPasswordVisibility}
                          className="absolute inset-y-0 right-1 pr-3 flex items-center text-xl leading-5 text-gray-500 dark:text-gray-40 "
                        >
                          {cShowPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-400 text-sm mt-1"
                      />
                    </div>

                    {/* Reset password Button */}
                    <button
                      type="submit"
                      className="w-full rounded-lg bg-primary-500 p-3 font-semibold text-white hover:bg-primary-600 transition duration-300 text-heading-6"
                    >
                      {isSubmitting ? handleLoading() : t("reset password")}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Blob Image (Hidden on Small Screens) */}
          <div className="absolute w-full md:flex items-center justify-center -z-30 right-[-38%] top-0 md:top-0 md:right-[-30%] lg:right-[-40%]">
            <img src={blob} alt="blob" />
          </div>
          <div className="absolute w-full md:flex items-center justify-center -z-30 top-[25%] right-[22%] lg:right-[-7%] lg:top-[27%] md:-right-[-30%] md:top-[35%]">
            <img src={ellipse} alt="blob" />
          </div>
          <div className="absolute w-[100px] md:flex items-center justify-center -z-30 top-[80%] right-[-10%] lg:top-[80%] md:-right-[-15%] md:top-[80%] lg:right-[2%] xl:right-[9%]">
            <img src={ellipse} alt="blob" />
          </div>
        </div>
      </div>
    </div>
  );
}
