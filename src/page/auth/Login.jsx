import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/button/SubmitButton";
import { useTranslation } from "react-i18next";
import AuthLayout from "../../components/layout/AuthLayout";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import loginimg from "../../../public/svg/login.svg";
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useLoginUserMutation } from "../../redux/features/user/userSlice";
import { getAccessToken, storeAccessToken } from "../../lib/secureLocalStorage";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/user/authSlice";

const Login = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const { t } = useTranslation("login");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch(); // Add this line
  const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

  // Check if there's a stored user and token on page load
  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      // If a token exists, restore the user session
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch(login({ user, token }));
        navigate("/");
      }
    }
  }, [dispatch, navigate]);

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      if (response?.access_token) {
        storeAccessToken(response); // Store the access token
        dispatch(login({ user: response.user, token: response.access_token })); // Dispatch login action
        toast.success("Login successful! Redirecting...");
        navigate("/userprofile");
      }
    } catch (error) {
      toast.error(t("login failed. Please try again."));
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(t("invalid email format"))
      .required(t("email is required")),
    password: yup
      .string()
      .min(8, t("minimum 8 characters"))
      .required(t("password is required")),
  });

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthLayout
        theme={theme}
        logoLightMode={logolightmode}
        logoDarkMode={logodarkmode}
        onGoBack={handleGoBack}
        imageSrc={loginimg}
        blobPosition="right-[-38%]"
        ellipse1Position="top-[25%] right-[88%] lg:right-[42.5%] lg:top-[30%] md:-right-[-77%] md:top-[29%]"
        ellipse2Position="top-[88%] right-[-10%] lg:right-[10%] lg:top-[86%] md:-right-[-12%] md:top-[89%]"
      >
        <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-primary-500 dark:text-white">
          {t("login")}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
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

              {/* Password Input */}
              <InputField
                label={t("password")}
                name="password"
                type="password"
                placeholder={t("enter your password")}
                icon={FaLock}
              />

              {/* Forgot Password Link */}
              <div className="text-right">
                <NavLink
                  to="/forgotpassword"
                  className="text-md text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 underline"
                >
                  {t("forgot password")}
                </NavLink>
              </div>

              {/* Login Button */}
              <SubmitButton
                isSubmitting={isSubmitting || isLoading}
                label={t("login")}
                loadingLabel={t("logging in...")}
                disabled={isSubmitting || isLoading}
              />

              {/* Google Login Button */}
              <GoogleLoginButton />

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
    </GoogleOAuthProvider>
  );
};

export default Login;
