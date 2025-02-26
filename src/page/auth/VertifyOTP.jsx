import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, useField } from "formik";
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
import { NavLink } from "react-router";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import { useTranslation } from "react-i18next";
import OtpInput from "../../components/inputField/OtpInput";
import AuthLayout from "../../components/layout/AuthLayout";
import SubmitButton from "../../components/button/SubmitButton";

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

  return (
    <AuthLayout
      theme={theme}
      logoLightMode={logolightmode}
      logoDarkMode={logodarkmode}
      onGoBack={handleGoBack}
      imageSrc={otpvertificationimg} // Pass the custom image
      blobPosition="right-[-38%] top-0 md:right-[-30%] lg:right-[-40%]" // Custom blob position for different devices
      ellipse1Position="top-[15%] right-[22%] lg:right-[-7%] lg:top-[40%] md:-right-[-30%] md:top-[40%]" // Custom ellipse position for different devices
      ellipse2Position="top-[75%] right-[-10%] lg:top-[80%] md:-right-[-13%] md:top-[78%] lg:right-[9%]" // Custom ellipse position for different devices
    >
      <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        {t("OTP Verification")}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          await dispatch(fetchVerifyEmail(values));
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            {/* Email Input */}
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

            {/* Send Button */}
            <SubmitButton
              isSubmitting={isSubmitting}
              loading={loading}
              label={t("verify")}
              loadingLabel={t("verifying...")}
              disabled={false}
            />
            {/* Resend Link */}
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
    </AuthLayout>
  );
}
