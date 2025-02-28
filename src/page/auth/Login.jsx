import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
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
import { storeAccessToken } from "../../lib/secureLocalStorage";
const Login = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const { t } = useTranslation("login");
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      console.log(response);
      if (response.access_token) {
        storeAccessToken(response);
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging
      if (error.status === 401) {
        toast.error("Invalid email or password.");
      } else if (error.data?.detail) {
        toast.error(error.data.detail); // Show server error message
      } else {
        toast.error("Login failed. Please try again."); // Fallback error message
      }
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const tokenId = response.tokenId;
      const result = await loginUser({ tokenId }).unwrap();
      if (result.access_token) {
        storeAccessToken(result);
        navigate("/");
      }
    } catch (error) {
      console.error("Google Login Error:", error); // Log the error for debugging
      toast.error("Google login failed. Please try again.");
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Login Failed: ", error);
    toast.error("Google login failed. Please try again.");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid email format"))
      .required(t("email is required")),
    password: Yup.string()
      .min(6, t("minimum 6 characters"))
      .required(t("password is required")),
  });

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <GoogleOAuthProvider clientId="886296695095-1j0sdqc2r8juug5f0f99gdoclir733vm.apps.googleusercontent.com">
      <AuthLayout
        theme={theme}
        logoLightMode={logolightmode}
        logoDarkMode={logodarkmode}
        onGoBack={handleGoBack}
        imageSrc={loginimg}
        blobPosition="right-[-38%]"
        ellipse1Position="top-[15%] right-[22%] lg:right-[-7%] lg:top-[27%] md:-right-[-30%] md:top-[18%]"
        ellipse2Position="top-[54%] right-[-10%] lg:right-[10%] lg:top-[86%] md:-right-[-15%] md:top-[60%]"
      >
        <h2 className="mb-6 mt-6 text-center text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
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
              <GoogleLoginButton
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
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
    </GoogleOAuthProvider>
  );
};

export default Login;
