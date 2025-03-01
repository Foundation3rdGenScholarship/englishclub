import React, { useState, useEffect } from "react";
import { Formik, Form} from "formik";
import { FaLock } from "react-icons/fa";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import resetpasswordimg from "../../../public/svg/resetpassword.svg";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/button/SubmitButton";
import { useResetPasswordMutation } from "../../redux/features/user/userSlice";
export default function NewPassword() {
  // const response = useSelector(selectNewPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation("login"||"register");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const email = location?.state?.email;
  console.log("email in NewPassword", email);
  const [loading, setLoading] = useState(false);
const [resetPassword, { isLoading }] = useResetPasswordMutation();

const handleSubmit = async (values) => {
  try {
    await resetPassword({ email, ...values }).unwrap();
    navigate("/login");
  } catch (error) {
    toast.error(t("failed to reset password"));
  }
};
  // useEffect(() => {
  //   if (response?.status === 200) {
  //     navigate("/login", { state: { email } });
  //   }
  // }, [response?.status, navigate, email]);

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
  return (
    <AuthLayout
      theme={theme}
      logoLightMode={logolightmode}
      logoDarkMode={logodarkmode}
      onGoBack={handleGoBack}
      imageSrc={resetpasswordimg} // Pass the custom image
      blobPosition="right-[-38%] top-0 md:top-[3%] md:right-[-30%] lg:right-[-45%] lg:top-[1%]" // Custom blob position for different devices
      ellipse1Position="top-[15%] right-[22%] lg:right-[-7%] lg:top-[27%] md:-right-[-30%] md:top-[18%]" // Custom ellipse position for different devices
      ellipse2Position="top-[80%] right-[-10%] lg:top-[80%] md:-right-[-12%] md:top-[85%] lg:right-[9%]" // Custom ellipse position for different devices
    >
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
            {/* Password Input */}
            <InputField
              label={t("new password")}
              name="newPassword"
              type="password"
              placeholder={t("enter your new password")}
              icon={FaLock}
            />
            {/* Confirm Password Input */}
            <InputField
              label={t("confirm password")}
              name="confirmPassword"
              type="password"
              placeholder={t("enter your confirm password")}
              icon={FaLock}
            />
            {/* Sign up Button */}
            <SubmitButton
              isSubmitting={isSubmitting}
              loading={loading}
              label={t("reset password")}
              loadingLabel={t("sign up...")}
              disabled={false}
            />
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}
