import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import otpvertificationimg from "../../../public/svg/otpvertification.svg";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import { useTranslation } from "react-i18next";
import OtpInput from "../../components/inputField/OtpInput";
import AuthLayout from "../../components/layout/AuthLayout";
import SubmitButton from "../../components/button/SubmitButton";
import {
  useVerifyOtpMutation,
  useLoginUserMutation,
  useResendOtpMutation,
  useVerifyEmailMutation,
} from "../../redux/features/user/userSlice";
import { storeAccessToken } from "../../lib/secureLocalStorage";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/user/authSlice";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation("login");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { email, password, action } = location.state || {};
  const otpBoxReference = useRef([]);
  const [verifyOtp] = useVerifyOtpMutation();
  const [loginUser] = useLoginUserMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleSubmit = async (values) => {
    try {
      const otp = values.otp.join("");
      await verifyOtp({ email, otp }).unwrap();
      toast.success(t("OTP verification successful!"));

      if (action === "google-signin") {
        const loginResponse = await loginUser({ email, password }).unwrap();
        storeAccessToken(loginResponse);
        dispatch(
          login({ user: loginResponse.user, token: loginResponse.access_token })
        );
        toast.success("Login successful! Redirecting...");
        navigate("/userprofile");
      } else if (action === "reset-password") {
        navigate("/resetpassword", { state: { email } });
        toast.success("OTP verified. Please reset your password.");
      }
    } catch (error) {
      toast.error(
        error.data?.message || t("Failed to verify OTP. Please try again.")
      );
    }
  };

  const handleChange = (value, index, formik) => {
    const newOtp = [...formik.values.otp];
    newOtp[index] = value;
    formik.setFieldValue("otp", newOtp);

    // Move focus to the next input field
    if (value && index < 5) {
      otpBoxReference.current[index + 1]?.focus();
    }

    // Auto-submit when all OTP digits are filled
    if (newOtp.every((digit) => digit !== "")) {
      setTimeout(() => {
        formik.handleSubmit();
      }, 100); // Small delay to ensure state updates
    }
  };

  const handleBackspaceAndEnter = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && e.target.value && index < 5) {
      otpBoxReference.current[index + 1]?.focus();
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleResendOtp = async () => {
    try {
      await verifyEmail(email).unwrap();
      toast.success(t("OTP resent successfully!"));
    } catch (error) {
      toast.error(
        error.data?.message || t("Failed to resend OTP. Please try again.")
      );
    }
  };

  const initialValues = {
    otp: Array(6).fill(""),
  };

  const validationSchema = yup.object({
    otp: yup
      .array()
      .of(
        yup
          .string()
          .length(1, t("Must be a single digit"))
          .required(t("Required"))
      )
      .length(6, t("Must be 6 digits"))
      .required(t("OTP is required")),
  });

  return (
    <AuthLayout
      theme={theme}
      logoLightMode={logolightmode}
      logoDarkMode={logodarkmode}
      onGoBack={handleGoBack}
      imageSrc={otpvertificationimg}
      blobPosition="right-[-38%] top-0 md:right-[-30%] lg:right-[-40%]"
      ellipse1Position="top-[25%] right-[87%] lg:right-[42.5%] lg:top-[35%] md:-right-[-76%] md:top-[38%]"
      ellipse2Position="top-[78%] right-[-10%] lg:top-[80%] md:-right-[-13%] md:top-[80%] lg:right-[9%]"
    >
      <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-primary-500 dark:text-white">
        {t("OTP Verification")}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form className="space-y-6">
            <div className="flex flex-col md:py-4">
              <div className="flex justify-between space-x-2 md:space-x-4">
                {initialValues.otp.map((_, index) => (
                  <OtpInput
                    key={index}
                    index={index}
                    handleChange={(value) => handleChange(value, index, formik)}
                    handleBackspaceAndEnter={handleBackspaceAndEnter}
                    otpBoxReference={otpBoxReference}
                  />
                ))}
              </div>
            </div>

            <SubmitButton
              isSubmitting={formik.isSubmitting || isResending}
              label={t("verify")}
              loadingLabel={t("verifying...")}
            />

            <div className="text-center mt-6">
              <span className="text-gray-600 dark:text-gray-400">
                {t("didn't receive code?")}{" "}
              </span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isResending} // Disable button while resending
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
              >
                {isResending ? t("resending...") : t("resend")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
