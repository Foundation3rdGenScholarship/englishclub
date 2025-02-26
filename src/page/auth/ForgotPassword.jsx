import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser, FaTimes } from "react-icons/fa";
import {
  fetchVerifyEmail,
  selectUserEmail,
} from "../../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { NavLink } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import forgotpasswordimg from "../../../public/svg/forgotpassword.svg";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import { useTranslation } from "react-i18next";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/button/SubmitButton";
const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const userResponse = useSelector(selectUserEmail);
  const { t } = useTranslation("login");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid email format"))
      .required(t("email is required")),
  });
  useEffect(() => {
    if (userResponse?.status === 200) {
      navigate("/otp-verify", { state: email });
    }
  }, [userResponse?.status, navigate, email]);

  const handleGetEmail = (e, setFieldValue) => {
    setEmail(e.target.value);
    setFieldValue("email", e.target.value);
  };

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <AuthLayout
      theme={theme}
      logoLightMode={logolightmode}
      logoDarkMode={logodarkmode}
      onGoBack={handleGoBack}
      imageSrc={forgotpasswordimg} // Pass the custom image
      blobPosition="right-[-38%] top-0 md:right-[-30%] lg:right-[-40%]" // Custom blob position for different devices
      ellipse1Position="top-[15%] right-[22%] lg:right-[-7%] lg:top-[40%] md:-right-[-30%] md:top-[40%]" // Custom ellipse position for different devices
      ellipse2Position="top-[75%] right-[-10%] lg:top-[80%] md:-right-[-13%] md:top-[78%] lg:right-[9%]" // Custom ellipse position for different devices
    >
      <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        {t("forgot password")}
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
            <InputField
              label={t("email")}
              name="email"
              type="email"
              placeholder={t("enter your email")}
              icon={FaUser}
            />

            {/* Send Button */}
            <SubmitButton
              isSubmitting={isSubmitting}
              loading={loading}
              label={t("send")}
              loadingLabel={t("sending...")}
              disabled={false}
            />
            {/* Register Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600 dark:text-gray-400">
                {t("don't have an account?")}{" "}
              </span>
              <NavLink
                to="/register"
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
              >
                {t("register")}
              </NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgotPassword;
