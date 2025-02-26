import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FaUser, FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchUserLogin } from "../../redux/features/user/userSlice";
import { NavLink } from "react-router-dom"; // React Router
import InputField from "../../components/inputField/InputField";
import SubmitButton from "../../components/button/SubmitButton";
import { useTranslation } from "react-i18next";
import AuthLayout from "../../components/layout/AuthLayout";
import logolightmode from "../../../public/img/logo/logo-light-mode.png";
import logodarkmode from "../../../public/img/logo/logo-dark-mode.png";
import loginimg from "../../../public/svg/login.svg"; // Page-specific image
import GoogleLoginButton from "../../components/button/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("login");

  const handleGoogleLoginSuccess = (response) => {
    // You can send the response.tokenId to your backend to validate the login
    console.log("Login Success: ", response);
    const tokenId = response.tokenId;

    // Send the token to your existing /login endpoint for processing
    fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId }), // Send tokenId instead of email/password
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Handle the success (e.g., store JWT token, redirect)
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token); // Store JWT token
          navigate("/"); // Redirect to homepage or dashboard
        } else {
          toast.error("Google login failed");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.error("An error occurred during Google login.");
      });
    // After successful login, you can redirect to the dashboard or wherever needed
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Login Failed: ", error);
    // Handle the failure case, maybe show a toast error
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

  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true);
    dispatch(fetchUserLogin(values))
      .unwrap()
      .then(() => {
        toast.success(t("login Successfully!"));
        setTimeout(() => {
          setLoading(false);
          setSubmitting(false);
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log("Login error:", error);
        setTimeout(() => {
          setLoading(false);
          setSubmitting(false);
          if (error.message === t("User is not verified")) {
            toast.error(t("please verify your email before logging in."));
          } else {
            toast.error(t("incorrect email or password."));
          }
        }, 500);
      });
  };

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
        imageSrc={loginimg} // Pass the custom image
        blobPosition="right-[-38%]" // Custom blob position for different devices
        ellipse1Position="top-[15%] right-[22%] lg:right-[-7%] lg:top-[27%] md:-right-[-30%] md:top-[18%]" // Custom ellipse position for different devices
        ellipse2Position="top-[54%] right-[-10%] lg:right-[10%] lg:top-[86%] md:-right-[-15%] md:top-[60%]" // Custom ellipse position for different devices
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
                isSubmitting={isSubmitting}
                loading={loading}
                label={t("login")}
                loadingLabel={t("logging in...")}
                disabled={false}
              />
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
