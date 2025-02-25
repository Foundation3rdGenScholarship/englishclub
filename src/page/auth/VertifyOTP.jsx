import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, useField } from "formik";
import { BsChevronLeft } from "react-icons/bs";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmailOtp,
  selectUserPassword,
} from "../../redux/features/user/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { FaTimes } from "react-icons/fa";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import otpvertificationimg from "../../../public/svg/otpvertification.svg";
import { NavLink } from "react-router"; // Assuming you're using React Router for navigation
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import blob from "../../../public/svg/Blob.svg";
import ellipse from "../../../public/svg/Ellipse.svg";
import { useTranslation } from "react-i18next";


export default function VerifyOTP() {
  const userResponse = useSelector(selectUserPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation("login");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  console.log("location: ", location);
  const email = location?.state;
  const otpBoxReference = useRef([]);

  function handleChange(value, index) {
    if (value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < 5) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  useEffect(() => {
    if (userResponse?.status === 200) {
      navigate("/new-password", { state: { email } });
    }
  }, [userResponse?.status, navigate, email]);

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    const otp = values.otp.join("");
    console.log("Submitting OTP: ", otp);
    console.log("Email: ", email);

    setSubmitting(true);

    setTimeout(() => {
      dispatch(fetchEmailOtp({ otp, email })).finally(() =>
        setSubmitting(false)
      );
      resetForm();
    }, 500);
  };
  const handleGoBack = () => {
    navigate("/");
  };
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const initialValues = {
    otp: Array(6).fill(""),
  };

  const validationSchema = Yup.object({
    otp: Yup.array()
      .of(
        Yup.string().length(1, "ត្រូវតែជាលេខមួយខ្ទង់").required("ត្រូវតែទាមទារ")
      )
      .length(6, "ត្រូវតែមាន 6 ខ្ទង់")
      .required("OTP ត្រូវបានទាមទារ"),
  });

  const OtpInput = ({
    index,
    handleChange,
    handleBackspaceAndEnter,
    otpBoxReference,
  }) => {
    const [field, meta, helpers] = useField(`otp[${index}]`);

    return (
      <input
        {...field}
        type="text"
        maxLength={1}
        onChange={(e) => {
          helpers.setValue(e.target.value);
          handleChange(e.target.value, index);
        }}
        onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
        ref={(reference) => (otpBoxReference.current[index] = reference)}
        className="min-w-10 min-h-10 text-xl bg-white/30 dark:bg-gray-700 text-center text-gray-900 dark:text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                 md:w-16 md:h-16 md:text-2xl
                 lg:w-18 lg:h-18 lg:text-3xl"
      />
    );
  };
  return (
    <div className="flex flex-wrap h-screen items-center justify-center bg-white dark:bg-bg-dark-mode">
      {/* Container */}
      <div className="relative flex w-full max-w-8xl overflow-hidden rounded-2xl backdrop-blur-lg  transition-all min-w-[200px]">
        {/* Left - Image (Hidden on Small Screens) */}
        <div className="max-w-7xl w-full flex mx-auto flex-wrap">
          <div className="hidden w-full md:w-[40%] lg:flex p-4 order-2 md:order-2 lg:order-1 mx-auto">
            <img
              src={otpvertificationimg}
              alt="Login Illustration"
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
                {t("OTP Verification")}
              </h2>
              <p className="my-4 text-gray-600 dark:text-gray-400">
                {t("enter the verification code we just sent to your email")}
              </p>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-6">
                    {userResponse?.status === 409 && (
                      <Alert color="failure" icon={HiInformationCircle}>
                        {userResponse?.message}
                      </Alert>
                    )}
                    <div className="flex flex-col md:py-4">
                      <div className="flex justify-between space-x-2 md:space-x-4">
                        {initialValues.otp.map((_, index) => (
                          <OtpInput
                            key={index}
                            index={index}
                            handleChange={handleChange}
                            handleBackspaceAndEnter={handleBackspaceAndEnter}
                            otpBoxReference={otpBoxReference}
                          />
                        ))}
                      </div>
                    </div>

                    {/* veritfy Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="w-full rounded-lg bg-primary-500 p-3 font-semibold text-white hover:bg-primary-600 transition duration-300 text-heading-6"
                    >
                      {loading ? t("vertifying...") : t("vertify")}
                    </button>

                    {/* Register Link */}
                    <div className="text-center mt-6">
                      <span className="text-gray-600 dark:text-gray-400">
                        {t("didn't receive code?")}{" "}
                      </span>
                      <NavLink
                        to="/register" // Replace with your register route
                        className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
                      >
                        {t("resend")}
                      </NavLink>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Blob Image (Hidden on Small Screens) */}
          <div className="absolute w-full md:flex items-center justify-center -z-30 right-[-38%] md:right-[-35%] lg:right-[-45%]">
            <img src={blob} alt="blob" />
          </div>
          <div className="absolute w-full md:flex items-center justify-center -z-30 top-[15%] right-[22%] lg:right-[-7%] lg:top-[27%] md:-right-[-30%] md:top-[18%]">
            <img src={ellipse} alt="blob" />
          </div>
          <div className="absolute w-[100px] md:flex items-center justify-center -z-30 top-[80%] right-[-10%] md:-right-[-15%] md:top-[80%] lg:top-[81%] lg:right-[10%]">
            <img src={ellipse} alt="blob" />
          </div>
        </div>
      </div>
    </div>
  );
}
