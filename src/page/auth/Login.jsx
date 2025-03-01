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

  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values).unwrap();
      console.log(response);

      if (response.access_token) {
        storeAccessToken(response); // Store the access token
        dispatch(login(response.user)); // Dispatch the login action with user data
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error);
      if (error.status === 401) {
        toast.error(t("invalid email or password."));
      } else if (error.data?.detail) {
        toast.error(error.data.detail);
      } else {
        toast.error(t("login failed. Please try again."));
      }
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const tokenId = response.tokenId;
      const result = await loginUser({ tokenId }).unwrap();

      if (result.access_token) {
        storeAccessToken(result); // Store the access token
        dispatch(login(result.user)); // Dispatch the login action with user data
        navigate("/");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      toast.error(t("Google login failed. Please try again."));
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Login Failed: ", error);
    toast.error(t("Google login failed. Please try again."));
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
