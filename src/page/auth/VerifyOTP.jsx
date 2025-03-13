import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import otpvertificationimg from "../../../public/svg/otpvertification.svg";
import { NavLink } from "react-router-dom";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import { useTranslation } from "react-i18next";
import OtpInput from "../../components/inputField/OtpInput";
import AuthLayout from "../../components/layout/AuthLayout";
import SubmitButton from "../../components/button/SubmitButton";
import {
  useVerifyOtpMutation,
  useLoginUserMutation,
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

  const handleSubmit = async (values) => {
    try {
      const otp = values.otp.join("");
      const response = await verifyOtp({ email, otp }).unwrap();
      toast.success(t("OTP verification successful!"));

      if (action === "google-signin") {
        const loginResponse = await loginUser({ email, password }).unwrap();
        storeAccessToken(loginResponse);
        dispatch(
          login({ user: loginResponse.user, token: loginResponse.access_token })
        );
        toast.success("Login successful! Redirecting...");
        navigate("/dashboard");
      } else if (action === "reset-password") {
        navigate("/resetpassword", { state: { email } });
        toast.success("OTP verified. Please reset your password.");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error(
        error.data?.message || t("Failed to verify OTP. Please try again.")
      );
    }
  };

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
      imageSrc={otpvertificationimg}
      blobPosition="right-[-38%] top-0 md:right-[-30%] lg:right-[-40%]"
      ellipse1Position="top-[15%] right-[22%] lg:right-[-7%] lg:top-[40%] md:-right-[-30%] md:top-[40%]"
      ellipse2Position="top-[75%] right-[-10%] lg:top-[80%] md:-right-[-13%] md:top-[78%] lg:right-[9%]"
    >
      <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        {t("OTP Verification")}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
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

            <SubmitButton
              isSubmitting={isSubmitting}
              label={t("verify")}
              loadingLabel={t("verifying...")}
            />

            <div className="text-center mt-6">
              <span className="text-gray-600 dark:text-gray-400">
                {t("didn't receive code?")}{" "}
              </span>
              <NavLink
                to="/register"
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
